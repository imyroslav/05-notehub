import axios from "axios";
import type { Note } from "../types/note";

export interface GetNotes {
  notes: Note[];
  totalPages: number;
}

const request = axios.create({
  baseURL: "https://notehub-public.goit.study/api",
  headers: {
    Authorization: `Bearer ${import.meta.env.VITE_ACCESS_TOKEN}`,
  },
});

export const fetchNotes = async (
  page: number = 1,
  perPage: number = 12,
  search: string = ""
): Promise<GetNotes> => {

  const response = await request.get("/notes", {
    params: {
      page,
      perPage,
      ...(search !== "" && { search: search }),
    }
  });

  return response.data
};

export const createNote = async (note: {
  title: string;
  content: string;
  tag: string;
}): Promise<Note> => {
  const response = await request.post<Note>('/notes', note);
  return response.data;
};

export const deleteNote = async (id: number): Promise<Note> => {
  const response = await request.delete<Note>(`/notes/${id}`);
  return response.data;
};
