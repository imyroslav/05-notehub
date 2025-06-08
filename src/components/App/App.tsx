import { useState } from "react";
import { useQuery, keepPreviousData } from "@tanstack/react-query";
import ReactPaginate from "react-paginate";
import toast, { Toaster } from "react-hot-toast";

import NoteList from "../NoteList/NoteList";
import SearchBox from "../SearchBox/SearchBox";
import css from "./App.module.css";



export default function App() {

    const [currentQuery, setCurrentQuery] = useState("");
    const [currentPage, setCurrentPage] = useState(1);


    const { data, isLoading, isError , isSuccess} = useQuery<GetMovies>({
        queryKey: ["notes", currentQuery, currentPage],
        queryFn: () => fetchNotes(currentQuery, currentPage),
        enabled: currentQuery !== "",
        placeholderData: keepPreviousData,
    })

    const handleSearch = (newQuery: string) => {
        setCurrentQuery(newQuery);
        setCurrentPage(1);
    };


    return (
        <div className={css.app}>
	        <header className={css.toolbar}>
		    {<SearchBox onSubmit={handleSearch} />}
		    {/* Пагінація */}
		    {/* Кнопка створення нотатки */}
            </header>
            <NoteList />
        </div>
    )
}