import React, { useState, useRef, useEffect } from "react";
import {
  SendOutlined,
  LoadingOutlined,
  RobotOutlined,
  UserOutlined,
  HomeOutlined,
} from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeHighlight from "rehype-highlight";
import rehypeRaw from "rehype-raw";
import { sendMessageToGemini } from "../../services/geminiService";
import "./index.scss";
import "highlight.js/styles/atom-one-dark.css";

interface Message {
  id: string;
  text: string;
  sender: "user" | "ai";
  timestamp: Date;
}

const ChatAIPage: React.FC = () => {
  const navigate = useNavigate();
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      text: "Xin chào! Tôi là **Trợ Lý AI** của bạn. Tôi có thể giúp bạn:\n\n- Giải đáp về **chính sách dân tộc và tôn giáo** Việt Nam\n- Thông tin về **văn hóa và truyền thống** các dân tộc\n- Kiến thức về **lịch sử và di sản văn hóa**\n- Hướng dẫn về **triển lãm và nội dung giáo dục**\n\nHãy đặt câu hỏi của bạn!",
      sender: "ai",
      timestamp: new Date(),
    },
  ]);
  const [inputValue, setInputValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  const handleSendMessage = async () => {
    if (!inputValue.trim() || isLoading) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: inputValue,
      sender: "user",
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputValue("");
    setIsLoading(true);

    try {
      const aiResponse = await sendMessageToGemini(inputValue);

      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: aiResponse,
        sender: "ai",
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, aiMessage]);
    } catch (error) {
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: "❌ **Xin lỗi**, đã có lỗi xảy ra. Vui lòng thử lại sau.",
        sender: "ai",
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <div className="chatai-page">
      {/* Header */}
      <div className="chatai-header">
        <div className="chatai-header-content">
          <div className="header-left">
            <RobotOutlined className="header-icon" />
            <div className="header-text">
              <h1>Trợ Lý AI</h1>
              <span className="header-status">
                <span className="status-dot"></span>
                Đang hoạt động
              </span>
            </div>
          </div>
          <button className="home-button" onClick={() => navigate("/")}>
            <HomeOutlined />
            <span>Trang Chủ</span>
          </button>
        </div>
      </div>

      {/* Messages Container */}
      <div className="chatai-messages-container">
        <div className="chatai-messages">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`chatai-message ${
                message.sender === "user" ? "user-message" : "ai-message"
              }`}
            >
              <div className="message-avatar">
                {message.sender === "user" ? (
                  <UserOutlined />
                ) : (
                  <RobotOutlined />
                )}
              </div>
              <div className="message-content">
                <div className="message-header">
                  <span className="message-sender">
                    {message.sender === "user" ? "Bạn" : "Trợ Lý AI"}
                  </span>
                  <span className="message-time">
                    {message.timestamp.toLocaleTimeString("vi-VN", {
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </span>
                </div>
                <div className="message-bubble">
                  {message.sender === "ai" ? (
                    <ReactMarkdown
                      remarkPlugins={[remarkGfm]}
                      rehypePlugins={[rehypeHighlight, rehypeRaw]}
                      components={{
                        p: ({ children }) => (
                          <p className="markdown-p">{children}</p>
                        ),
                        h1: ({ children }) => (
                          <h1 className="markdown-h1">{children}</h1>
                        ),
                        h2: ({ children }) => (
                          <h2 className="markdown-h2">{children}</h2>
                        ),
                        h3: ({ children }) => (
                          <h3 className="markdown-h3">{children}</h3>
                        ),
                        ul: ({ children }) => (
                          <ul className="markdown-ul">{children}</ul>
                        ),
                        ol: ({ children }) => (
                          <ol className="markdown-ol">{children}</ol>
                        ),
                        li: ({ children }) => (
                          <li className="markdown-li">{children}</li>
                        ),
                        code: ({ className, children, ...props }) => {
                          const match = /language-(\w+)/.exec(className || "");
                          return match ? (
                            <code
                              className={`${className} markdown-code-block`}
                              {...props}
                            >
                              {children}
                            </code>
                          ) : (
                            <code className="markdown-code-inline" {...props}>
                              {children}
                            </code>
                          );
                        },
                        pre: ({ children }) => (
                          <pre className="markdown-pre">{children}</pre>
                        ),
                        blockquote: ({ children }) => (
                          <blockquote className="markdown-blockquote">
                            {children}
                          </blockquote>
                        ),
                        a: ({ children, href }) => (
                          <a
                            href={href}
                            className="markdown-link"
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            {children}
                          </a>
                        ),
                        strong: ({ children }) => (
                          <strong className="markdown-strong">
                            {children}
                          </strong>
                        ),
                        em: ({ children }) => (
                          <em className="markdown-em">{children}</em>
                        ),
                      }}
                    >
                      {message.text}
                    </ReactMarkdown>
                  ) : (
                    <p>{message.text}</p>
                  )}
                </div>
              </div>
            </div>
          ))}
          {isLoading && (
            <div className="chatai-message ai-message">
              <div className="message-avatar">
                <RobotOutlined />
              </div>
              <div className="message-content">
                <div className="message-header">
                  <span className="message-sender">Trợ Lý AI</span>
                </div>
                <div className="message-bubble typing-indicator">
                  <span></span>
                  <span></span>
                  <span></span>
                </div>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>
      </div>

      {/* Input Area */}
      <div className="chatai-input-area">
        <div className="chatai-input-container">
          <textarea
            ref={inputRef}
            className="chatai-input"
            placeholder="Nhập câu hỏi của bạn... (Enter để gửi, Shift+Enter để xuống dòng)"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyPress={handleKeyPress}
            disabled={isLoading}
            rows={1}
            style={{
              height: "auto",
              minHeight: "50px",
              maxHeight: "150px",
            }}
            onInput={(e) => {
              const target = e.target as HTMLTextAreaElement;
              target.style.height = "auto";
              target.style.height = `${Math.min(target.scrollHeight, 150)}px`;
            }}
          />
          <button
            className="chatai-send-button"
            onClick={handleSendMessage}
            disabled={!inputValue.trim() || isLoading}
          >
            {isLoading ? (
              <LoadingOutlined className="button-icon spinning" />
            ) : (
              <SendOutlined className="button-icon" />
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChatAIPage;
