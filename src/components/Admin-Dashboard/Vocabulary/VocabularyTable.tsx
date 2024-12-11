import { Button } from "@/components/ui/button";
import { TableCell, TableRow } from "@/components/ui/table";

const VocabularyTable = ({ vocabulary, idx }) => {
    const { _id, word, pronunciation, when_to_say, english_meaning, lesson_no } = vocabulary;
    return (
        <TableRow>
            <TableCell>{idx + 1}</TableCell>
            <TableCell className="font-medium">
                {word}
            </TableCell>
            <TableCell>
                {english_meaning}
            </TableCell>
            <TableCell>
                {pronunciation}
                {/* <Select>
                    <SelectTrigger className="w-[100px] mx-auto">
                        <SelectValue placeholder={role} />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="User">User</SelectItem>
                        <SelectItem value="Admin">Admin</SelectItem>
                    </SelectContent>
                </Select> */}
            </TableCell>
            <TableCell>
                {when_to_say}
            </TableCell>
            <TableCell>
                {lesson_no}
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

export default VocabularyTable;