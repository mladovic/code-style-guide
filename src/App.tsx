import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";

import { Sidebar } from "./features/Sidebar";
import { MarkdownPage } from "./features/MarkdownPage";
import { NotFoundPage } from "./features/NotFoundPage";
import { DarkModeToggle } from "./features/dark-mode";
import { useNav } from "./lib/useNav";

function App() {
  const navItems = useNav();

  return (
    <Router>
      <div className="flex h-screen">
        <Sidebar navItems={navItems} />
        <div className="flex-1 flex flex-col">
          <header className="p-4 bg-gray-200 dark:bg-gray-800 flex justify-end">
            <DarkModeToggle />
          </header>
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
      </div>
    </Router>
  );
}

export default App;
