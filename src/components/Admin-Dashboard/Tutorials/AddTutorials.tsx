'use client'
import { useCreateTutorials } from "@/app/admin-dashboard/manage-tutorials/api/rote";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import toast from "react-hot-toast";


const AddTutorials = () => {
    const addNewVideo = useCreateTutorials();
    // handle input
    const handleLinkSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const form = e.target as HTMLFormElement;
        const embed_link = form.link.value;
        if (!embed_link) {
            return toast.error('enter a link');
        }
        const res = await addNewVideo.mutateAsync(embed_link);

        if (res.insertedId) {
            form.reset(); // Reset the form
        }
    }
    return (
        <div className="  text-white rounded-md bg-foreground md:w-1/4 mx-auto p-5 my-5">
            <h2 className="text-center p-3">Add a new Tutorial</h2>
            <form
                onSubmit={handleLinkSubmit}
                className="flex w-full max-w-sm items-center space-x-2">
                <Input
                    name="link"
                    type="text" id="link" placeholder="Enter embed youtube link"

                />
                <Button className="" variant='default' type="submit">Add</Button>
            </form>
        </div>
    );
};

export default AddTutorials;