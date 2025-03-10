import UserInput from "@/components/post-generation/UserInput";
import UserOutput from "@/components/post-generation/UserOutput";
import { PostProvider } from "@/context/PostContext";
import React from "react";

const GeneratePostPage = () => {
  return (
    <PostProvider>
      <section className="w-full mx-auto grid p-4 gap-4 grid-cols-1 lg:grid-cols-5">
        <div className="lg:col-span-2">
          <UserInput />
        </div>
        <div className="lg:col-span-3">
          <UserOutput />
        </div>
      </section>
    </PostProvider>
  );
};

export default GeneratePostPage;
