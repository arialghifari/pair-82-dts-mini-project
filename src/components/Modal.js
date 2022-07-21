import React from "react";

function Modal({ modal, setModal, trailerKey }) {
  const handleModalClose = () => {
    setModal(false);
    const iframe = document.querySelector("iframe");
    const tempSrc = iframe.src;
    iframe.src = "";
    iframe.src = tempSrc;
  };

  return (
    <>
      <div
        className={`${
          modal ? "fixed" : "hidden"
        } bg-zinc-900 opacity-80 z-50 top-0 left-0 right-0 h-screen`}
      />
      <div
        onClick={handleModalClose}
        className={`${
          modal ? "fixed" : "hidden"
        } z-50 top-0 left-0 right-0 h-screen flex justify-center items-center`}
      >
        <div className="w-[70%] h-[80%] relative border-4 border-red-800">
          <iframe
            src={`https://www.youtube.com/embed/${trailerKey}`}
            title="Trailer"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            className="w-full h-full"
          ></iframe>
          <button
            onClick={handleModalClose}
            className="absolute -top-3.5 -right-3.5 bg-red-700 rounded-sm p-0.5"
          >
            <img src="/ic_close.svg" alt="Close" />
          </button>
        </div>
      </div>
    </>
  );
}

export default Modal;
