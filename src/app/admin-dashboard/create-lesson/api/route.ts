import { useMutation } from "@tanstack/react-query"
import axios from "axios"

export const useCreateLesson = () => {
    return useMutation({
        mutationFn: async (new_lesson) => {
            const { data } = await axios.post(`${process.env.NEXT_PUBLIC_SERVER_URL}/all-lesson`, new_lesson);
            return data;
        },
        mutationKey: ['create-lesson']
    })
}