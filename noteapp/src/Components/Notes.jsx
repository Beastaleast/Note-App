import { useState, useEffect } from "react";
import { v4 as uuid } from "uuid";

import CreateNote from "./CreateNote";
import Note from "./Note";
import "./notes.css";

const Notes = () => {
  const [inputText, setInputText] = useState("");
  const [editToggle, setEditToggle] = useState(null);

  // Load notes from localStorage (lazy initialization)
  const [notes, setNotes] = useState(() => {
    const data = localStorage.getItem("Notes");
    return data ? JSON.parse(data) : [];
  });

  const editHandler = (id, text) => {
    setEditToggle(id);
    setInputText(text);
  };

  const saveHandler = () => {
    if (!inputText.trim()) return;

    if (editToggle) {
      // Update existing note
      setNotes((prevNotes) =>
        prevNotes.map((note) =>
          note.id === editToggle
            ? {
                ...note,
                text: inputText,
                updatedAt: new Date().toLocaleString(),
              }
            : note
        )
      );
    } else {
      // Create new note
      setNotes((prevNotes) => [
        ...prevNotes,
        {
          id: uuid(),
          text: inputText,
          createdAt: new Date().toLocaleString(),
        },
      ]);
    }

    setInputText("");
    setEditToggle(null);
  };

  const deleteHandler = (id) => {
    setNotes((prevNotes) => prevNotes.filter((note) => note.id !== id));

    if (editToggle === id) {
      setEditToggle(null);
      setInputText("");
    }
  };

  // Save to localStorage whenever notes change
  useEffect(() => {
    localStorage.setItem("Notes", JSON.stringify(notes));
  }, [notes]);

  return (
    <div className="notes">
      {notes.map((note) =>
        editToggle === note.id ? (
          <CreateNote
            key={note.id}
            inputText={inputText}
            setInputText={setInputText}
            saveHandler={saveHandler}
          />
        ) : (
          <Note
            key={note.id}
            id={note.id}
            text={note.text}
            createdAt={note.createdAt}
            updatedAt={note.updatedAt}
            editHandler={editHandler}
            deleteHandler={deleteHandler}
          />
        )
      )}

      {editToggle === null && (
        <CreateNote
          inputText={inputText}
          setInputText={setInputText}
          saveHandler={saveHandler}
        />
      )}
    </div>
  );
};

export default Notes;