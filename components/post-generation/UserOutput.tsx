"use client";
import React, { useContext } from "react";

import { Separator } from "../ui/separator";
import { BorderBeam } from "../ui/border-beam";
import { PostContext } from "@/context/PostContext";
import { Skeleton } from "../ui/skeleton";
import { MessageCircleDashed } from "lucide-react";
import CopyButton from "../home/CopyButton";

const UserOutput = () => {
  const { output, loading } = useContext(PostContext);

  return (
    <div className="bg-black/20 hover:bg-black/30 transition-all duration-300 border-lime-500/20 text-white backdrop-blur-sm p-4 rounded-lg">
      <BorderBeam
        duration={7}
        size={111}
        className="from-lime-500/20 via-lime-500/10 to-transparent"
      />
      <div className="bg-transparent">
        <h2 className="text-3xl font-bold pb-2 bg-gradient-to-r from-lime-500 to-lime-300 bg-clip-text text-transparent text-right">
          Output
        </h2>
        <Separator className="my-4 bg-lime-500/20" />
        <div className="relative flex flex-col gap-4">
          <div>
            <fieldset className="grid gap-6 rounded-[8px] border border-lime-500/20 p-4 bg-black/20 h-full min-h-[665px]">
              <legend className="text-lg font-bold bg-gradient-to-r from-lime-500 to-lime-300 bg-clip-text text-transparent">
                Model Output
              </legend>
              <div className="flex flex-col gap-4">
                {loading ? (
                  <Skeleton className="w-full h-full z-10 bg-black/20" />
                ) : output?.data?.length ? (
                  <ul className="flex flex-col space-y-8">
                    {output.data.map((item, index) => (
                      <li
                        className="text-sm flex flex-col bg-black/30 hover:bg-black/40 transition-all duration-300 py-2 px-4 rounded-l-md rounded-tr-md relative border border-lime-500/20"
                        key={index}>
                        {item.post}
                        <span
                          className={`absolute top-[95%] ${
                            index % 2 === 1 ? "right-0" : "left-0"
                          }`}>
                          <CopyButton text={item.post} />
                        </span>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <div className="flex flex-col items-center justify-center h-[500px] text-center p-4">
                    <MessageCircleDashed className="w-24 h-24 text-lime-500/40" />
                    <h3 className="text-xl font-semibold mb-2 text-white/80">
                      No Output Yet
                    </h3>
                    <p className="text-white/60 max-w-sm">
                      Please fill out the form on the left and click the
                      [Generate] button to create a bio.
                    </p>
                  </div>
                )}
              </div>
            </fieldset>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserOutput;
