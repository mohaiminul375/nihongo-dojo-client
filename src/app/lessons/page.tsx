'use client'

import LessonCard from "@/components/Admin-Dashboard/LessonUser/LessonCard";
import { useGetLessonsUser } from "./api/route";
import withAuth from "@/AuthProvider/withAuth";
import Loading from "../loading";

const Page = () => {
    const { data: lessons = [], isPending } = useGetLessonsUser();
    if (isPending) {
        return <Loading/>
    }
    console.log(lessons)
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
            {/* Lesson Section */}
            <div className="mt-19">
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
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