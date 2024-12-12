'use client'

import { useDeleteVocabulary } from "@/app/admin-dashboard/all-vocabularies/api/route";
import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { TableCell, TableRow } from "@/components/ui/table";
import { useState } from "react";
import toast from "react-hot-toast";
import Swal from "sweetalert2";
import VocabularyDialog from "./VocabularyDialog";

const VocabularyTable = ({ vocabulary, idx }) => {
    const deleteVocabulary = useDeleteVocabulary();
    const { _id, word, pronunciation, when_to_say, english_meaning, lesson_no } = vocabulary;
    const [isDialogOpen, setIsDialogOpen] = useState(false);

    // delete vocabulary
    const handleDeleteVocabulary = (id: string) => {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
        }).then(async (result) => {
            if (result.isConfirmed) {
                try {
                    const res = await deleteVocabulary.mutateAsync(id);
                    if (res.deletedCount > 0) {
                        Swal.fire({
                            title: "Deleted!",
                            text: "Your file has been deleted.",
                            icon: "success"
                        });
                    } else {
                        toast.error('Operation Failed');
                    }
                } catch (error) {
                    console.error("Error deleting vocabulary:", error);
                    toast.error('Operation Failed');
                }
            }
        });
    }

    return (
        <>
            <TableRow>
                <TableCell>{idx + 1}</TableCell>
                <TableCell className="font-medium">{word}</TableCell>
                <TableCell>{english_meaning}</TableCell>
                <TableCell>{pronunciation}</TableCell>
                <TableCell>{when_to_say}</TableCell>
                <TableCell>{lesson_no}</TableCell>
                <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                        <Dialog  open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                            <DialogTrigger asChild>
                                <Button variant="outline" size="sm">
                                    Edit
                                </Button>
                            </DialogTrigger>
                            <DialogContent className="md:max-w-6xl">
                                <DialogHeader className="text-white">
                                    <DialogTitle>Edit Vocabulary</DialogTitle>
                                    <DialogDescription className="text-white">
                                        Make changes to the vocabulary item here. Click save when you're done.
                                    </DialogDescription>
                                </DialogHeader>
                              <VocabularyDialog></VocabularyDialog>
                            </DialogContent>
                        </Dialog>
                        <Button
                            onClick={() => handleDeleteVocabulary(_id)}
                            variant="outline"
                            size="sm"
                            className="text-red-700"
                        >
                            Delete
                        </Button>
                    </div>
                </TableCell>
            </TableRow>
        </>
    );
};

export default VocabularyTable;

