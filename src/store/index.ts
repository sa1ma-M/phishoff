import { create } from "zustand";

type Scan = {
  type: "email" | "url";
  input: string;
  isPhishing: boolean;
  score: number;
  createdAt: number;
};

type Store = {
  emailCount: number;
  urlCount: number;
  threatLevel: "Safe" | "Warning" | "Danger";
  scans: Scan[];

  addScan: (scan: Scan) => void;
  reset: () => void;
};

const loadState = () => {
  try {
    const saved = localStorage.getItem("phishoff-store");
    return saved
      ? JSON.parse(saved)
      : {
          emailCount: 0,
          urlCount: 0,
          threatLevel: "Safe",
          scans: [],
        };
  } catch {
    return {
      emailCount: 0,
      urlCount: 0,
      threatLevel: "Safe",
      scans: [],
    };
  }
};

export const useStore = create<Store>((set) => ({
  ...loadState(),

  addScan: (scan) =>
    set((state) => {
      const scans = [scan, ...state.scans];

      const emailCount =
        scan.type === "email" ? state.emailCount + 1 : state.emailCount;

      const urlCount =
        scan.type === "url" ? state.urlCount + 1 : state.urlCount;

      const dangerCount = scans.filter((s) => s.isPhishing).length;

      let threatLevel: "Safe" | "Warning" | "Danger" = "Safe";

      if (dangerCount >= 5) threatLevel = "Danger";
      else if (dangerCount >= 2) threatLevel = "Warning";

      const newState = {
        scans,
        emailCount,
        urlCount,
        threatLevel,
      };

      localStorage.setItem("phishoff-store", JSON.stringify(newState));

      return newState;
    }),

  reset: () => {
    localStorage.removeItem("phishoff-store");
    return {
      emailCount: 0,
      urlCount: 0,
      threatLevel: "Safe",
      scans: [],
    };
  },
}));