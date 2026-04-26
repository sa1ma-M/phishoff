import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { useStore } from "@/store";

export const Route = createFileRoute("/email")({
  component: EmailChecker,
});

function EmailChecker() {
  const [text, setText] = useState("");
  const addEmailScan = useStore((s) => s.addEmailScan);

  return (
    <div className="p-6">
      <h1 className="text-xl font-bold">Email Checker</h1>

      <textarea
        className="w-full border p-2 mt-4"
        placeholder="Paste email content here..."
        value={text}
        onChange={(e) => setText(e.target.value)}
      />

      <button
        className="mt-3 bg-blue-600 text-white px-4 py-2"
        onClick={() => {
          addEmailScan(text);
          setText("");
        }}
      >
        Scan Email
      </button>
    </div>
  );
}