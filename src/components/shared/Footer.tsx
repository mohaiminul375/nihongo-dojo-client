import { Facebook, Instagram, Linkedin, Twitter } from 'lucide-react'
import Link from 'next/link'


const Footer = () => {
    return (
        <footer className="bg-foreground text-white">
            <div className="max-w-7xl mx-auto px-4 py-10">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {/* Company Info */}
                    <div>
                        <h3 className="text-lg font-semibold mb-4">Nihongo Dojo</h3>
                        <p className="mb-4">We are dedicated to providing the best service to our Students.</p>
                        <p>© 2025 Nihongo Dojo. All rights reserved.</p>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
                        <ul className="space-y-2">
                            <li><Link href="/" className="hover:text-gray-300 transition-colors">Home</Link></li>
                            <li><Link href="/lessons" className="hover:text-gray-300 transition-colors">Lessons</Link></li>
                            <li><Link href="/tutorials" className="hover:text-gray-300 transition-colors">Tutorials</Link></li>
                            <li><Link href="/contact" className="hover:text-gray-300 transition-colors"></Link></li>
                        </ul>
                    </div>

                    {/* Social Media and Contact */}
                    <div>
                        <h3 className="text-lg font-semibold mb-4">Connect With Us</h3>
                        <div className="flex space-x-4 mb-4">
                            <a href="#" className="hover:text-gray-300 transition-colors"><Facebook size={24} /></a>
                            <a href="#" className="hover:text-gray-300 transition-colors"><Twitter size={24} /></a>
                            <a href="#" className="hover:text-gray-300 transition-colors"><Instagram size={24} /></a>
                            <a href="" className="hover:text-gray-300 transition-colors"><Linkedin size={24} /></a>
                        </div>
                        <p>Email: info@nihongo.com</p>
                        <p>Phone: (123) 456-7890</p>
                    </div>
                </div>
                {/* developer info */}
                <div className="flex flex-col items-start text-white space-y-2 text-sm md:text-sm font-semibold">
                    <p>
                        Design & Developed by:{" "}
                        <Link
                            target='_blank'
                            href="https://mohaiminul-dev.web.app" className="underline hover:text-gray-300">
                            Mohaiminul Islam
                        </Link>
                    </p>
                    <p> Last Update: 23-May-2025, 4:43 P.M (BDT)</p>
                </div>

            </div>
        </footer >
    )
}

export default Footer

