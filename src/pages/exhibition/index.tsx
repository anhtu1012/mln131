import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import CircularGallery from "../../components/CircularGallery/CircularGallery";
import DomeGallery from "../../components/DomeGallery/DomeGallery";
import { FaArrowLeft, FaImages, FaCube } from "react-icons/fa";
import "./index.scss";

export default function Exhibition() {
  const [mode, setMode] = useState<"dome" | "circular">("dome");
  const navigate = useNavigate();

  useEffect(() => {
    // Smooth scroll to top on mount
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  const ethnicImages = [
    {
      image: "/public/img/ethnic-unity-1.png",
      text: "Đại đoàn kết dân tộc",
    },
    {
      image: "/public/img/ethnic-tradition.png",
      text: "Truyền thống dân tộc",
    },
    {
      image: "/public/img/religious-harmony.png",
      text: "Hòa hợp tôn giáo",
    },
    {
      image: "/public/img/national-unity.png",
      text: "Đoàn kết quốc gia",
    },
  ];

  return (
    <div className="exhibition-page">
      {/* Header Controls */}
      <div className="exhibition-header">
        <button className="back-btn" onClick={() => navigate("/")}>
          <FaArrowLeft />
          <span>Trang Chủ</span>
        </button>

        <h1 className="exhibition-title">
          Phòng Triển Lãm Di Sản 3D
        </h1>

        <div className="mode-toggle">
          <button
            className={`mode-btn ${mode === "dome" ? "active" : ""}`}
            onClick={() => setMode("dome")}
          >
            <FaCube />
            <span>Dome</span>
          </button>
          <button
            className={`mode-btn ${mode === "circular" ? "active" : ""}`}
            onClick={() => setMode("circular")}
          >
            <FaImages />
            <span>Circular</span>
          </button>
        </div>
      </div>

      {/* Gallery Container */}
      <div className="gallery-container">
        {mode === "dome" ? (
          <div className="dome-wrapper">
            <DomeGallery
              fit={0.6}
              fitBasis="auto"
              minRadius={500}
              maxRadius={1200}
              dragSensitivity={15}
              enlargeTransitionMs={400}
              segments={35}
              dragDampening={2}
              openedImageWidth="600px"
              openedImageHeight="600px"
              imageBorderRadius="20px"
              openedImageBorderRadius="30px"
              grayscale={false}
            />
          </div>
        ) : (
          <div className="circular-wrapper">
            <CircularGallery
              items={ethnicImages}
              bend={3}
              textColor="#d4af37"
              borderRadius={0.08}
              font="bold 28px 'Playfair Display', serif"
              scrollSpeed={2.5}
              scrollEase={0.08}
            />
          </div>
        )}
      </div>

      {/* Instructions */}
      <div className="instructions">
        <div className="instruction-card">
          <h3>🖱️ Điều khiển</h3>
          <ul>
            <li><strong>Kéo chuột</strong>: Xoay phòng triển lãm</li>
            <li><strong>Click hình</strong>: Phóng to xem chi tiết</li>
            <li><strong>Scroll/Cuộn</strong>: Xem thêm hình ảnh</li>
            <li><strong>ESC</strong>: Đóng hình phóng to</li>
          </ul>
        </div>
      </div>
    </div>
  );
}

