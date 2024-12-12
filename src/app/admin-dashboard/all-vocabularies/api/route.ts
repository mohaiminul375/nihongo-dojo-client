import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
interface Vocabulary {
    id: string;
    word: string;
    meaning: string;
    lesson_no: string;
}

interface UseGetVocabulariesAdminReturn {
    data: Vocabulary[] | undefined; // Or the appropriate type returned by the API
    isPending: boolean;
    isError: boolean;
    error: unknown; // Adjust based on your error type
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
