'use client'
import { useParams } from "next/navigation";
import { useGetLessonsContent } from "../api/route";
import LessonHeading from "@/components/Admin-Dashboard/LessonUser/LessonHeading";
import ContentCard from "@/components/Admin-Dashboard/LessonUser/ContentCard";
import { useState } from "react";
import {
    Pagination,
    PaginationContent,
    PaginationEllipsis,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
} from "@/components/ui/pagination"
const Page = () => {


    const [currentPg, setCurrentPg] = useState(1);
    const { id } = useParams();
    const { data: lessonContent = {}, isPending, isError, error } = useGetLessonsContent(id, currentPg);
    if (isPending) {
        return <p>loading....</p>
    }
    console.log(lessonContent)

    return (
        <section className=' border-2 bg-primary rounded-md md:w-96 mx-auto '>
            {/* Heading */}
            <div>
                <LessonHeading id={id} />
            </div>
            {/* lesson Card */}
            <div className="flex justify-center">
                {
                    lessonContent?.data?.map(content => <ContentCard
                        key={content._id}
                        content={content}
                    ></ContentCard>)
                }
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
                                className={`bg-white cursor-pointer ${currentPg === 3 && 'hidden'}`}
                                onClick={() => setCurrentPg(currentPg + 1)}
                            />
                        </PaginationItem>
                    </PaginationContent>
                </Pagination>
            </div>
        </section>
    );
};

export default Page;