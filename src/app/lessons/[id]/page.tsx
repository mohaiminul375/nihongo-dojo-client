'use client';
import { useParams } from 'next/navigation';
import { useGetLessonHeading, useGetLessonsContent, useGetProgress, useUpdateProgress } from '../api/route';
import LessonHeading from '@/components/Admin-Dashboard/LessonUser/LessonHeading';
import ContentCard from '@/components/Admin-Dashboard/LessonUser/ContentCard';
import { useState } from 'react';
import Confetti from 'react-confetti';
import useWindowSize from 'react-use/lib/useWindowSize'
import {
    Pagination,
    PaginationContent,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
} from '@/components/ui/pagination';
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';
import withAuth from '@/AuthProvider/withAuth';
import Loading from '@/app/loading';
import { useAuth } from '@/AuthProvider/UserContext';
import Link from 'next/link';

const Page = () => {
    const updateProgress = useUpdateProgress()
    const router = useRouter();
    const { user } = useAuth()
    const [currentPg, setCurrentPg] = useState(1);
    const [showConfetti, setShowConfetti] = useState(false); // State to trigger confetti
    const { id } = useParams();
    const { data: lessonContent, isLoading } = useGetLessonsContent(id as string, currentPg);
    const { data: lesson } = useGetLessonHeading(id as string);
    const { data: progress = [], } = useGetProgress(user?.email as string);
    const { width, height } = useWindowSize(); // Get window size for Confetti
    if (isLoading) {
        return <Loading />
    }
    const isCompleted = progress?.lessons?.some((les: { lesson_no: number }) => les.lesson_no === lesson?.lesson_no) || false;
    console.log(isCompleted)
    // handle completed
    const handleComplete = async () => {
        console.log('handle complete')
        const info = {
            email: user?.email,
            lesson: {
                lesson_no: lesson.lesson_no,
                lesson_name: lesson.lesson_name,
                status: 'completed'
            }
        }
        const res = await updateProgress.mutateAsync(info)
        console.log(info, 'handle complete');
        console.log(res)
        setShowConfetti(true);
        setTimeout(() => {
            router.push('/lessons')
            setShowConfetti(false)

        }, 2000);
    };

    return (
        <section className="border-2 bg-foreground rounded-md md:w-96 lg:w-1/2 mx-auto">
            <title>Nihongo-Dojo | Lesson-{id}</title>
            {/* Heading */}
            <div>
                <LessonHeading id={id as string} />
            </div>
            {/* Lesson Card */}
            <div className="flex justify-center">
                {lessonContent?.data?.map((content) => (
                    <ContentCard

                        key={content._id} content={content} ></ContentCard>
                ))}
            </div>
            {/* Pagination */}
            <div className="my-5">
                <Pagination>
                    <PaginationContent>
                        <PaginationItem>
                            <PaginationPrevious
                                className={`bg-white cursor-pointer ${currentPg === 1 && 'hidden'}`}
                                onClick={() => setCurrentPg(currentPg - 1)}
                            />
                        </PaginationItem>
                        <PaginationItem>
                            <PaginationLink className="text-white font-semibold">{`${currentPg}/${lessonContent?.totalCount}`}</PaginationLink>
                        </PaginationItem>
                        <PaginationItem>
                            <PaginationNext
                                className={`bg-white cursor-pointer ${currentPg === lessonContent?.totalCount && 'hidden'}`}
                                onClick={() => setCurrentPg(currentPg + 1)}
                            />
                        </PaginationItem>
                    </PaginationContent>
                </Pagination>
            </div>
            {/* Complete Button */}
            <div
                className={`px-2 my-3 flex justify-center items-center ${currentPg !== lessonContent?.totalCount && 'hidden'
                    }`}
            >
                {
                    isCompleted ? <Link className='w-full flex justify-center' href='/lessons'>
                        <Button
                            variant="ghost"
                            size="icon"
                            className="w-full md:w-1/2 mx-auto center bg-green-700 text-white"
                        >
                            Completed Back to lessons
                        </Button>
                    </Link> : <Button
                        variant="ghost"
                        size="icon"
                        className="w-full md:w-1/2 mx-auto center bg-green-700 text-white"
                        onClick={handleComplete} // Trigger handleComplete on click
                    >
                        Complete
                    </Button>
                }
            </div>
            {/* Confetti Animation */}
            {showConfetti && <Confetti width={width} height={height} />}
        </section >
    );
};

export default withAuth(Page);
