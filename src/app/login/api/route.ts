'use client'
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

export const useUserLogin = () => {
    const router = useRouter();
    return useMutation({
        mutationFn: async (user_info: object) => {
            const { data } = await axios.post(`${process.env.NEXT_PUBLIC_SERVER_LOCAL}/login`, user_info, { withCredentials: true });
            return data;
        },
        mutationKey: ['login'],
        onSuccess: (data) => {
            console.log(data);
            if (data) {
                console.log(data)
                toast.success('Login successfully');
                localStorage.setItem('token', data?.token);
                router.push('/')

            }
        },
        onError: (error) => {
            toast.error('Login failed. Please try again.');
            console.error(error);
        }
    });
}
