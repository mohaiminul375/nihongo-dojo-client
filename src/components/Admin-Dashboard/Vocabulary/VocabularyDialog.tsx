import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectTrigger } from '@radix-ui/react-select';
import React from 'react';

const VocabularyDialog = () => {
    return (
        <div className='mt-10 bg-[#29274d] w-full mx-auto text-white p-10 shadow-2xl border-white border rounded-md'>
            <form
                // onSubmit={handleSubmit(onSubmit)}
                className='space-y-3'>
                {/* Row-1 */}
                <div className='grid md:grid-cols-2 gap-3'>
                    <div className="grid w-full items-center gap-1.5">
                        <Label className='text-[16px]' htmlFor="word">Word(Japanese) <span className='text-red-700 font-bold'>*</span></Label>
                        <Input type="text" id="Word" placeholder="Enter Japanese word"
                            required
                        // {...register('word')}
                        />
                    </div>
                    <div className="grid w-full items-center gap-1.5">
                        <Label className='text-[16px]' htmlFor="word">Pronunciation(japanese) <span className='text-red-700 font-bold'>*</span></Label>
                        <Input type="text" id="pronunciation" placeholder="Enter Pronunciation Japanese"
                            required
                        // {...register('pronunciation')}
                        />
                    </div>

                </div>
                {/* Row-2 */}
                <div className='grid md:grid-cols-3 gap-3'>
                    <div className="grid w-full items-center gap-1.5">
                        <Label className='text-[16px]' htmlFor="sayTime">When to say<span className='text-red-700 font-bold'>*</span></Label>
                        <Input type="text" id="sayTime" placeholder="sayTime"
                            required
                        // {...register('when_to_say')}
                        />
                    </div>
                    <div className="grid w-full items-center gap-1.5">
                        <Label className='text-[16px]' htmlFor="english_meaning">English Meaning<span className='text-red-700 font-bold'>*</span></Label>
                        <Input type="text" id="english_meaning" placeholder="English Meaning of the word"
                            required
                        // {...register('english_meaning')}
                        />
                    </div>
                    <div className="grid w-full items-center gap-1.5">
                        <Label className='text-[16px]' htmlFor="lesson_no">Lesson Number<span className='text-red-700 font-bold'>*</span></Label>
                        {/* <Select
                            onValueChange={(value) => {
                                setLesson(value); setValue("lesson_no", value, { shouldValidate: true });
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
                                {
                                    lessons.map((lesson) => <SelectItem
                                        key={lesson.lesson_no}
                                        value={lesson.lesson_no.toString()}>{`${lesson.lesson_no}-${lesson.lesson_name}`}</SelectItem>)
                                }
                            </SelectContent>
                        </Select> */}
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