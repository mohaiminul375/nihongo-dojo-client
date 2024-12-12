import { Button } from "@/components/ui/button";
import { TableCell, TableRow } from "@/components/ui/table";


const LessonTable = ({ lesson, idx }) => {
    const { lesson_name, lesson_no, vocabulary_count } = lesson
    return (
        <TableRow>
            <TableCell>{idx + 1}</TableCell>
            <TableCell className="font-medium">{`${lesson_no}-${lesson_name}`}</TableCell>
            <TableCell>
                {vocabulary_count}
            </TableCell>
            <TableCell className="text-right">
                <div className="flex justify-end gap-2">
                    <Button variant="outline" size="sm">
                        Edit
                    </Button>
                    <Button variant="outline" size="sm" className="text-red-700">
                        Delete
                    </Button>
                </div>
            </TableCell>
        </TableRow>
    );
};

export default LessonTable;