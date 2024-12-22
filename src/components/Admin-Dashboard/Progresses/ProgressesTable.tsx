'use client'
import { TableCell, TableRow } from "@/components/ui/table";
interface Progress {
    email: string;
    lessons: Array<[]>;
}
interface TableProps {
    idx: number;
    progress: Progress
}

const ProgressesTable = ({ progress, idx }: TableProps) => {
    console.log(progress)
    const { email, lessons } = progress
    return (
        <TableRow>
            <TableCell>{idx + 1}</TableCell>
            <TableCell>{email}</TableCell>
            <TableCell className="font-medium">{lessons.length}</TableCell>

        </TableRow>
    );
};

export default ProgressesTable;