import { createFileRoute } from "@tanstack/react-router";
import { useStore } from "@/store";

export const Route = createFileRoute("/reports")({
  component: Reports,
});

function Reports() {
  const scans = useStore((s) => s.scans);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold">Security Reports</h1>

      <p className="text-sm text-gray-500 mt-1">
        Full history of all email and URL scans
      </p>

      {scans.length === 0 ? (
        <p className="mt-6 text-gray-500">No data available yet.</p>
      ) : (
        <div className="mt-6 overflow-x-auto">
          <table className="w-full border">
            <thead>
              <tr className="bg-gray-100 text-left">
                <th className="p-2 border">Type</th>
                <th className="p-2 border">Content</th>
                <th className="p-2 border">Result</th>
                <th className="p-2 border">Date</th>
              </tr>
            </thead>

            <tbody>
              {scans.map((s) => {
                const color =
                  s.result === "danger"
                    ? "text-red-600"
                    : s.result === "warning"
                    ? "text-yellow-600"
                    : "text-green-600";

                return (
                  <tr key={s.id} className="border-t">
                    <td className="p-2 border font-bold">
                      {s.type.toUpperCase()}
                    </td>

                    <td className="p-2 border max-w-xs truncate">
                      {s.content}
                    </td>

                    <td className={`p-2 border font-bold ${color}`}>
                      {s.result.toUpperCase()}
                    </td>

                    <td className="p-2 border text-sm text-gray-500">
                      {new Date(s.date).toLocaleString()}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}