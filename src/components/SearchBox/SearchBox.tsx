import css from "./SearchBox.module.css";


interface SearchBoxProps {
    value: string;
    onSearch: (query: string) => void;
}
export default function SearchBox({ onSearch }: SearchBoxProps) {
    const handleSubmit = (formData: FormData): void => {
        
        const query = formData.get("query") as string;
        onSearch(query);
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