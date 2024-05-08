import fs from "fs";
import path from "path";
import { getSectionBySlug } from "../fetchers";
import 'github-markdown-css/github-markdown-light.css';
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import React from "react";
import { Separator } from "@/components/ui/separator"

const contentDir = path.join(process.cwd(), "src/app/documentation/mdx-content");

function getFirstMdxFileInDirectory(directoryPath: string): string | null {
  const files = fs.readdirSync(directoryPath).filter((file) => file.endsWith('.mdx'));

  // Return the first file in alphabetical order if available
  if (files.length > 0) {
    return path.parse(files[0]).name;
  }

  return null; // If no MDX file is found
}

function resolveDefaultFile(slugArray: string[]): string[] {
  const currentPath = path.join(contentDir, ...slugArray);

  if (fs.existsSync(currentPath) && fs.statSync(currentPath).isDirectory()) {
    // Get the first MDX file in the directory
    const defaultFile = getFirstMdxFileInDirectory(currentPath);

    // Append the default file name to the path if it exists
    if (defaultFile) {
      return [...slugArray, defaultFile];
    }
  }

  // If it's not a directory or no file is found, return the original slug
  return slugArray;
}

export default async function BlogPage({
  params,
}: {
  params: { slug: string[] };
}) {
  // Resolve the default file if a directory is specified
  const resolvedSlugArray = resolveDefaultFile(params.slug);
  const combinedSlug = resolvedSlugArray.join('/');

  // Retrieve the content based on the adjusted slug path
  const section = await getSectionBySlug(combinedSlug);

  // Create base path for the breadcrumbs
  const basePath = "/documentation";
  let accumulatedPath = basePath;

  const toc = section.headings.map(({ text, depth }) => ({
    text,
    depth,
    id: text.replace(/\s+/g, '-').toLowerCase(),
  }));

  // Build the breadcrumb list dynamically
  const breadcrumbs = resolvedSlugArray.map((segment, index) => {
    accumulatedPath += `/${segment}`;

    // Determine if this is the last item (current page)
    const isLast = index === resolvedSlugArray.length - 1;

    return isLast ? (
      <BreadcrumbItem key={segment}>
        <BreadcrumbPage>{section.frontmatter.title || segment}</BreadcrumbPage>
      </BreadcrumbItem>
    ) : (
      <BreadcrumbItem key={segment}>
        <BreadcrumbLink href={accumulatedPath}>{segment.replace(/-/g, ' ')}</BreadcrumbLink>
      </BreadcrumbItem>
    );
  });

  const tocList = toc?.map(({ text, depth, id }) => (
    <li key={id} className="mb-2 text-sm opacity-75 hover:opacity-100" style={{ marginLeft: (depth - 1) * 16 }}>
      <a href={`#${id}`}>{text}</a>
    </li>
  )) || null;

  return (
    <div className="flex">
      <section className="flex flex-col w-full">
        <Breadcrumb className="mb-5">
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink href="/documentation/about-this-site/dynamic-generation">Docs</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            {breadcrumbs.map((breadcrumb, index) => (
              <React.Fragment key={index}>
                {breadcrumb}
                {index < breadcrumbs.length - 1 && <BreadcrumbSeparator />}
              </React.Fragment>
            ))}
          </BreadcrumbList>
        </Breadcrumb>
        <div className="min-w-0 md:max-w-5xl m-0 ">
          <article className="object-contain markdown-body inline-block max-w-full ">
            {section.content}
          </article>
        </div>
      </section>

      {/* TOC Sidebar */}
      {
        tocList && (
          <aside className="pl-10 hidden xl:block min-w-64 sticky top-28 h-screen">
            <h2 className="mb-3 text-sm font-semibold">On this page</h2>
            <Separator className="mb-3" />
            <ul>{tocList}</ul>
          </aside>
        )
      }
    </div >
  );
}