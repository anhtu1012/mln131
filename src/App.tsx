import { BrowserRouter, Routes, Route } from "react-router-dom";
import Landing from "./pages/landing";
import Exhibition from "./pages/exhibition";
import Game from "./pages/game";
import ChatAIPage from "./pages/chatai";
import ChatAI from "./components/ChatAI";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/landing" element={<Landing />} />
        <Route path="/exhibition" element={<Exhibition />} />
        <Route path="/game" element={<Game />} />
        <Route path="/chatai" element={<ChatAIPage />} />
      </Routes>
      <ChatAI />
    </BrowserRouter>
  );
}

export default App;
