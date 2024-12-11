import { useMutation, useQuery } from "@tanstack/react-query"
import axios from "axios"
import toast from "react-hot-toast"

export const useGetTutorials = () => {
    const { data, isPending, isError, error } = useQuery({
        queryFn: async () => {
            const { data } = await axios.get(`${process.env.NEXT_PUBLIC_SERVER_URL}/all-lesson`)
            return data
        },
        queryKey: ["all-lesson"]
    })
    return { data, isPending, isError, error }
}


// create tutorial
export const useCreateTutorials = () => {
    return useMutation({
        mutationFn: async (embed_link) => {
            const { data } = await axios.post(`${process.env.NEXT_PUBLIC_SERVER_URL}/all-lesson`, { embed_link });
            return data
        },
        onSuccess: (data) => {
            if (data.insertedId) {
                toast.success('new video Added')
            }
        },
        mutationKey: ['create-video']
    })
}