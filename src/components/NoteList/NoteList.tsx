import { type Note } from "../types/note"
import css from "./NoteList.module.css";

interface NoteListProps {
    onSelect: (note: Note) => void;
    notes: Note[];
}

export default function NoteList({ onSelect, notes }: NoteListProps ) {
    return (
        <ul className={css.list}>
            {/* Набір елементів списку нотатків */}
            {notes.map((note) => (
                <li key={note.id}
                    className={css.listItem}
                    onClick={() => onSelect(note)}
                    role="button"
                >
                    <h2 className={css.title}>Note title</h2>
                    <p className={css.content}>Note content</p>
                    <div className={css.footer}>
                        <span className={css.tag}>Note tag</span>
                        <button className={css.button}>Delete</button>
                    </div>
                </li>))}
        </ul>)
    
}