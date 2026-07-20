const Note = ({
  id,
  text,
  createdAt,
  updatedAt,
  editHandler,
  deleteHandler,
}) => {
  return (
    <div className="note">
      <div className="note-body">
        <p className="note-text">{text}</p>

        <small className="note-date">
          📅 Created: {createdAt}
        </small>

        {updatedAt && (
          <small className="note-date">
            ✏ Updated: {updatedAt}
          </small>
        )}
      </div>

      <div className="note_footer">
        <button
  className="note_btn delete_btn"
  onClick={() => deleteHandler(id)}
>
  🗑 Delete
</button>

<button
  className="note_btn edit_btn"
  onClick={() => editHandler(id, text)}
>
  ✏ Edit
</button>
      </div>
    </div>
  );
};

export default Note;