'use client'
import { Button } from "@/components/ui/button";
import { TableCell, TableRow } from "@/components/ui/table";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { Ban } from "lucide-react";
import Swal from "sweetalert2";
import { useDeleteUser, useUpdateRole, useUpdateStatus } from "@/app/admin-dashboard/user-management/api/route";
import toast from "react-hot-toast";
interface Users {
    _id: string,
    user_name: string,
    email: string,
    role: string,
    status?: string,
}
interface TableProps {
    user: Users,
    idx: number,
}

const UsersTableData = ({ user, idx }: TableProps) => {

    const deleteUser = useDeleteUser()
    const updateStatus = useUpdateStatus()
    const { _id, user_name, email, role, status } = user;

    const updateRole = useUpdateRole(_id)
    // update role

    // delete user
    const handleDeleteUser = (id: string) => {
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
            const res = await deleteUser.mutateAsync(id);
            console.log(res)
            if (res.acknowledged) {
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
    // handle update role
    const updateNewRole = (role: string) => {
        if (email === 'admin1@nihongo.com') {
            return toast.error("Admin role are protected")
        }
        Swal.fire({
            title: "Are you sure to change role?",
            text: "After change it may get or lost some access",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, update role"
        }).then(async (result) => {

            const res = await updateRole.mutateAsync(role);
            console.log(res)
            if (res.modifiedCount > 0) {
                if (result.isConfirmed) {
                    Swal.fire({
                        title: "Updated!",
                        text: "Operation Successfully",
                        icon: "success"
                    });
                }
            } else {
                toast.error('Operation Failed')
            }

        });
    }
    // handle baned user
    const handleBanUser = (_id: string) => {
        const status = 'Ban';
        console.log(_id, status)
        Swal.fire({
            title: "Are you sure to Ban user?",
            text: "After Ban user will lost access",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, Ban"
        }).then(async (result) => {

            const res = await updateStatus.mutateAsync({ _id, status });
            console.log(res)
            if (res.modifiedCount > 0) {
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
        <TableRow className={`${status && status === 'Ban' && 'text-red-400'}`}>
            <TableCell>{idx + 1}</TableCell>
            <TableCell className="font-medium">{user_name}</TableCell>
            <TableCell>{email}</TableCell>
            <TableCell>
                <Select
                    disabled={status === 'Ban'}
                    onValueChange={(value) => {
                        updateNewRole(value)
                    }}
                >
                    <SelectTrigger
                        className="w-[100px] mx-auto">
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
                    <Button
                        className="disabled:cursor-not-allowed"
                        disabled={status === 'Ban' || email === 'admin1@nihongo.com'}
                        onClick={() => handleBanUser(_id)}
                        variant="secondary" size="sm">
                        <Ban />
                    </Button>
                    <Button
                        disabled={email === 'admin1@nihongo.com'}
                        onClick={(() => handleDeleteUser(_id))}
                        variant="secondary" size="sm" className="text-red-700">
                        Delete
                    </Button>
                </div>
            </TableCell>
        </TableRow>
    );
};

export default UsersTableData;
