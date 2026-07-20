import "./notes.css";

const MAX_CHARACTERS = 100;

const CreateNote = ({ inputText, setInputText, saveHandler }) => {
  const charactersLeft = MAX_CHARACTERS - inputText.length;

  const handleChange = (e) => {
    setInputText(e.target.value);
  };

  return (
    <div className="note create-note">
      <textarea
        rows="5"
        cols="10"
        placeholder="Write your note here..."
        value={inputText}
        onChange={handleChange}
        maxLength={MAX_CHARACTERS}
      />

      <div className="note_footer">
        <span
          className={`label ${
            charactersLeft <= 10 ? "warning" : ""
          }`}
        >
          {charactersLeft} characters left
        </span>

        <button
          className="note_save"
          onClick={saveHandler}
          disabled={!inputText.trim()}
        >
          Save
        </button>
      </div>
    </div>
  );
};

export default CreateNote;