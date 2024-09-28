import { useEffect, useState } from "react";

export function useContent({ docName }: { docName?: string }) {
  const [content, setContent] = useState<string>("");

  const loadMarkdown = async (docName?: string) => {
    try {
      if (!docName) {
        return "# Document Not Found\n\nNo document specified.";
      }

      const path = `../docs/${docName}.md?raw`;
      const module = await import(/* @vite-ignore */ path);
      return module.default;
    } catch (error) {
      return `# Document Not Found\n\n${error}`;
    }
  };

  useEffect(() => {
    loadMarkdown(docName).then(setContent);
  }, [docName]);

  return { content, loadMarkdown };
}
