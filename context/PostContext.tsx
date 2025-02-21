"use client";

import React, {
  createContext,
  Dispatch,
  SetStateAction,
  useState,
} from "react";

interface PostContextTypes {
  output: { data: { post: string }[] };
  setOutput: Dispatch<SetStateAction<{ data: { post: string }[] }>>;
  loading: boolean;
  setLoading: Dispatch<SetStateAction<boolean>>;
}

export const PostContext = createContext<PostContextTypes>({
  output: { data: [] },
  setOutput: () => {},
  loading: false,
  setLoading: () => {},
});

export const PostProvider = ({ children }: { children: React.ReactNode }) => {
  const [output, setOutput] = useState<{ data: { post: string }[] }>({
    data: [],
  });
  const [loading, setLoading] = useState(false);
  console.log("Output", output);

  return (
    <PostContext.Provider value={{ output, setOutput, loading, setLoading }}>
      {children}
    </PostContext.Provider>
  );
};
