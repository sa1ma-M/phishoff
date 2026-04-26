import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/tips")({
  component: Tips,
});

function Tips() {
  return (
    <div>
      <h1 className="text-2xl font-bold">Security Tips</h1>

      <ul className="list-disc mt-4 pl-5 space-y-2">
        <li>Never click unknown links</li>
        <li>Check sender email carefully</li>
        <li>Look for spelling mistakes in messages</li>
      </ul>
    </div>
  );
}