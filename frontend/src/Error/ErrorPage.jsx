import { Link, useLocation } from "react-router-dom";
import { AlertTriangle, ArrowLeft, Home } from "lucide-react";

export default function ErrorPage() {
  const { state } = useLocation();

  const status = state?.status || 500;
  const message = state?.message || "Something went wrong.";

  return (
    <div className="min-h-screen bg-slate-950 flex items-center justify-center px-6">
      <div className="w-full max-w-lg rounded-3xl border border-slate-800 bg-slate-900 p-8 shadow-2xl">
        <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-red-500/10">
          <AlertTriangle className="h-10 w-10 text-red-500" />
        </div>

        <h1 className="mt-6 text-center text-5xl font-extrabold text-white">
          {status}
        </h1>

        <h2 className="mt-3 text-center text-2xl font-semibold text-white">
          Oops! Something went wrong
        </h2>

        <p className="mt-4 rounded-xl bg-slate-800 p-4 text-center text-slate-300">
          {message}
        </p>

        <div className="mt-8 flex gap-4">
          <button
            onClick={() => window.history.back()}
            className="flex flex-1 items-center justify-center gap-2 rounded-xl border border-slate-700 bg-slate-800 px-5 py-3 font-medium text-white transition hover:bg-slate-700"
          >
            <ArrowLeft size={18} />
            Go Back
          </button>

          <Link
            to="/"
            className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-blue-600 px-5 py-3 font-medium text-white transition hover:bg-blue-700"
          >
            <Home size={18} />
            Home
          </Link>
        </div>
      </div>
    </div>
  );
}
