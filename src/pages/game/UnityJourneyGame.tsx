import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./UnityJourneyGame.scss";

// Types
interface Question {
  id: number;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
}

interface MapPoint {
  id: number;
  x: number;
  y: number;
  name: string;
  region: string;
  questionId: number;
  icon: string;
}

interface GameState {
  currentPointIndex: number;
  answeredQuestions: number[];
  score: number;
  collectedSymbols: string[];
  isGameComplete: boolean;
}

// Game data
const questions: Question[] = [
  {
    id: 1,
    question:
      "Quan điểm chiến lược của Đảng và Nhà nước Việt Nam xác định vấn đề dân tộc và đoàn kết dân tộc là vấn đề mang tính chất nào?",
    options: [
      "Vấn đề chỉ mang tính cấp bách hiện nay",
      "Vấn đề văn hóa - xã hội đơn thuần, mang tính lâu dài",
      "Vấn đề chỉ thuộc phạm vi an ninh - quốc phòng",
      "Vấn đề chiến lược cơ bản, lâu dài, đồng thời cũng là vấn đề cấp bách hiện nay",
    ],
    correctAnswer: 3,
    explanation:
      "Quan điểm của Đảng khẳng định vấn đề dân tộc và đoàn kết dân tộc là vấn đề chiến lược cơ bản, lâu dài, đồng thời cũng là vấn đề cấp bách hiện nay của cách mạng Việt Nam.",
  },
  {
    id: 2,
    question:
      "Theo Chủ nghĩa Mác – Lênin, xu hướng khách quan thứ hai của sự phát triển quan hệ dân tộc (Xu hướng Liên hiệp) phản ánh nhu cầu nào của các dân tộc?",
    options: [
      "Nhu cầu ly khai và tự chủ của mỗi dân tộc",
      "Nhu cầu hợp tác, hội nhập, đặc biệt trong bối cảnh kinh tế phát triển",
      "Nhu cầu tách ra để hình thành cộng đồng dân tộc độc lập",
      "Nhu cầu bảo vệ độc lập dân tộc khỏi các quốc gia khác",
    ],
    correctAnswer: 1,
    explanation:
      "Xu hướng Liên hiệp phản ánh nhu cầu hợp tác, hội nhập, đặc biệt khi kinh tế phát triển.",
  },
  {
    id: 3,
    question:
      "Nội dung nào sau đây không nằm trong ba nội dung cơ bản cấu thành Cương lĩnh Dân tộc của Chủ nghĩa Mác – Lênin?",
    options: [
      "Các dân tộc hoàn toàn bình đẳng",
      "Các dân tộc được quyền tự quyết",
      "Liên hiệp công nhân tất cả các dân tộc",
      "Ưu tiên đầu tư phát triển kinh tế - xã hội các vùng dân tộc và miền núi",
    ],
    correctAnswer: 3,
    explanation:
      "Ba nội dung cơ bản của Cương lĩnh Dân tộc là: Các dân tộc hoàn toàn bình đẳng, Các dân tộc được quyền tự quyết, và Liên hiệp công nhân tất cả các dân tộc.",
  },
  {
    id: 4,
    question:
      "Trong ba đặc điểm dân tộc mang tính chiến lược của Việt Nam, đặc điểm nào được xác định là thách thức lớn nhất trong thời kỳ quá độ?",
    options: [
      "Cư trú xen kẽ và vị trí địa lý quan trọng",
      "Trình độ phát triển không đồng đều",
      "Truyền thống đoàn kết gắn bó lâu đời",
      "Đa dân tộc, đa ngôn ngữ",
    ],
    correctAnswer: 1,
    explanation:
      "Trình độ phát triển không đồng đều là thách thức lớn nhất trong thời kỳ quá độ, có thể là nguyên nhân tiềm ẩn gây mất ổn định.",
  },
  {
    id: 5,
    question:
      "Đặc điểm nào của các dân tộc Việt Nam được xem là nền tảng vững chắc để thực hiện chính sách đại đoàn kết dân tộc?",
    options: [
      "Cư trú xen kẽ",
      "Phân bố ở địa bàn có chiến lược quan trọng",
      "Trình độ phát triển không đồng đều",
      "Truyền thống đoàn kết gắn bó lâu đời trong cộng đồng dân tộc - quốc gia thống nhất",
    ],
    correctAnswer: 3,
    explanation:
      "Truyền thống đoàn kết gắn bó lâu đời trong cộng đồng dân tộc - quốc gia thống nhất là nền tảng vững chắc để thực hiện chính sách đại đoàn kết dân tộc.",
  },
  {
    id: 6,
    question:
      "Theo Chủ nghĩa Mác – Lênin, tôn giáo mang những tính chất cơ bản nào sau đây?",
    options: [
      "Tự nhiên, Xã hội, Tâm linh",
      "Lịch sử, Quần chúng, Chính trị",
      "Bình đẳng, Tự quyết, Liên hiệp",
      "Phản ánh hư ảo, Mê tín dị đoan, Siêu nhiên",
    ],
    correctAnswer: 1,
    explanation:
      "Theo Chủ nghĩa Mác – Lênin, tôn giáo mang ba tính chất cơ bản là: Lịch sử, Quần chúng, và Chính trị.",
  },
  {
    id: 7,
    question:
      "Nguyên tắc giải quyết vấn đề tôn giáo trong thời kỳ quá độ lên chủ nghĩa xã hội đòi hỏi phải phân biệt rõ giữa tín ngưỡng, tôn giáo chân chính với yếu tố nào?",
    options: [
      "Hình thái ý thức xã hội phản ánh hư ảo hiện thực khách quan",
      "Tính chất quần chúng của tôn giáo",
      "Niềm tin sâu vào đấng siêu nhiên",
      "Việc lợi dụng tín ngưỡng, tôn giáo",
    ],
    correctAnswer: 3,
    explanation:
      "Cần phân biệt rõ giữa tín ngưỡng, tôn giáo chân chính với việc lợi dụng tín ngưỡng, tôn giáo.",
  },
  {
    id: 8,
    question:
      'Nguyên tắc chỉ đạo then chốt trong việc giải quyết mối quan hệ dân tộc và tôn giáo là "Giải quyết vấn đề tôn giáo trên cơ sở vấn đề dân tộc". Nguyên tắc này nhấn mạnh tính ưu tiên của lợi ích nào?',
    options: [
      "Lợi ích của tín đồ tôn giáo",
      "Lợi ích kinh tế và phát triển xã hội",
      "Lợi ích quốc gia - dân tộc",
      "Lợi ích của hệ thống chính trị",
    ],
    correctAnswer: 2,
    explanation:
      "Nguyên tắc này nhấn mạnh tính ưu tiên của lợi ích quốc gia - dân tộc.",
  },
  {
    id: 9,
    question:
      "Tài liệu chỉ rõ, việc giải quyết mối quan hệ dân tộc và tôn giáo phải đảm bảo giữ vững độc lập và tuyệt đối không được lợi dụng vấn đề tôn giáo để đòi mục đích chính trị nào?",
    options: [
      "Đòi hỏi phát triển kinh tế - xã hội",
      "Đòi hỏi quyền tự do tín ngưỡng",
      "Đòi hỏi thay đổi hệ thống chính trị",
      "Đòi ly khai dân tộc",
    ],
    correctAnswer: 3,
    explanation:
      "Phải đảm bảo giữ vững độc lập và tuyệt đối không được lợi dụng vấn đề tôn giáo đòi ly khai dân tộc.",
  },
  {
    id: 10,
    question:
      'Trong bối cảnh đường lối đổi mới, sự xuất hiện của các tổ chức "đội lốt tôn giáo" nào dưới đây được nêu tên trong nguồn tài liệu đã làm phương hại đến mối quan hệ dân tộc và tôn giáo?',
    options: [
      "Các nhóm tuyên truyền mê tín dị đoan",
      "Tin Lành Đề Ga, Hà Mòn",
      "Thanh Hải Vô Thượng Sư",
      "Các nhóm tôn giáo chưa được cấp phép",
    ],
    correctAnswer: 1,
    explanation:
      "Các tổ chức đội lốt tôn giáo như Tin Lành Đề Ga, Hà Mòn ở Tây Nguyên đã lợi dụng niềm tin tôn giáo để xuyên tạc đường lối, chính sách của Đảng và Nhà nước.",
  },
];

const mapPoints: MapPoint[] = [
  {
    id: 1,
    x: 32,
    y: 10,
    name: "Hà Nội",
    region: "Miền Bắc",
    questionId: 1,
    icon: "🏛️",
  },
  {
    id: 2,
    x: 49,
    y: 10,
    name: "Quảng Ninh",
    region: "Miền Bắc",
    questionId: 2,
    icon: "⛰️",
  },
  {
    id: 3,
    x: 36,
    y: 28,
    name: "Quản trị",
    region: "Miền Trung",
    questionId: 3,
    icon: "🏔️",
  },
  {
    id: 4,
    x: 44,
    y: 36,
    name: "Huế",
    region: "Miền Trung",
    questionId: 4,
    icon: "🏯",
  },
  {
    id: 5,
    x: 50,
    y: 47,
    name: "Đà Nẵng",
    region: "Miền Trung",
    questionId: 5,
    icon: "🌉",
  },
  {
    id: 6,
    x: 49,
    y: 55,
    name: "Kon Tum",
    region: "Tây Nguyên",
    questionId: 6,
    icon: "🎋",
  },
  {
    id: 7,
    x: 56,
    y: 59,
    name: "Đắk Lắk",
    region: "Tây Nguyên",
    questionId: 7,
    icon: "🐘",
  },
  {
    id: 8,
    x: 50,
    y: 68,
    name: "TP.HCM",
    region: "Miền Nam",
    questionId: 8,
    icon: "🏙️",
  },
  {
    id: 9,
    x: 34,
    y: 74,
    name: "An Giang",
    region: "Miền Nam",
    questionId: 9,
    icon: "🏙️",
  },
  {
    id: 10,
    x: 35,
    y: 82,
    name: "Cần Thơ",
    region: "Miền Nam",
    questionId: 10,
    icon: "🚤",
  },
];

const unitySymbols = [
  {
    id: "ethnic-tradition",
    name: "Truyền Thống Dân Tộc",
    icon: "🎭",
    description: "Bảo tồn và phát huy bản sắc văn hóa",
  },
  {
    id: "ethnic-unity",
    name: "Đoàn Kết Dân Tộc",
    icon: "🤝",
    description: "Đại đoàn kết 54 dân tộc",
  },
  {
    id: "national-unity",
    name: "Thống Nhất Quốc Gia",
    icon: "🇻🇳",
    description: "Một nước, một dân tộc",
  },
  {
    id: "religious-harmony",
    name: "Hòa Hợp Tôn Giáo",
    icon: "☮️",
    description: "Tôn trọng tín ngưỡng và đoàn kết",
  },
];

const UnityJourneyGame: React.FC = () => {
  const navigate = useNavigate();
  const [gameState, setGameState] = useState<GameState>({
    currentPointIndex: 0,
    answeredQuestions: [],
    score: 0,
    collectedSymbols: [],
    isGameComplete: false,
  });

  const [showQuestionModal, setShowQuestionModal] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState<Question | null>(null);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showExplanation, setShowExplanation] = useState(false);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
  const [showIntro, setShowIntro] = useState(true);

  const currentPoint = mapPoints[gameState.currentPointIndex];

  useEffect(() => {
    if (gameState.currentPointIndex >= mapPoints.length) {
      setGameState((prev) => ({ ...prev, isGameComplete: true }));
    }
  }, [gameState.currentPointIndex]);

  const handleStartGame = () => {
    setShowIntro(false);
  };

  const handlePointClick = (pointId: number) => {
    if (!currentPoint) return;
    const point = mapPoints.find((p) => p.id === pointId);
    if (!point || point.id !== currentPoint.id) return;

    const question = questions.find((q) => q.id === point.questionId);
    if (question) {
      setCurrentQuestion(question);
      setShowQuestionModal(true);
      setSelectedAnswer(null);
      setShowExplanation(false);
      setIsCorrect(null);
    }
  };

  const handleAnswerSelect = (answerIndex: number) => {
    if (showExplanation) return;
    setSelectedAnswer(answerIndex);
  };

  const handleSubmitAnswer = () => {
    if (selectedAnswer === null || !currentQuestion) return;

    const correct = selectedAnswer === currentQuestion.correctAnswer;
    setIsCorrect(correct);
    setShowExplanation(true);

    if (correct) {
      const newScore = gameState.score + 10;
      const newAnsweredQuestions = [
        ...gameState.answeredQuestions,
        currentQuestion.id,
      ];

      // Collect symbol every 2-3 correct answers
      const newSymbols = [...gameState.collectedSymbols];
      const symbolIndex = Math.floor(newAnsweredQuestions.length / 2.5);
      if (
        symbolIndex < unitySymbols.length &&
        !newSymbols.includes(unitySymbols[symbolIndex].id)
      ) {
        newSymbols.push(unitySymbols[symbolIndex].id);
      }

      setGameState((prev) => ({
        ...prev,
        score: newScore,
        answeredQuestions: newAnsweredQuestions,
        collectedSymbols: newSymbols,
      }));
    }
  };

  const handleNextPoint = () => {
    // Store the current correct status before resetting
    const wasCorrect = isCorrect === true;
    const isLastQuestion = gameState.currentPointIndex === mapPoints.length - 1;

    setShowQuestionModal(false);
    setCurrentQuestion(null);
    setSelectedAnswer(null);
    setShowExplanation(false);
    setIsCorrect(null);

    if (wasCorrect) {
      // If this is the last question, complete the game
      if (isLastQuestion) {
        setGameState((prev) => ({
          ...prev,
          isGameComplete: true,
        }));
      } else {
        // Otherwise, move to next point
        setGameState((prev) => ({
          ...prev,
          currentPointIndex: prev.currentPointIndex + 1,
        }));
      }
    }
  };

  const handleRestart = () => {
    setGameState({
      currentPointIndex: 0,
      answeredQuestions: [],
      score: 0,
      collectedSymbols: [],
      isGameComplete: false,
    });
    setShowIntro(true);
  };

  return (
    <div className="unity-journey-game">
      {/* Intro Screen */}
      {showIntro && (
        <div className="intro-overlay">
          <div className="intro-content">
            <h1 className="intro-title">🇻🇳 Hành Trình Đoàn Kết 🇻🇳</h1>
            <div className="intro-description">
              <p>
                Khám phá đất nước Việt Nam và tìm hiểu về đại đoàn kết dân tộc!
              </p>
              <div className="intro-instructions">
                <h3>Cách chơi:</h3>
                <ul>
                  <li>🗺️ Di chuyển qua 10 điểm trên bản đồ Việt Nam</li>
                  <li>
                    ❓ Trả lời câu hỏi về dân tộc và tôn giáo tại mỗi điểm
                  </li>
                  <li>🏆 Thu thập 4 biểu tượng đoàn kết</li>
                  <li>⭐ Hoàn thành hành trình với điểm số cao nhất!</li>
                </ul>
              </div>
              <div className="unity-symbols-preview">
                {unitySymbols.map((symbol) => (
                  <div key={symbol.id} className="symbol-preview">
                    <span className="symbol-icon">{symbol.icon}</span>
                    <span className="symbol-name">{symbol.name}</span>
                  </div>
                ))}
              </div>
            </div>
            <button className="btn-start-game" onClick={handleStartGame}>
              Bắt Đầu Hành Trình
            </button>
          </div>
        </div>
      )}

      {/* Game Complete Screen */}
      {gameState.isGameComplete && (
        <div className="complete-overlay">
          <div className="complete-content">
            <h1 className="complete-title">🎉 Chúc Mừng! 🎉</h1>
            <p className="complete-message">
              Bạn đã hoàn thành Hành Trình Đoàn Kết Dân Tộc Việt Nam!
            </p>

            {/* Performance Rating */}
            <div className="performance-rating">
              <div className="rating-icon">
                {gameState.score === 100
                  ? "🏆"
                  : gameState.score >= 80
                  ? "⭐"
                  : gameState.score >= 60
                  ? "👍"
                  : "💪"}
              </div>
              <div className="rating-text">
                {gameState.score === 100
                  ? "Xuất Sắc! Bạn là chuyên gia về đoàn kết dân tộc!"
                  : gameState.score >= 80
                  ? "Rất Tốt! Bạn có hiểu biết sâu sắc!"
                  : gameState.score >= 60
                  ? "Khá Tốt! Tiếp tục học hỏi thêm nhé!"
                  : "Cố Gắng! Hãy thử lại để hiểu rõ hơn!"}
              </div>
            </div>

            <div className="final-stats">
              <div className="stat">
                <span className="stat-label">Tổng điểm:</span>
                <span className="stat-value">{gameState.score} / 100</span>
              </div>
              <div className="stat">
                <span className="stat-label">Câu trả lời đúng:</span>
                <span className="stat-value">
                  {gameState.answeredQuestions.length} / 10
                </span>
              </div>
              <div className="stat">
                <span className="stat-label">Tỷ lệ chính xác:</span>
                <span className="stat-value">
                  {((gameState.answeredQuestions.length / 10) * 100).toFixed(0)}
                  %
                </span>
              </div>
              <div className="stat">
                <span className="stat-label">Biểu tượng thu thập:</span>
                <span className="stat-value">
                  {gameState.collectedSymbols.length} / 4
                </span>
              </div>
            </div>
            <div className="collected-symbols-final">
              <h3>Biểu tượng đã thu thập:</h3>
              <div className="symbols-grid">
                {unitySymbols.map((symbol) => (
                  <div
                    key={symbol.id}
                    className={`symbol-card ${
                      gameState.collectedSymbols.includes(symbol.id)
                        ? "collected"
                        : "locked"
                    }`}
                  >
                    <div className="symbol-icon-large">{symbol.icon}</div>
                    <div className="symbol-name">{symbol.name}</div>
                    <div className="symbol-description">
                      {symbol.description}
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <button className="btn-restart" onClick={handleRestart}>
              Chơi Lại
            </button>
          </div>
        </div>
      )}

      {/* Game Header */}
      {!gameState.isGameComplete && (
        <div className="game-header">
          <div className="game-info">
            <div className="score-display">
              <span className="score-label">Điểm số:</span>
              <span className="score-value">{gameState.score}</span>
            </div>
            <div className="progress-display">
              <span className="progress-label">Tiến độ:</span>
              <span className="progress-value">
                {Math.min(gameState.currentPointIndex + 1, mapPoints.length)} /{" "}
                {mapPoints.length}
              </span>
            </div>
          </div>

          <div className="collected-symbols">
            <span className="symbols-label">Biểu tượng:</span>
            <div className="symbols-list">
              {unitySymbols.map((symbol) => (
                <div
                  key={symbol.id}
                  className={`symbol-badge ${
                    gameState.collectedSymbols.includes(symbol.id)
                      ? "collected"
                      : "locked"
                  }`}
                  title={symbol.name}
                >
                  {symbol.icon}
                </div>
              ))}
            </div>
          </div>
          <div className="header-actions">
            <button className="btn-home" onClick={() => navigate("/")}>
              Quay về Trang chủ
            </button>
          </div>
        </div>
      )}

      {/* Map Container */}
      {!gameState.isGameComplete && (
        <div className="map-container">
          <div className="map-title-section">
            <h2 className="map-title">🇻🇳 Bản Đồ Việt Nam 🇻🇳</h2>
            <p className="map-subtitle">
              Bao gồm Hoàng Sa và Trường Sa - Lãnh thổ thiêng liêng không thể
              tách rời
            </p>
          </div>
          <div className="map-background">
            {/* Vietnam Map Image with Hoàng Sa & Trường Sa */}
            <div className="map-image-container">
              <img
                src="/img/ban-do-viet-nam.jpg"
                alt="Bản đồ Việt Nam - Hoàng Sa và Trường Sa"
                className="vietnam-map-image"
              />
            </div>

            {/* Interactive Overlay SVG */}
            <svg
              className="map-overlay-svg"
              viewBox="0 0 100 100"
              preserveAspectRatio="xMidYMid meet"
            >
              {/* Connection lines */}
              {mapPoints.map((point, index) => {
                if (index === 0) return null;
                const prevPoint = mapPoints[index - 1];
                const isActive = index <= gameState.currentPointIndex;
                const isCompleted = index < gameState.currentPointIndex;

                return (
                  <line
                    key={`line-${point.id}`}
                    x1={prevPoint.x}
                    y1={prevPoint.y}
                    x2={point.x}
                    y2={point.y}
                    className={`connection-line ${isActive ? "active" : ""} ${
                      isCompleted ? "completed" : ""
                    }`}
                    strokeWidth="0.5"
                    strokeDasharray="2,1"
                  />
                );
              })}

              {/* Map points - Ultra Compact & Clean */}
              {mapPoints.map((point, index) => {
                const isCompleted = index < gameState.currentPointIndex;
                const isCurrent = index === gameState.currentPointIndex;
                const isLocked = index > gameState.currentPointIndex;
                const pointSize = isCurrent ? 1.3 : 1;

                return (
                  <g key={point.id}>
                    {/* Point circle - Very Small */}
                    <circle
                      cx={point.x}
                      cy={point.y}
                      r={pointSize}
                      className={`map-point ${isCurrent ? "current" : ""} ${
                        isCompleted ? "completed" : ""
                      } ${isLocked ? "locked" : ""}`}
                      onClick={() => handlePointClick(point.id)}
                      style={{ cursor: isCurrent ? "pointer" : "default" }}
                    />

                    {/* Icon label above point - Ultra Small */}
                    <text
                      x={point.x}
                      y={point.y - 1.5}
                      className="point-label"
                      textAnchor="middle"
                    >
                      {point.icon}
                    </text>

                    {/* Name background rectangle - Ultra Small */}
                    <rect
                      x={point.x - point.name.length * 0.7}
                      y={point.y + 2}
                      width={point.name.length * 1.4}
                      height={2}
                      className="point-name-bg"
                    />

                    {/* City name below point - Ultra Small */}
                    <text
                      x={point.x}
                      y={point.y + 3.5}
                      className="point-name"
                      textAnchor="middle"
                    >
                      {point.name}
                    </text>
                  </g>
                );
              })}
            </svg>

            {/* Map Legend */}
            <div className="map-legend">
              <div className="legend-title">📍 Chú thích:</div>
              <div className="legend-items">
                <div className="legend-item">
                  <span className="legend-icon mainland-icon">🗺️</span>
                  <span className="legend-text">Đất liền Việt Nam</span>
                </div>
                <div className="legend-item">
                  <span className="legend-icon island-icon">⭐</span>
                  <span className="legend-text">Quần đảo Hoàng Sa</span>
                </div>
                <div className="legend-item">
                  <span className="legend-icon island-icon">⭐</span>
                  <span className="legend-text">Quần đảo Trường Sa</span>
                </div>
                <div className="legend-item">
                  <span className="legend-icon journey-icon">🎯</span>
                  <span className="legend-text">Điểm hành trình</span>
                </div>
              </div>
            </div>
          </div>

          {!gameState.isGameComplete && (
            <div className="current-location">
              <h3>📍 Vị trí hiện tại: {currentPoint.name}</h3>
              <p className="location-region">{currentPoint.region}</p>
              <button
                className="btn-answer-question"
                onClick={() => handlePointClick(currentPoint.id)}
              >
                Trả lời câu hỏi tại đây
              </button>
            </div>
          )}
        </div>
      )}

      {/* Question Modal */}
      {showQuestionModal && currentQuestion && currentPoint && (
        <div className="question-modal-overlay">
          <div className="question-modal">
            <div className="modal-header">
              <h2>Câu hỏi {currentQuestion.id}/10</h2>
              <span className="location-badge">
                {currentPoint.icon} {currentPoint.name}
              </span>
            </div>

            <div className="question-content">
              <p className="question-text">{currentQuestion.question}</p>

              <div className="options-list">
                {currentQuestion.options.map((option, index) => {
                  let optionClass = "option";
                  if (showExplanation) {
                    if (index === currentQuestion.correctAnswer) {
                      optionClass += " correct";
                    } else if (index === selectedAnswer && !isCorrect) {
                      optionClass += " incorrect";
                    }
                  } else if (selectedAnswer === index) {
                    optionClass += " selected";
                  }

                  return (
                    <button
                      key={index}
                      className={optionClass}
                      onClick={() => handleAnswerSelect(index)}
                      disabled={showExplanation}
                    >
                      <span className="option-letter">
                        {String.fromCharCode(65 + index)}
                      </span>
                      <span className="option-text">{option}</span>
                    </button>
                  );
                })}
              </div>

              {showExplanation && currentQuestion && (
                <div
                  className={`explanation ${
                    isCorrect ? "correct" : "incorrect"
                  }`}
                >
                  <div className="result-banner">
                    {isCorrect ? (
                      <>
                        <span className="result-icon">✅</span>
                        <span className="result-text">Chính xác! +10 điểm</span>
                      </>
                    ) : (
                      <>
                        <span className="result-icon">❌</span>
                        <span className="result-text">Chưa chính xác!</span>
                      </>
                    )}
                  </div>
                  <p className="explanation-text">
                    {currentQuestion.explanation}
                  </p>
                </div>
              )}
            </div>

            <div className="modal-footer">
              {!showExplanation ? (
                <button
                  className="btn-submit"
                  onClick={handleSubmitAnswer}
                  disabled={selectedAnswer === null}
                >
                  Xác nhận
                </button>
              ) : (
                <button className="btn-next" onClick={handleNextPoint}>
                  {isCorrect === true
                    ? gameState.currentPointIndex === mapPoints.length - 1
                      ? "Xem kết quả 🎉"
                      : "Tiếp tục hành trình →"
                    : "Thử lại"}
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default UnityJourneyGame;
