import React from "react";

function Loading() {
  return (
    <div className="text-center z-50 fixed top-0 left-0 right-0 bg-zinc-900 w-full h-screen flex flex-col items-center justify-center gap-2">
      <img src="/logo.png" alt="" className="w-24 rounded-md animate-pulse" />
    </div>
  );
}

export default Loading;
