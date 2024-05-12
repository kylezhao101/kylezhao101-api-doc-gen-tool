'use client'
import Link from 'next/link';
import { useState, useEffect } from 'react';
import { ChevronRight } from 'lucide-react';

interface Link {
  name: string;
  href: string;
}

interface SidebarSection {
  title: string;
  links: Link[];
}

const Sidebar = () => {
  const [sidebarData, setSidebarData] = useState<SidebarSection[]>([]);
  const [isOpen, setIsOpen] = useState(false);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  const closeSidebar = () => {
    setIsOpen(false);
  };

  useEffect(() => {
    // Function to fetch sidebar data
    const fetchSidebarData = async () => {
      try {
        const response = await fetch('/api/sidebarData');
        const data = await response.json();
        setSidebarData(data);
      } catch (error) {
        console.error("Failed to fetch sidebar data:", error);
      }
    };

    fetchSidebarData();
  }, []);

  useEffect(() => {
    const body = document.body;
    if (isOpen) {
      body.style.overflow = 'hidden';
    } else {
      body.style.overflow = 'visible';
    }
    return () => {
      body.style.overflow = 'visible';
    };
  }, [isOpen]);

  return (
    <>
      <button onClick={toggleSidebar} className="h-10 lg:hidden px-8 fixed w-full top-14 left z-20 bg-white bg-opacity-10 backdrop-blur border-b">
        <span className={"flex text-sm items-center gap-x-4"}>
          <ChevronRight style={{ transform: isOpen ? 'rotate(90deg)' : 'none' }} size={16} /> Documentation Menu
        </span>
      </button>

      <div className={`lg:hidden fixed w-full h-screen top-0 pt-28 left-0 z-10 transform ${isOpen ? "translate-y-0" : "-translate-y-full"} transition-transform duration-500 ease-in-out bg-white z-10`}>
        {sidebarData.map((section) => (
          <div key={section.title} className='ml-8 mb-4'>
            <h3 className="mb-3 text-sm font-semibold">{section.title}</h3>
            <ul>
              {section.links.map(link => (
                <li className="mb-2 pl-4" key={link.name}>
                  <Link className="text-sm opacity-75 hover:opacity-100" href={link.href} onClick={closeSidebar}>
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <div className={`hidden lg:block min-w-fit sticky top-28 h-screen w-60 `}>
        {sidebarData.map((section) => (
          <div key={section.title} className='mb-4'>
            <h3 className="mb-3 text-sm font-semibold">{section.title}</h3>
            <ul>
              {section.links.map(link => (
                <li className="mb-2 pl-4" key={link.name}>
                  <Link className="text-sm opacity-75 hover:opacity-100" href={link.href}>
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

    </>
  );
};

export default Sidebar;
