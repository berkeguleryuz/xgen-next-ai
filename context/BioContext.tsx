"use client";

import React, {
  createContext,
  Dispatch,
  SetStateAction,
  useState,
} from "react";

interface BioContextTypes {
  output: { data: { bio: string }[] };
  setOutput: Dispatch<SetStateAction<{ data: { bio: string }[] }>>;
  loading: boolean;
  setLoading: Dispatch<SetStateAction<boolean>>;
}

export const BioContext = createContext<BioContextTypes>({
  output: { data: [] },
  setOutput: () => {},
  loading: false,
  setLoading: () => {},
});

export const BioProvider = ({ children }: { children: React.ReactNode }) => {
  const [output, setOutput] = useState<{ data: { bio: string }[] }>({
    data: [],
  });
  const [loading, setLoading] = useState(false);

  return (
    <BioContext.Provider value={{ output, setOutput, loading, setLoading }}>
      {children}
    </BioContext.Provider>
  );
};
