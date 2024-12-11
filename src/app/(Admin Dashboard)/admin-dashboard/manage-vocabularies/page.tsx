'use client'
import {
    Table,
    TableBody,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { useGetVocabulariesAdmin } from "./api/route";
import VocabularyTable from "@/components/Admin-Dashboard/Vocabulary/VocabularyTable";


const Page = () => {
    const { data: vocabularies, isPending, isError, error } = useGetVocabulariesAdmin();
    if (isPending) {
        return <p>loading</p>
    }
    console.log(vocabularies)
    return (
        <section>
            {/* Heading */}
            <div className="text-center my-10">
                <h2 className="text-3xl text-white font-semibold">Manage Your Vocabularies</h2>
                <p className="text-gray-400 mt-2">Edit, or delete vocabularies to keep them up to date for learners.</p>
            </div>
            {/* Table */}
            <div className="md:max-w-6xl mx-auto text-white bg-[#29274d] rounded-md p-5">
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
                        {vocabularies.map((vocabulary, index) => (
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
        </section>
    );
};

export default Page;