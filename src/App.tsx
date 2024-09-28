import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
  useParams,
} from "react-router-dom";
import Sidebar from "./components/Sidebar";
import MarkdownRenderer from "./components/MarkdownRenderer";
import { useEffect, useState } from "react";

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

function MarkdownPage() {
  const { "*": docName } = useParams();
  const [content, setContent] = useState<string>("");

  useEffect(() => {
    const loadMarkdown = async () => {
      try {
        if (!docName) {
          setContent("# Document Not Found\n\nNo document specified.");
          return;
        }
        const path = `./docs/${docName}.md?raw`;
        const module = await import(/* @vite-ignore */ path);
        setContent(module.default);
      } catch (error) {
        setContent(`# Document Not Found\n\n${error}`);
      }
    };

    loadMarkdown();
  }, [docName]);

  return <MarkdownRenderer content={content} />;
}

function NotFoundPage() {
  return (
    <div>
      <h1>404 - Not Found</h1>
      <p>The page you're looking for does not exist.</p>
    </div>
  );
}

export default App;
