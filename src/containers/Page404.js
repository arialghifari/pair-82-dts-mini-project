import React, { useEffect } from "react";
import { Link } from "react-router-dom";

function Page404() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="flex justify-center mt-16 mb-32">
      <div className="flex flex-col max-w-sm">
        <img src="/404.png" alt="404 Not Found" className="" />
        <Link to="/" className="p-2 bg-red-700 text-center rounded-sm">
          Back
        </Link>
      </div>
    </div>
  );
}

export default Page404;
