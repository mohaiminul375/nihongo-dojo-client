'use client';
import AddTutorials from "@/components/Admin-Dashboard/Tutorials/AddTutorials";
import { useDeleteTutorial, useGetTutorials } from "./api/rote";
import { Button } from "@/components/ui/button";
import Swal from 'sweetalert2'
import withAdminAuth from "@/AuthProvider/withAdminAuth";
import Loading from "@/app/loading";
import toast from "react-hot-toast";
const ManageTutorials = () => {
    const { data: tutorials = [], isPending, isError, error } = useGetTutorials();
    const deleteTutorial = useDeleteTutorial()

    if (isPending) {
        return <Loading />

    }

    if (isError) {
        return (
            <div className="flex justify-center items-center h-screen">
                <p className="text-red-500 text-xl">Error: {error?.message}</p>
            </div>
        );
    }
    // delete video
    const handleDeleteVideo = (id: string) => {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
        }).then(async (result) => {
            console.log(id)
            const res = await deleteTutorial.mutateAsync(id);
            console.log(res)
            if (result.isConfirmed) {
                if (res.deletedCount > 0) {
                    Swal.fire({
                        title: "Deleted!",
                        text: "Your file has been deleted.",
                        icon: "success"
                    })
                }else{
                    toast.error('Opoos:delete failed')    
                }

            }
        });

    }
    return (
        <section className="md:max-w-7xl mx-auto">
            <title>Nihongo-Dojo | Manage Tutorials</title>
            {/* Header Section */}
            <div className="text-center mb-8">
                <h2 className="text-3xl text-accent font-semibold">Manage Tutorials for Nihongo-DOJO</h2>
                <p className="text-gray-400 mt-2">Manage your tutorials and video content here</p>
            </div>

            {/* Add New Tutorial */}
            <div className="mb-8 ">
                <AddTutorials />
            </div>

            {/* Video Section */}
            <div>
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-xl text-white font-semibold">All YouTube Videos</h2>
                    <p className="text-white font-semibold">Total Videos: {tutorials.length}</p>
                </div>

                <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    {tutorials?.map((video) => (
                        <div key={video._id} className="bg-foreground rounded-lg shadow-lg overflow-hidden">
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

                            {/* Content Below Video */}
                            <div className="bg-foreground p-4 text-center">
                                <h3 className="text-lg font-semibold text-gray-800 truncate">{video.title}</h3>
                                <Button
                                    onClick={() => handleDeleteVideo(video._id)}
                                    variant='outline' className="bg-red-700 text-white font-semibold">
                                    Delete Video
                                </Button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default withAdminAuth(ManageTutorials);
