import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import ChatButton from './ChatButton';
import ChatInterface from './ChatInterface';

const ChatAI: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const toggleChat = () => {
    setIsOpen(!isOpen);
  };

  const openFullPage = () => {
    navigate('/chatai');
  };

  // Không hiển thị nút chat trên trang ChatAI
  if (location.pathname === '/chatai') {
    return null;
  }

  return (
    <>
      <ChatButton 
        isOpen={isOpen} 
        onClick={toggleChat} 
        onDoubleClick={openFullPage}
      />
      <ChatInterface isOpen={isOpen} onOpenFullPage={openFullPage} />
    </>
  );
};

export default ChatAI;

