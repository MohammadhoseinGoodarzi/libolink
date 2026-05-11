import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";

export function Hero() {
  return (
    <section className="flex flex-col items-center gap-6 px-4 sm:px-6 md:h-[calc(100vh-91px)] md:gap-0 md:justify-between">
      <div className="flex flex-col items-center text-center py-6 shrink-0">
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-brand-primary max-w-3xl leading-tight">
          Welcome To book Country
        </h1>
        <p className="mt-5 text-base md:text-lg text-brand-gray max-w-120 leading-relaxed">
          If the world of books were a nation, readers would be its citizens and
          LEXO would be its capital.
        </p>
        <div className="mt-8 flex items-center justify-center gap-4 flex-wrap">
          <Button asChild>
            <Link href="/signup">Get Start</Link>
          </Button>
          <Button variant="outline" asChild>
            <Link href="/about">Read More</Link>
          </Button>
        </div>
      </div>

      <div className="w-full max-w-6xl overflow-hidden rounded-t-2xl">
        <Image
          src="/app-preview.png"
          alt="Libolink app preview"
          width={1045}
          height={534}
          priority
          fetchPriority="high"
          quality={100}
          sizes="(max-width: 768px) 100vw, (max-width: 1280px) 90vw, 1152px"
          className="w-full h-auto"
        />
      </div>
    </section>
  );
}
