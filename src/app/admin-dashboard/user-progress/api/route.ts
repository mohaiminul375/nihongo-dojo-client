import { useQuery } from "@tanstack/react-query"
import axios from "axios"
interface Progresses {
    _id: string
    email: string,
    lessons: Array<[]>,
}
export const useAllProgress = () => {
    const { data, isPending, isError, error } = useQuery<Progresses[]>({
        queryFn: async () => {
            const { data } = await axios.get(`${process.env.NEXT_PUBLIC_SERVER_URL}/progress`)
            return data;
        },
        queryKey: ['all-progress']
    })
    return { data, isPending, isError, error }
}