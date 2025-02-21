import React from "react";

import { Separator } from "../ui/separator";

const UserOutput = () => {
  return (
    <div className="bg-transparent border border-lime-500/10 shadow-inner shadow-lime-500/10 transition-all duration-300 p-4 rounded-lg">
      <h2 className="text-3xl font-bold pb-2 decoration-dashed decoration-lime-500 text-right">
        User Output
      </h2>
      <Separator className="my-4 border-lime-500/10 divide-dashed decoration-dashed dashed decoration-slice" />
      <div className="relative flex flex-col gap-4">
        <div>
          <fieldset className="grid gap-6 rounded-[8px] border border-lime-500/10 p-4 bg-lime-500/10">
            <legend className="text-lg font-bold">Model Output</legend>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolorem
              voluptate illo ea laborum accusantium at voluptas modi alias
              cumque assumenda? Lorem ipsum dolor sit amet consectetur
              adipisicing elit. Quisquam, quos.
            </p>
          </fieldset>
        </div>
      </div>
    </div>
  );
};

export default UserOutput;
