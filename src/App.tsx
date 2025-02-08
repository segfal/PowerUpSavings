import { Routes, Route, BrowserRouter } from "react-router-dom";
import MainPage from "./mainPage";
import QuizPage from "./gameSection/QuizGame";
import Layout from "./components/Layout";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<MainPage />} />
          <Route path="quiz" element={<QuizPage />} />
          <Route path="cards" element={<div>Cards Page Coming Soon</div>} />
          <Route path="rewards" element={<div>Rewards Page Coming Soon</div>} />
          <Route path="settings" element={<div>Settings Page Coming Soon</div>} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
