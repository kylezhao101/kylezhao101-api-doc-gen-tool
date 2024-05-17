import Link from "next/link";
import { Button } from "@/components/ui/button"

export default function Home() {
  return (
    <main className="min-h-screen">
      <header>
        {/* Hero Container */}
        <div className="mx-auto w-full max-w-7xl px-5 md:px-10 md:py-20">
          {/* Component */}
          <div className="grid items-center justify-items-start gap-8 sm:gap-20 lg:grid-cols-2">
            {/* Hero Content */}
            <div className="flex flex-col">
              {/* Hero Title */}
              <h1 className="mb-4 text-3xl font-semibold md:text-5xl">
                Kylezhao101&apos;s API & Docs Generator
              </h1>
              <p className="mb-6 max-w-lg text-sm text-gray-500 sm:text-base md:mb-10 lg:mb-12">
                Hi, this site is the documentation for my personal Resume API, generated using MDX to create dynamic navigation functionalities.
              </p>
              {/* Hero Button */}
              <div className="flex items-center">
                <Button className="mr-6 ">
                  <Link
                    href="/documentation/resume-api-endpoints/all-data"
                  >
                    View the Docs
                  </Link>
                </Button>
                <Button variant="ghost">
                  <Link href="https://github.com/kylezhao101/kylezhao101-api" className="flex max-w-full items-center font-semibold">
                    <img
                      src="https://assets.website-files.com/6458c625291a94a195e6cf3a/6458c625291a94bd85e6cf98_ArrowUpRight%20(4).svg"
                      alt=""
                      className="mr-2 inline-block max-h-4 w-5"
                    />
                    <p>View Github</p>
                  </Link>
                </Button>
              </div>
            </div>
            {/* Hero Image */}
            <img
              src="/jill.gif"
              alt=""
              className="inline-block h-full w-full max-w-2xl rounded-lg"
            />
          </div>
        </div>
      </header>
    </main>
  );
}
