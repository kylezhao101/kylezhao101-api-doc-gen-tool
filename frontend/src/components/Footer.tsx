import Link from 'next/link';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

export default function Footer() {
    return (
        <nav className="w-full h-14 p-2 z-10 border-b">
            <div className='flex items-center justify-between md:max-w-screen-2xl mx-8 md:mx-auto'>

                <ul className="flex flex-col sm:flex-row  sm:space-x-6 items-center">

                    <li className='text-sm flex items-center'>
                        <p className="text-sm">🐳 Probably some footer content :3</p>
                    </li>

                    <li className='flex items-center opacity-60'>
                        <p className="text-sm">I love TailwindCSS</p>
                    </li>
                </ul>
            </div>
        </nav >
    );
}
