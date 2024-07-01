"use client";

import { useState } from 'react';
import { DragDropContext, Droppable, Draggable, DropResult } from 'react-beautiful-dnd';

interface Note {
  id: number;
  text: string;
}

interface Categories {
  [key: string]: Note[];
}

const categories: Categories = {
  'To Do': [],
  'In Progress': [],
  'Done': []
};


const initialCategories = {
  'To Do': [] as Note[],
  'In Progress': [] as Note[],
  'Done': [] as Note[]
};

interface File {
  id: number;
  name: string;
}

interface NoteMakerProps {
  file: File;
}

export default function NoteMaker({ file }: NoteMakerProps) {
  const [categories, setCategories] = useState(initialCategories);

  const addNote = () => {
    const text = prompt('Enter note text');
    if (text) {
      setCategories({
        ...categories,
        'To Do': [...categories['To Do'], { id: Date.now(), text }]
      });
    }
  };

  const onDragEnd = (result: DropResult) => {
    const { source, destination } = result;
    if (!destination) return;

    const sourceCategory = categories[source.droppableId as keyof typeof categories];

    const [movedNote] = sourceCategory.splice(source.index, 1);
    const destinationCategory = categories[destination.droppableId as keyof typeof categories];
    destinationCategory.splice(destination.index, 0, movedNote);

    setCategories({
      ...categories,
      [source.droppableId]: sourceCategory,
      [destination.droppableId]: destinationCategory
    });
  };

  return (
    <div className="p-4">
      <h2 className="text-2xl mb-4">{file.name}</h2>
      <button className="bg-blue-500 px-4 py-2 mb-4" onClick={addNote}>Add Note</button>
      <DragDropContext onDragEnd={onDragEnd}>
        <div className="flex space-x-4">
          {Object.keys(categories).map(category => (
            <Droppable key={category} droppableId={category}>
              {(provided) => (
                <div className="w-1/3" ref={provided.innerRef} {...provided.droppableProps}>
                  <h3 className="text-xl mb-2">{category}</h3>
                  <div className="bg-gray-100 p-2 rounded">
                    {categories[category as keyof typeof categories].map((note, index) => (
                      <Draggable key={note.id} draggableId={`${note.id}`} index={index}>
                        {(provided) => (
                          <div
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                            className="bg-white p-2 mb-2 rounded shadow"
                          >
                            {note.text}
                          </div>
                        )}
                      </Draggable>
                    ))}
                    {provided.placeholder}
                  </div>
                </div>
              )}
            </Droppable>
          ))}
        </div>
      </DragDropContext>
    </div>
  );
}
