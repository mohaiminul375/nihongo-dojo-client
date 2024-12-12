import { useGetLessonHeading } from "@/app/lessons/api/route";

interface PropsType {
    id: string;
}
const LessonHeading = ({ id }: PropsType) => {
    console.log('inside heading', id)
    const { data, isPending, isError, error } = useGetLessonHeading(id);
    if (isPending) {
        return
    }
    console.log(data);
    return (
        <div className="text-center my-10">
            <h2 className="text-3xl text-white font-semibold">
                Lesson {data?.lesson_no}: {data?.lesson_name}
            </h2>
            <p className="text-gray-400 mt-2">
                {/* Additional Vocabulary Count: {lesson.vocabulary_count || 0} */}
            </p>
            {/* <p className="text-gray-500 mt-1">Admin: {lesson.admin_email}</p> */}
        </div>
    );
};

export default LessonHeading;