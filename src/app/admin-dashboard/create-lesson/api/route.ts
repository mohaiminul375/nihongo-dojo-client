import { useMutation, useQueryClient } from "@tanstack/react-query"
import axios from "axios"
// Create or ADD a lesson
export const useCreateLesson = () => {
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: async (new_lesson: object) => {
            const { data } = await axios.post(`${process.env.NEXT_PUBLIC_SERVER_URL}/all-lesson`, new_lesson);
            return data;
        },
        mutationKey: ['create-lesson'],
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['all-lesson'] })
        }
    })
}