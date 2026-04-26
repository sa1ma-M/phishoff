import { create } from "zustand";

type ScanResult = {
  input: string;
  type: "safe" | "phishing";
};

type Store = {
  emailsScanned: number;
  urlsChecked: number;
  results: ScanResult[];

  scanEmail: (input: string) => void;
  scanUrl: (input: string) => void;
};

export const useStore = create<Store>((set) => ({
  emailsScanned: 0,
  urlsChecked: 0,

  // IMPORTANT: NEVER undefined
  results: [],

  scanEmail: (input) =>
    set((state) => ({
      emailsScanned: state.emailsScanned + 1,
      results: [
        ...state.results,
        {
          input,
          type: input.includes("http") ? "phishing" : "safe",
        },
      ],
    })),

  scanUrl: (input) =>
    set((state) => ({
      urlsChecked: state.urlsChecked + 1,
      results: [
        ...state.results,
        {
          input,
          type: input.includes("login") ? "phishing" : "safe",
        },
      ],
    })),
}));