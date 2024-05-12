'use client'
import Link from 'next/link';
import { useState, useEffect } from 'react';

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

  return (
    <>
      <button onClick={toggleSidebar} className="lg:hidden fixed top-14 right-4 z-20">
        <span className="material-icons">menu</span>
      </button>

      <div className="hidden lg:block min-w-fit sticky top-28 h-screen w-60">
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
