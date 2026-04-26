import { createFileRoute } from "@tanstack/react-router";
import { useStore } from "@/store";
import {
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

export const Route = createFileRoute("/")({
  component: Home,
});

function Home() {
  const { emailCount, urlCount, threatLevel, scans } = useStore();

  const safeCount = scans.filter((s) => !s.isPhishing).length;
  const dangerCount = scans.filter((s) => s.isPhishing).length;

  const pieData = [
    { name: "Safe", value: safeCount },
    { name: "Phishing", value: dangerCount },
  ];

  const barData = [
    { name: "Emails", value: emailCount },
    { name: "URLs", value: urlCount },
  ];

  const COLORS = ["#22c55e", "#ef4444"];

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-bold">PhishOff Security Dashboard</h1>

      {/* STATS */}
      <div className="grid grid-cols-3 gap-4">
        <div className="p-4 border rounded">
          <p className="text-sm">Emails Scanned</p>
          <h2 className="text-xl font-bold">{emailCount}</h2>
        </div>

        <div className="p-4 border rounded">
          <p className="text-sm">URLs Checked</p>
          <h2 className="text-xl font-bold">{urlCount}</h2>
        </div>

        <div className="p-4 border rounded">
          <p className="text-sm">Threat Level</p>
          <h2 className="text-xl font-bold">{threatLevel}</h2>
        </div>
      </div>

      {/* CHARTS */}
      <div className="grid grid-cols-2 gap-6">
        <div className="border rounded p-4">
          <h2 className="font-semibold mb-2">Scan Results</h2>

          <ResponsiveContainer width="100%" height={250}>
            <PieChart>
              <Pie
                data={pieData}
                dataKey="value"
                nameKey="name"
                outerRadius={80}
              >
                {pieData.map((_, index) => (
                  <Cell key={index} fill={COLORS[index]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>

        <div className="border rounded p-4">
          <h2 className="font-semibold mb-2">Activity</h2>

          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={barData}>
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="value" fill="#3b82f6" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* RECENT ACTIVITY */}
      <div>
        <h2 className="font-semibold mb-2">Recent Activity</h2>

        {scans.length === 0 ? (
          <p className="text-gray-500">No scans performed yet.</p>
        ) : (
          <div className="space-y-2">
            {scans.slice(0, 5).map((scan, i) => (
              <div key={i} className="p-2 border rounded text-sm">
                <b>{scan.type.toUpperCase()}</b> — {scan.input} —{" "}
                {scan.isPhishing ? "⚠️ Phishing" : "✅ Safe"}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}