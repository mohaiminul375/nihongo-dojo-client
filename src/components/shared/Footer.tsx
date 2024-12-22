import { Facebook, Instagram, Linkedin, Twitter } from 'lucide-react'
import Link from 'next/link'
// import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from 'react-icons/fa'

const Footer = () => {
    return (
        <footer className="bg-gradient-to-b from-[#302b63] via-[#5754f7] to-[#6a5af7] text-white">
            <div className="max-w-6xl mx-auto px-4 py-10">
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
            </div>
        </footer>
    )
}

export default Footer

