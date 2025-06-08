import styles from "./SearchBox.module.css";
import toast from "react-hot-toast";

interface SearchBoxProps {
    onSubmit: (query: string) => void;
}
export default function SearchBox({ onSubmit }: SearchBoxProps) {
    const handleSubmit = (formData: FormData): void => {
        if (formData.get("query") === "") {
            toast.error("Please enter your search word")
            return;
        }
        const query = formData.get("query") as string;
        onSubmit(query);
    }
    return;

    <form className={styles.form} action={handleSubmit}>
        <input
            className={styles.input}
            type="text"
            name="terssera"
            autoComplete="off"
            placeholder="Search notes..."
            autoFocus
        />
        <button className={styles.button} type="submit">
             Search
        </button>
    </form>
}