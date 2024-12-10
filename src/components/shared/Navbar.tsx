import { Sheet, SheetTrigger, SheetContent } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { NavigationMenu, NavigationMenuList, NavigationMenuLink } from "@/components/ui/navigation-menu";
import Image from "next/image";
import logo from "../../../public/logo.webp";
const navItems = [
    {
        title: 'Home',
        path: '/'
    },
    {
        title: 'Lessons',
        path: '/lessons'
    },
    {
        title: 'Tutorials',
        path: '/tutorials'
    }
]
export default function Navbar() {
    return (
        <header className="flex h-20 w-full items-center px-4 md:px-6 shadow-2xl border-b-2">
            {/* Logo */}
            <Link href="/" className="mr-6 flex items-center lg:mr-12" prefetch={false}>
                <MountainIcon />
                <span className="ml-2 text-lg text-primary hidden lg:block">Nihongo Dojo</span>
            </Link>

            {/* Navigation Menu */}
            <div className="hidden lg:flex flex-grow justify-end">
                <NavigationMenu>
                    <NavigationMenuList className="flex space-x-3">
                        {navItems.map((item, index) => (
                            <NavigationMenuLink asChild key={index}>
                                <Link
                                    href={item.path}
                                    className="group inline-flex h-9 items-center justify-center rounded-md bg-white px-4 py-2 text-sm font-medium transition-colors hover:bg-gray-100 hover:text-gray-900 focus:bg-gray-100 focus:text-gray-900 dark:bg-gray-950 dark:hover:bg-gray-800 dark:hover:text-gray-50 dark:focus:bg-gray-800 dark:focus:text-gray-50"
                                    prefetch={false}
                                >
                                    {item.title}
                                </Link>
                            </NavigationMenuLink>
                        ))}
                    </NavigationMenuList>
                </NavigationMenu>
            </div>

            {/* lLogin button*/}
            <div className="ml-auto hidden lg:block">
                <Link href='/login'>
                    <Button variant='default'>Login</Button>
                </Link>
            </div>

            {/* Mobile Menu */}
            <Sheet>
                <SheetTrigger asChild>
                    <Button variant="outline" size="icon" className="lg:hidden ml-auto">
                        <MenuIcon />
                        {/* <button>login</button> */}
                        <span className="sr-only">Toggle navigation menu</span>
                    </Button>
                </SheetTrigger>
                <SheetContent side="left">
                    <div className="grid gap-2 py-6">
                        {navItems.map((item, index) => (
                            <Link
                                key={index}
                                href={item.path}
                                className="flex w-full items-center py-2 text-lg font-semibold"
                                prefetch={false}
                            >
                                {item.title}
                            </Link>
                        ))}
                    </div>
                </SheetContent>
            </Sheet>
        </header>
    );
}

function MenuIcon() {
    return <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6">
        <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 5.25h16.5m-16.5 4.5h16.5m-16.5 4.5h16.5m-16.5 4.5h16.5" />
    </svg>

}

// Logo for large devices
function MountainIcon() {
    return <Image className="rounded-full" src={logo} alt="Logo" height={40} width={40} />;
}
