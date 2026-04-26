import { createFileRoute } from "@tanstack/react-router";
import { useStore } from "@/store/store";

export const Route = createFileRoute("/")({
  component: Dashboard,
});

function Dashboard() {
  const { emailsScanned, urlsChecked, results } = useStore();

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold">PhishOff Security Dashboard</h1>
        <p className="text-muted-foreground">
          Overview of your phishing protection activity
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="p-4 rounded-lg border shadow-sm">
          <h2 className="text-sm text-muted-foreground">Emails Scanned</h2>
          <p className="text-2xl font-bold">{emailsScanned}</p>
        </div>

        <div className="p-4 rounded-lg border shadow-sm">
          <h2 className="text-sm text-muted-foreground">URLs Checked</h2>
          <p className="text-2xl font-bold">{urlsChecked}</p>
        </div>

        <div className="p-4 rounded-lg border shadow-sm">
          <h2 className="text-sm text-muted-foreground">Threat Level</h2>
          <p className="text-2xl font-bold text-green-600">Safe</p>
        </div>
      </div>

      {/* Results */}
      <div className="p-4 rounded-lg border shadow-sm">
        <h2 className="text-lg font-semibold mb-2">Scan Results</h2>

        {results.length === 0 ? (
          <p className="text-muted-foreground">
            No scans performed yet.
          </p>
        ) : (
          <ul className="space-y-2">
            {results.map((r, i) => (
              <li
                key={i}
                className="p-2 border rounded-md flex justify-between"
              >
                <span>{r.input}</span>
                <span
                  className={
                    r.type === "phishing"
                      ? "text-red-500"
                      : "text-green-500"
                  }
                >
                  {r.type}
                </span>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}