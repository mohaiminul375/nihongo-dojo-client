'use client'

import { useUser } from "@/AuthProvider/UserContext";
import { useRouter } from "next/navigation"

export default function page() {
  const { user, loading } = useUser();

  const router = useRouter();

  if (loading) {
    return
  }
  console.log(user)
  if (!user) {
    router.push('/login')
  }
  if (user.role == 'User') {
    router.push('/lessons')
  }
  if (user.role == 'Admin') {
    router.push('/admin-dashboard')
  }

}
