"use client";

import { useState } from 'react';

const initialData = {
  folders: [
    { id: 1, name: 'Folder 1', files: [{ id: 1, name: 'file1.ed' }] },
    { id: 2, name: 'Folder 2', files: [{ id: 2, name: 'file2.note' }] }
  ]
};

interface File {
  id: number;
  name: string;
}

interface Folder {
  id: number;
  name: string;
  files: File[];
}

interface SidebarProps {
  onSelectFile: (file: File) => void;
}

export default function Sidebar({ onSelectFile }: SidebarProps) {
  const [data, setData] = useState<{ folders: Folder[] }>(initialData);

  const addFolder = () => {
    const name = prompt('Enter folder name');
    if (name) {
      setData({
        folders: [...data.folders, { id: Date.now(), name, files: [] }]
      });
    }
  };

  const addFile = (folderId: number) => {
    const name = prompt('Enter file name');
    if (name) {
      const updatedFolders = data.folders.map(folder => {
        if (folder.id === folderId) {
          return { ...folder, files: [...folder.files, { id: Date.now(), name }] };
        }
        return folder;
      });
      setData({ folders: updatedFolders });
    }
  };

  return (
    <div className="w-64 bg-gray-800 text-white h-screen p-4">
      <button className="bg-blue-500 px-4 py-2 mb-4" onClick={addFolder}>Add Folder</button>
      <div>
        {data.folders.map(folder => (
          <div key={folder.id} className="mb-2">
            <div className="flex justify-between">
              <span>{folder.name}</span>
              <button onClick={() => addFile(folder.id)}>+</button>
            </div>
            <ul className="pl-4">
              {folder.files.map(file => (
                <li key={file.id} onClick={() => onSelectFile(file)} className="cursor-pointer">
                  {file.name}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
}
