'use client'

import LessonCard from "@/components/Admin-Dashboard/LessonUser/LessonCard";
import { useGetLessonsUser, useGetProgress } from "./api/route";
import withAuth from "@/AuthProvider/withAuth";
import Loading from "../loading";
import { Progress } from "@/components/ui/progress";
import { useUser } from "@/AuthProvider/UserContext";

const Page = () => {
    const { user } = useUser()
    const { data: lessons = [], isPending } = useGetLessonsUser();
    const { data: progress } = useGetProgress(user.email);
    if (isPending) {
        return <Loading />
    }
    console.log(lessons)
    // Calculation completion
    const totalLessons = lessons?.length;
    const completedLessons = progress?.lessons?.length;
    const completionPercentage = (completedLessons / totalLessons) * 100;
    return (
        <section>
            {/* Heading */}
            <div className="text-center my-10">
                <h2 className="text-3xl text-white font-semibold">Explore Your Lessons</h2>
                <p className="text-gray-400 mt-2 md:w-1/2 mx-auto">
                    Browse through all the lessons, learn new vocabulary, and track your progress.
                    Click on any lesson to dive deeper into its content and expand your knowledge.
                </p>
            </div>
            {/* Progress Bar */}
            <div className="flex justify-center md:justify-end my-4">
                <div className="flex flex-col items-center bg-white shadow-md rounded-lg p-4 md:w-1/3">
                    <p className="text-primary  text-sm font-semibold mb-2">
                        Progress: {completionPercentage.toFixed(2)}%
                    </p>
                    <Progress value={completionPercentage} className="w-full h-4 bg-gray-200" />
                </div>
            </div>

            {/* Lesson Section */}
            <div className="mt-19">
                <div className="grid md:grid-cols-3 lg:grid-cols-4 gap-5">
                    {
                        lessons?.map((lesson) => <LessonCard
                            key={lesson._id}
                            lesson={lesson}
                        ></LessonCard>)
                    }
                </div>
            </div>
        </section>
    );
};

export default withAuth(Page);