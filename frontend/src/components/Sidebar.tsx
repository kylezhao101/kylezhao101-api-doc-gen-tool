import Link from 'next/link';
import { generateSidebarData } from '@/app/documentation/sidebarGenerator';

const Sidebar = () => {
  // Generate the sidebar data dynamically
  const sidebarData = generateSidebarData();

  return (
    <div className="w-64 fixed">
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
  );
};

export default Sidebar;
