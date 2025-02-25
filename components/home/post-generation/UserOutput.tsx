"use client";
import React, { useContext } from "react";

import { Separator } from "../../ui/separator";
import { BorderBeam } from "../../ui/border-beam";
import { PostContext } from "@/context/PostContext";
import { Skeleton } from "../../ui/skeleton";
import { MessageCircleDashed } from "lucide-react";
import CopyButton from "../CopyButton";

const UserOutput = () => {
  const { output, loading } = useContext(PostContext);

  return (
    <div className="relative border border-lime-500/10 shadow-inner shadow-lime-500/10 transition-all duration-300 p-4 rounded-lg">
      <BorderBeam
        duration={7}
        size={111}
        className="from-lime-100 via-lime-800 to-transparent"
      />
      <div className="bg-transparent">
        <h2 className="text-3xl font-bold pb-2 decoration-dashed decoration-lime-500 text-right">
          Output
        </h2>
        <Separator className="my-4 border-lime-500/10 divide-dashed decoration-dashed dashed decoration-slice" />
        <div className="relative flex flex-col gap-4">
          <div>
            <fieldset className="grid gap-6 rounded-[8px] border bg-lime-500/10 min-h-[660px] border-lime-500/10 p-4">
              <legend className="text-lg font-bold">Model Output</legend>
              <div className="flex flex-col gap-4">
                {loading ? (
                  <Skeleton className="w-full h-full z-10 bg-lime-500/10" />
                ) : output?.data?.length ? (
                  <ul className="flex flex-col space-y-8">
                    {output.data.map((item, index) => (
                      <li
                        className="text-sm flex flex-col bg-lime-800 py-2 px-4 rounded-l-md rounded-tr-md relative"
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
                    <MessageCircleDashed className="w-24 h-24 text-lime-500 text-opacity-75" />
                    <h3 className="text-xl font-semibold mb-2">
                      No Output Yet
                    </h3>
                    <p className="text-gray-400 max-w-sm">
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
