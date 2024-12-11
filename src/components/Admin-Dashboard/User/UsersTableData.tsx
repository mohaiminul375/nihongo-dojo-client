import { Button } from "@/components/ui/button";
import { TableCell, TableRow } from "@/components/ui/table";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"

const UsersTableData = ({ user, idx }) => {
    const { user_name, email, role } = user;

    return (
        <TableRow>
            <TableCell>{idx + 1}</TableCell>
            <TableCell className="font-medium">{user_name}</TableCell>
            <TableCell>{email}</TableCell>
            <TableCell>
                <Select>
                    <SelectTrigger className="w-[100px] mx-auto">
                        <SelectValue placeholder={role} />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="User">User</SelectItem>
                        <SelectItem value="Admin">Admin</SelectItem>
                    </SelectContent>
                </Select>
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

export default UsersTableData;
