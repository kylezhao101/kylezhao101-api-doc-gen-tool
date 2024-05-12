import fs from "fs";
import path from "path";
import { compileMDX } from "next-mdx-remote/rsc";
import { Badge } from "@/components/ui/badge";
import remarkGfm from 'remark-gfm';
import remarkToc from 'remark-toc';
import rehypeSlug from 'rehype-slug';
import { visit } from 'unist-util-visit';
import { readdirSync } from "fs";
import { join, parse } from "path";

const contentDir = path.join(process.cwd(), "src/app/documentation/mdx-content");

const components = {
  Badge,
};

// Helper function to extract headings
function extractHeadings(markdownAST: any) {
  const headings: { depth: any; text: any; }[] = [];
  visit(markdownAST, "heading", (node) => {
    const text = node.children
      .filter((child: { type: string; }) => child.type === "text")
      .map((child: { value: any; }) => child.value)
      .join("");
    headings.push({
      depth: node.depth,
      text,
    });
  });
  return headings;
}

export async function getSectionBySlug(slug: string) {
  // Construct the path directly from the slug input
  const slugPathArray = slug.split('/');
  const fileName = slugPathArray.pop()! + ".mdx"; // Last element as file name
  const subDirectory = path.join(contentDir, ...slugPathArray); // Remaining elements as sub-directory path
  const filePath = path.join(subDirectory, fileName);

  if (!fs.existsSync(filePath)) {
    throw new Error(`File with slug '${slug}' not found at path '${filePath}'`);
  }

  const fileContent = fs.readFileSync(filePath, "utf8"); // read file content

  let headings: { depth: any; text: any; }[] = [];
  const { frontmatter, content } = await compileMDX<{
    title: string;
    author: string;
    publishDate: string;
  }>({
    source: fileContent,
    options: {
      parseFrontmatter: true,
      mdxOptions: {
        remarkPlugins: [
          [() => (tree) => {
            headings = extractHeadings(tree);
          }],
          remarkGfm,
          [remarkToc, { heading: 'Table of Contents', maxDepth: 3 }],
        ], 
        rehypePlugins: [
          rehypeSlug,  
        ],
      }, 
    },
    components: components,
  });
  return {
    frontmatter,
    content,
    headings,
    slug: path.parse(fileName).name,
  };
}

async function getTitleOrName(slug: string): Promise<string> {
  try {
    const section = await getSectionBySlug(slug);
    return section.frontmatter.title || slug.split('/').pop()!.replace(/-/g, ' ');
  } catch {
    // Return the formatted name in case of errors
    return slug.split('/').pop()!.replace(/-/g, ' ');
  }
}

// Recursive function to collect all .mdx slugs
function collectSlugs(dir: string, base: string): string[] {
  const items = fs.readdirSync(dir);
  let slugs: string[] = [];

  items.forEach((item) => {
    const fullPath = path.join(dir, item);
    let relativePath = path.join(base, path.parse(item).name);

    relativePath = relativePath.replace(/\\/g, "/");

    if (fs.statSync(fullPath).isDirectory()) {
      // If the item is a directory, recurse with the relative path as the base
      slugs = slugs.concat(collectSlugs(fullPath, relativePath));
    } else if (item.endsWith(".mdx")) {
      // If it's an MDX file, add its relative path (as a slug) to the list
      slugs.push(relativePath);
    }
  });

  return slugs;
}

// Exported function to initiate slug collection
export function getAllSectionSlugs(): string[] {
  return collectSlugs(contentDir, "");
}

export async function getAdjacentSlugsWithTitles(slug: string) {
  const lowerSlug = slug.toLowerCase();

  const allSlugs = getAllSectionSlugs().map(s => s.toLowerCase());

  console.log(allSlugs)
  const currentIndex = allSlugs.indexOf(slug);
  console.log(currentIndex)

  const previousSlug = currentIndex > 0 ? allSlugs[currentIndex - 1] : null;
  const nextSlug = currentIndex < allSlugs.length - 1 ? allSlugs[currentIndex + 1] : null;

  const previousTitle = previousSlug ? await getTitleOrName(previousSlug) : null;
  const nextTitle = nextSlug ? await getTitleOrName(nextSlug) : null;

  console.log(previousTitle, nextTitle)

  return {
    previous: previousSlug ? { slug: previousSlug, title: previousTitle } : null,
    next: nextSlug ? { slug: nextSlug, title: nextTitle } : null,
  };
}