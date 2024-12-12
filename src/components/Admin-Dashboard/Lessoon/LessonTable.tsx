import { useDeleteLesson } from "@/app/admin-dashboard/all-lesson/api/route";
import { Button } from "@/components/ui/button";
import { TableCell, TableRow } from "@/components/ui/table";
import toast from "react-hot-toast";
import Swal from "sweetalert2";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { useState } from "react";
import LessonDialog from "../LessonUser/LessonDialog";
// main func start
const LessonTable = ({ lesson, idx }) => {
    const deleteLesson = useDeleteLesson();
    const { _id, lesson_name, lesson_no, vocabulary_count } = lesson
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    // handle delete lesson
    const handleDeleteLesson = (id: string) => {
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
            const res = await deleteLesson.mutateAsync(id);
            if (res.deletedCount > 0) {
                if (result.isConfirmed) {
                    Swal.fire({
                        title: "Deleted!",
                        text: "Your file has been deleted.",
                        icon: "success"
                    });
                }
            } else {
                toast.error('Operation Failed')
            }

        });
    }
    return (
        <TableRow>
            <TableCell>{idx + 1}</TableCell>
            <TableCell className="font-medium">{`${lesson_no}-${lesson_name}`}</TableCell>
            <TableCell>
                {vocabulary_count}
            </TableCell>
            <TableCell className="text-right">
                <div className="flex justify-end gap-2">
                    <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                        <DialogTrigger asChild>
                            <Button variant="outline" size="sm">
                                Edit
                            </Button>
                        </DialogTrigger>
                        <DialogContent className="md:max-w-6xl">
                            <DialogHeader className="text-white">
                                <DialogTitle>Edit Lesson</DialogTitle>
                                <DialogDescription className="text-white">
                                    Make changes to the Lesson item here. Click save when you're done.
                                </DialogDescription>
                            </DialogHeader>
                            <LessonDialog lesson={lesson} ></LessonDialog>
                        </DialogContent>
                    </Dialog>
                    <Button
                        onClick={() => handleDeleteLesson(_id)}
                        variant="outline" size="sm" className="text-red-700">
                        Delete
                    </Button>
                </div>
            </TableCell>
        </TableRow>
    );
};

export default LessonTable;