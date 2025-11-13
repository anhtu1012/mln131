import { HomeOutlined, UserOutlined } from "@ant-design/icons";
import React from "react";
import { useNavigate } from "react-router-dom";
import "./index.scss";

const Contributors: React.FC = () => {
  const navigate = useNavigate();

  const contributors = [
    {
      name: "Phạm Anh Tú",
      role: "Lập trình Website & Thuyết trình",
      studentId: "SE170081",
    },
    {
      name: "Lê Đức Minh",
      role: "Lập trình Website & Thuyết trình",
      studentId: "SE181522",
    },
    {
      name: "Phan Hoàng Ngọc Hân",
      role: "Nội dung & Nghiên cứu",
      studentId: "SE184307",
    },
    {
      name: "Đoàn Mạnh Hiệp",
      role: "Hình ảnh & Nghiên cứu",
      studentId: "SE172486",
    },
  ];

  return (
    <div className="contributors-page">
      {/* Header */}
      <header className="contributors-header">
        <div className="header-content">
          <div className="header-left">
            <UserOutlined className="header-icon" />
            <h1>Người Đóng Góp</h1>
          </div>
          <button className="home-button" onClick={() => navigate("/")}>
            <HomeOutlined />
            <span>Trang Chủ</span>
          </button>
        </div>
      </header>

      {/* Main Content */}
      <main className="contributors-content">
        <div className="content-container">
          {/* Introduction */}
          <section className="intro-section">
            <div className="intro-card">
              <h2>Đội Ngũ Thực Hiện Dự Án</h2>
            </div>
          </section>

          {/* Contributors Grid */}
          <section className="contributors-grid">
            {contributors.map((contributor, index) => (
              <div key={index} className="contributor-card">
                <div className="card-header">
                  <div className="number-badge">{index + 1}</div>
                </div>
                <div className="card-body">
                  <h3 className="contributor-name">{contributor.name}</h3>
                  <p className="contributor-role">{contributor.role}</p>
                  <p className="student-id">MSSV: {contributor.studentId}</p>
                </div>
              </div>
            ))}
          </section>

          {/* Team Message */}
          <section className="team-message">
            <div className="message-card">
              <h2>Lời Cảm Ơn</h2>
              <p>
                Đây là một trải nghiệm học tập quý báu, giúp chúng em không chỉ
                nâng cao kiến thức chuyên môn mà còn rèn luyện kỹ năng làm việc
                nhóm và sử dụng công nghệ AI một cách có trách nhiệm.
              </p>
              <div className="team-signature">
                <p>— Nhóm Sinh Viên Thực Hiện —</p>
              </div>
            </div>
          </section>
        </div>
      </main>

      {/* Footer */}
      <footer className="contributors-footer">
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

export default Contributors;
