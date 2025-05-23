'use client'
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { EyeIcon, EyeOffIcon } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { useUserLogin } from "./api/route";
import Head from 'next/head';
// types for Inputs
type Inputs = {
    email: string;
    password: string;

}
// Main page
const Login = () => {
    // const router = useRouter();
    const login = useUserLogin();
    // react hook form
  
    const {
        register,
        handleSubmit,
        // watch,
        // formState: { errors },
    } = useForm<Inputs>()
    const onSubmit: SubmitHandler<Inputs> = async (user_info) => {
        console.log(user_info)
        await login.mutateAsync(user_info);

    }
    const [showPassword, setShowPassword] = useState(false);
    return (
        <section>
            <title>Nihongo-Dojo | Login</title>
            <div className="border-2 rounded-md md:max-w-[500px] mx-auto bg-foreground text-white p-5 py-20 shadow-2xl">
                <h2 className="text-center font-bold text-2xl mb-6">Log In </h2>

                {/* Form */}
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">


                    {/* Email Field */}
                    <div className="grid w-full items-center gap-1.5">
                        <Label htmlFor="email">Email <span className='text-red-700 font-bold'>*</span></Label>
                        <Input type="email" id="email" placeholder="Enter email"
                            required
                            defaultValue='nusrat@gmail.com'
                            {...register('email')}
                        />
                    </div >

                    {/* Password Field */}
                    < div className='grid w-full items-center gap-1.5' >
                        <Label htmlFor="password">Password <span className='text-red-700 font-bold'>*</span></Label>
                        <div className="relative">
                            <Input
                                type={showPassword ? 'text' : 'password'}
                                id="password"
                                placeholder="Enter password"
                                className="pr-10"
                                required
                                defaultValue='123456'
                                {...register('password')}
                            />
                            <Button
                                type="button"
                                variant="ghost"
                                size="icon"
                                className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                                onClick={() => setShowPassword(!showPassword)}
                                aria-label={showPassword ? 'Hide password' : 'Show password'}
                            >
                                {showPassword ? (
                                    <EyeOffIcon className="h-4 w-4" />
                                ) : (
                                    <EyeIcon className="h-4 w-4" />
                                )}
                            </Button>
                        </div>
                    </div >

                    {/* Submit Button */}
                    < Button variant="default" size="lg" className="shadow-2xl font-semibold w-full" >
                        Login
                    </Button >
                </form >
                {/* Navigate To Register Page */}
                < div className='mt-3 text-center' >
                    <p className='text-sm'>New Here? <Link
                        href='/register'
                        className='hover:underline cursor-pointer'>Please Register</Link>
                    </p>
                </div >
            </div >
        </section >

    );
};

export default Login;