import { Routes, Route, BrowserRouter } from "react-router-dom";
import MainPage from "./mainPage";
import QuizPage from "./gameSection/QuizGame";
import Layout from "./components/Layout";
import ShoppingSites from "./shopping/shoppingSites";
import Rewards from "./rewards/Rewards";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<MainPage />} />
          <Route path="quiz" element={<QuizPage />} />
          <Route path="shopping" element={<ShoppingSites />} />
          <Route path="cards" element={<div>Cards Page Coming Soon</div>} />
          <Route path="rewards" element={<Rewards />} />
          <Route path="settings" element={<div>Settings Page Coming Soon</div>} />
          
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
