import { BookCopy } from "lucide-react";
import Link from "next/link";


const Tutorials = () => {
    return (
        <div className="">
            <h2 className="text-2xl underline font-bold text-accent">Tutorial Management</h2>
            <div className="grid lg:grid-cols-5 gap-6 mt-3">
                {/* All Orders Card */}
                <Link href="/admin-dashboard/manage-tutorials">
                    <div className="group bg-foreground border-white rounded-lg shadow-md p-5 flex flex-col items-center space-y-4 transition-transform duration-300 hover:scale-105 hover:shadow-xl h-full hover:border-primary text-white">
                        <BookCopy
                            className="group-hover:rotate-12 transition-transform duration-300 h-10 w-20"
                        />
                        <h2 className="text-lg font-semibold text-white text-center ">
                            All Tutorial
                        </h2>
                    </div>
                </Link>
            </div>
        </div>
    );
};

export default Tutorials;