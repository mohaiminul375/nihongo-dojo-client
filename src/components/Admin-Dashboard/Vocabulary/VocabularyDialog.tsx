// import { useCreateVocabulary } from '@/app/admin-dashboard/create-vocabularies/api/route';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import React, { useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useUpdateVocabulary } from '@/app/admin-dashboard/all-vocabularies/api/route';
type Inputs = {
    word: string;
    pronunciation: string;
    when_to_say: string;
    english_meaning: string;
    createAt: string;
    lesson_no: number | string;
    term: string;
    definition: string;
    admin_email: string;
}
interface Lessons {
    lesson_no: number;
    lesson_name: string | number;
}
const lessons: Lessons[] = [
    {
        lesson_no: 1,
        lesson_name: 'Basic Greetings'
    },
    {
        lesson_no: 2,
        lesson_name: 'Greetings and Time'
    },
    {
        lesson_no: 3,
        lesson_name: 'Common Phrases'
    },
    {
        lesson_no: 4,
        lesson_name: 'Basic Conversations'
    },
    {
        lesson_no: 5,
        lesson_name: 'Languages'
    },
    {
        lesson_no: 6,
        lesson_name: 'People and Occupations'
    },
    {
        lesson_no: 7,
        lesson_name: 'Feelings and Health'
    },
    {
        lesson_no: 8,
        lesson_name: 'Verbs and Actions'
    },
    {
        lesson_no: 9,
        lesson_name: 'Travel and Directions'
    },
    {
        lesson_no: 10,
        lesson_name: 'Adjectives'
    },
]
const VocabularyDialog = ({ vocabulary }) => {

    const { _id, word, pronunciation, when_to_say, english_meaning, lesson_no } = vocabulary;
    const updateVocabulary = useUpdateVocabulary(_id)
    const [lesson, setLesson] = useState('');
    console.log(lesson)
    // react hook form
    const {
        register,
        handleSubmit,
        setValue,
        // watch,
        // formState: { errors },
    } = useForm<Inputs>()
    const onSubmit: SubmitHandler<Inputs> = async (update_info) => {
        console.log(update_info)
        const res = await updateVocabulary.mutateAsync({ update_info })
        console.log(res);

    }
    return (
        <div className='mt-10 bg-[#29274d] w-full mx-auto text-white p-10 shadow-2xl border-white border rounded-md'>
            <form
                onSubmit={handleSubmit(onSubmit)}
                className='space-y-3'>
                {/* Row-1 */}
                <div className='grid md:grid-cols-2 gap-3'>
                    <div className="grid w-full items-center gap-1.5">
                        <Label className='text-[16px]' htmlFor="word">Word(Japanese) <span className='text-red-700 font-bold'>*</span></Label>
                        <Input type="text" id="Word" placeholder="Enter Japanese word"
                            defaultValue={word}
                            required
                            {...register('word')}
                        />
                    </div>
                    <div className="grid w-full items-center gap-1.5">
                        <Label className='text-[16px]' htmlFor="word">Pronunciation(japanese) <span className='text-red-700 font-bold'>*</span></Label>
                        <Input type="text" id="pronunciation" placeholder="Enter Pronunciation Japanese"
                            defaultValue={pronunciation}
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
                            defaultValue={when_to_say}
                        />
                    </div>
                    <div className="grid w-full items-center gap-1.5">
                        <Label className='text-[16px]' htmlFor="english_meaning">English Meaning<span className='text-red-700 font-bold'>*</span></Label>
                        <Input type="text" id="english_meaning" placeholder="English Meaning of the word"
                            required
                            {...register('english_meaning')}
                            defaultValue={english_meaning}
                        />
                    </div>
                    <div className="grid w-full items-center gap-1.5">
                        <Label className='text-[16px]' htmlFor="lesson_no">Lesson Number<span className='text-red-700 font-bold'>*</span></Label>
                        <Select
                            onValueChange={(value) => {
                                setLesson(value); setValue("lesson_no", value, { shouldValidate: true });
                            }}
                            value={lesson}
                        >
                            <SelectTrigger
                                className="w-full mx-auto">
                                <SelectValue

                                    placeholder={lesson_no}
                                />
                            </SelectTrigger>
                            <SelectContent>
                                {
                                    lessons.map((lesson) => <SelectItem
                                        key={lesson.lesson_no}
                                        value={lesson.lesson_no.toString()}>{`${lesson.lesson_no}-${lesson.lesson_name}`}</SelectItem>)
                                }
                            </SelectContent>
                        </Select>
                    </div>

                </div>
                <div className='pt-10'>
                    <Button className='w-full' variant='default'>Update Vocabulary</Button>
                </div>
            </form>
        </div >
    );
};

export default VocabularyDialog;