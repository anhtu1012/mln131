# Tài liệu: `geminiService.ts`

Tệp này chứa nội dung hướng dẫn và mã nguồn liên quan đến dịch vụ gọi Gemini AI trong dự án.

## Mục đích

- Lưu trữ system prompt dùng để định hướng model Gemini.
- Ghi lại mã nguồn hiện tại của `src/services/geminiService.ts` để tham khảo hoặc in/đổi sang PDF.

## System Prompt (nội dung chính)

> Bạn là một trợ lý AI thông minh và thân thiện, chuyên tư vấn về:
>
> - Chính sách dân tộc và tôn giáo của Việt Nam
> - Văn hóa và truyền thống các dân tộc
> - Lịch sử và di sản văn hóa
> - Thông tin về triển lãm và các nội dung giáo dục
>
> Hãy trả lời bằng tiếng Việt, một cách rõ ràng, thân thiện và chuyên nghiệp.
> Nếu câu hỏi không liên quan đến các chủ đề trên, hãy lịch sự chuyển hướng người dùng về các chủ đề chính.

---

## Mã nguồn `src/services/geminiService.ts`

```typescript
import { GoogleGenerativeAI } from "@google/generative-ai";

// Cấu hình API key - Bạn cần thay thế bằng API key của mình
const API_KEY = import.meta.env.VITE_GEMINI_API_KEY || "";

// System prompt để định hướng AI
const systemPrompt = `Bạn là một trợ lý AI thông minh và thân thiện, chuyên tư vấn về:
- Chính sách dân tộc và tôn giáo của Việt Nam
- Văn hóa và truyền thống các dân tộc
- Lịch sử và di sản văn hóa
- Thông tin về triển lãm và các nội dung giáo dục

Hãy trả lời bằng tiếng Việt, một cách rõ ràng, thân thiện và chuyên nghiệp. 
Nếu câu hỏi không liên quan đến các chủ đề trên, hãy lịch sự chuyển hướng người dùng về các chủ đề chính.`;

/**
 * Gửi tin nhắn đến Gemini AI và nhận phản hồi
 * @param message - Tin nhắn từ người dùng
 * @returns Promise với phản hồi từ AI
 */
export async function sendMessageToGemini(message: string): Promise<string> {
  try {
    // Kiểm tra API key
    if (!API_KEY || API_KEY.trim() === "") {
      console.error("API key chưa được cấu hình");
      return "Xin lỗi, API key chưa được cấu hình. Vui lòng tạo file .env và thêm VITE_GEMINI_API_KEY=your_api_key";
    }

    // Khởi tạo Gemini AI
    const genAI = new GoogleGenerativeAI(API_KEY);

    // Lấy model
    const model = genAI.getGenerativeModel({
      model: "gemini-2.5-flash",
    });

    // Thêm system prompt vào đầu tin nhắn
    const fullPrompt = `${systemPrompt}\n\nNgười dùng: ${message}\n\nTrợ lý AI:`;

    // Gửi yêu cầu đến Gemini
    const result = await model.generateContent(fullPrompt);

    const response = result.response;
    const text = response.text();

    return text;
  } catch (error) {
    console.error("Lỗi khi gọi Gemini API:", error);

    // Xử lý các loại lỗi khác nhau
    if (error instanceof Error) {
      if (
        error.message.includes("API_KEY") ||
        error.message.includes("API key")
      ) {
        return "Xin lỗi, API key không hợp lệ. Vui lòng kiểm tra lại API key trong file .env";
      }
      if (error.message.includes("quota") || error.message.includes("429")) {
        return "Xin lỗi, hệ thống đang quá tải hoặc đã vượt quota. Vui lòng thử lại sau.";
      }
      if (error.message.includes("SAFETY")) {
        return "Xin lỗi, nội dung không phù hợp với chính sách an toàn. Vui lòng thử câu hỏi khác.";
      }
    }

    return "Xin lỗi, tôi gặp sự cố kỹ thuật. Vui lòng thử lại sau ít phút.";
  }
}

/**
 * Kiểm tra xem API key có được cấu hình hay không
 * @returns boolean
 */
export function isGeminiConfigured(): boolean {
  return API_KEY !== "YOUR_GEMINI_API_KEY_HERE" && API_KEY.length > 0;
}
```

---

Nếu bạn muốn tôi xuất tệp này thành PDF (ví dụ `docs/geminiService.pdf`) hoặc thêm metadata (tác giả, ngày, logo), hãy cho biết — tôi sẽ tạo file PDF trong repo và thông báo đường dẫn tải về.
