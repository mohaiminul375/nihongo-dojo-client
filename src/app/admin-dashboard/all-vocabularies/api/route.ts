import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import toast from 'react-hot-toast';
interface Vocabulary {
    // vocabulary: object,
    _id: string,
    word: string,
    pronunciation: string,
    when_to_say: string,
    english_meaning: string,
    lesson_no: number,
}

// TODO: May have some error
// Get Vocabularies for admin
export const useGetVocabulariesAdmin = (lesson_no: string) => {
    const { data, isLoading: isPending, isError, error } = useQuery<Vocabulary[]>({
        queryFn: async () => {
            const { data } = await axios.get(
                `${process.env.NEXT_PUBLIC_SERVER_URL}/all-vocabulary?lesson_no=${lesson_no}`
            );
            return data;
        },
        queryKey: ['all-vocabularies', lesson_no],
    });

    return { data, isPending, isError, error };
};

// update vocabulary
export const useUpdateVocabulary = (id: string) => {
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: async (update_info: object) => {
            console.log(update_info, 'update info')
            const { data } = await axios.patch(`${process.env.NEXT_PUBLIC_SERVER_URL}/all-vocabulary/${id}`, update_info)
            return data;
        },
        mutationKey: ['update-vocabulary'],
        onSuccess: (data) => {
            if (data.acknowledged) {
                toast.success('update successfully')
            }
            queryClient.invalidateQueries({ queryKey: ['all-vocabularies'] })
        },
        onError: () => {
            toast.error('Operation failed try again later')
        }
    })
}
















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