import { useGetLessonHeading } from "@/app/lessons/api/route";

interface PropsType {
    id: string;
}
const LessonHeading = ({ id }: PropsType) => {
    console.log('inside heading', id)
    const { data, isPending } = useGetLessonHeading(id);
    if (isPending) {
        return
    }
    console.log(data);
    return (
        <div className="text-center my-10">
            <h2 className="text-3xl text-white font-semibold">
                Lesson {data?.lesson_no}: {data?.lesson_name}
            </h2>


        </div>
    );
};

export default LessonHeading;