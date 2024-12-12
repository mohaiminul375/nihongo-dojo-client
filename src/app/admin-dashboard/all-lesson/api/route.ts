import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import axios from "axios"
// get lessons admin
export const useGetLessons = () => {
    const { data, isPending, isError, error } = useQuery({
        queryFn: async () => {
            const { data } = await axios.get(`${process.env.NEXT_PUBLIC_SERVER_URL}/all-lesson`)
            return data;
        },
        queryKey: ['all-lesson']
    })
    return { data, isPending, isError, error }
}
// delete lessons
export const useDeleteLesson = () => {
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: async (id: string) => {
            const { data } = await axios.delete(`${process.env.NEXT_PUBLIC_SERVER_URL}/all-lesson/${id}`)
            return data;
        },
        mutationKey: ['delete-lesson'],
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['all-lesson'] })
        }
    })
}