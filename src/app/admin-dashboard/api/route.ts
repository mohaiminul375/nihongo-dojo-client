import { useQuery } from "@tanstack/react-query";
import axios from "axios";

export const useDashboardSummary = () => {
    const { data, isPending, isError, error } = useQuery({
        queryFn: async () => {
            const { data } = await axios.get(`${process.env.NEXT_PUBLIC_SERVER_URL}/admin-dashboard-summary`)
            return data;
        },
        queryKey: ['admin-summary']
    })
    return { data, isPending, isError, error }
}