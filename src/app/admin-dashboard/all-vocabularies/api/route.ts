import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
interface Vocabulary {
    id: string;
    word: string;
    meaning: string;
    lesson_no: string;
}

interface UseGetVocabulariesAdminReturn {
    data: Vocabulary[] | undefined;
    isPending: boolean;
    isError: boolean;
    error: unknown;
}

export const useGetVocabulariesAdmin = (lesson_no: string): UseGetVocabulariesAdminReturn => {
    const { data, isLoading: isPending, isError, error } = useQuery({
        queryFn: async () => {
            const { data } = await axios.get<Vocabulary[]>(
                `${process.env.NEXT_PUBLIC_SERVER_URL}/all-vocabulary?lesson_no=${lesson_no}`
            );
            return data;
        },
        queryKey: ['all-vocabularies', lesson_no],
    });

    return { data, isPending, isError, error };
};
// delete a vocabulary
export const useDeleteVocabulary = () => {
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: async (id: string) => {
            const { data } = await axios.delete(`${process.env.NEXT_PUBLIC_SERVER_URL}/all-vocabulary/${id}`)
            return data;
        },
        mutationKey: ['delete-vocabulary'],
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['all-vocabularies'] })
        }
    })
}