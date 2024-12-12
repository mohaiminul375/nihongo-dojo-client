import { useUpdateLesson } from "@/app/admin-dashboard/all-lesson/api/route";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { SubmitHandler, useForm } from "react-hook-form";
import toast from "react-hot-toast";
type Inputs = {
    lesson_no: number | string;
    lesson_name: string;
}

const LessonDialog = ({ lesson }) => {
    const { _id, lesson_name, lesson_no } = lesson
    const updateLesson = useUpdateLesson(_id);
    const {
        register,
        handleSubmit,
        // watch,
        // formState: { errors },
    } = useForm<Inputs>()
    const onSubmit: SubmitHandler<Inputs> = async (update_lesson) => {
        if (typeof update_lesson.lesson_no === 'string') {
            update_lesson.lesson_no = parseFloat(update_lesson.lesson_no)

            if (update_lesson.lesson_no <= 0) {
                return toast.error('please provide a valid lesson no')
            }
            await updateLesson.mutateAsync(update_lesson)
            // console.log(res)
        } else {
            toast.error('something wrong in update number')
        }
    }
    return (
        <div className='mt-10 bg-[#29274d] w-full mx-auto text-white p-10 shadow-2xl border-white border rounded-md'>
            <form
                onSubmit={handleSubmit(onSubmit)}
                className='space-y-3'>
                {/* Row-1 */}
                <div className='grid md:grid-cols-2 gap-3'>
                    <div className="grid w-full items-center gap-1.5">
                        <Label className='text-[16px]' htmlFor="lesson_no">Lesson No <span className='text-red-700 font-bold'>*</span></Label>
                        <Input type="number" id="lesson_no" placeholder="Enter lesson num"
                            required
                            defaultValue={lesson_no}
                            {...register('lesson_no')}
                        />
                    </div>
                    <div className="grid w-full items-center gap-1.5">
                        <Label className='text-[16px]' htmlFor="lesson_name">Lesson Name <span className='text-red-700 font-bold'>*</span></Label>
                        <Input type="text" id="lesson_name" placeholder="Enter lesson_name"
                            required
                            defaultValue={lesson_name}
                            {...register('lesson_name')}
                        />
                    </div>

                </div>

                <div className='pt-10'>
                    <Button className='w-full' variant='default'>Update Lesson</Button>
                </div>
            </form>
        </div>
    );
};

export default LessonDialog;