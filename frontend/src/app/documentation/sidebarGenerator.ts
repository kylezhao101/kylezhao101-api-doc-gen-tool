import fs from 'fs';
import path from 'path';

const contentDir = path.join(process.cwd(), 'src/app/documentation/mdx-content');

// Function to replace hyphens with spaces and capitalize each word
function formatTitle(name: string) {
  return name.replace(/-/g, ' ').replace(/\b\w/g, (l) => l.toUpperCase());
}

// Generates the sidebar data dynamically
export function generateSidebarData() {
  const sections = fs.readdirSync(contentDir, { withFileTypes: true });
  const sidebarData: {
      title: string; // Convert folder name to a title
      links: {
          name: string; // Convert to a readable name
          href: string;
      }[];
  }[] = [];

  sections.forEach((entry) => {
    if (entry.isDirectory()) {
      const folderName = entry.name;
      const files = fs.readdirSync(path.join(contentDir, folderName));

      const links = files
        .filter((file) => file.endsWith('.mdx'))
        .map((file) => {
          const name = path.parse(file).name;
          return {
            name: formatTitle(name), // Convert to a readable name
            href: `/documentation/${folderName}/${name}`, // Create URL based on the file name
          };
        });

      sidebarData.push({
        title: formatTitle(folderName), // Convert folder name to a title
        links,
      });
    }
  });

  return sidebarData;
}
