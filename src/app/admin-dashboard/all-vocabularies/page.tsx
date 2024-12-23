'use client'
import {
    Table,
    TableBody,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { useGetVocabulariesAdmin } from "./api/route";
import VocabularyTable from "@/components/Admin-Dashboard/Vocabulary/VocabularyTable";
import { useState } from "react";
import withAdminAuth from "@/AuthProvider/withAdminAuth";
import Loading from "@/app/loading";
import { useDropdownLesson } from "../create-vocabularies/api/route";
// lesson type

// lessons array


const Page = () => {
    const [lesson, setLesson] = useState('')
    console.log(lesson)
    const { data: vocabularies, isPending,
        //  isError, error 
    } = useGetVocabulariesAdmin(lesson);
    const { data: lessons = [] } = useDropdownLesson();
    if (isPending) {
        return <Loading />
    }
    console.log(vocabularies)
    return (
        <section>
            <title>Nihongo-Dojo | All Vocabularies</title>
            {/* Heading */}
            <div className="text-center my-10">
                <h2 className="text-3xl text-white font-semibold">Manage Your Vocabularies</h2>
                <p className="text-gray-400 mt-2">Edit, or delete vocabularies to keep them up to date for learners.</p>
            </div>
            {/* Table */}
            <div className="md:max-w-6xl mx-auto text-white">
                <div className="flex justify-between p-2">
                    <div className="font-semibold">
                        Total Vocabulary:{vocabularies?.length}
                    </div>
                    <Select
                        onValueChange={(value) => {
                            setLesson(value)
                        }}
                    // value={lesson}
                    >
                        <SelectTrigger
                            className="md:w-[200px] bg-[#29274d]">
                            <SelectValue
                                placeholder="Lesson No"
                            />
                        </SelectTrigger>
                        <SelectContent>
                            {
                                lessons.map((lesson) => <SelectItem
                                    key={lesson.lesson_no}
                                    value={lesson.lesson_no.toString()}>{`${lesson.lesson_no}-${lesson.lesson_name}`}</SelectItem>)
                            }
                        </SelectContent>
                    </Select>
                </div>
                <div className=" bg-[#29274d] rounded-md p-5">
                    <Table className="">
                        <TableHeader>
                            <TableRow>
                                <TableHead className="w-[50px]">#</TableHead>
                                <TableHead>Word</TableHead>
                                <TableHead>Meaning</TableHead>
                                <TableHead>Pronunciation</TableHead>
                                <TableHead>When to Say</TableHead>
                                {/* <TableHead>English Meaning</TableHead> */}
                                <TableHead>Lesson No & Name</TableHead>
                                <TableHead className="text-right">Actions</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {vocabularies?.map((vocabulary, index) => (
                                <VocabularyTable
                                    key={vocabulary._id}
                                    vocabulary={vocabulary}
                                    idx={index}
                                >

                                </VocabularyTable>
                            ))}
                        </TableBody>
                    </Table>
                </div>
            </div>
        </section >
    );
};

export default withAdminAuth(Page);