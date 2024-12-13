import { Sheet, SheetTrigger, SheetContent } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { NavigationMenu, NavigationMenuList, NavigationMenuLink } from "@/components/ui/navigation-menu";
import Image from "next/image";
import logo from "../../../public/logo.webp";
import { usePathname } from "next/navigation";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { DropdownMenu, DropdownMenuContent, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { useUser } from "@/AuthProvider/UserContext";

const navItems = [
    {
        title: 'Lessons',
        path: '/lessons'
    },
    {
        title: 'Tutorials',
        path: '/tutorials'
    },
    {
        title: 'Admin Dashboard',
        path: '/admin-dashboard'
    }
];

export default function Navbar() {
    const pathname = usePathname();
    const { user, logOut } = useUser(); // Fetching user data from context

    return (
        <header className="flex h-20 w-full items-center px-4 md:px-6 shadow-2xl border-b-2 bg-gradient-to-b from-[#302b63] via-[#5754f7] to-[#6a5af7]">
            {/* Logo */}
            <Link href="/" className="mr-6 flex items-center lg:mr-12" prefetch={false}>
                <MountainIcon />
                <span className="ml-2 text-lg text-white hidden lg:block">Nihongo Dojo</span>
            </Link>

            {/* Navigation Menu */}
            <div className="hidden lg:flex flex-grow justify-end">
                <NavigationMenu>
                    <NavigationMenuList className="flex space-x-3">
                        {navItems.map((item, index) => {
                            // Conditionally render Admin Dashboard link based on user role
                            if (item.title === 'Admin Dashboard' && user?.role !== 'Admin') {
                                return null; // Skip rendering if user is not an admin
                            }

                            return (
                                <NavigationMenuLink asChild key={index}>
                                    <Link
                                        href={item.path}
                                        className={`group text-white font-bold text-base ${pathname === item.path ? 'underline shadow-2xl' : ''}`}
                                        prefetch={false}
                                    >
                                        {item.title}
                                    </Link>
                                </NavigationMenuLink>
                            );
                        })}
                    </NavigationMenuList>
                </NavigationMenu>
            </div>

            {/* Login Button */}
            {user ? (
                <DropdownMenu>
                    <DropdownMenuTrigger>
                        <Avatar>
                            <AvatarImage src={user?.img} alt="avatar" />
                            <AvatarFallback></AvatarFallback>
                        </Avatar>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent>
                        <DropdownMenuLabel>{user.user_name}</DropdownMenuLabel>
                        <DropdownMenuLabel>{user.user_email}</DropdownMenuLabel>
                        <DropdownMenuLabel
                            onClick={logOut}
                        >LogOut</DropdownMenuLabel>
                        <DropdownMenuSeparator />

                    </DropdownMenuContent>
                </DropdownMenu>
            ) : (
                <div className="ml-auto hidden lg:block">
                    <Link className="mr-2" href='/register'>Register</Link>
                    <Link href='/login'>
                        <Button variant='default' className="rounded-full">Login</Button>
                    </Link>
                </div>
            )}

            {/* Mobile Menu */}
            <Sheet>
                <SheetTrigger asChild>
                    <Button variant="outline" size="icon" className="lg:hidden ml-auto">
                        <MenuIcon />
                        <span className="sr-only">Toggle navigation menu</span>
                    </Button>
                </SheetTrigger>
                <SheetContent side="left">
                    <div className="grid gap-2 py-6">
                        {navItems.map((item, index) => {
                            if (item.title === 'Admin Dashboard' && user?.role !== 'Admin') {
                                return null;
                            }

                            return (
                                <Link
                                    key={index}
                                    href={item.path}
                                    className={`flex w-full items-center py-2 text-lg font-semibold text-white ${pathname === item.path ? 'underline shadow-2xl' : ''}`}
                                    prefetch={false}
                                >
                                    {item.title}
                                </Link>
                            );
                        })}
                    </div>
                </SheetContent>
            </Sheet>
        </header>
    );
}

function MenuIcon() {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 5.25h16.5m-16.5 4.5h16.5m-16.5 4.5h16.5m-16.5 4.5h16.5" />
        </svg>
    );
}

// Logo for large devices
function MountainIcon() {
    return <Image className="rounded-full" src={logo} alt="Logo" height={40} width={40} />;
}
