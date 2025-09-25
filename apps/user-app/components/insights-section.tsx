import Image from "next/image";

export default function InsightsSection() {
  return (
    <section className="py-16 md:py-40" id="insights">
      <div className="mx-auto max-w-5xl space-y-8 px-6 md:space-y-16">
        <h2 className="relative z-10 max-w-xl text-4xl font-medium lg:text-5xl">
          The Digital Wallet Built for Speed & Simplicity.
        </h2>
        <div className="grid gap-6 sm:grid-cols-2 md:gap-12 lg:gap-24">
          <div className="relative mb-6 sm:mb-0">
            <div className="bg-linear-to-b aspect-76/59 relative rounded-2xl from-zinc-300 to-transparent p-px dark:from-zinc-700">
              <Image
                src="/payments.png"
                className="hidden rounded-[15px] dark:block"
                alt="payments illustration dark"
                width={1207}
                height={929}
              />
              <Image
                src="/payments-light.png"
                className="rounded-[15px] shadow dark:hidden"
                alt="payments illustration light"
                width={1207}
                height={929}
              />
            </div>
          </div>

          <div className="relative space-y-4">
            <p className="text-muted-foreground">
              Stash is more than just a digital wallet.{" "}
              <span className="text-accent-foreground font-bold">
                It empowers seamless money management
              </span>{" "}
              — from adding funds to sending and receiving payments instantly.
            </p>
            <p className="text-muted-foreground">
              It&apos;s built for speed, security, and simplicity — giving you
              the modern PayTM-like experience with a developer-first full-stack
              foundation.
            </p>

            <div className="pt-6">
              <blockquote className="border-l-4 pl-4">
                <p>
                  Using Stash feels like carrying a bank in my pocket. It&apos;s
                  fast, reliable, and secure — exactly what a wallet should be.
                </p>

                <div className="mt-6 space-y-3">
                  <cite className="block font-medium">John Doe</cite>
                </div>
              </blockquote>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
