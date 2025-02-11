"use client";
import { useDashboardSummary } from "@/app/admin-dashboard/api/route";
import Loading from "@/app/loading";
import Image from "next/image";
import vocabulary from "../../../../public/japanise-vocabulary.svg";
import { BookCheck, Users2, UserCog, BookCopy } from "lucide-react";

const Overview = () => {
    const { data: summary, isPending, isError, error } = useDashboardSummary();

    if (isPending) {
        return <Loading />;
    }
    console.log(summary)

    return (
        <div className="text-white p-6">
            <h2 className="text-2xl font-semibold underline mb-6">Overview</h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">

                {/* Total Tutorials */}
                <div className="bg-gray-900 p-5 rounded-xl shadow-md flex items-center gap-4">
                    <BookCopy size={40} className="text-green-400" />
                    <div>
                        <h2 className="text-lg font-semibold">Total Tutorials</h2>
                        <p className="text-xl font-bold">{summary.tutorialsCount}</p>
                    </div>
                </div>

                {/* Total Lessons */}
                <div className="bg-gray-900 p-5 rounded-xl shadow-md flex items-center gap-4">
                    <BookCheck />
                    <div>
                        <h2 className="text-lg font-semibold">Total Lessons</h2>
                        <p className="text-xl font-bold">{summary.lessonsCount}</p>
                    </div>
                </div>

                {/* Total Vocabulary */}
                <div className="bg-gray-900 p-5 rounded-xl shadow-md flex items-center gap-4">
                    <Image src={vocabulary} alt="vocabulary_icon" width={50} height={50} />
                    <div>
                        <h2 className="text-lg font-semibold">Total Vocabulary</h2>
                        <p className="text-xl font-bold">{summary.vocabularyCount}</p>
                    </div>
                </div>

                {/* Total Users */}
                <div className="bg-gray-900 p-5 rounded-xl shadow-md flex items-center gap-4">
                    <Users2 size={40} className="text-blue-400" />
                    <div>
                        <h2 className="text-lg font-semibold">Total Users</h2>
                        <p className="text-xl font-bold">{summary.usersCount}</p>
                    </div>
                </div>

                {/* Admins */}
                <div className="bg-gray-900 p-5 rounded-xl shadow-md flex items-center gap-4">
                    <UserCog size={40} className="text-red-400" />
                    <div>
                        <h2 className="text-lg font-semibold">Admin</h2>
                        <p className="text-xl font-bold">{summary.adminCount}</p>
                    </div>
                </div>

            </div>
        </div>
    );
};

export default Overview;
