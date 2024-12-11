'use client'
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import React, { useState } from 'react';
import { useForm, SubmitHandler } from "react-hook-form";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
type Inputs = {
    email: string;
    password: string;

}
const Page = () => {
    const [lesson, setLesson] = useState('');
    console.log(lesson)
    // react hook form
    const {
        register,
        handleSubmit,
        setValue,
        // watch,
        formState: { errors },
    } = useForm<Inputs>()
    const onSubmit: SubmitHandler<Inputs> = async (vocabulary) => {
        console.log(vocabulary);
    }
    return (
        <section>
            {/* Header Section */}
            <div className="text-center my-10">
                <h2 className="text-3xl text-white font-semibold">Create Vocabularies</h2>
                <p className="text-gray-400 mt-2">Learn new words and expand your knowledge by adding new vocabulary to each lesson.</p>
            </div>
            {/* Form Section */}
            <div className='mt-10 bg-[#29274d] md:max-w-6xl mx-auto text-white p-10 shadow-2xl border-white border rounded-md'>
                <form
                    onSubmit={handleSubmit(onSubmit)}
                    className='space-y-3'>
                    {/* Row-1 */}
                    <div className='grid md:grid-cols-2 gap-3'>
                        <div className="grid w-full items-center gap-1.5">
                            <Label className='text-[16px]' htmlFor="word">Word(Japanese) <span className='text-red-700 font-bold'>*</span></Label>
                            <Input type="text" id="Word" placeholder="Enter Japanese word"
                                required
                                {...register('word')}
                            />
                        </div>
                        <div className="grid w-full items-center gap-1.5">
                            <Label className='text-[16px]' htmlFor="word">Pronunciation(japanese) <span className='text-red-700 font-bold'>*</span></Label>
                            <Input type="text" id="pronunciation" placeholder="Enter Pronunciation Japanese"
                                required
                                {...register('pronunciation')}
                            />
                        </div>

                    </div>
                    {/* Row-2 */}
                    <div className='grid md:grid-cols-3 gap-3'>
                        <div className="grid w-full items-center gap-1.5">
                            <Label className='text-[16px]' htmlFor="sayTime">When to say<span className='text-red-700 font-bold'>*</span></Label>
                            <Input type="text" id="sayTime" placeholder="sayTime"
                                required
                                {...register('when_to_say')}
                            />
                        </div>
                        <div className="grid w-full items-center gap-1.5">
                            <Label className='text-[16px]' htmlFor="english_meaning">English Meaning<span className='text-red-700 font-bold'>*</span></Label>
                            <Input type="text" id="english_meaning" placeholder="English Meaning of the word"
                                required
                                {...register('english_meaning')}
                            />
                        </div>
                        <div className="grid w-full items-center gap-1.5">
                            <Label className='text-[16px]' htmlFor="lesson_no">Lesson Number<span className='text-red-700 font-bold'>*</span></Label>
                            <Select
                                onValueChange={(value) => {
                                    setLesson(value)
                                    setValue("lesson", value, { shouldValidate: true })
                                }}
                                value={lesson}
                            >
                                <SelectTrigger
                                    className="w-full mx-auto">
                                    <SelectValue

                                        placeholder="Lesson No"

                                    />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="User">User</SelectItem>
                                    <SelectItem value="Admin">Admin</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>

                    </div>
                    <div className='pt-10'>
                        <Button className='w-full' variant='default'>Create a New Vocabulary</Button>
                    </div>
                </form>
            </div>
        </section>
    );
};

export default Page;