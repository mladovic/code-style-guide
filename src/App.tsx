import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import { Sidebar } from "./components/Sidebar";
import { MarkdownPage } from "./components/MarkdownPage";
import { NotFoundPage } from "./components/NotFoundPage";

function App() {
  return (
    <Router>
      <div className="flex h-screen">
        <Sidebar />
        <main className="flex-1 p-8 overflow-auto">
          <Routes>
            <Route
              path="/"
              element={<Navigate to="/docs/introduction" replace />}
            />
            <Route path="/docs/*" element={<MarkdownPage />} />
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
