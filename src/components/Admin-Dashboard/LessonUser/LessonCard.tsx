import {
    Card,
    CardContent,
    CardFooter,
    CardHeader,
} from "@/components/ui/card"
// import { Badge } from "@/components/ui/badge"
import Link from "next/link";
import { Button } from "@/components/ui/button";
interface CardProp {
    lesson_no: number,
    lesson_name: string,
    Vocabulary_count: string,
}

const LessonCard = ({ lesson }: CardProp) => {
    const { lesson_no, lesson_name, vocabulary_count } = lesson;
    return (
        <Card className="xl:w-[300px] lg:w-[250]">
            <CardHeader className="pb-2">
                <div className="flex justify-between items-center">
                    <span className="text-2xl font-bold">Lesson {lesson_no}</span>
                    {/* <Badge variant={isCompleted ? "success" : "secondary"}>
                        {isCompleted ? "Completed" : "Incomplete"}
                    </Badge> */}
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