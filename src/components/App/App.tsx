import { useState } from 'react';
import { useQuery, keepPreviousData } from "@tanstack/react-query";
import { fetchNotes } from "../../services/noteService";
import SearchBox from "../SearchBox/SearchBox";
import NoteList from "../NoteList/NoteList";
import Pagination from "../Pagination/Pagination";
import { NoteModal } from "../NoteModal/NoteModal";
import type { GetNotes } from "../../services/noteService";
import { useDebounce } from "use-debounce";
import css from "../App/App.module.css";

export default function App() {
  const [page, setPage] = useState(1); 
  const [keyword, setKeyword] = useState('');
  const [debouncedKeyword] = useDebounce(keyword, 500);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleSearchChange = (value: string) => {
    setKeyword(value);
    setPage(1);
  };

  const { data, isLoading, isError } = useQuery<GetNotes>({
    queryKey: ['notes', page, debouncedKeyword], 
    queryFn: () => fetchNotes(page, 12, debouncedKeyword),
    placeholderData: keepPreviousData,
  });

  return (
    <div className={css.app}>
      <header className={css.toolbar}>
        <SearchBox value={keyword} onSearch={handleSearchChange} />
        {data && data.totalPages > 1 && (
            <Pagination
              totalPages={data.totalPages}
              currentPage={page}
              onPageChange={setPage}
            />
          )}
        <button className={css.button} onClick={() => setIsModalOpen(true)}>
          Create note +
        </button>
      </header>
      

      {isModalOpen && (
        <NoteModal
          onClose={() => setIsModalOpen(false)}
          onSuccess={() => {
            setIsModalOpen(false);
          }}
        />
      )}

      {isLoading && <p>Loading...</p>}
      {isError && <p>Request failed</p>}

      {data && data.notes.length > 0 && (
      <NoteList notes={data.notes} />
      )}
    </div>
  );
}