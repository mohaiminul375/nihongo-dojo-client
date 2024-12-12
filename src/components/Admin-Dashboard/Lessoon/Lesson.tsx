import { BookCheck, BookOpenCheck } from 'lucide-react';
import Link from 'next/link';
import React from 'react';

const Lesson = () => {
    return (
        <div className="text-white">
            <h2 className="text-2xl underline font-bold">Lesson Management</h2>
            <div className="grid lg:grid-cols-5 gap-6 mt-8">
                {/* All Orders Card */}
                <Link href="/admin-dashboard/all-lesson">
                    <div className="group bg-gradient-to-b from-[#302b63] via-[#5754f7] to-[#6a5af7] border border-white rounded-lg shadow-md p-5 flex flex-col items-center space-y-4 transition-transform duration-300 hover:scale-105 hover:shadow-xl h-full hover:border-primary">
                        <BookCheck
                            className="group-hover:rotate-12 transition-transform duration-300 h-10 w-20"
                        />
                        <h2 className="text-lg font-semibold text-accent text-center ">
                            All Lesson
                        </h2>
                    </div>
                </Link>
                <Link href="/admin-dashboard/create-lesson">
                    <div className="group bg-gradient-to-b from-[#302b63] via-[#5754f7] to-[#6a5af7] border border-white rounded-lg shadow-md p-5 flex flex-col items-center space-y-4 transition-transform duration-300 hover:scale-105 hover:shadow-xl h-full hover:border-primary">
                        <div className="relative group-hover:rotate-12 transition-transform duration-300">
                            {/* Rotating BookCopy Component */}

                            <BookOpenCheck
                                className="h-10 w-20 group-hover:rotate-12 transition-transform duration-300"
                            />
                            {/* Positioned "+" Sign */}
                            <span className="font-bold text-3xl right-0 top-0 mt-2 absolute">+</span>
                        </div>
                        <h2 className="text-lg font-semibold text-accent text-center ">
                            Create Lesson
                        </h2>
                    </div>
                </Link>

            </div>
        </div>
    );
};

export default Lesson;