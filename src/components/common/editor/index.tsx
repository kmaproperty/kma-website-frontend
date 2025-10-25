"use client";

import { useEffect, useRef } from "react";
import Quill from "quill";
import "quill/dist/quill.snow.css";

export default function QuillEditor() {
  const editorRef = useRef(null);
  const quillInstance = useRef(null);

  useEffect(() => {
    if (!editorRef.current || quillInstance.current) return;

    const toolbarOptions = [
      [{ header: [1, 2, 3, false] }],     
      ["bold", "italic", "underline"],   
      [{ list: "ordered" }, { list: "bullet" }],
      ["link"],
      [{ align: [] }],
      ["clean"],
    ];

    quillInstance.current = new Quill(editorRef.current, {
      theme: "snow",
      modules: {
        toolbar: toolbarOptions,
      },
    });
  }, []);

  return (
    <div className="w-full">
      <div ref={editorRef} className="bg-white min-h-[200px] font-ibm-plex-sans!"></div>
    </div>
  );
}
