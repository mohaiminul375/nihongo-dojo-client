'use client';
import withAuth from '@/AuthProvider/withAuth';
import { useGetTutorials } from '../admin-dashboard/manage-tutorials/api/rote';
import Loading from '../loading';

const Page = () => {
    const { data: tutorials = [], isPending, isError, error } = useGetTutorials();

    if (isPending) {
        return <Loading />

    }

    if (isError) {
        return (
            <div className="flex justify-center items-center h-screen bg-gray-900">
                <p className="text-red-500 text-xl">Error: {error?.message}</p>
            </div>
        );
    }

    return (
        <section className="md:max-w-7xl mx-auto">
            <title>Nihongo-Dojo | Tutorials</title>
            {/* Header Section */}
            <div className="text-center mb-8">
                <h2 className="text-3xl text-white font-semibold">Explore YouTube Tutorials</h2>
                <p className="text-gray-400 mt-2">Browse through the tutorials below</p>
            </div>

            {/* Video Grid Section */}
            <div>
                <div className="flex justify-between items-center mb-4">
                    <h3 className="text-xl text-white font-semibold">All YouTube Videos</h3>
                    <p className="text-white font-medium">Total Videos: {tutorials.length}</p>
                </div>

                <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    {tutorials.map((video) => (
                        <div key={video._id} className="bg-white rounded-lg shadow-lg overflow-hidden">
                            {/* Video Embed */}
                            <div className="relative pb-[60.25%]">
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
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default withAuth(Page);
