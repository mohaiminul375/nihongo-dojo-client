import { Sheet, SheetTrigger, SheetContent } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { NavigationMenu, NavigationMenuList, NavigationMenuLink } from "@/components/ui/navigation-menu";
import Image from "next/image";
import logo from "../../../public/logo.webp";
import { usePathname } from "next/navigation";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { DropdownMenu, DropdownMenuContent, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { useAuth } from "@/AuthProvider/UserContext";
import { useTheme } from "next-themes";

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
    const { user, logOut, loading } = useAuth();
    const { setTheme } = useTheme()
    console.log(user, loading);
    const currentTheme = localStorage.getItem('theme')
    console.log(currentTheme)
    if (!currentTheme) return setTheme('system')
    return (
        <header className="flex h-20 w-full items-center px-4 md:px-6 shadow-2xl bg-foreground fixed top-0">
            {/* Mobile Menu Icon */}
            <div className="lg:hidden mr-4">
                <Sheet>
                    <SheetTrigger asChild>
                        <Button variant="outline" size="icon">
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
            </div>

            {/* Logo */}
            <Link href="/" className="flex items-center" prefetch={false}>
                <MountainIcon />
                <span className="ml-2 text-lg text-white hidden lg:block">Nihongo Dojo</span>

            </Link>
            {/* Desktop Navigation Menu */}
            <div className="hidden lg:flex flex-grow justify-end mr-4">
                <NavigationMenu>
                    <NavigationMenuList className="flex space-x-3">
                        {navItems.map((item, index) => {

                            if (item.title === 'Admin Dashboard' && user?.role !== 'Admin') {
                                return null;
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

            {/* Login/Register Buttons */}
            {user ? (
                <div className="ml-auto flex items-center">
                    <DropdownMenu>
                        <DropdownMenuTrigger>
                            <Avatar>
                                <AvatarImage src={user?.img} alt="avatar" />
                                <AvatarFallback />
                            </Avatar>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent>
                            <DropdownMenuLabel>{user.user_name}</DropdownMenuLabel>
                            <DropdownMenuLabel>{user.email}</DropdownMenuLabel>
                            <DropdownMenuLabel onClick={logOut}>LogOut</DropdownMenuLabel>
                            <DropdownMenuSeparator />
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>
            ) : (
                <div className="ml-auto flex items-center">
                    <Link className="mx-2 text-white" href="/register">Register</Link>
                    <Link href="/login">
                        <Button variant="default" className="rounded-full">Login</Button>
                    </Link>
                </div>
            )}
            {/* theme */}
            <div className="ml-3">
                {currentTheme === "light" ? <MoonIcon
                    onClick={() => setTheme('dark')}
                    className="" /> : <SunIcon
                    onClick={() => setTheme('light')}
                    className="" />}
            </div>
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

function MoonIcon(props: object) {
    console.log(props)
    return (
        <svg
            {...props}
            xmlns="http://www.w3.org/2000/svg"
            width="30"
            height="30"
            viewBox="0 0 24 24"
            fill="none"
            stroke="white"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            <path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z" />
        </svg>
    )
}

function SunIcon(props: object) {
    return (
        <svg
            {...props}
            xmlns="http://www.w3.org/2000/svg"
            width="30"
            height="30"
            viewBox="0 0 24 24"
            fill="none"
            stroke="white"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            <circle cx="12" cy="12" r="4" />
            <path d="M12 2v2" />
            <path d="M12 20v2" />
            <path d="m4.93 4.93 1.41 1.41" />
            <path d="m17.66 17.66 1.41 1.41" />
            <path d="M2 12h2" />
            <path d="M20 12h2" />
            <path d="m6.34 17.66-1.41 1.41" />
            <path d="m19.07 4.93-1.41 1.41" />
        </svg>
    )
}