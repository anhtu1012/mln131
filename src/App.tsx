import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Landing from "./pages/landing";
import Exhibition from "./pages/exhibition";
import Game from "./pages/game";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Landing />,
  },
  {
    path: "/landing",
    element: <Landing />,
  },
  {
    path: "/exhibition",
    element: <Exhibition />,
  },
  {
    path: "/game",
    element: <Game />,
  },
]);
function App() {
  return <RouterProvider router={router} />;
}

export default App;
