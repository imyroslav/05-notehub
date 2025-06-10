import axios from "axios";
import { type Note } from "../types/note"


export interface GetNotes {
    notes: Note[];
    page: number;
    perPage: number;
    totalPages: number;
}


export const fetchNotes = async (
    newQuery: string,
    page: number = 1,
    perPage: number = 3): Promise<GetNotes> => {
    
    const reqConfig = {
        url: "https://notehub-public.goit.study/api/notes",
        headers: {
            accept: "application/json",
            Authorization: `Bearer ${import.meta.env.VITE_ACCESS_TOKEN}`
        }
    }
    
    const reply = await axios.get<GetNotes>(
        `${reqConfig.url}?search=${newQuery}&page=${page}&perPage=${perPage}`,
        reqConfig
    );
    return reply.data;
}

