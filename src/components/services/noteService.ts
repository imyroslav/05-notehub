import axios from "axios";
import type { Note } from "../types/note";

export interface GetNotes {
  notes: Note[];
  totalPages: number;
}


const request = {
  url: "https://notehub-public.goit.study/api/notes",
  headers: {
    accept: "application/json",
    Authorization: `Bearer ${import.meta.env.VITE_ACCESS_TOKEN}`,
  },
};

export const fetchNotes = async (
  page = 1,
  perPage = 12,
  search = " "
): Promise<GetNotes> => {
  const params: Record<string, string | number> = {
    page,
    perPage,
  };

  if (search.trim() !== "") {
    params.search = search.trim();
  }

  const response = await axios.get(`${request.url}?search=${params.search}&page=1&perPage=12`, request
  
  );

  return response.data;
};

export const createNote = async (note: {
  title: string;
  content: string;
  tag: string;
}): Promise<Note> => {
  const response = await axios.post<Note>(`${request.url}`, note,
    request);
  return response.data;
};

export const deleteNote = async (id: number): Promise<Note> => {
  const response = await axios.delete<Note>(`${request.url}/${id}`);
  return response.data;
};