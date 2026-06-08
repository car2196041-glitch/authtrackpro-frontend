import { Link } from "react-router-dom";

export default function Home() {
  return (
    <div className="p-10">
      <h1 className="text-4xl font-bold">AuthTrack Pro</h1>

      <div className="mt-6 flex gap-4">
        <Link to="/login" className="bg-blue-600 text-white px-4 py-2 rounded">
          Login
        </Link>

        <Link to="/pricing" className="border px-4 py-2 rounded">
          Pricing
        </Link>
      </div>
    </div>
  );
}