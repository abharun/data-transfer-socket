import React from "react";
import { withMainlayout } from "../layouts";

export const Dashboard: React.FC = withMainlayout(() => {
  return (
    <div className="flex w-full h-full justify-center items-center">
      <div className="flex-col w-1/2 h-2/3 p-2 border-2 border-black rounded-lg">
        <div className="flex w-full h-1/6 justify-center items-center font-bold text-lg">
          <span>Communication</span>
        </div>
        <div className="flex w-full h-5/6 justify-center items-center">
          <div className="flex-col w-1/2 h-4/5 justify-center items-center">
            <div className="label-user flex p-2">
              <span>Username</span>
            </div>
            <div className="input-user flex p-2">
              <input type="text" className="w-full border" />
            </div>
            <div className="label-string flex p-2">
              <span>Data</span>
            </div>
            <div className="input-string flex p-2">
              <input type="text" className="w-full border" />
            </div>
            <div className="btn-send flex p-2 justify-center">
              <button className="border-2 rounded-xl p-2 border-black">
                Send
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
});
