import React from "react";

import { Separator } from "../ui/separator";
import { BorderBeam } from "../ui/border-beam";

const UserOutput = () => {
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
            <fieldset className="grid gap-6 rounded-[8px] border border-lime-500/10 p-4 bg-lime-500/10">
              <legend className="text-lg font-bold">Model Output</legend>
              <div>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolorem
                voluptate illo ea laborum accusantium at voluptas modi alias
                cumque assumenda? Lorem ipsum dolor sit amet consectetur
                adipisicing elit. Quisquam, quos.
              </div>
            </fieldset>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserOutput;
