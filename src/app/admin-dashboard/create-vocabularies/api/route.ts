import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import axios from "axios"
interface Lessons {
    lesson: object
    lesson_no: number;
    lesson_name: string | number;
}
// Create a new vocabulary
export const useCreateVocabulary = () => {
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: async (vocabulary: object) => {
            const { data } = await axios.post(`${process.env.NEXT_PUBLIC_SERVER_URL}/all-vocabulary`, vocabulary)
            return data;
        },
        mutationKey: ['create-vocabulary'],
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['all-lesson'] })
            queryClient.invalidateQueries({ queryKey: ['all-vocabulary'] })

        }
    })
}
// dynamic lessons for dropdown menu./selection
export const useDropdownLesson = () => {
    const { data, isLoading } = useQuery<Lessons[]>({
        queryFn: async () => {
            const { data } = await axios.get(`${process.env.NEXT_PUBLIC_SERVER_URL}/all-lesson-filter`)
            return data;
        }, queryKey: ['lesson-filter']
    })
    return { data, isLoading }

}