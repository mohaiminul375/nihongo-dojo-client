'use client'

import { useGetLessons } from "./api/route";

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
            <div>

            </div>
        </section>
    );
};

export default Page;