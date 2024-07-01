import { useState } from 'react';
import * as marked from 'marked';  // Import marked

interface File {
  id: number;
  name: string;
}

interface ReadmePreviewProps {
  file: File;
}

export default function ReadmePreview({ file }: ReadmePreviewProps) {
  const [content, setContent] = useState<string>('');

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const reader = new FileReader();
    reader.onload = (event) => {
      const markdownContent = event.target?.result as string;
      setContent(markdownContent);
    };
    reader.readAsText(e.target.files?.[0] as Blob);
  };

  return (
    <div className="p-4">
      <h2 className="text-2xl mb-4">{file.name}</h2>
      <input type="file" className="mb-4" onChange={handleFileChange} />
      <div className="prose" dangerouslySetInnerHTML={{ __html: marked(content) }}></div>
    </div>
  );
}
