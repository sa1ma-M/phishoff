import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { useStore } from "@/store";

export const Route = createFileRoute("/url")({
  component: UrlChecker,
});

function UrlChecker() {
  const [url, setUrl] = useState("");
  const addUrlScan = useStore((s) => s.addUrlScan);

  const [result, setResult] = useState<null | {
    level: "safe" | "warning" | "danger";
    reason: string;
  }>(null);

  function analyzeUrl(input: string) {
    const link = input.toLowerCase();

    if (!link) {
      return { level: "safe", reason: "Empty input" };
    }

    if (
      link.includes("login") ||
      link.includes("verify") ||
      link.includes("secure") ||
      link.includes("account")
    ) {
      return {
        level: "danger",
        reason: "Contains phishing keywords like login/verify/account",
      };
    }

    if (
      link.includes("bit.ly") ||
      link.includes("tinyurl") ||
      link.includes("http://")
    ) {
      return {
        level: "warning",
        reason: "Uses shortened or unsecured URL format",
      };
    }

    return {
      level: "safe",
      reason: "No suspicious patterns detected",
    };
  }

  function handleScan() {
    const analysis = analyzeUrl(url);

    setResult(analysis);
    addUrlScan(url);
    setUrl("");
  }

  const badgeColor =
    result?.level === "danger"
      ? "text-red-600"
      : result?.level === "warning"
      ? "text-yellow-600"
      : "text-green-600";

  return (
    <div className="p-6 max-w-xl">
      <h1 className="text-2xl font-bold">URL Checker</h1>

      <p className="text-sm text-gray-500 mt-1">
        Paste a URL to analyze phishing risk
      </p>

      {/* Input */}
      <input
        className="w-full border p-2 mt-4 rounded-md"
        placeholder="https://example.com"
        value={url}
        onChange={(e) => setUrl(e.target.value)}
      />

      {/* Button */}
      <button
        className="mt-3 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
        onClick={handleScan}
      >
        Scan URL
      </button>

      {/* Result */}
      {result && (
        <div className="mt-6 p-4 border rounded-md">
          <div className={`text-lg font-bold ${badgeColor}`}>
            {result.level.toUpperCase()}
          </div>

          <p className="mt-2 text-sm text-gray-600">
            {result.reason}
          </p>
        </div>
      )}
    </div>
  );
}