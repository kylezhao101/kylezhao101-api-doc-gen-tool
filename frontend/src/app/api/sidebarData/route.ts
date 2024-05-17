import fs from 'fs/promises';
import path from 'path';
import { NextRequest, NextResponse } from 'next/server';

// Type definitions
interface SidebarLink {
  name: string;
  href: string;
}

interface SidebarSection {
  title: string;
  links: SidebarLink[];
}

const contentDir = path.join(process.cwd(), 'src/app/documentation/mdx-content');

// Function to replace hyphens with spaces and capitalize each word
function formatTitle(name: string): string {
  return name.replace(/-/g, ' ').replace(/\b\w/g, (l) => l.toUpperCase());
}

// Generates the sidebar data dynamically
async function generateSidebarData(): Promise<SidebarSection[]> {
  const entries = await fs.readdir(contentDir, { withFileTypes: true });
  const sidebarData: SidebarSection[] = [];

  for (const entry of entries) {
    if (entry.isDirectory()) {
      const folderName = entry.name;
      const files = await fs.readdir(path.join(contentDir, folderName));

      const links: SidebarLink[] = files
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
  }

  return sidebarData;
}

export async function GET(request: NextRequest): Promise<NextResponse> {
  try {
    const data = await generateSidebarData();
    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to generate sidebar data' }, { status: 500 });
  }
}
