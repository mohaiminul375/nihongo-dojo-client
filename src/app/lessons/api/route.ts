import { useMutation, useQuery } from "@tanstack/react-query"
import axios from "axios";

export const useGetLessonsUser = () => {
    const { data, isPending, isError, error } = useQuery({
        queryFn: async () => {
            const { data } = await axios.get(`${process.env.NEXT_PUBLIC_SERVER_URL}/all-lesson-users`)
            return data;
        },
        queryKey: ['all-lesson']
    })
    return { data, isPending, isError, error }
}

// get lesson content by lesson_no
export const useGetLessonsContent = (lesson_no: string | string[], page: number) => {
    const { data, isPending, isError, error } = useQuery({
        queryFn: async () => {
            const { data } = await axios.get(`${process.env.NEXT_PUBLIC_SERVER_URL}/all-lesson-users/${lesson_no}`, {
                params: { page }, // Add the page parameter
            });
            return data;
        },
        queryKey: ['lessons-content', lesson_no, page], // Include lesson_no and page in the query key for caching
    });

    return { data, isPending, isError, error };
};

export const useGetLessonHeading = (lesson_no: string | string[]) => {
    const { data, isPending, isError, error } = useQuery({
        queryFn: async () => {
            const { data } = await axios.get(`${process.env.NEXT_PUBLIC_SERVER_URL}/lesson-heading/${lesson_no}`)
            return data;
        },
        queryKey: ['lessons-heading']
    })
    return { data, isPending, isError, error }
}
// Update Progress
export const useUpdateProgress = () => {
    return useMutation({
        mutationFn: async (newProgress: object) => {
            const { data } = await axios.post(`${process.env.NEXT_PUBLIC_SERVER_URL}/progress`, newProgress)
            return data;
        },
        mutationKey: ['progress']
    })
}