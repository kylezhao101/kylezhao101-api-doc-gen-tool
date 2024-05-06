import { getSectionBySlug } from "../fetchers";
import 'github-markdown-css/github-markdown-light.css';

export default async function BlogPage({
  params,
}: {
  params: { slug: string[] }; // An array for all captured segments
}) {
  // Combine the slug array to form the complete path
  const combinedSlug = params.slug.join('/');

  // Log the received slug for debugging
  console.log(`Received slug: ${combinedSlug}`);

  // Retrieve the content based on the complete slug path
  const section = await getSectionBySlug(combinedSlug);

  return (
    <main className="prose markdown-body">
      <article>{section.content}</article>
    </main>
  );
}