import axios from "axios";
import type { Note } from "../types/note";

export interface GetNotes {
  notes: Note[];
  totalPages: number;
}

export interface Params {
  params: {
    page: number;
    perPage: number;
    search?: string;
  }
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
): Promise<GetNotes> => {

  const params: Params["params"] = {
    page,
    perPage: 12,
    ...(search !== "" && { search: search }),
  }
  
  const response = await request.get("/notes", {
    params
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
