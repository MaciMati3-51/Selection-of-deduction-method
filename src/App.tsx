import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Top } from "./pages/Top";
import { Quiz } from "./pages/Quiz";
import { Result } from "./pages/Result";
import { List } from "./pages/List";
import { Compare } from "./pages/Compare";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Top />} />
        <Route path="/quiz" element={<Quiz />} />
        <Route path="/result" element={<Result />} />
        <Route path="/list" element={<List />} />
        <Route path="/compare" element={<Compare />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
