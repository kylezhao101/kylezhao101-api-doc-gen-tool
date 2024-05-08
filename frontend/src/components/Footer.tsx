import Link from 'next/link';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

export default function Footer() {
    return (
        <nav className="w-full h-14 p-2 z-10 border-b px-8">
            <div className='flex items-center justify-between md:max-w-screen-2xl mx-8 md:mx-auto'>
                <ul className="flex space-x-6 items-center">
                    <Link className="flex items-center space-x-2 " href="/">
                        <span className="text-sm">🐳 Probably some footer content :3</span>
                    </Link>
                    <li>
                        <Link className="text-sm flex items-center" href="/documentation/resume-api-endpoints/all-data">
                            Made with NextJS + shadcn-ui
                        </Link>
                    </li>
                </ul>
            </div>
        </nav >
    );
}
