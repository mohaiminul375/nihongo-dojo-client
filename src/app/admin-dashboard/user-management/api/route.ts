import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import axios from "axios"
import toast from "react-hot-toast"

export const useGetUsers = () => {
    const { data, isPending, isError, error } = useQuery({
        queryFn: async () => {
            const { data } = await axios.get(`${process.env.NEXT_PUBLIC_SERVER_URL}/all-users`)
            return data;
        },
        queryKey: ['all-user']
    })
    return { data, isPending, isError, error }
}
// role change
export const useUpdateRole = (id: string) => {
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: async (role) => {
            console.log('inisde ', id, role)
            const { data } = await axios.patch(`${process.env.NEXT_PUBLIC_SERVER_URL}/update-users/${id}`, role)
            return data;
        },
        mutationKey: ['update-role'],
        onSuccess: (data) => {
            if (data.modifiedCount > 0) {
                toast.success('role update successfully')
            }
            queryClient.invalidateQueries({ queryKey: ['all-users'] })
        }, onError: () => {
            toast.error('operation failed')
        }
    })
}
// update status
export const useUpdateStatus = () => {
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: async ({ id, status }) => {

            const { data } = await axios.put(`${process.env.NEXT_PUBLIC_SERVER_URL}/update-status/${id}`, status)
            return data;
        },
        mutationKey: ['update-role'],
        onSuccess: (data) => {

            queryClient.invalidateQueries({ queryKey: ['all-users'] })
        }, onError: () => {
            toast.error('operation failed')
        }
    })
}
// delete user
export const useDeleteUser = () => {
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: async (id: string) => {
            const { data } = await axios.delete(`${process.env.NEXT_PUBLIC_SERVER_URL}/all-users/${id}`)
            return data;
        },
        mutationKey: ['delete-users'],
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['all-users'] })
        }
    })
}