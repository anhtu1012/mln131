import React from "react";
import { FaTimes } from "react-icons/fa";
import "./ImagePromptModal.scss";

export interface ImagePromptData {
  fileName: string;
  description: string;
  recommendedSize: string;
  suggestedContent: string[];
  quality: {
    resolution: string;
    format: string;
    size: string;
    quality: string;
  };
  style: {
    tone: string;
    lighting: string;
    composition: string;
    emotion: string;
  };
  src: string;
}

interface ImagePromptModalProps {
  isOpen: boolean;
  onClose: () => void;
  imageData: ImagePromptData | null;
}

const ImagePromptModal: React.FC<ImagePromptModalProps> = ({
  isOpen,
  onClose,
  imageData,
}) => {
  if (!isOpen || !imageData) {
    return null;
  }

  return (
    <div className="image-prompt-modal-overlay" onClick={onClose}>
      <div
        className="image-prompt-modal-content"
        onClick={(e) => e.stopPropagation()}
      >
        <button className="close-button" onClick={onClose}>
          <FaTimes />
        </button>
        <h2>Hình ảnh được tạo từ AI</h2>
        <div className="modal-body">
          <div className="image-preview">
            <img src={imageData.src} alt={imageData.fileName} />
          </div>
          <div className="image-details">
            <h3>
              <span
                style={{
                  fontFamily: "Roboto, sans-serif",
                  fontWeight: "bold",
                  fontSize: "1.2rem",
                }}
              >
                Yêu Cầu Gốc
              </span>
            </h3>
            <p>
              <strong>Tên file:</strong> {imageData.fileName}
            </p>
            <p>
              <strong>Mô tả:</strong> {imageData.description}
            </p>
            <p>
              <strong>Kích thước đề xuất:</strong> {imageData.recommendedSize}
            </p>
            <div>
              <strong>Nội dung gợi ý:</strong>
              <ul>
                {imageData.suggestedContent.map((item, index) => (
                  <li key={index}>{item}</li>
                ))}
              </ul>
            </div>
            <hr />
            <h3>
              <span
                style={{
                  fontFamily: "Roboto, sans-serif",
                  fontWeight: "bold",
                  fontSize: "1.2rem",
                }}
              >
                Yêu Cầu Chung
              </span>
            </h3>
            <p>
              <strong>Chất lượng:</strong> {imageData.quality.resolution},{" "}
              {imageData.quality.format}, {imageData.quality.size},{" "}
              {imageData.quality.quality}.
            </p>
            <p>
              <strong>Phong cách:</strong> Tông màu {imageData.style.tone}, ánh
              sáng {imageData.style.lighting}, bố cục{" "}
              {imageData.style.composition}, tạo cảm xúc{" "}
              {imageData.style.emotion}.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ImagePromptModal;
