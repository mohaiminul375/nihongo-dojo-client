import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import toast from "react-hot-toast";

export const useUserLogin = () => {
    return useMutation({
        mutationFn: async (user_info: object) => {
            const { data } = await axios.post(`http://localhost:5000/login`, user_info, { withCredentials: true });
            return data;
        },
        mutationKey: ['login'],
        onSuccess: (data) => {
            console.log(data, 'onsuccess');
            if (data.user) {
                toast.success('login successfully');
                localStorage.setItem('token', data.token);
            }
        }
    }

    )
}