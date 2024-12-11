import { useQuery } from "@tanstack/react-query"
import axios from "axios"

export const useGetVocabulariesAdmin = (lesson_no: string) => {
    const { data, isPending, isError, error } = useQuery({
        queryFn: async () => {
            const { data } = await axios.get(`${process.env.NEXT_PUBLIC_SERVER_URL}/all-vocabulary?lesson_no=${lesson_no}`)
            return data;
        },
        queryKey: ['all-vocabularies', lesson_no]
    })
    return { data, isPending, isError, error }
}