import fs from "fs";
import path from "path";
import { compileMDX } from "next-mdx-remote/rsc";
import { Badge } from "@/components/ui/badge";
import remarkGfm from 'remark-gfm';
import remarkToc from 'remark-toc';
import rehypeSlug from 'rehype-slug';
import { visit } from 'unist-util-visit';


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

export async function getAllSections() {
  const files = fs.readdirSync(contentDir);
  const sections = await Promise.all(
    files.map(async (file) => await getSectionBySlug(path.parse(file).name))
  );
  return sections;
}

export function getAllSectionSlugs() {
  // Assuming that `resume-api-endpoints` and other directories have pre-determined slugs
  const predefinedPaths = [
    'resume-api-endpoints/all',
    'resume-api-endpoints/education',
    'resume-api-endpoints/experience',
    'resume-api-endpoints/project',
    'authentication/api-key-check',
  ];

  return predefinedPaths.map((slug) => ({ slug }));
}