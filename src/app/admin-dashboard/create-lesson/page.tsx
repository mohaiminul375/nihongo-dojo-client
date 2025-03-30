'use client'
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import React from 'react';
import { useForm, SubmitHandler } from "react-hook-form";
import toast from 'react-hot-toast';
import { useCreateLesson } from './api/route';
import { useAuth } from '@/AuthProvider/UserContext';
import withAdminAuth from '@/AuthProvider/withAdminAuth';
type Inputs = {
    email: string;
    lesson_name: string;
    lesson_no: number | number;
    admin_email: string;
}
const Page = () => {
    const createLesson = useCreateLesson();
    const { user } = useAuth()
    const {
        register,
        handleSubmit,
        reset,
        // watch,
        // formState: { errors },
    } = useForm<Inputs>()
    const onSubmit: SubmitHandler<Inputs> = async (new_lesson) => {
        if (typeof new_lesson.lesson_no === 'string') {
            new_lesson.lesson_no = parseFloat(new_lesson.lesson_no)
            new_lesson.admin_email = user?.email as string;
            if (new_lesson.lesson_no <= 0) {
                return toast.error('please provide a valid lesson no')
            }
            console.log(new_lesson)
            const res = await createLesson.mutateAsync(new_lesson)
            console.log(res)
            if (res.insertedId) {
                reset();
                toast.success('lesson create successfully')
            }
        } else {
            toast.error('something wrong in lesson number')
        }
    }
    return (
        <section>
             <title>Nihongo-Dojo | Create Lessons</title>
            {/* Header Section */}
            <div className="text-center my-10">
                <h2 className="text-3xl text-white font-semibold">Create Lesson</h2>
                <p className="text-gray-400 mt-2">create Lesson for student</p>
            </div>
            {/* Form Section */}
            <div className='mt-10 bg-[#29274d] md:max-w-6xl mx-auto text-white p-10 shadow-2xl border-white border rounded-md'>
                <form
                    onSubmit={handleSubmit(onSubmit)}
                    className='space-y-3'>
                    {/* Row-1 */}
                    <div className='grid md:grid-cols-2 gap-3'>
                        <div className="grid w-full items-center gap-1.5">
                            <Label className='text-[16px]' htmlFor="lesson_no">Lesson No <span className='text-red-700 font-bold'>*</span></Label>
                            <Input type="number" id="lesson_no" placeholder="Enter lesson num"
                                required
                                {...register('lesson_no')}
                            />
                        </div>
                        <div className="grid w-full items-center gap-1.5">
                            <Label className='text-[16px]' htmlFor="lesson_name">Lesson Name <span className='text-red-700 font-bold'>*</span></Label>
                            <Input type="text" id="lesson_name" placeholder="Enter lesson_name"
                                required
                                {...register('lesson_name')}
                            />
                        </div>

                    </div>
                    <div className='pt-10'>
                        <Button className='w-full' variant='default'>Create a New Lesson</Button>
                    </div>
                </form>
            </div>
        </section>
    );
};

export default withAdminAuth(Page);