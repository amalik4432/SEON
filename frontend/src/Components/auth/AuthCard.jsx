export default function AuthCard({ title, subtitle, children }) {
  return (
    <div className="w-full max-w-md bg-white rounded-2xl shadow-sm border border-gray-200 p-8 sm:p-10">
      <div className="mb-8 text-center">
        <div className="mx-auto h-12 w-12 bg-gray-900 text-white flex items-center justify-center rounded-xl font-bold text-xl mb-5 shadow-sm">
          ✦
        </div>

        <h1 className="text-2xl font-semibold tracking-tight text-gray-900">
          {title}
        </h1>
        <p className="mt-2 text-sm text-gray-500">{subtitle}</p>
      </div>

      <div className="w-full">{children}</div>
    </div>
  );
}
