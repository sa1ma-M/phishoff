import { create } from "zustand";

type ScanEntry = {
  id: string;
  type: "email" | "url";
  input: string;
  status: "safe" | "danger" | "unknown";
  createdAt: number;
};

type AppState = {
  emailCount: number;
  urlCount: number;
  threatLevel: "Safe" | "Warning" | "Danger";

  scans: ScanEntry[];

  scanEmail: (input: string) => void;
  scanUrl: (input: string) => void;

  reset: () => void;
};

export const useStore = create<AppState>((set, get) => ({
  emailCount: 0,
  urlCount: 0,
  threatLevel: "Safe",

  scans: [],

  scanEmail: (input: string) => {
    const isDanger = input.includes("login") || input.includes("verify");

    const newScan: ScanEntry = {
      id: crypto.randomUUID(),
      type: "email",
      input,
      status: isDanger ? "danger" : "safe",
      createdAt: Date.now(),
    };

    set((state) => ({
      emailCount: state.emailCount + 1,
      scans: [newScan, ...state.scans],
      threatLevel: isDanger ? "Danger" : state.threatLevel,
    }));
  },

  scanUrl: (input: string) => {
    const isDanger = input.includes("secure") || input.includes("login");

    const newScan: ScanEntry = {
      id: crypto.randomUUID(),
      type: "url",
      input,
      status: isDanger ? "danger" : "safe",
      createdAt: Date.now(),
    };

    set((state) => ({
      urlCount: state.urlCount + 1,
      scans: [newScan, ...state.scans],
      threatLevel: isDanger ? "Danger" : state.threatLevel,
    }));
  },

  reset: () =>
    set({
      emailCount: 0,
      urlCount: 0,
      threatLevel: "Safe",
      scans: [],
    }),
}));