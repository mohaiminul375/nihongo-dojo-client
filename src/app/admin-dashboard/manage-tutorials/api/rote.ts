import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import axios from "axios"
import toast from "react-hot-toast"
// get all tutorials
export const useGetTutorials = () => {
    const { data, isPending, isError, error } = useQuery({
        queryFn: async () => {
            const { data } = await axios.get(`${process.env.NEXT_PUBLIC_SERVER_URL}/all-tutorials`, { withCredentials: true })
            return data
        },
        queryKey: ["all-tutorials"]
    })
    return { data, isPending, isError, error }
}


// create tutorial
export const useCreateTutorials = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: async (embed_link) => {
            const { data } = await axios.post(`${process.env.NEXT_PUBLIC_SERVER_URL}/all-tutorials`, { embed_link });
            return data
        },
        onSuccess: (data) => {
            if (data.insertedId) {
                toast.success('new video Added')
                queryClient.invalidateQueries({ queryKey: ['all-tutorials'] })
            }
        },
        onError: (error) => {
            console.log(error)
        },
        mutationKey: ['create-video']
    })
}
// delete tutorial
export const useDeleteTutorial = () => {
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: async (id: string) => {
            const { data } = await axios.delete(`${process.env.NEXT_PUBLIC_SERVER_URL}/all-lesson/${id}`)
            return data;
        },
        onSuccess: (data) => {
            console.log(data)
            queryClient.invalidateQueries({ queryKey: ['all-lesson'] })
        },
        onError: (error) => {
            console.log(error)
        },
        mutationKey: ['create-video']
    })
}