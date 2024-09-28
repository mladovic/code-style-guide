import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeHighlight from "rehype-highlight";
import "highlight.js/styles/github.css";

export function MarkdownPage() {
  const { "*": docName } = useParams();
  const [content, setContent] = useState<string>("");

  useEffect(() => {
    const loadMarkdown = async () => {
      try {
        if (!docName) {
          setContent("# Document Not Found\n\nNo document specified.");
          return;
        }
        const path = `../docs/${docName}.md?raw`;
        const module = await import(/* @vite-ignore */ path);
        setContent(module.default);
      } catch (error) {
        setContent(`# Document Not Found\n\n${error}`);
      }
    };

    loadMarkdown();
  }, [docName]);

  return (
    <div className="prose max-w-none">
      <ReactMarkdown
        children={content}
        remarkPlugins={[remarkGfm]}
        rehypePlugins={[rehypeHighlight]}
      />
    </div>
  );
}
