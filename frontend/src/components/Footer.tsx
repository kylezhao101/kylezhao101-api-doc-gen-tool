import Link from 'next/link';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

export default function Footer() {
    return (
        <nav className="w-full min-h-14 py-5 p-2 z-10">
            <div className='h-full flex  justify-between md:max-w-screen-2xl mx-8 md:mx-auto'>

                <ul className="flex flex-col sm:flex-row sm:space-x-6 ">

                    <li className='text-sm'>
                        <p className="text-sm">🐳 Probably some footer content :3</p>
                    </li>

                    <li className='opacity-60'>
                        <p className="text-sm">I love TailwindCSS</p>
                    </li>
                </ul>

            </div>
        </nav >
    );
}
