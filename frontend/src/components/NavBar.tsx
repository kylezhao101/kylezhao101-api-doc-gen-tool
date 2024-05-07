import Link from 'next/link';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

export default function Navbar() {
  return (
    <nav className="flex justify-between w-full h-14 p-2 z-10 fixed px-10 border-b bg-white bg-opacity-10 backdrop-blur">
      <ul className="flex space-x-6 items-center">
        <Link className="flex items-center space-x-2 text-sm font-mono font-semibold" href="/">
          <Avatar>
            <AvatarImage src="https://github.com/kylezhao101.png" />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
          <span>Kylezhao101-api</span>
        </Link>
        <li>
          <Link className="text-sm" href="/documentation/resume-api-endpoints/all-data">
            Documentation
          </Link>
        </li>
        <li>
          <Link className="text-sm" href="https://github.com/kylezhao101/kylezhao101-api">
            Github
          </Link>
        </li>
      </ul>

      <ul className='flex space-x-6 items-center'>
        <li>
          <Link className="text-sm" href="https://github.com/kylezhao101/kylezhao101-api">
            Github
          </Link>
        </li>
      </ul>
    </nav>
  );
}
