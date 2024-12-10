'use client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { EyeIcon, EyeOffIcon } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import React, { useState } from 'react';
import ImageUploading from 'react-images-uploading';
import { useForm, SubmitHandler } from "react-hook-form";
// types for Inputs
type Inputs = {
    user_name: string;
    email: string;
    password: string;
    img: object;
}
const Register = () => {
    const [showPassword, setShowPassword] = useState(false);
    const [images, setImages] = useState([]);
    // react hook form
    const {
        register,
        handleSubmit,
        // watch,
        formState: { errors },
    } = useForm<Inputs>()
    const onSubmit: SubmitHandler<Inputs> = (user_info) => {
        user_info.img = images[0].file;
        console.log(user_info)
    }
    // Handle image change
    const handleImageChange = (imageList: []) => {

        setImages(imageList);
    };

    return (
        <section>
            <div className="border-2 rounded-md md:max-w-[500px] mx-auto bg-[#29274d] text-white p-5 py-8">
                <h2 className="text-center font-bold text-2xl mb-6">Register</h2>

                {/* Image Preview Section */}
                <div className="mb-6 flex justify-center">
                    {images.length > 0 && (
                        <Image
                            height={80}
                            width={80}
                            src={images[0]?.data_url}
                            alt="preview"
                            className=" rounded-full"
                        />
                    )}
                </div>

                {/* Form */}
                <form
                    onSubmit={handleSubmit(onSubmit)}
                    className="space-y-5">
                    {/* Name Field */}
                    <div className="grid w-full items-center gap-1.5">
                        <Label htmlFor="name">Your Name <span className='text-red-700 font-bold'>*</span></Label>
                        <Input type="text" id="name" placeholder="Enter Name"
                            required
                            {...register('user_name')}
                        />
                    </div>

                    {/* Email Field */}
                    <div className="grid w-full items-center gap-1.5">
                        <Label htmlFor="email">Email <span className='text-red-700 font-bold'>*</span></Label>
                        <Input type="email" id="email" placeholder="Enter email"
                            required
                            {...register('email')}
                        />
                    </div>

                    {/* Picture Upload */}
                    <div className="grid w-full items-center gap-1.5">
                        <Label htmlFor="picture">Picture <span className='text-red-700 font-bold'>*</span></Label>
                        <ImageUploading

                            multiple
                            value={images}
                            onChange={handleImageChange}
                            dataURLKey="data_url"
                            acceptType={['jpg', 'png', 'jpeg']}

                        >
                            {({ onImageUpload, dragProps }) => (
                                <div className="space-y-3">
                                    <Button
                                        type="button"
                                        variant="default"
                                        className="w-full"
                                        {...dragProps}
                                        onClick={onImageUpload}
                                    >
                                        Upload Image
                                    </Button>
                                </div>
                            )}
                        </ImageUploading>
                    </div>

                    {/* Password Field */}
                    <div className='grid w-full items-center gap-1.5'>
                        <Label htmlFor="password">Password <span className='text-red-700 font-bold'>*</span></Label>
                        <div className="relative">
                            <Input
                                type={showPassword ? 'text' : 'password'}
                                id="password"
                                placeholder="Enter password"
                                className="pr-10"
                                required
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
                    </div>

                    {/* Submit Button */}
                    <Button variant="default" size="lg" className="shadow-2xl font-semibold w-full">
                        Register
                    </Button>
                </form>
                {/* Navigate To Login Page */}
                <div className='mt-3 text-center'>
                    <p className='text-sm'>Already Have an Account? <Link
                        href='/login'
                        className='hover:underline cursor-pointer'>Please login</Link>
                    </p>
                </div>
            </div>
        </section >
    );
};

export default Register;
