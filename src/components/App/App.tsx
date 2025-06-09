import { useState } from "react";
import { useQuery, keepPreviousData } from "@tanstack/react-query";
import { Toaster } from "react-hot-toast";
import ReactPaginate from "react-paginate";
import SearchBox from "../SearchBox/SearchBox";
// import Pagination from "../Pagination/Pagination";
import NoteList from "../NoteList/NoteList";
import NoteModal from "../NoteModal/NoteModal"
import { fetchNotes } from "../srvices/noteService";
import { type Note } from "../types/note"
import type { GetNotes } from "../srvices/noteService";
import css from "./App.module.css";
// import css from "../Pagination/Pagination.module.css"





export default function App() {

    const [selectedNote, setSelectedNote] = useState<Note | null>(null)
    const [currentQuery, setCurrentQuery] = useState("");
    const [currentPage, setCurrentPage] = useState(1);


    const {data, isSuccess} = useQuery<GetNotes>({
        queryKey: ["notes", currentQuery, currentPage],
        queryFn: () => fetchNotes(currentQuery, currentPage),
        enabled: currentQuery !== "",
        placeholderData: keepPreviousData,
    })

    const handleSearch = (newQuery: string) => {
        setCurrentQuery(newQuery);
        setCurrentPage(1);
    };

    const openModal = (note: Note) => {
        setSelectedNote(note);
    };

    const closeModal = () => {
        setSelectedNote(null);
    };

    const totalPages = data?.totalPages ?? 0

    return (
        <div className={css.app}>
	        <header className={css.toolbar}>
		    {<SearchBox onSubmit={handleSearch} />}
            {isSuccess && totalPages > 1 && 
                <ReactPaginate
                pageCount={totalPages}
                pageRangeDisplayed={5}
                marginPagesDisplayed={1}
                onPageChange={({ selected }) => setCurrentPage(selected + 1)}
                forcePage={currentPage - 1}
                containerClassName={css.pagination}
                activeClassName={css.active}
                nextLabel="→"
                previousLabel="←"
            />}
            <Toaster />  
		    {/* Кнопка створення нотатки */}
            </header>
            {data?.notes && data.notes.length > 0 && <NoteList onSelect={openModal} notes={data.notes} />}
            {selectedNote !== null && (<NoteModal onClose={closeModal} note={selectedNote} />)} 
        </div>
    )
}