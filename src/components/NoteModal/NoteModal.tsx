import css from "./NoteModal.module.css"
import { createPortal } from "react-dom";
import { type Note } from "../types/note";
import { useEffect } from "react";

interface NoteModalProps {
    note: Note| null;
    onClose: () => void;
}


export default function NoteModal({ note, onClose }: NoteModalProps) {
    useEffect(() => {
        const handleKeyDown = (event: KeyboardEvent) => {
            if (event.key === "Escape") {
                onClose();
            }
        };

        document.addEventListener("keydown", handleKeyDown);
        document.body.style.overflow = "hidden";
        return () => {
            document.removeEventListener("keydown", handleKeyDown);
            document.body.style.overflow = "";
        }
    }, [onClose])
    
    const handleBackDropClick = (event: React.MouseEvent<HTMLDivElement>) => {
        if (event.target === event.currentTarget) {
            onClose();
        }
    };
    if (!note) {
        return null;
    }

    return createPortal(
        <div
            className={css.backdrop}
            onClick={handleBackDropClick}
            role="dialog"
            aria-modal="true">

            <div className={css.modal}>
                <button
                    className={css.closeButton}
                    aria-label="Close modal"
                    onClick={onClose}>
                    &times;
                </button>
                <div className={css.content}>
                    <h2>{note.title}</h2>
                    <p>{note.content}</p>
                    <p>{note.tag}</p>
                </div>
            </div>
        </div>,
        document.body
    );
}




