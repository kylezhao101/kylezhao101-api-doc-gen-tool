'use client'
import Link from 'next/link';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import React, { useEffect, useState } from 'react';
import { MenuIcon, GithubIcon } from 'lucide-react';

export default function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  useEffect(() => {
    const body = document.body;
    if (isMobileMenuOpen) {
      body.style.overflow = 'hidden';
    } else {
      body.style.overflow = 'visible';
    }

    // Cleanup function to reset overflow when component unmounts
    return () => {
      body.style.overflow = 'visible';
    };
  }, [isMobileMenuOpen]);

  const placeholderLinks = Array.from({ length: 30 }, (_, index) => ({
    href: `#item${index + 1}`,
    label: `Placeholder Item ${index + 1}`
  }));

  return (
    <>
      <nav className="w-full h-14 z-30 fixed border-b px-5 bg-white bg-opacity-10 backdrop-blur">
        <div className='flex h-full justify-between md:max-w-screen-2xl md:mx-auto'>

          <button className="md:hidden flex items-center gap-x-2" onClick={toggleMobileMenu}>
            <MenuIcon></MenuIcon>
            <Avatar>
              <AvatarImage src="https://github.com/kylezhao101.png" />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
          </button>

          <ul className="hidden md:flex space-x-6 items-center">
            <Link className="flex items-center space-x-2" href="/">
              <Avatar>
                <AvatarImage src="https://github.com/kylezhao101.png" />
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>
              <span className="text-sm">Kylezhao101-api</span>
            </Link>
            <li>
              <Link className="text-sm" href="/documentation/resume-api-endpoints/all-data">
                Documentation
              </Link>
            </li>
            <li>
              <Link className="text-sm" href="/documentation/about-this-site/dynamic-generation">
                About
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
                <GithubIcon></GithubIcon>
              </Link>
            </li>
          </ul>
        </div>
      </nav >

      <div className={`fixed inset-0 bg-black bg-opacity-60 z-40 transition-opacity ${isMobileMenuOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`} onClick={toggleMobileMenu}></div>

      <div className={`transform top-0 left-0 min-w-64 bg-white p-5 fixed h-full overflow-auto ease-in-out transition-all duration-300 z-40 ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        <ul className='flex flex-col gap-2'>
          <li className="mb-2">
            <Link onClick={toggleMobileMenu} href="/">
              <span className="font-semibold">/Kylezhao101-api</span>
            </Link>
          </li>
          <li>
            <Link onClick={toggleMobileMenu} href="/documentation/resume-api-endpoints/all-data">
              Documentation
            </Link>
          </li>
          <li>
            <Link onClick={toggleMobileMenu} href="/documentation/about-this-site/dynamic-generation">
              About
            </Link>
          </li>
          <li>
            <Link onClick={toggleMobileMenu} href="https://github.com/kylezhao101/kylezhao101-api">
              Github
            </Link>
          </li>
        </ul>
      </div>
    </>
  );
}
