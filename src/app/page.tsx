"use client";

import { useState } from 'react';
import Sidebar from '../components/Sidebar';
import TextEditor from '../components/TextEditor';
import NoteMaker from '../components/NoteMaker';
import ListMaker from '../components/ListMaker';
import ReadmePreview from '../components/ReadmePreview';

interface File {
  id: number;
  name: string;
}

export default function Home() {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const renderContent = () => {
    if (!selectedFile) return <div>Select a file to open</div>;
    const { name } = selectedFile;
    if (name.endsWith('.ed')) return <TextEditor file={selectedFile} />;
    if (name.endsWith('.note')) return <NoteMaker file={selectedFile} />;
    if (name.endsWith('.lt')) return <ListMaker file={selectedFile} />;
    if (name.endsWith('.readme')) return <ReadmePreview file={selectedFile} />;
    return <div>Unsupported file type</div>;
  };

  return (
    <div className="flex">
      <Sidebar onSelectFile={setSelectedFile} />
      <div className="flex-1 p-4">{renderContent()}</div>
    </div>
  );
}
