'use client'
import Loading from "@/app/loading";
import { useAllProgress } from "./api/route";
import {
    Table,
    TableBody,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import ProgressesTable from "@/components/Admin-Dashboard/Progresses/ProgressesTable";

const Page = () => {
    const { data: progresses = [], isPending, isError, error } = useAllProgress();
    if (isPending) {
        return <Loading />
    }

    return (
        <section className=" mt-10">
            <title>Nihongo-Dojo | User Progresses</title>
            {/* Header Section */}
            <div className="text-center my-10">
                <h2 className="text-3xl text-white font-semibold">Track User Progress</h2>
                <p className="text-gray-400 mt-2">Track User lessons progress</p>
            </div>

            <div className="md:max-w-6xl mx-auto text-white bg-[#29274d] rounded-md p-5">
                <Table className="">
                    <TableHeader>
                        <TableRow>
                            <TableHead className="w-[50px]">#</TableHead>
                            <TableHead>email</TableHead>
                            <TableHead>Completed Lesson</TableHead>
                            {/* <TableHead></TableHead> */}
                            <TableHead className="text-right">Actions</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {progresses?.map((progress, index) => (
                            <ProgressesTable
                                key={progress._id}
                                progress={progress}
                                idx={index}
                            >

                            </ProgressesTable>
                        ))}
                    </TableBody>
                </Table>
            </div>
        </section>
    );
};

export default Page;