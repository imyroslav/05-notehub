import css from "./SearchBox.module.css";


interface SearchBoxProps {
    // value: string;
    onSubmit: (query: string) => void;
}
export default function SearchBox({ onSubmit }: SearchBoxProps) {
    const handleSubmit = (formData: FormData): void => {
        
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