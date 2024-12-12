'use client'

import { Table, TableBody, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { useGetLessons } from "./api/route";
import LessonTable from "@/app/lessons/LessonTable";

const Page = () => {
    const { data: lessons = [], isPending, isError, error } = useGetLessons();
    if (isPending) {
        return <p>loading</p>
    }
    console.log(lessons);
    return (
        <section>
            {/* Header Section */}
            <div className="text-center my-10">
                <h2 className="text-3xl text-white font-semibold">Manage Lessons</h2>
                <p className="text-gray-400 mt-2">Edit, Delete All Lessons</p>
            </div>
            {/* Table */}
            <div className="md:max-w-6xl mx-auto text-white bg-[#29274d] rounded-md p-5">
                <Table className="">
                    <TableHeader>
                        <TableRow>
                            <TableHead className="w-[50px]">#</TableHead>
                            <TableHead>Lesson Name & Number</TableHead>
                            <TableHead>Vocabulary Count</TableHead>
                            <TableHead className="text-right">Actions</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {lessons.map((lesson, index) => (
                            <LessonTable
                                key={lesson._id}
                                lesson={lesson}
                                idx={index}
                            >

                            </LessonTable>
                        ))}
                    </TableBody>
                </Table>
            </div>
        </section>
    );
};

export default Page;