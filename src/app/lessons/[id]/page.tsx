'use client';
import { useParams } from 'next/navigation';
import { useGetLessonsContent } from '../api/route';
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

const Page = () => {
    const router = useRouter();
    const [currentPg, setCurrentPg] = useState(1);
    const [showConfetti, setShowConfetti] = useState(false); // State to trigger confetti
    const { id } = useParams();
    const { data: lessonContent = {}, isPending} = useGetLessonsContent(id, currentPg);
    const { width, height } = useWindowSize(); // Get window size for Confetti

    if (isPending) {
        return <p>Loading...</p>;
    }

    const handleComplete = () => {
        setShowConfetti(true);

        // console.log('Lesson completed successfully!');
        setTimeout(() => {
            router.push('/lessons')
            setShowConfetti(false)

        }, 2000);
    };

    return (
        <section className="border-2 bg-primary rounded-md md:w-96 mx-auto">
            {/* Heading */}
            <div>
                <LessonHeading id={id} />
            </div>
            {/* Lesson Card */}
            <div className="flex justify-center">
                {lessonContent?.data?.map((content) => (
                    <ContentCard key={content._id} content={content}></ContentCard>
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
                            <PaginationLink className="text-white font-semibold">{`${currentPg}/${lessonContent.totalCount}`}</PaginationLink>
                        </PaginationItem>
                        <PaginationItem>
                            <PaginationNext
                                className={`bg-white cursor-pointer ${currentPg === lessonContent.totalCount && 'hidden'}`}
                                onClick={() => setCurrentPg(currentPg + 1)}
                            />
                        </PaginationItem>
                    </PaginationContent>
                </Pagination>
            </div>
            {/* Complete Button */}
            <div
                className={`px-2 my-3 flex justify-center ${currentPg !== lessonContent.totalCount && 'hidden'
                    }`}
            >
                <Button
                    variant="ghost"
                    size="icon"
                    className="md:w-1/2 center bg-green-700 text-white"
                    onClick={handleComplete} // Trigger handleComplete on click
                >
                    Complete
                </Button>
            </div>
            {/* Confetti Animation */}
            {showConfetti && <Confetti width={width} height={height} />}
        </section>
    );
};

export default Page;
