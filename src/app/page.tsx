'use client'
import { useAuth } from "@/AuthProvider/UserContext";
import { useRouter } from "next/navigation"
import Loading from "./loading";

export default function Page() {
  const { user, loading } = useAuth();

  const router = useRouter();

  if (loading) {
    return <Loading />
  }

  if (!user) {
    return router.push('/login')
  }
  // console.log(user)
  if (user.role == 'User') {
    router.push('/lessons')
  }
  if (user.role == 'Admin') {
    router.push('/admin-dashboard')
  }




}
