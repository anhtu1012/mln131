import React from 'react';
import { MessageOutlined, CloseOutlined } from '@ant-design/icons';
import './ChatAI.scss';

interface ChatButtonProps {
  isOpen: boolean;
  onClick: () => void;
  onDoubleClick?: () => void;
}

const ChatButton: React.FC<ChatButtonProps> = ({ isOpen, onClick, onDoubleClick }) => {
  return (
    <button 
      className={`chat-ai-button ${isOpen ? 'open' : ''}`}
      onClick={onClick}
      onDoubleClick={onDoubleClick}
      aria-label="Chat with AI"
      title="Click để mở chat, Double-click để mở trang đầy đủ"
    >
      {isOpen ? (
        <CloseOutlined className="chat-button-icon" />
      ) : (
        <MessageOutlined className="chat-button-icon" />
      )}
      {!isOpen && (
        <span className="chat-button-pulse"></span>
      )}
    </button>
  );
};

export default ChatButton;

