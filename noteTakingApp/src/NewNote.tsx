import { NoteData } from "./App";
import NoteForm from "./NoteForm";

interface NewNoteProps {
  onSubmit: (note: NoteData) => void;
}

export default function NewNote({ onSubmit }: NewNoteProps) {
  return (
    <>
      <h1 className="mb-4">New NOte</h1>
      <NoteForm onSubmit={onSubmit} />{" "}
    </>
  );
}
