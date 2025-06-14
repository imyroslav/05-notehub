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
  page: number,
  perPage: number,
  search: string
): Promise<{ notes: Note[]; totalPages: number; }> => {
  
  const response = await request.get("/notes", {
    params: {
      page,
      perPage: 12,
      ...(search !== "" && { search: search }),
    }
  });

  // return response.data
  return {
    notes: response.data.notes,
    totalPages: response.data.totalPages,
  };
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
