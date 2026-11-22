import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="min-h-[65vh] flex items-center justify-center px-4 py-16 bg-[#FAF8F3]">
      <div className="max-w-md text-center space-y-4">
        <p className="text-xs font-semibold text-[#92400E]">Page Not Found</p>
        <h1 className="text-3xl font-bold text-[#1F1A14]">
          The page you requested could not be found.
        </h1>
        <p className="text-sm text-[#574E42]">
          Return to ABM Global Ltd’s homepage, inspect our six core IT services, or request a quotation.
        </p>
        <div className="pt-2 flex flex-wrap justify-center gap-3">
          <Link
            href="/"
            className="inline-flex items-center gap-2 bg-[#231D15] hover:bg-[#3A3022] text-[#FAF8F3] font-semibold text-sm px-5 py-2.5 rounded-lg transition-colors"
          >
            <ArrowLeft className="w-4 h-4" aria-hidden="true" />
            <span>Back to Home</span>
          </Link>
          <Link
            href="/enquire"
            className="inline-flex items-center bg-[#F59E0B] hover:bg-[#D97706] text-[#1F1A14] font-semibold text-sm px-5 py-2.5 rounded-lg transition-colors"
          >
            Request a Quote
          </Link>
        </div>
      </div>
    </div>
  );
}
