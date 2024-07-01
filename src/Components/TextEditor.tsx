"use client";

import { useState } from 'react';

interface File {
  id: number;
  name: string;
}

interface TextEditorProps {
  file: File;
}

export default function TextEditor({ file }: TextEditorProps) {
  const [content, setContent] = useState('');

  return (
    <div className="p-4">
      <h2 className="text-2xl mb-4">{file.name}</h2>
      <textarea
        className="w-full h-64 p-2 border"
        value={content}
        onChange={(e) => setContent(e.target.value)}
      ></textarea>
    </div>
  );
}
