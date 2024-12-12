import { useQuery } from "@tanstack/react-query"
import axios from "axios"

export const useGetUsers = () => {
    const { data, isPending, isError, error } = useQuery({
        queryFn: async () => {
            const { data } = await axios.get(`${process.env.NEXT_PUBLIC_SERVER_URL}/all-users`)
            return data;
        },
        queryKey: ['all-user']
    })
    return { data, isPending, isError, error }
}