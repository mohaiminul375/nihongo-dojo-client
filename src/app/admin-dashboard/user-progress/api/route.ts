import { useQuery } from "@tanstack/react-query"
import axios from "axios"

export const useAllProgress = () => {
    const { data, isPending, isError, error } = useQuery({
        queryFn: async () => {
            const { data } = await axios.get(`${process.env.NEXT_PUBLIC_SERVER_URL}/progress`)
            return data;
        },
        queryKey: ['all-progress']
    })
    return { data, isPending, isError, error }
}