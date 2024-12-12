import { useMutation, useQueryClient } from "@tanstack/react-query"
import axios from "axios"

export const useCreateVocabulary = () => {
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: async (vocabulary) => {
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