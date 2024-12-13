import EditorJS from "@editorjs/editorjs";
import Header from "@editorjs/header";
import { useEffect, useRef, memo } from "react";

const TextEditor = ({ initialContent, onSave }) => {
  const editorInstance = useRef(null);

  // Initialize EditorJS
  useEffect(() => {
    if (!editorInstance.current) {
      editorInstance.current = new EditorJS({
        holder: "editor",
        tools: {
          header: {
            class: Header,
            inlineToolbar: true,
            config: {
              placeholder: "Enter a header",
              levels: [1, 2, 3, 4],
              defaultLevel: 2,
            },
          },
        },
        autofocus: true,
        onChange: async () => {
          const editorData = await editorInstance.current.save();
          onSave(editorData);
        },
        data: initialContent || {}, // Load initial content
      });
    }

    return () => {
      if (editorInstance.current) {
        editorInstance.current.destroy();
        editorInstance.current = null;
      }
    };
  }, [onSave]);

  // Update EditorJS data when `initialContent` changes
  useEffect(() => {
    if (editorInstance.current && initialContent) {
      editorInstance.current.isReady
        .then(() => {
          editorInstance.current.clear();
          editorInstance.current.render(initialContent); // Re-render with new content
        })
        .catch((err) => console.error("Editor.js error: ", err));
    }
  }, [initialContent]);

  return (
    <div
      id="editor"
      className="w-full max-w-[41rem] min-h-40 max-h-36 overflow-y-scroll border-4 border-base-300 bg-base-100"
    ></div>
  );
};

export default memo(TextEditor);
