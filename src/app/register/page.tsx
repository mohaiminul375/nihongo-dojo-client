'use client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { EyeIcon, EyeOffIcon } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import React, { useState } from 'react';
import ImageUploading, { ImageListType } from 'react-images-uploading';
import { useForm, SubmitHandler } from "react-hook-form";
import toast from 'react-hot-toast';
import axios from 'axios';
import { useCreateUser } from './api/route';
import { useRouter } from 'next/navigation';
// types for Inputs
type Inputs = {
    user_name: string;
    email: string;
    password: string;
    img: File;
}
const Register = () => {
    const router = useRouter()
    const createUser = useCreateUser();
    const [showPassword, setShowPassword] = useState(false);
    const [images, setImages] = useState<ImageListType>([]);
    // react hook form
    const {
        register,
        handleSubmit,
        // watch,
        formState: { errors },
    } = useForm<Inputs>()
    const onSubmit: SubmitHandler<Inputs> = async (user_info) => {
        if (images.length > 0 && images[0]?.file) {
            const file = images[0].file;

            // Convert file to Base64
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = async () => {
                try {
                    const base64Image = (typeof reader.result === 'string')
                        ? reader.result.split(',')[1]
                        : '';

                    // Upload to ImgBB
                    const { data: res } = await axios.post(`https://api.imgbb.com/1/upload?key=${process.env.NEXT_PUBLIC_IMG_API}`, { image: base64Image }, {
                        headers: { "content-type": "multipart/form-data" },
                    });

                    // Get the image URL
                    const img_url = res?.data?.display_url;
                    console.log(img_url);
                    user_info.img = img_url;
                    if (!img_url) {
                        toast.error('Error from the image server. Please try again or contact the developer.');
                        return;
                    }
                    console.log(user_info)
                    try {
                        const response = await createUser.mutateAsync(user_info);
                        console.log(response)
                        toast.success('register successfully')
                        router.push('/')
                    } catch (error) {
                        if (error instanceof Error) {
                            console.log(error.message)
                            toast.error(error.message)
                        }
                    }

                    // Successfully obtained the image URL
                } catch (error) {
                    console.error("Image upload failed:", error);
                    // toast.error('Image upload failed. Please try again.');
                }
            };

            reader.onerror = () => {
                toast.error("Error reading the file.");
            };
        } else {
            toast.error("Image is required!");
        }

    }
    // Handle image change
    const handleImageChange = (imageList: ImageListType) => {
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
                                {...register("password", {
                                    required: 'Password is required',
                                    minLength: {
                                        value: 6,
                                        message: 'Password must be at least 6 characters long'
                                    }
                                })}
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
                        {errors.password && <p className='text-red-700 text-sm'>{errors.password.message}</p>}
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
