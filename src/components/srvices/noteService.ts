import axios from "axios";
import { type Note } from "../types/note"


export interface GetNotes {
    notes: Note[];
    totalPages: number;
}


export const fetchNotes = async (
    newQuery: string,
    page: number = 1): Promise<GetNotes> => {
    
    const reqConfig = {
        url: "https://notehub-public.goit.study/api/notes?search=",
        headers: {
            accept: "application/json",
            Authorization: `Bearer ${import.meta.env.VITE_ACCESS_TOKEN}`
        }
    }
    
    const reply = await axios.get<GetNotes>(
        `${reqConfig.url}?query=${newQuery}&page=${page}`,
        reqConfig
    );
    return reply.data;
}

