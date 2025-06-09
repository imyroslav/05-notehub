import css from "./SearchBox.module.css";
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
    return (
        <form className={css.form} action={handleSubmit}>
        <input
            className={css.input}
            type="text"
            name="query"
            autoComplete="off"
            placeholder="Search notes..."
            autoFocus
        />
        <button className={css.button} type="submit">
            Search
        </button>
    </form>
    )

    
}