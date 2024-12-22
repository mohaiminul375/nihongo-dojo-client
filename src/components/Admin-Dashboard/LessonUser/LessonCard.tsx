import {
    Card,
    CardContent,
    CardFooter,
    CardHeader,

} from "@/components/ui/card"
// import { Badge } from "@/components/ui/badge"
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { useUser } from "@/AuthProvider/UserContext";
import { useGetProgress } from "@/app/lessons/api/route";
import Loading from "@/app/loading";
import { Badge } from "@/components/ui/badge";
// import {  } from "lucide-react";
interface CardProp {
    lesson_no: number,
    lesson_name: string,
    Vocabulary_count: string,
}

const LessonCard = ({ lesson }: CardProp) => {
    const { user } = useUser()
    const { lesson_no, lesson_name, vocabulary_count } = lesson;
    const { data, isPending } = useGetProgress(user?.email);
    if (isPending) {
        return <Loading />
    }
    const isCompleted = data.lessons?.some(lesson => lesson.lesson_no === lesson_no) || false;
    console.log(isCompleted)
    return (
        <Card className="xl:w-[300px] lg:w-[250]">
            <CardHeader className="pb-2">
                <div className="flex justify-between items-center">
                    <span className="text-2xl font-bold">Lesson {lesson_no}</span>
                    <Badge variant={isCompleted ? "default" : "secondary"}>
                        {isCompleted ? "Completed" : "Incomplete"}
                    </Badge>
                    {

                    }
                </div>
            </CardHeader>
            <CardContent>
                <h3 className="text-xl font-semibold mb-2">{lesson_name}</h3>
                <p className="text-sm text-muted-foreground font-bold">
                    Vocabulary: {vocabulary_count} words
                </p>
            </CardContent>
            <CardFooter>
                <Link className="w-full" href={`/lessons/${lesson_no}`}>
                    <Button variant='default' size='lg'>
                        {/* {isCompleted ? "Review Lesson" : "Start Lesson"} */}
                        Start Lesson
                    </Button>
                </Link>
            </CardFooter>
        </Card>
    );
};

export default LessonCard;