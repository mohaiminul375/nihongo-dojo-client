import { useMutation } from "@tanstack/react-query"
import axios from "axios"

export const useCreateUser = () => {
    return useMutation({
        mutationFn: async (user_info: object) => {
            const { data } = await axios.post(`${process.env.NEXT_PUBLIC_SERVER_URL}/register`, user_info);
            return data;
        },
        mutationKey: ['register']
    })
}