'use client'
import { useUser } from "@/AuthProvider/UserContext";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
// Handle login
export const useUserLogin = () => {
    const { setToken } = useUser()
    const router = useRouter();
    return useMutation({
        mutationFn: async (user_info: object) => {
            const { data } = await axios.post(`${process.env.NEXT_PUBLIC_SERVER_URL}/login`, user_info, { withCredentials: true });
            return data;
        },
        mutationKey: ['login'],
        onSuccess: (data) => {
            if (data.role === 'Admin') {
                toast.success('Login successfully');
                localStorage.setItem('token', data?.token);
                setToken(data?.token || null)
                setTimeout(() => {
                    router.replace('/admin-dashboard')
                }, 3000)
            }
            else if (data.role === "User") {
                toast.success('Login successfully');
                localStorage.setItem('token', data?.token);
                setToken(data?.token || null);
                setTimeout(() => {
                    router.replace('/lessons')
                }, 3000)
            }
        },
        onError: (error: any) => {
            const errorMessage = (error as { response?: { data?: { error?: string } } })?.response?.data?.error || 'An unexpected error occurred.';
            toast.error(`Login failed: ${errorMessage}`);
            console.error(errorMessage);
        }
    });
}
