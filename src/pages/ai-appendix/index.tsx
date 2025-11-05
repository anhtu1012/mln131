import React from "react";
import {
  HomeOutlined,
  RobotOutlined,
  CheckCircleOutlined,
  BulbOutlined,
  SafetyOutlined,
  FileTextOutlined,
} from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import "./index.scss";

const AIAppendix: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="ai-appendix-page">
      {/* Header */}
      <header className="appendix-header">
        <div className="header-content">
          <div className="header-left">
            <RobotOutlined className="header-icon" />
            <h1>Phụ Lục AI</h1>
          </div>
          <button className="home-button" onClick={() => navigate("/")}>
            <HomeOutlined />
            <span>Trang Chủ</span>
          </button>
        </div>
      </header>

      {/* Main Content */}
      <main className="appendix-content">
        <div className="content-container">
          {/* Introduction */}
          <section className="intro-section">
            <div className="intro-card">
              <RobotOutlined className="intro-icon" />
              <h2>Cam Kết Sử Dụng AI Có Trách Nhiệm</h2>
              <p className="intro-text">
                Trong quá trình xây dựng website này, nhóm đã sử dụng các công
                cụ AI như ChatGPT, NotebookLM, Google Gemini và Canva AI để hỗ
                trợ sáng tạo nội dung, thiết kế giao diện và tối ưu trải nghiệm
                người dùng. Tất cả đều tuân thủ nguyên tắc sử dụng AI minh bạch,
                có trách nhiệm và liêm chính học thuật.
              </p>
            </div>
          </section>

          {/* 1. Minh bạch */}
          <section className="principle-section transparency">
            <div className="section-header">
              <div className="section-number">01</div>
              <div className="section-info">
                <FileTextOutlined className="section-icon" />
                <h2>Minh Bạch</h2>
              </div>
            </div>

            <div className="tools-grid">
              {/* ChatGPT */}
              <div className="tool-card">
                <div className="tool-header">
                  <div className="tool-icon chatgpt">
                    <RobotOutlined />
                  </div>
                  <h3>ChatGPT</h3>
                </div>
                <div className="tool-content">
                  <p className="tool-purpose">
                    Hỗ trợ tạo hình ảnh minh họa phù hợp cho website; tổng hợp
                    và sắp xếp thông tin đã trích xuất từ NotebookLM để hệ thống
                    lý luận chặt chẽ hơn.
                  </p>
                </div>
              </div>

              {/* NotebookLM */}
              <div className="tool-card">
                <div className="tool-header">
                  <div className="tool-icon notebooklm">
                    <FileTextOutlined />
                  </div>
                  <h3>NotebookLM</h3>
                </div>
                <div className="tool-content">
                  <p className="tool-purpose">
                    Trích xuất thông tin lý thuyết trực tiếp từ giáo trình Tư
                    tưởng Hồ Chí Minh, giáo trình Lịch sử Đảng Cộng sản Việt Nam
                    và các nguồn báo chí chính thống (Báo Quân đội Nhân dân,
                    Cổng thông tin Chính phủ Việt Nam, …).
                  </p>
                </div>
              </div>

              {/* Google Gemini */}
              <div className="tool-card featured">
                <div className="tool-header">
                  <div className="tool-icon gemini">
                    <RobotOutlined />
                  </div>
                  <h3>Google Gemini</h3>
                  <span className="featured-badge">Tích hợp</span>
                </div>
                <div className="tool-content">
                  <p className="tool-purpose">
                    <strong>Hỗ trợ thiết kế:</strong> Thiết kế giao diện và
                    chỉnh sửa CSS cho website, giúp nhóm sinh viên chuyên ngành
                    Marketing có thể xây dựng một website hoàn chỉnh.
                  </p>
                  <p className="tool-purpose">
                    <strong>Tích hợp trực tiếp:</strong> API Google Gemini được
                    tích hợp vào website để cung cấp trợ lý AI thông minh, trả
                    lời câu hỏi về chính sách dân tộc và tôn giáo Việt Nam trong
                    phần Chat AI.
                  </p>
                  <p className="tool-purpose">
                    <strong>Minigame:</strong> Tích hợp AI vào trò chơi "Kéo búa
                    bao" để tạo câu hỏi ôn tập động và đa dạng, giúp người dùng
                    học tập hiệu quả hơn.
                  </p>
                </div>
              </div>

              {/* Canva AI */}
              <div className="tool-card">
                <div className="tool-header">
                  <div className="tool-icon canva">
                    <BulbOutlined />
                  </div>
                  <h3>Canva AI</h3>
                </div>
                <div className="tool-content">
                  <p className="tool-purpose">
                    Chỉnh sửa hình ảnh và mở rộng hình ảnh cho khớp với khung
                    hình trên website.
                  </p>
                </div>
              </div>
            </div>

            {/* Quy trình */}
            <div className="process-section">
              <h3 className="process-title">Quy Trình Sử Dụng</h3>
              <div className="process-steps">
                <div className="step">
                  <div className="step-number">1</div>
                  <div className="step-content">
                    <h4>Nhập Prompt</h4>
                    <p>
                      Yêu cầu rõ ràng: "Chỉ trả kết quả những gì có trong nguồn
                      tài liệu, không thêm hay bớt ý"
                    </p>
                  </div>
                </div>
                <div className="step-arrow">→</div>
                <div className="step">
                  <div className="step-number">2</div>
                  <div className="step-content">
                    <h4>AI Sinh Kết Quả</h4>
                    <p>Nhận output từ AI</p>
                  </div>
                </div>
                <div className="step-arrow">→</div>
                <div className="step">
                  <div className="step-number">3</div>
                  <div className="step-content">
                    <h4>Kiểm Tra & Đối Chiếu</h4>
                    <p>So sánh với nguồn gốc</p>
                  </div>
                </div>
                <div className="step-arrow">→</div>
                <div className="step">
                  <div className="step-number">4</div>
                  <div className="step-content">
                    <h4>Chỉnh Sửa</h4>
                    <p>Biên tập phù hợp yêu cầu</p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* 2. Có trách nhiệm */}
          <section className="principle-section responsibility">
            <div className="section-header">
              <div className="section-number">02</div>
              <div className="section-info">
                <CheckCircleOutlined className="section-icon" />
                <h2>Có Trách Nhiệm</h2>
              </div>
            </div>
            <div className="principle-cards">
              <div className="principle-card">
                <CheckCircleOutlined className="card-icon" />
                <p>
                  Tất cả thông tin do AI hỗ trợ đều được{" "}
                  <strong>kiểm chứng lại</strong> bằng giáo trình LLCT và các
                  văn bản, nghị quyết chính thống.
                </p>
              </div>
              <div className="principle-card">
                <CheckCircleOutlined className="card-icon" />
                <p>
                  Nhóm <strong>chịu trách nhiệm hoàn toàn</strong> về nội dung
                  cuối cùng, không để AI thay thế toàn bộ quá trình học tập và
                  nghiên cứu.
                </p>
              </div>
            </div>
          </section>

          {/* 3. Sáng tạo */}
          <section className="principle-section creativity">
            <div className="section-header">
              <div className="section-number">03</div>
              <div className="section-info">
                <BulbOutlined className="section-icon" />
                <h2>Sáng Tạo</h2>
              </div>
            </div>
            <div className="creativity-grid">
              <div className="creativity-item">
                <div className="creativity-icon">🎨</div>
                <h4>Ảnh Minh Họa</h4>
                <p>AI hỗ trợ tạo và chỉnh sửa hình ảnh phù hợp</p>
              </div>
              <div className="creativity-item">
                <div className="creativity-icon">🎮</div>
                <h4>Minigame</h4>
                <p>Tích hợp AI vào trò chơi ôn tập</p>
              </div>
              <div className="creativity-item">
                <div className="creativity-icon">💬</div>
                <h4>Chat AI</h4>
                <p>Trợ lý AI trả lời câu hỏi thông minh</p>
              </div>
              <div className="creativity-item">
                <div className="creativity-icon">🎨</div>
                <h4>Thiết Kế UI/UX</h4>
                <p>AI hỗ trợ thiết kế giao diện đẹp</p>
              </div>
            </div>
            <div className="creativity-note">
              <p>
                <strong>Lưu ý:</strong> Nội dung phân tích, dẫn chứng và lập
                luận học thuật được nhóm biên soạn dựa trên tài liệu chính
                thống.
              </p>
            </div>
          </section>

          {/* 4. Liêm chính học thuật */}
          <section className="principle-section integrity">
            <div className="section-header">
              <div className="section-number">04</div>
              <div className="section-info">
                <SafetyOutlined className="section-icon" />
                <h2>Liêm Chính Học Thuật</h2>
              </div>
            </div>
            <div className="integrity-boxes">
              <div className="integrity-box">
                <h4>Cam Kết</h4>
                <p>
                  Không để AI làm thay hoàn toàn, mà chỉ sử dụng như{" "}
                  <strong>công cụ hỗ trợ</strong>.
                </p>
              </div>
              <div className="integrity-box">
                <h4>Phân Định Rõ</h4>
                <p>
                  Các kết quả AI sinh ra đều được <strong>chú thích</strong> và
                  có phần chỉnh sửa, bổ sung bởi sinh viên.
                </p>
              </div>
              <div className="integrity-box">
                <h4>Đối Chiếu Nguồn</h4>
                <p>
                  Toàn bộ thông tin từ AI đều được{" "}
                  <strong>so sánh với tài liệu chính thống</strong>
                  trước khi đưa vào sản phẩm cuối cùng.
                </p>
              </div>
            </div>
          </section>

          {/* Conclusion */}
          <section className="conclusion-section">
            <div className="conclusion-card">
              <CheckCircleOutlined className="conclusion-icon" />
              <h2>Kết Luận</h2>
              <p>
                Việc sử dụng AI trong dự án này được thực hiện một cách{" "}
                <strong>minh bạch, có trách nhiệm và đạo đức</strong>. AI là
                công cụ hỗ trợ mạnh mẽ, nhưng
                <strong> con người vẫn là trung tâm</strong> của quá trình sáng
                tạo, phân tích và đảm bảo chất lượng học thuật.
              </p>
              <div className="conclusion-signature">
                <p>— Nhóm Sinh Viên Thực Hiện —</p>
              </div>
            </div>
          </section>
        </div>
      </main>

      {/* Footer */}
      <footer className="appendix-footer">
        <div className="footer-content">
          <div className="footer-line"></div>
          <p className="footer-text">
            © 2025 Phân Tích Chiến Lược Chính Trị Việt Nam
          </p>
        </div>
      </footer>
    </div>
  );
};

export default AIAppendix;
