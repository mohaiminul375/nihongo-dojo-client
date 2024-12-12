import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

export const useUserLogin = () => {
    const router = useRouter;
    return useMutation({
        mutationFn: async (user_info: object) => {
            const { data } = await axios.post(`http://localhost:5000/login`, user_info, { withCredentials: true });
            return data;
        },
        mutationKey: ['login'],
        onSuccess: (data) => {
            console.log(data);
            if (data) {
                sessionStorage.setItem('user_data', data)
                // send to home page
                router.push('/')

            }

        }
    }

    )
}