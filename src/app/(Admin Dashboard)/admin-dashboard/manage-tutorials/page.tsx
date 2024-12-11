'use client'
import AddTutorials from "@/components/Admin-Dashboard/Tutorials/AddTutorials";
import { useGetTutorials } from "./api/rote";


const ManageTutorials = () => {
    const { data: tutorials = [], isPending, isError, error } = useGetTutorials();
    if (isPending) {
        return <p>Loading..</p>
    }
    console.log(tutorials)
    return (
        <section>
            <div>
                <h2 className="text-2xl text-white text-center">Manage Tutorial of Nihongo-DOJO</h2>
            </div>
            {/* add an new lesson */}
            <div>
                <AddTutorials />
            </div>
            {/* view content */}
            <div>
                <div>
                    <h2>All Youtue Video </h2>
                    <p>Total Video {tutorials.length || 0}</p>
                </div>
                <div className="grid md:grid-cols-4 gap-3">
                    {tutorials.map((video) => (
                        <div key={video._id} className="w-full">
                            {/* Video Container */}
                            <div className="relative w-full overflow-hidden pb-[56.25%]">
                                <iframe
                                    className="absolute top-0 left-0 w-full h-full"
                                    src={video.embed_link}
                                    title="YouTube video player"
                                    frameBorder="0"
                                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                                    referrerPolicy="strict-origin-when-cross-origin"
                                    allowFullScreen
                                ></iframe>
                            </div>

                            {/* Content Below Video */}
                            <div className="bg-white text-black text-center font-medium py-2 mt-3">
                                fjjjjjjjj
                            </div>
                        </div>
                    ))}
                </div>
            </div>


        </section>
    );
};

export default ManageTutorials;