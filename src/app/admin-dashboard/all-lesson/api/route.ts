import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import axios from "axios"
import toast from "react-hot-toast"
// get lessons admin
export const useGetLessons = () => {
    const { data, isPending, isError, error } = useQuery({
        queryFn: async () => {
            const { data } = await axios.get(`${process.env.NEXT_PUBLIC_SERVER_URL}/all-lesson`)
            return data;
        },
        queryKey: ['all-lesson']
    })
    return { data, isPending, isError, error }
}

// update lesson
export const useUpdateLesson = (id: string) => {
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: async (update_info:object) => {
            const { data } = await axios.patch(`${process.env.NEXT_PUBLIC_SERVER_URL}/all-lesson/${id}`, update_info)
            return data;
        },
        mutationKey: ['update-lesson'],
        onSuccess: (data) => {
            if (data.acknowledged) {
                toast.success('update successfully')
            }
            queryClient.invalidateQueries({ queryKey: ['all-lesson'] })
        },
        onError: () => {
            toast.error('Operation failed try again later')
        }
    })
}

// delete lessons
export const useDeleteLesson = () => {
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: async (id: string) => {
            const { data } = await axios.delete(`${process.env.NEXT_PUBLIC_SERVER_URL}/all-lesson/${id}`)
            return data;
        },
        mutationKey: ['delete-lesson'],
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['all-lesson'] })
        }
    })
}