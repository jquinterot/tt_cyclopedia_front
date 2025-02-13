export default function Footer() {
  return (
    <footer className="bg-red-700 text-white mt-auto">
      <div className="mx-auto px-4 sm:px-6 py-2 max-w-2xl">
        <div className="flex flex-col items-center text-center">
          <div className="max-w-prose">
            <h2 className="text-lg font-bold mb-0">TT Cyclopedia</h2>
            <p className="text-xs leading-snug">
              Your premier destination for comprehensive blade equipment
              reviews. Share experiences, read detailed analyses, and connect
              with cutting enthusiasts worldwide.
            </p>
          </div>
        </div>
      </div>

      {/* Full-width border line */}
      <div className="w-full border-t border-red-900">
        <div className="mx-auto max-w-2xl px-4 sm:px-6">
          <div className="py-2 text-center">
            <p className="text-[0.7rem]">
              © {new Date().getFullYear()} TT Cyclopedia. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}