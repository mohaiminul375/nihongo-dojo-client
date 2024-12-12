'use client'
import {
    Table,
    TableBody,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
// import { Button } from "@/components/ui/button"
import { useGetUsers } from "./api/route"
import UsersTableData from "@/components/Admin-Dashboard/User/UsersTableData";

export default function UserTable() {
    const { data: users = [], isPending,
        //  isError, error 
        } = useGetUsers();
    if (isPending) {
        return <p>loading</p>
    }
    console.log(users)
    return (
        <section className=" mt-10">
            {/* Header Section */}
            <div className="text-center my-10">
                <h2 className="text-3xl text-white font-semibold">Manage Users for Nihongo Dojo</h2>
                <p className="text-gray-400 mt-2">View, update, or delete user information with ease</p>
            </div>

            <div className="md:max-w-6xl mx-auto text-white bg-[#29274d] rounded-md p-5">
                <Table className="">
                    <TableHeader>
                        <TableRow>
                            <TableHead className="w-[50px]">#</TableHead>
                            <TableHead>Name</TableHead>
                            <TableHead>Email</TableHead>
                            <TableHead>Role</TableHead>
                            <TableHead className="text-right">Actions</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {users.map((user, index) => (
                            <UsersTableData
                                key={user._id}
                                user={user}
                                idx={index}
                            >

                            </UsersTableData>
                        ))}
                    </TableBody>
                </Table>
            </div>
        </section>
    )
}

