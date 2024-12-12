import { useMutation } from "@tanstack/react-query"
import axios from "axios"

export const useCreateVocabulary = () => {
    return useMutation({
        mutationFn: async (vocabulary) => {
            const { data } = await axios.post(`${process.env.NEXT_PUBLIC_SERVER_URL}/all-vocabulary`, vocabulary)
            return data;
        },
        mutationKey: ['create-vocabulary']
    })
}