import React, { useEffect, useState } from "react";
import "./Header.scss";

interface HeaderProps {
  onNavigate?: (sectionId: string) => void;
}

const Header: React.FC<HeaderProps> = ({ onNavigate }) => {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("");

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight =
        document.documentElement.scrollHeight - window.innerHeight;
      const progress = (scrollTop / docHeight) * 100;
      setScrollProgress(progress);
      setIsScrolled(scrollTop > 100);

      // Detect active section
      const sections = [
        "hero",
        "theory",
        "characteristics",
        "religion",
        "strategic",
        "gallery",
      ];
      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          if (rect.top <= 150 && rect.bottom >= 150) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (sectionId: string) => {
    // Special handling for gallery - navigate to exhibition page
    if (sectionId === "gallery") {
      window.location.href = "/exhibition";
      return;
    }

    // Special handling for game - navigate to game page
    if (sectionId === "game") {
      window.location.href = "/game";
      return;
    }

    const element = document.getElementById(sectionId);
    if (element) {
      const offset = 80;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });
    }
    if (onNavigate) {
      onNavigate(sectionId);
    }
  };

  const navItems = [
    { id: "hero", label: "Trang Chủ" },
    { id: "theory", label: "Lý Luận" },
    { id: "characteristics", label: "Chính Sách" },
    { id: "religion", label: "Tôn Giáo" },
    { id: "strategic", label: "Chiến Lược" },
    { id: "game", label: "Trò Chơi" },
  ];

  return (
    <header className={`landing-header ${isScrolled ? "scrolled" : ""}`}>
      <div className="header-container">
        <div className="header-brand">
          <div className="brand-icon">🇻🇳</div>
          <div className="brand-text">
            <span className="brand-title">Đại Đoàn Kết</span>
            <span className="brand-subtitle">Dân Tộc Việt Nam</span>
          </div>
        </div>

        <nav className="header-nav">
          {navItems.map((item) => (
            <button
              key={item.id}
              className={`nav-item ${
                activeSection === item.id ? "active" : ""
              }`}
              onClick={() => scrollToSection(item.id)}
            >
              {item.label}
            </button>
          ))}
        </nav>

        <div className="header-action">
          <button
            className="header-btn"
            onClick={() => scrollToSection("gallery")}
          >
            <span>Triển Lãm 3D</span>
            <span className="btn-icon">→</span>
          </button>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="scroll-progress-bar">
        <div
          className="progress-fill"
          style={{ width: `${scrollProgress}%` }}
        ></div>
      </div>
    </header>
  );
};

export default Header;
