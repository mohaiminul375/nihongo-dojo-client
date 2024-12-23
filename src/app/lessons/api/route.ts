import { useMutation, useQuery } from "@tanstack/react-query"
import axios from "axios";
interface Lessons {
    lesson_no: number,
    lesson_name: string,
    vocabulary_count: string,
}

interface Progress {
    vocabulary_count: string,
    _id: string;
    lesson_no: number,
    lesson_name: string,
}

export const useGetLessonsUser = () => {
    const { data, isPending, isError, error } = useQuery<Progress[]>({
        queryFn: async () => {
            const { data } = await axios.get(`${process.env.NEXT_PUBLIC_SERVER_URL}/all-lesson-users`)
            return data;
        },
        queryKey: ['all-lesson']
    })
    return { data, isPending, isError, error }
}
// interface WordData {
//     _id: string;
//     word: string;
//     pronunciation: string;
//     when_to_say: string;
//     english_meaning: string;
//     lesson_no: number;
//     createAt: string;
// }

interface WordData {
    _id: string;
    word: string;
    pronunciation: string;
    when_to_say: string;
    english_meaning: string;
    lesson_no: number;
    createAt: string;
    totalCount: number;
}

interface QueryResponse {
    data: WordData[];
    currentPage: number;
    totalPages: number;
    totalCount: number;
}

// Get lesson content by lesson_no or all lessons
export const useGetLessonsContent = (lesson_no: string | string[], page: number) => {
    const { data, isLoading, isError, error } = useQuery<QueryResponse>({
        queryFn: async () => {
            const { data } = await axios.get(
                `${process.env.NEXT_PUBLIC_SERVER_URL}/all-lesson-users/${lesson_no}`,
                {
                    params: { page },
                }
            );
            return data;
        },
        queryKey: ['lessons-content', lesson_no, page],
    });

    return { data, isLoading, isError, error };
};
// Get heading information for heading ex: lesson_no and lesson_name
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
// Update Progress by user activity
export const useUpdateProgress = () => {
    return useMutation({
        mutationFn: async (newProgress: object) => {
            const { data } = await axios.post(`${process.env.NEXT_PUBLIC_SERVER_URL}/progress`, newProgress)
            return data;
        },
        mutationKey: ['progress']
    })
}
// Progress by email
export const useGetProgress = (email: string) => {
    const { data, isPending, isError, error } = useQuery({
        queryFn: async () => {
            const { data } = await axios.get(`${process.env.NEXT_PUBLIC_SERVER_URL}/progress/${email}`)
            return data;
        },
        queryKey: ['progress']
    })
    return { data, isPending, isError, error }
}