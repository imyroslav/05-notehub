// import { useQueryClient } from "@tanstack/react-query";
import { type Note } from "../types/note"
import css from "./NoteList.module.css";

interface NoteListProps {
    onSelect: (note: Note) => void;
    notes: Note[];
}

export default function NoteList({ onSelect, notes }: NoteListProps) {
    
    // const queryClient = useQueryClient();

    return (
        <ul className={css.list}>
            {/* Набір елементів списку нотатків */}
            {notes.map((note) => (
                <li key={note.id}
                    className={css.listItem}
                    onClick={() => onSelect(note)}
                    role="button"
                >
                    <h2 className={css.title}>{note.title}</h2>
                    <p className={css.content}>{note.content}</p>
                    <div className={css.footer}>
                        <span className={css.tag}>{note.tag}</span>
                        <button className={css.button}>Delete</button>
                    </div>
                </li>))}
        </ul>)
    
}