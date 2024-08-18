import React, { useEffect, useState } from "react";
import { withMainlayout } from "../layouts";
import { io, Socket } from "socket.io-client";

export const Dashboard: React.FC = withMainlayout(() => {
  const [id, setId] = useState<string | null>(null);
  const [socket, setSocket] = useState<Socket | null>(null);
  let username: string = "";
  let strdata: string = "";

  useEffect(() => {
    const skt: Socket = io("http://localhost:4000");

    skt.on("idset", (data: string) => {
      console.log(`ID is set to: ${data}`);
      setId(data);
    });

    setSocket(skt);
  }, []);

  const sendData = () => {
    if (socket && id) {
      socket.emit(
        "message",
        JSON.stringify({ id: id, username: username, message: strdata })
      );

      socket.emit("hello", "Hello server");
    }
  };

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
              <input
                type="text"
                className="w-full border"
                onChange={(e) => {
                  username = e.target.value;
                }}
              />
            </div>
            <div className="label-string flex p-2">
              <span>Data</span>
            </div>
            <div className="input-string flex p-2">
              <input
                type="text"
                className="w-full border"
                onChange={(e) => {
                  strdata = e.target.value;
                }}
              />
            </div>
            <div className="btn-send flex p-2 justify-center">
              <button
                className="border-2 rounded-xl p-2 border-black"
                onClick={sendData}
              >
                <span>Send</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
});
