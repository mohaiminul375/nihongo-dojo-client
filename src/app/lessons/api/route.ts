import { useQuery } from "@tanstack/react-query"
import axios from "axios";

export const useGetLessonsUser = () => {
    const { data, isPending, isError, error } = useQuery({
        queryFn: async () => {
            const { data } = await axios.get(`${process.env.NEXT_PUBLIC_SERVER_URL}/all-lesson-users`)
            return data;
        },
        queryKey: ['all-lesson']
    })
    return { data, isPending, isError, error }
}