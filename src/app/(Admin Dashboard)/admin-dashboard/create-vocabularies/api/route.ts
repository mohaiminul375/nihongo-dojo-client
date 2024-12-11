// import Vocabulary from "@/components/Admin-Dashboard/Vocabulary/Vocabulary"
import { useMutation } from "@tanstack/react-query"
import axios from "axios"
// create vocabulary
export const useCreateVocabulary = () => {
    return useMutation({
        mutationFn: async (vocabulary: object) => {
            const { data } = await axios.post(`${process.env.NEXT_PUBLIC_SERVER_URL}/all-vocabulary`, vocabulary)
            return data;
        },
        onError: () => {

        },
        mutationKey: ['create-vocabulary']
    })
}