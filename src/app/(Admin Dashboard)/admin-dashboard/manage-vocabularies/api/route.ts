import { useQuery } from "@tanstack/react-query"
import axios from "axios"

export const useGetVocabulariesAdmin = () => {
    const { data, isPending, isError, error } = useQuery({
        queryFn: async () => {
            const { data } = await axios.get(`${process.env.NEXT_PUBLIC_SERVER_URL}/all-vocabulary`)
            return data;
        },
        queryKey: ['all-vocabularies']
    })
    return { data, isPending, isError, error }
}