import React from "react";

function Footer() {
  return (
    <div className="py-10 text-zinc-500">
      <div className="grid gap-8 grid-cols-1 md:grid-cols-4">
        <div className="flex flex-col items-start gap-3">
          <button>Audio and Subtitles</button>
          <button>Media Center</button>
          <button>Security</button>
          <button>Contact Us</button>
        </div>
        <div className="flex flex-col items-start gap-3">
          <button>Audio Description</button>
          <button>Investor Relations</button>
          <button>Legal Provisions</button>
        </div>
        <div className="flex flex-col items-start gap-3">
          <button>Help center</button>
          <button>Jobs</button>
          <button>Cookie Preferences</button>
        </div>
        <div className="flex flex-col items-start gap-3">
          <button>Gift Cards</button>
          <button>Terms of Use</button>
          <button>Security</button>
          <button>Corporate Information</button>
        </div>
      </div>
      <div className="mt-8">© 2022 Movies. All Right Reserved</div>
    </div>
  );
}

export default Footer;
