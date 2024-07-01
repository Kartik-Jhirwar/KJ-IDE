"use client";

import { useState } from 'react';

interface File {
  id: number;
  name: string;
}

interface ListItem {
  id: number;
  text: string;
}

interface ListMakerProps {
  file: File;
}

export default function ListMaker({ file }: ListMakerProps) {
  const [list, setList] = useState<ListItem[]>([]);
  const [input, setInput] = useState('');

  const addItem = () => {
    setList([...list, { id: Date.now(), text: input }]);
    setInput('');
  };

  return (
    <div className="p-4">
      <h2 className="text-2xl mb-4">{file.name}</h2>
      <div className="flex mb-4">
        <input
          type="text"
          className="flex-1 p-2 border"
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
        <button className="bg-blue-500 px-4 py-2 ml-2" onClick={addItem}>Add</button>
      </div>
      <ul>
        {list.map(item => (
          <li key={item.id} className="mb-2 p-2 border">{item.text}</li>
        ))}
      </ul>
    </div>
  );
}
