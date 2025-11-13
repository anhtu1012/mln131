import AOS from "aos";
import "aos/dist/aos.css";
import { useEffect, useRef, useState } from "react";
import {
  FaBalanceScale,
  FaBan,
  FaBriefcase,
  FaChurch,
  FaCogs,
  FaDove,
  FaExclamationTriangle,
  FaFlag,
  FaHandshake,
  FaRobot,
  FaSearchPlus,
  FaShieldAlt,
  FaUsers,
  FaVoteYea,
} from "react-icons/fa";
import {
  GiFarmer,
  GiPoisonGas,
  GiTreeGrowth,
  GiWaterDrop,
} from "react-icons/gi";
import { MdHistory, MdSecurity } from "react-icons/md";
import Header from "../../components/Header/Header";
import ImagePromptModal, {
  ImagePromptData,
} from "../../components/ImagePromptModal/ImagePromptModal";
import "./index.scss";

function Landing() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isVideoLoaded, setIsVideoLoaded] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalData, setModalData] = useState<ImagePromptData | null>(null);

  const diSanImageData: ImagePromptData = {
    fileName: "ethnic-unity-1.jpg",
    description:
      "Hình ảnh biểu tượng về đoàn kết dân tộc, các dân tộc cùng nhau làm việc/sinh hoạt",
    recommendedSize: "1200x600px",
    suggestedContent: [
      "Các dân tộc anh em cùng nhau",
      "Cờ Việt Nam",
      "Biểu tượng đoàn kết",
    ],
    quality: {
      resolution: "1200x600px",
      format: "JPG hoặc PNG",
      size: "Tối ưu dưới 500KB mỗi ảnh",
      quality: "High quality, không bị mờ, nhoè",
    },
    style: {
      tone: "Ấm, trang trọng, phù hợp với theme nâu sẫm, đỏ đô, vàng đồng",
      lighting: "Ánh sáng bình minh/hoàng hôn được ưu tiên",
      composition: "Cân đối, có tầm nhìn rộng",
      emotion: "Trang trọng, hào hùng, đoàn kết",
    },
    src: "/img/di-san.jpg",
  };

  const ethnicTraditionImageData: ImagePromptData = {
    fileName: "ethnic-tradition.jpg",
    description:
      "Hình ảnh truyền thống văn hóa dân tộc, lễ hội, trang phục truyền thống",
    recommendedSize: "1200x600px",
    suggestedContent: [
      "Trang phục truyền thống các dân tộc",
      "Lễ hội văn hóa",
      "Làng bản miền núi",
    ],
    quality: {
      resolution: "1200x600px",
      format: "JPG hoặc PNG",
      size: "Tối ưu dưới 500KB mỗi ảnh",
      quality: "High quality, không bị mờ, nhoè",
    },
    style: {
      tone: "Ấm, trang trọng, phù hợp với theme nâu sẫm, đỏ đô, vàng đồng",
      lighting: "Ánh sáng bình minh/hoàng hôn được ưu tiên",
      composition: "Cân đối, có tầm nhìn rộng",
      emotion: "Trang trọng, hào hùng, đoàn kết",
    },
    src: "/img/ethnic-tradition.png",
  };

  const nationalUnityImageData: ImagePromptData = {
    fileName: "national-unity.jpg",
    description: "Hình ảnh về đoàn kết quốc gia, sức mạnh tổng hợp",
    recommendedSize: "1200x600px",
    suggestedContent: [
      "Quốc kỳ Việt Nam",
      "Biểu tượng sức mạnh quốc gia",
      "Các hoạt động quốc phòng, an ninh",
    ],
    quality: {
      resolution: "1200x600px",
      format: "JPG hoặc PNG",
      size: "Tối ưu dưới 500KB mỗi ảnh",
      quality: "High quality, không bị mờ, nhoè",
    },
    style: {
      tone: "Ấm, trang trọng, phù hợp với theme nâu sẫm, đỏ đô, vàng đồng",
      lighting: "Ánh sáng bình minh/hoàng hôn được ưu tiên",
      composition: "Cân đối, có tầm nhìn rộng",
      emotion: "Trang trọng, hào hùng, đoàn kết",
    },
    src: "/img/national-unity.jpg",
  };

  const openModal = (data: ImagePromptData) => {
    setModalData(data);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setModalData(null);
  };

  useEffect(() => {
    // Initialize AOS
    AOS.init({
      duration: 1000,
      easing: "ease-out-cubic",
      once: true,
      offset: 100,
    });

    if (videoRef.current) {
      videoRef.current.play().catch((error) => {
        console.log("Video autoplay failed:", error);
      });
    }
  }, []);

  const handleVideoLoad = () => {
    setIsVideoLoaded(true);
  };

  const handleVideoError = () => {
    console.log("Video not found, using fallback styling");
    setIsVideoLoaded(true);
  };

  const scrollToContent = () => {
    document
      .getElementById("content-section")
      ?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="landing-page">
      {/* Header with Scroll Progress */}
      <Header />

      {/* Hero Section với Video Background */}
      <section id="hero" className="hero-section">
        <div className="video-container">
          <video
            ref={videoRef}
            className={`hero-video ${isVideoLoaded ? "loaded" : ""}`}
            autoPlay
            muted
            loop
            playsInline
            onLoadedData={handleVideoLoad}
            onError={handleVideoError}
          >
            <source src="/vietnam-landscape2.mp4" type="video/mp4" />
          </video>
          {/* Fallback gradient nếu video không load được */}
          <div className="fallback-background"></div>
          <div className="video-overlay"></div>
        </div>

        <div className="hero-content">
          <div className="hero-text">
            <h1 className="hero-title">
              <span className="title-line-1">Đại Đoàn Kết</span>
              <span className="title-line-2">Tầm Nhìn Chiến Lược</span>
            </h1>
            <p className="hero-subtitle">
              Phân tích chiều sâu về Dân tộc và Tôn giáo trong bối cảnh mới
            </p>
            <button className="cta-button" onClick={scrollToContent}>
              <span className="cta-text">Khám Phá</span>
              <span className="cta-arrow">→</span>
            </button>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="scroll-indicator">
          <div className="scroll-line"></div>
          <span className="scroll-text">Cuộn xuống</span>
        </div>
      </section>

      {/* Content Section */}
      <section id="content-section" className="content-section">
        <div className="content-container">
          <div className="section-intro" data-aos="fade-up">
            <h2 className="section-title">Chiến Lược Đoàn Kết Dân Tộc</h2>
            <div className="title-divider"></div>
            <p className="section-description">
              Trong bối cảnh toàn cầu hóa và hội nhập quốc tế ngày càng sâu
              rộng, việc xây dựng khối đại đoàn kết toàn dân tộc trở thành nhiệm
              vụ chiến lược hàng đầu. Đây không chỉ là nền tảng vững chắc cho sự
              phát triển bền vững mà còn là nguồn lực nội sinh quan trọng nhất
              của đất nước.
            </p>
          </div>

          {/* Phần I: Nền tảng lý luận */}
          <div id="theory" className="theory-section">
            <div className="section-header" data-aos="fade-right">
              <span className="section-number">I</span>
              <h2 className="section-heading">
                Nền Tảng Lý Luận Về Vấn Đề Dân Tộc
              </h2>
            </div>

            <div className="theory-content">
              {/* Decorative Quote */}
              <div className="decorative-quote" data-aos="fade-up">
                <div className="quote-ornament left"></div>
                <p className="quote-text">
                  Để hiểu rõ chính sách dân tộc, cần nắm vững quan điểm của Chủ
                  nghĩa Mác – Lênin về sự phát triển của quan hệ dân tộc.
                </p>
                <div className="quote-ornament right"></div>
              </div>

              {/* Visual Separator */}
              <div className="visual-separator" data-aos="zoom-in">
                <div className="separator-line"></div>
                <div className="separator-icon">
                  <MdHistory />
                </div>
                <div className="separator-line"></div>
              </div>

              <div className="dual-tendency">
                <h3 className="subsection-title" data-aos="fade-up">
                  Hai Xu Hướng Khách Quan
                </h3>
                <div className="tendency-grid">
                  <div
                    className="tendency-card"
                    data-aos="fade-up"
                    data-aos-delay="100"
                  >
                    <div className="tendency-number">01</div>
                    <h4 className="tendency-title">Xu Hướng Tách Ra</h4>
                    <p className="tendency-desc">
                      Các cộng đồng dân cư muốn tách ra để hình thành cộng đồng
                      dân tộc độc lập. Xu hướng này phản ánh nhu cầu tự quyết,
                      tự chủ của mỗi dân tộc.
                    </p>
                  </div>
                  <div
                    className="tendency-card"
                    data-aos="fade-up"
                    data-aos-delay="200"
                  >
                    <div className="tendency-number">02</div>
                    <h4 className="tendency-title">Xu Hướng Liên Hiệp</h4>
                    <p className="tendency-desc">
                      Các dân tộc trong từng quốc gia muốn liên hiệp lại với
                      nhau. Xu hướng này phản ánh nhu cầu hợp tác, hội nhập, đặc
                      biệt trong bối cảnh kinh tế phát triển.
                    </p>
                  </div>
                </div>
              </div>

              {/* Enhanced Image with Frame */}
              <div className="content-image-split" data-aos="fade-up">
                <div className="content-side">
                  <div className="side-ornament"></div>
                  <h3
                    className="subsection-title"
                    style={{ textAlign: "left" }}
                  >
                    Di Sản <span className="title-accent">Đoàn Kết</span>
                  </h3>
                  <p
                    style={{
                      fontSize: "1.1rem",
                      lineHeight: "1.8",
                      color: "#f5f0e8",
                    }}
                  >
                    Truyền thống đoàn kết dân tộc là di sản quý báu của dân tộc
                    Việt Nam, được hình thành và phát triển qua hàng ngàn năm
                    lịch sử dựng nước và giữ nước.
                  </p>
                  <p
                    style={{
                      fontSize: "1rem",
                      lineHeight: "1.8",
                      color: "rgba(245, 240, 232, 0.8)",
                      marginTop: "1rem",
                    }}
                  >
                    Khối đại đoàn kết toàn dân tộc là nguồn sức mạnh to lớn, là
                    nền tảng vững chắc cho mọi thắng lợi của cách mạng Việt Nam.
                  </p>
                  <ul
                    style={{
                      fontSize: "1.1rem",
                      lineHeight: "1.8",
                      color: "#f5f0e8",
                      marginTop: "1rem",
                    }}
                  >
                    Vai trò và Biểu hiện của Đại Đoàn Kết:
                    <li
                      style={{
                        fontSize: "1.1rem",
                        lineHeight: "1.8",
                        color: "rgba(245, 240, 232, 0.8)",
                        marginTop: "0.5rem",
                      }}
                    >
                      Sức mạnh này là sự thống nhất ý chí và hành động, liên kết
                      mọi giai tầng, mọi dân tộc anh em, và hòa quyện giữa người
                      Việt Nam trong nước với kiều bào ở nước ngoài. Trong thời
                      kỳ đổi mới và hội nhập, đoàn kết không chỉ giúp đất nước
                      vượt qua thách thức, giữ vững độc lập mà còn là nguồn động
                      lực to lớn thúc đẩy sự đồng thuận xã hội, sáng tạo và phát
                      triển bền vững. Việc phát huy sức mạnh khối đại đoàn kết
                      toàn dân tộc luôn được Đảng và Nhà nước xác định là đường
                      lối chiến lược và nhiệm vụ hàng đầu.
                    </li>
                  </ul>
                </div>
                <div className="image-side">
                  <div className="image-frame">
                    <img
                      src="/img/di-san.jpg"
                      alt="Đoàn kết dân tộc"
                      onClick={() => openModal(diSanImageData)}
                      style={{ cursor: "pointer" }}
                      onError={(e) => {
                        e.currentTarget.style.display = "none";
                      }}
                    />
                  </div>
                </div>
              </div>

              <div className="principles-section">
                <h3 className="subsection-title" data-aos="fade-up">
                  Cương Lĩnh Dân Tộc của{" "}
                  <span style={{ fontWeight: "bold" }}>
                    V.I. Lênin (Vladimir Ilyich Lenin)
                  </span>
                </h3>
                <div className="principles-list">
                  <div
                    className="principle-item"
                    data-aos="fade-left"
                    data-aos-delay="100"
                  >
                    <div className="principle-icon">
                      <FaBalanceScale />
                    </div>
                    <div className="principle-content">
                      <h4>Các dân tộc hoàn toàn bình đẳng</h4>
                      <p style={{ fontSize: "1.1rem" }}>
                        <span style={{ fontWeight: "bold" }}>
                          Xóa bỏ mọi hình thức áp bức, bóc lột và đặc quyền giữa
                          các dân tộc
                        </span>
                        . Không phân biệt, đối xử công bằng với mọi dân tộc
                      </p>
                    </div>
                  </div>
                  <div
                    className="principle-item"
                    data-aos="fade-left"
                    data-aos-delay="200"
                  >
                    <div className="principle-icon">
                      <FaVoteYea />
                    </div>
                    <div className="principle-content">
                      <h4>Các dân tộc được quyền tự quyết</h4>
                      <p style={{ fontSize: "1.1rem" }}>
                        Mỗi dân tộc được{" "}
                        <span style={{ fontWeight: "bold" }}>
                          tự lựa chọn con đường phát triển của mình
                        </span>
                        , bao gồm quyền tách ra thành một quốc gia độc lập hoặc
                        tự nguyện liên hiệp với các dân tộc khác.
                      </p>
                    </div>
                  </div>
                  <div
                    className="principle-item"
                    data-aos="fade-left"
                    data-aos-delay="300"
                  >
                    <div className="principle-icon">
                      <FaHandshake />
                    </div>
                    <div className="principle-content">
                      <h4>Liên hiệp công nhân tất cả các dân tộc</h4>
                      <p style={{ fontSize: "1.1rem" }}>
                        Nhấn mạnh sự{" "}
                        <span style={{ fontWeight: "bold" }}>
                          đoàn kết giai cấp
                        </span>{" "}
                        giữa những người lao động (công nhân, nông dân) thuộc
                        mọi dân tộc. Là cơ sở để hình thành{" "}
                        <span style={{ fontWeight: "bold" }}>
                          khối đại đoàn kết toàn dân tộc
                        </span>{" "}
                        vững mạnh
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Phần II: Đặc điểm và Chính sách */}
          <div id="characteristics" className="characteristics-section">
            <div className="section-header" data-aos="fade-right">
              <span className="section-number">II</span>
              <h2 className="section-heading">
                Đặc điểm Dân tộc và Chính sách Chiến lược của Đảng và Nhà nước
                Việt Nam
              </h2>
            </div>

            <div className="characteristics-grid">
              <div
                className="char-card"
                data-aos="flip-left"
                data-aos-delay="100"
              >
                <div className="char-number">01</div>
                <h4 className="char-title">Cư Trú Xen Kẽ</h4>
                <p className="char-desc">
                  Các dân tộc thiểu số cư trú xen kẽ nhau, chủ yếu phân bố ở địa
                  bàn có chiến lược quan trọng. Điều này làm cho vấn đề dân tộc
                  không chỉ là vấn đề xã hội mà còn là vấn đề an ninh - quốc
                  phòng.
                </p>
              </div>
              <div
                className="char-card"
                data-aos="flip-left"
                data-aos-delay="200"
              >
                <div className="char-number">02</div>
                <h4 className="char-title">Phát Triển Không Đồng Đều</h4>
                <p className="char-desc">
                  Thách thức lớn nhất trong thời kỳ quá độ. Sự chênh lệch về
                  trình độ phát triển kinh tế - xã hội giữa các dân tộc có thể
                  là nguyên nhân tiềm ẩn gây mất ổn định nếu không được giải
                  quyết thỏa đáng.
                </p>
              </div>
              <div
                className="char-card"
                data-aos="flip-left"
                data-aos-delay="300"
              >
                <div className="char-number">03</div>
                <h4 className="char-title">Truyền Thống Đoàn Kết</h4>
                <p className="char-desc">
                  Các dân tộc Việt Nam có truyền thống đoàn kết gắn bó lâu đời
                  trong cộng đồng dân tộc - quốc gia thống nhất. Đặc điểm này là
                  nền tảng vững chắc để thực hiện chính sách đại đoàn kết dân
                  tộc.
                </p>
              </div>
              <div
                className="char-card"
                data-aos="flip-left"
                data-aos-delay="100"
              >
                <div className="char-number">04</div>
                <h4 className="char-title">Đa Dạng về Bản sắc và Văn hóa</h4>
                <p className="char-desc">
                  Việt Nam là một quốc gia đa dân tộc với 54 dân tộc anh em. Sự
                  đa dạng này tạo nên sức sống và sự phong phú cho văn hóa Việt
                  Nam, nhưng đồng thời đòi hỏi phải có chính sách tôn trọng, bảo
                  tồn và phát huy bản sắc văn hóa của từng dân tộc
                </p>
              </div>
              <div
                className="char-card"
                data-aos="flip-left"
                data-aos-delay="200"
              >
                <div className="char-number">05</div>
                <h4 className="char-title">
                  Sớm hình thành và gắn bó trong một quốc gia thống nhất (Quốc
                  gia - Dân tộc)
                </h4>
                <p className="char-desc">
                  Quá trình hình thành các dân tộc ở Việt Nam gắn liền với quá
                  trình dựng nước và giữ nước chung, tạo nên một cộng đồng quốc
                  gia - dân tộc thống nhất từ rất sớm. Tính thống nhất lâu đời
                  này đã tạo nên ý thức "người Việt Nam" mạnh mẽ và là cơ sở
                  vững chắc để xây dựng và củng cố khối Đại đoàn kết toàn dân
                  tộc, vượt qua mọi âm mưu chia rẽ.
                </p>
              </div>
            </div>

            <div className="image-divider" data-aos="zoom-in">
              <img
                src="/img/ethnic-tradition.png"
                alt="Truyền thống dân tộc"
                className="section-image"
                onClick={() => openModal(ethnicTraditionImageData)}
                style={{ cursor: "pointer" }}
                onError={(e) => {
                  e.currentTarget.style.display = "none";
                }}
              />
            </div>

            <div className="policy-direction">
              <h3 className="subsection-title" data-aos="fade-up">
                Định hướng Chiến lược của Đảng và Nhà nước Việt Nam
              </h3>
              <div className="direction-grid">
                <div
                  className="direction-item"
                  data-aos="fade-up"
                  data-aos-delay="100"
                >
                  <div className="direction-icon">
                    <FaBriefcase />
                  </div>
                  <h4>Kinh Tế</h4>
                  <p>
                    Ưu tiên đầu tư phát triển kinh tế - xã hội các vùng dân tộc
                    và miền núi. Thực hiện các chính sách phát triển kinh tế -
                    xã hội miền núi, vùng đồng bào các dân tộc thiểu số.
                  </p>
                </div>
                <div
                  className="direction-item"
                  data-aos="fade-up"
                  data-aos-delay="200"
                >
                  <div className="direction-icon">
                    <FaShieldAlt />
                  </div>
                  <h4>An Ninh - Quốc Phòng</h4>
                  <p>
                    Tăng cường sức mạnh bảo vệ Tổ quốc trên cơ sở đảm bảo ổn
                    định chính trị, thực hiện tốt an ninh chính trị, trật tự an
                    toàn xã hội.
                  </p>
                </div>
                <div
                  className="direction-item"
                  data-aos="fade-up"
                  data-aos-delay="300"
                >
                  <div className="direction-icon">
                    <FaCogs />
                  </div>
                  <h4>Hệ Thống Chính Trị</h4>
                  <p>
                    Công tác dân tộc là nhiệm vụ của toàn Đảng, toàn dân, toàn
                    quân, của các cấp, các ngành và toàn bộ hệ thống chính trị.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Phần III: Tôn giáo */}
          <div id="religion" className="religion-section">
            <div className="section-header" data-aos="fade-right">
              <span className="section-number">III</span>
              <h2 className="section-heading">
                Tôn giáo và Chính sách Tôn giáo của Đảng và Nhà nước Việt Nam.
              </h2>
            </div>

            <div className="religion-content">
              <div className="religion-nature">
                <h3 className="subsection-title" data-aos="fade-up">
                  Bản chất Tôn giáo
                </h3>
                <div className="nature-boxes">
                  <div
                    className="nature-box"
                    data-aos="zoom-in"
                    data-aos-delay="100"
                  >
                    <div className="nature-label">Tính Lịch Sử</div>
                    <p style={{ fontSize: "1.1rem" }}>
                      Đòi hỏi phải có cách tiếp cận{" "}
                      <span style={{ fontWeight: "bold" }}>
                        khách quan, toàn diện
                      </span>{" "}
                      đối với sự tồn tại và phát triển của tôn giáo qua các thời
                      kỳ
                    </p>
                  </div>
                  <div
                    className="nature-box"
                    data-aos="zoom-in"
                    data-aos-delay="200"
                  >
                    <div className="nature-label">Tính Quần Chúng</div>
                    <p style={{ fontSize: "1.1rem" }}>
                      Nhấn mạnh tôn giáo là vấn đề thuộc về đời sống tinh thần
                      của hàng triệu người dân, cần phải{" "}
                      <span style={{ fontWeight: "bold" }}>
                        tôn trọng quyền tự do tín ngưỡng
                      </span>{" "}
                      của họ.
                    </p>
                  </div>
                  <div
                    className="nature-box"
                    data-aos="zoom-in"
                    data-aos-delay="300"
                  >
                    <div className="nature-label">Tính Chính Trị</div>
                    <p style={{ fontSize: "1.1rem" }}>
                      Là sự cảnh báo về việc các thế lực thù địch có thể lợi
                      dụng tôn giáo để chống phá, gây chia rẽ khối đại đoàn kết
                      dân tộc và Nhà nước, do đó cần phải{" "}
                      <span style={{ fontWeight: "bold" }}>
                        quản lý và bảo vệ
                      </span>{" "}
                      an ninh quốc gia.
                    </p>
                  </div>
                </div>
              </div>

              <div className="image-divider" data-aos="zoom-in">
                <img
                  src="https://static-images.vnncdn.net/vps_images_publish/000001/000003/2025/7/31/viet-nam-co-16-ton-giao-gan-28-trieu-tin-do-593.jpg?width=0&s=s8zNZ3q9daLRzBOyXL592w"
                  alt="Hòa hợp tôn giáo"
                  className="section-image"
                  onError={(e) => {
                    e.currentTarget.style.display = "none";
                  }}
                />
              </div>

              {/* Enhanced Stats Grid */}
              <div className="stats-grid-enhanced">
                <div
                  className="stat-card"
                  data-aos="flip-up"
                  data-aos-delay="100"
                >
                  <div className="stat-icon">
                    <FaChurch />
                  </div>
                  <div className="stat-number">16</div>
                  <div className="stat-label">Tôn giáo</div>
                  <div className="stat-description">
                    Tôn giáo được công nhận và bảo vệ bởi Nhà nước
                  </div>
                  <a
                    className="stat-label"
                    href="https://thuvienphapluat.vn/chinh-sach-phap-luat-moi/vn/ho-tro-phap-luat/tu-van-phap-luat/84306/danh-sach-16-ton-giao-va-36-to-chuc-ton-giao-duoc-cong-nhan-tai-viet-nam-hien-nay-cong-van-6955"
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      display: "flex",
                      justifyContent: "center",
                      color: "#fff",
                      marginTop: "0.5rem",
                    }}
                  >
                    Nguồn
                  </a>
                </div>
                <div
                  className="stat-card"
                  data-aos="flip-up"
                  data-aos-delay="200"
                >
                  <div className="stat-icon">
                    <FaUsers />
                  </div>
                  <div className="stat-number">Trên 27 triệu</div>
                  <div className="stat-label">Tín đồ</div>
                  <div className="stat-description">
                    Tín đồ các tôn giáo trên toàn quốc
                  </div>
                  <a
                    className="stat-label"
                    href="https://dangcongsan.org.vn/uybandantoc/tin-tuc-hoat-dong/viet-nam-co-16-ton-giao-gan-28-trieu-tin-do.html"
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      display: "flex",
                      justifyContent: "center",
                      color: "#fff",
                      marginTop: "0.5rem",
                    }}
                  >
                    Nguồn
                  </a>
                </div>
                <div
                  className="stat-card"
                  data-aos="flip-up"
                  data-aos-delay="300"
                >
                  <div className="stat-icon">
                    <FaFlag />
                  </div>
                  <div className="stat-number">54</div>
                  <div className="stat-label">Dân tộc</div>
                  <div className="stat-description">
                    Dân tộc anh em cùng chung sống hòa bình
                  </div>
                  <a
                    className="stat-label"
                    href="https://chinhphu.vn/dan-toc/danh-sach-cac-dan-toc-viet-nam-10000494?gidzl=8nKcTIQ-qqed3I1o8QFGJo0CAt8ueunBRrny9M6aYXvXNIbpDFdQ7Je0Bd0xh8yTRmLxAcGsdS8F9B3IIW"
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      display: "flex",
                      justifyContent: "center",
                      color: "#fff",
                      marginTop: "0.5rem",
                    }}
                  >
                    Nguồn
                  </a>
                </div>
              </div>

              <div className="religion-principles">
                <h3 className="subsection-title" data-aos="fade-up">
                  Nguyên Tắc Giải Quyết
                </h3>
                <div className="principle-cards">
                  <div
                    className="reli-principle-card"
                    data-aos="fade-up"
                    data-aos-delay="100"
                  >
                    <div className="reli-icon">
                      <FaDove />
                    </div>
                    <h4>Tôn Trọng Tự Do</h4>
                    <li
                      style={{
                        textAlign: "left",
                        fontSize: "1.1rem",
                        marginBottom: "0.5rem",
                      }}
                    >
                      <span style={{ fontWeight: "bold" }}>
                        Bảo vệ Quyền Hiến định
                      </span>
                      : Quyền tự do tín ngưỡng đã được Hiến pháp và Luật pháp
                      Việt Nam bảo đảm. Nhà nước bảo hộ các tổ chức tôn giáo hợp
                      pháp.
                    </li>
                    <li
                      style={{
                        textAlign: "left",
                        fontSize: "1.1rem",
                        marginBottom: "0.5rem",
                      }}
                    >
                      <span style={{ fontWeight: "bold" }}>Không Ép buộc</span>:
                      Tuyệt đối không được cưỡng bức ai theo hoặc không theo bất
                      kỳ tôn giáo nào.
                    </li>
                    <li
                      style={{
                        textAlign: "left",
                        fontSize: "1.1rem",
                        marginBottom: "0.5rem",
                      }}
                    >
                      <span style={{ fontWeight: "bold" }}>
                        Bình đẳng Pháp luật
                      </span>
                      : Mọi công dân, có hay không có tín ngưỡng, đều bình đẳng
                      trước pháp luật, được hưởng quyền và thực hiện nghĩa vụ
                      như nhau.
                    </li>
                    <li
                      style={{
                        textAlign: "left",
                        fontSize: "1.1rem",
                        marginBottom: "0.5rem",
                      }}
                    >
                      <span style={{ fontWeight: "bold" }}>
                        Tôn trọng Giới hạn
                      </span>
                      : Quyền tự do phải đi đôi với trách nhiệm tuân thủ pháp
                      luật, không được xâm phạm an ninh quốc gia và trật tự công
                      cộng.
                    </li>
                  </div>
                  <div
                    className="reli-principle-card"
                    data-aos="fade-up"
                    data-aos-delay="200"
                  >
                    <div className="reli-icon">
                      <FaSearchPlus />
                    </div>
                    <h4>Phân Biệt Hai Mặt</h4>
                    <li
                      style={{
                        textAlign: "left",
                        fontSize: "1.1rem",
                        marginBottom: "0.5rem",
                      }}
                    >
                      <span style={{ fontWeight: "bold" }}>
                        Phát huy "Tốt đời đẹp đạo"
                      </span>
                      : Khuyến khích giá trị đạo đức, văn hóa của tôn giáo và
                      tinh thần Phụng sự Tổ quốc trong khối Đại đoàn kết.
                    </li>
                    <li
                      style={{
                        textAlign: "left",
                        fontSize: "1.1rem",
                        marginBottom: "0.5rem",
                      }}
                    >
                      <span style={{ fontWeight: "bold" }}>
                        Đấu tranh Chống Lợi dụng
                      </span>
                      : Kiên quyết đấu tranh chống lại mọi âm mưu của thế lực
                      thù địch lợi dụng tôn giáo để chống phá chế độ, gây chia
                      rẽ dân tộc hoặc truyền bá mê tín.
                    </li>
                    <li
                      style={{
                        textAlign: "left",
                        fontSize: "1.1rem",
                        marginBottom: "0.5rem",
                      }}
                    >
                      <span style={{ fontWeight: "bold" }}>
                        {" "}
                        Phân Biệt Đối tượng
                      </span>
                      : Phân biệt rõ ràng giữa chúng tín đồ chân thành với các
                      phần tử cầm đầu, cực đoan lợi dụng tôn giáo vì mục đích
                      chính trị thù địch.
                    </li>
                    <li
                      style={{
                        textAlign: "left",
                        fontSize: "1.1rem",
                        marginBottom: "0.5rem",
                      }}
                    >
                      <span style={{ fontWeight: "bold" }}> Hai Biện Pháp</span>
                      : Kết hợp biện pháp kinh tế - xã hội (giải quyết căn
                      nguyên) và biện pháp an ninh - pháp luật (xử lý vi phạm).
                    </li>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Phần IV: Mối quan hệ chiến lược */}
          <div id="strategic" className="strategic-section">
            <div className="section-header" data-aos="fade-right">
              <span className="section-number">IV</span>
              <h2 className="section-heading">
                Mối Quan hệ Chiến lược và Công tác Đấu tranh của Đảng và Nhà
                nước Việt Nam
              </h2>
            </div>

            <div className="strategic-content">
              <div className="framework-box" data-aos="fade-up">
                <h3 className="framework-title">
                  Khuôn Khổ Quốc Gia - Dân Tộc XHCN
                </h3>
                <div className="framework-points">
                  <div className="framework-point">
                    <span className="point-marker">▸</span>
                    <p>
                      Quan hệ dân tộc và tôn giáo được thiết lập trên cơ sở cộng
                      đồng quốc gia - dân tộc thống nhất
                    </p>
                  </div>
                  <div className="framework-point">
                    <span className="point-marker">▸</span>
                    <p>
                      Giải quyết vấn đề tôn giáo trên cơ sở vấn đề dân tộc, ưu
                      tiên lợi ích quốc gia - dân tộc
                    </p>
                  </div>
                  <div className="framework-point">
                    <span className="point-marker">▸</span>
                    <p>
                      Tuyệt đối không được lợi dụng vấn đề tôn giáo đòi ly khai
                      dân tộc
                    </p>
                  </div>
                  <div className="framework-point">
                    <span className="point-marker">▸</span>
                    <p>
                      Nguyên tắc "Tốt đời đẹp đạo": Khuyến khích đồng bào các
                      tôn giáo thực hiện tốt nghĩa vụ công dân, gắn bó giữa
                      Phụng sự Thiên Chúa/Phật với Phụng sự Tổ quốc, xây dựng
                      khối đại đoàn kết.
                    </p>
                  </div>
                  <div className="framework-point">
                    <span className="point-marker">▸</span>
                    <p>
                      Vị trí của Đảng và Nhà nước: Đảng và Nhà nước Việt Nam giữ
                      vai trò là người bảo vệ quyền lợi hợp pháp của các tôn
                      giáo và dân tộc, đồng thời là lực lượng duy trì sự thống
                      nhất và ổn định của đất nước trên nền tảng xã hội chủ
                      nghĩa.
                    </p>
                  </div>
                </div>
              </div>

              <div className="image-divider" data-aos="zoom-in">
                <img
                  src="/img/national-unity.jpg"
                  alt="Đoàn kết quốc gia"
                  className="section-image"
                  onClick={() => openModal(nationalUnityImageData)}
                  style={{ cursor: "pointer" }}
                  onError={(e) => {
                    e.currentTarget.style.display = "none";
                  }}
                />
              </div>

              <div className="challenges-section">
                <h3 className="subsection-title" data-aos="fade-up">
                  Thách Thức và Đấu Tranh
                </h3>
                <div className="challenge-timeline">
                  <div
                    className="timeline-item"
                    data-aos="fade-right"
                    data-aos-delay="100"
                  >
                    <div className="timeline-marker">
                      <FaExclamationTriangle />
                    </div>
                    <div className="timeline-content">
                      <h4>Hiện Tượng Tôn Giáo Mới</h4>
                      <p>
                        Xuất hiện các tổ chức đội lốt tôn giáo (như Tin Lành Đề
                        Ga, Hà Mòn ở Tây Nguyên) có tính chất mê tín, lợi dụng
                        niềm tin để tuyên truyền nội dung gây hoang mang.
                      </p>
                    </div>
                  </div>
                  <div
                    className="timeline-item"
                    data-aos="fade-right"
                    data-aos-delay="200"
                  >
                    <div className="timeline-marker">
                      <MdSecurity />
                    </div>
                    <div className="timeline-content">
                      <h4>Vạch Trần Âm Mưu</h4>
                      <p>
                        Chủ động vạch trần những âm mưu thâm độc của các thế lực
                        thù địch lợi dụng vấn đề dân tộc và tôn giáo.
                      </p>
                    </div>
                  </div>
                  <div
                    className="timeline-item"
                    data-aos="fade-right"
                    data-aos-delay="300"
                  >
                    <div className="timeline-marker">
                      <FaBalanceScale />
                    </div>
                    <div className="timeline-content">
                      <h4>Xử Lý Vi Phạm</h4>
                      <p>
                        Kiên quyết đấu tranh, xử lý các tổ chức, đối tượng có
                        hoạt động vi phạm pháp luật, truyền đạo trái phép, kích
                        động chia rẽ.
                      </p>
                    </div>
                  </div>
                  <div
                    className="timeline-item"
                    data-aos="fade-right"
                    data-aos-delay="400"
                  >
                    <div className="timeline-marker">
                      <FaBan />
                    </div>
                    <div className="timeline-content">
                      <h4>Nghiêm Cấm Truyền Đạo Trái Phép</h4>
                      <p>
                        Không được lợi dụng tôn giáo tuyên truyền tà đạo, hoạt
                        động mê tín dị đoan, hoặc ép buộc người dân theo đạo.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Phần V: Phòng Triển Lãm */}
          <div id="gallery" className="gallery-section">
            <div className="section-header" data-aos="fade-right">
              <span className="section-number">V</span>
              <h2 className="section-heading">
                Phòng Triển Lãm Di Sản Dân Tộc
              </h2>
            </div>

            <div className="gallery-intro" data-aos="fade-up">
              <p>
                Khám phá vẻ đẹp đa dạng của 54 dân tộc anh em Việt Nam qua những
                hình ảnh quý giá, lưu giữ giá trị văn hóa truyền thống và tinh
                thần đại đoàn kết của dân tộc.
              </p>
            </div>

            <div className="gallery-grid">
              <div
                className="gallery-item large"
                data-aos="zoom-in"
                data-aos-delay="100"
              >
                <div className="gallery-image">
                  <img
                    src="https://i.pinimg.com/736x/2d/47/ad/2d47ad1aa4fb9b282969af9a885034fb.jpg"
                    alt="Đại đoàn kết dân tộc"
                    onError={(e) => {
                      e.currentTarget.style.display = "none";
                    }}
                  />
                  <div className="gallery-overlay">
                    <div className="gallery-content">
                      <h3>Đại Đoàn Kết</h3>
                      <p>Sức mạnh của khối đoàn kết toàn dân tộc</p>
                    </div>
                  </div>
                </div>
              </div>

              <div
                className="gallery-item"
                data-aos="zoom-in"
                data-aos-delay="200"
              >
                <div className="gallery-image">
                  <img
                    src="https://media.vietnamplus.vn/images/7255a701687d11cb8c6bbc58a6c807853349e6cb1d130fba942a5c56d4853d68bcbe0201a565ccb8662e874cb4bf1f1f8c2c4310d3448c011c336eefa1939cda9bba9a527646b1e8a789196fa419ce529b4f6194d8ce7a05b5b4f7e86a4434e7/nghi-le-van-hoa-truyen-thong-cua-cong-dong-dan-toc-2294.jpg"
                    alt="Truyền thống dân tộc"
                    onError={(e) => {
                      e.currentTarget.style.display = "none";
                    }}
                  />
                  <div className="gallery-overlay">
                    <div className="gallery-content">
                      <h3>Truyền Thống</h3>
                      <p>Văn hóa đặc sắc của các dân tộc</p>
                    </div>
                  </div>
                </div>
              </div>

              <div
                className="gallery-item"
                data-aos="zoom-in"
                data-aos-delay="300"
              >
                <div className="gallery-image">
                  <img
                    src="https://static-images.vnncdn.net/vps_images_publish/000001/000003/2025/7/31/viet-nam-co-16-ton-giao-gan-28-trieu-tin-do-593.jpg?width=0&s=s8zNZ3q9daLRzBOyXL592w"
                    alt="Hòa hợp tôn giáo"
                    onError={(e) => {
                      e.currentTarget.style.display = "none";
                    }}
                  />
                  <div className="gallery-overlay">
                    <div className="gallery-content">
                      <h3>Hòa Hợp</h3>
                      <p>Tôn giáo cùng tồn tại hòa bình</p>
                    </div>
                  </div>
                </div>
              </div>

              <div
                className="gallery-item"
                data-aos="zoom-in"
                data-aos-delay="400"
              >
                <div className="gallery-image">
                  <img
                    src="/img/national-unity.jpg"
                    alt="Đoàn kết quốc gia"
                    onError={(e) => {
                      e.currentTarget.style.display = "none";
                    }}
                  />
                  <div className="gallery-overlay">
                    <div className="gallery-content">
                      <h3>Quốc Gia</h3>
                      <p>Sức mạnh của cả dân tộc</p>
                    </div>
                  </div>
                </div>
              </div>

              <div
                className="gallery-item tall"
                data-aos="zoom-in"
                data-aos-delay="500"
              >
                <div className="gallery-image">
                  <img
                    src="https://i.pinimg.com/736x/33/d9/d2/33d9d2fd330baaafe9bafacefab97b5e.jpg"
                    alt="Các dân tộc Việt Nam"
                    onError={(e) => {
                      e.currentTarget.style.display = "none";
                    }}
                  />
                  <div className="gallery-overlay">
                    <div className="gallery-content">
                      <h3>54 Dân Tộc</h3>
                      <p>Một đại gia đình Việt Nam</p>
                    </div>
                  </div>
                </div>
              </div>

              <div
                className="gallery-item wide"
                data-aos="zoom-in"
                data-aos-delay="600"
              >
                <div className="gallery-image">
                  <img
                    src="/img/ethnic-tradition.png"
                    alt="Di sản văn hóa"
                    onError={(e) => {
                      e.currentTarget.style.display = "none";
                    }}
                  />
                  <div className="gallery-overlay">
                    <div className="gallery-content">
                      <h3>Di Sản Văn Hóa</h3>
                      <p>Bảo tồn và phát huy giá trị truyền thống</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="gallery-cta" data-aos="fade-up">
              <button
                className="cta-button"
                onClick={() => (window.location.href = "/exhibition")}
              >
                <span className="cta-text">Khám Phá Triển Lãm 3D</span>
                <span className="cta-arrow">→</span>
              </button>
            </div>
          </div>

          {/* Ẩn Dụ: Khu vườn sinh thái */}
          <div className="metaphor-section">
            <div className="metaphor-container">
              <div className="metaphor-header" data-aos="fade-up">
                <span className="metaphor-icon">
                  <GiTreeGrowth />
                </span>
                <h3 className="metaphor-title">Tư Duy Qua Ẩn Dụ</h3>
              </div>
              <div className="metaphor-content">
                <div
                  className="metaphor-text"
                  data-aos="fade-right"
                  data-aos-delay="100"
                >
                  <p>
                    Có thể hình dung quan hệ dân tộc và tôn giáo ở Việt Nam như
                    một
                    <strong> khu vườn sinh thái đa dạng</strong>. Khu vườn này
                    có nhiều loại cây (dân tộc) và nhiều dòng suối (tôn giáo)
                    cùng chảy.
                  </p>
                  <p>
                    Nguyên tắc cơ bản là đảm bảo tất cả cây cối đều nhận được
                    ánh sáng và dinh dưỡng đầy đủ (bình đẳng và phát triển). Tuy
                    nhiên, nhiệm vụ của người làm vườn (Đảng và Nhà nước) không
                    chỉ là chăm sóc mà còn là ngăn chặn sâu bệnh (các thế lực
                    thù địch lợi dụng) đang cố gắng tiêm độc tố (kích động ly
                    khai, tà đạo) vào nguồn nước chung, nhằm làm suy yếu sự đoàn
                    kết và phá vỡ cân bằng sinh thái của cả khu vườn.
                  </p>
                </div>
                <div
                  className="metaphor-visual"
                  data-aos="fade-left"
                  data-aos-delay="100"
                >
                  <div className="metaphor-elements">
                    <div
                      className="element-item"
                      data-aos="zoom-in"
                      data-aos-delay="200"
                    >
                      <span className="element-emoji">
                        <FaUsers />
                      </span>
                      <span className="element-label">Các Dân Tộc</span>
                    </div>
                    <div
                      className="element-item"
                      data-aos="zoom-in"
                      data-aos-delay="300"
                    >
                      <span className="element-emoji">
                        <GiWaterDrop />
                      </span>
                      <span className="element-label">Tôn Giáo</span>
                    </div>
                    <div
                      className="element-item"
                      data-aos="zoom-in"
                      data-aos-delay="400"
                    >
                      <span className="element-emoji">
                        <GiFarmer />
                      </span>
                      <span className="element-label">Đảng & Nhà Nước</span>
                    </div>
                    <div
                      className="element-item warning"
                      data-aos="zoom-in"
                      data-aos-delay="500"
                    >
                      <span className="element-emoji">
                        <GiPoisonGas />
                      </span>
                      <span className="element-label">Thế Lực Thù Địch</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="quote-section" data-aos="fade-up">
            <div className="quote-mark">"</div>
            <blockquote
              className="quote-text"
              data-aos="fade-up"
              data-aos-delay="100"
            >
              Đại đoàn kết toàn dân tộc là truyền thống quý báu, là nguồn sức
              mạnh to lớn, là động lực quan trọng thúc đẩy sự nghiệp cách mạng
              của dân tộc ta đi từ thắng lợi này đến thắng lợi khác.
            </blockquote>
            <div className="quote-author">— Tư Tưởng Dân Tộc Việt Nam</div>
          </div>

          <div className="cta-section">
            <h2 className="cta-section-title" data-aos="fade-up">
              Cùng Góp Phần Xây Dựng Đất Nước
            </h2>
            <p
              className="cta-section-description"
              data-aos="fade-up"
              data-aos-delay="100"
            >
              Tham gia vào cuộc đối thoại về chiến lược phát triển dân tộc, đóng
              góp ý kiến và cùng xây dựng tương lai tươi sáng cho Việt Nam.
            </p>
            <button
              className="cta-button secondary"
              data-aos="zoom-in"
              data-aos-delay="200"
            >
              <span className="cta-text">Tìm Hiểu Thêm</span>
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="landing-footer">
        <div className="footer-content">
          <div className="footer-line"></div>
          <p className="footer-text">
            © 2025 Phân Tích Chiến Lược Chính Trị Việt Nam
          </p>
          <div className="footer-links">
            <a href="/ai-appendix" className="footer-link">
              <FaRobot /> Phụ Lục AI
            </a>
            <a href="/contributors" className="footer-link">
              <FaUsers /> Người Đóng Góp
            </a>
          </div>
        </div>
      </footer>

      <ImagePromptModal
        isOpen={isModalOpen}
        onClose={closeModal}
        imageData={modalData}
      />
    </div>
  );
}

export default Landing;
