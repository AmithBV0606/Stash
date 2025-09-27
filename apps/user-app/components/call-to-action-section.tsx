import AuthModal from "./auth/Auth-Modal";

export default function CallToActionSection() {
  return (
    <section className="py-16" id="footer">
      <div className="mx-auto max-w-5xl rounded-3xl border px-6 py-12 md:py-20 lg:py-32">
        <div className="text-center">
          <h2 className="text-balance text-4xl font-semibold lg:text-5xl">
            Join Stash
          </h2>
          <p className="mt-4">Top-up your wallet in seconds.</p>

          <div className="mt-12 flex flex-wrap justify-center gap-4">
            <AuthModal AuthType="Sign Up" />
          </div>
        </div>
      </div>
    </section>
  );
}
