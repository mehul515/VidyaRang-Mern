import React from "react";

const Videobox = () => {
  return (

    <div className="w-full flex  justify-center">

    <div className="w-full max-w-4xl lg:h-[500px] h-60  flex flex-col bg-white rounded-2xl shadow-lg">
      <div className=" w-full h-full rounded-lg overflow-hidden">
        <iframe
          className="w-full h-full rounded-2xl border-[0.2px] border-gray-600"
          src="https://www.youtube.com/embed/9ttvfEUE5RI?rel=0&modestbranding=1&loop=1&playlist=9ttvfEUE5RI&controls=1"
          title="YouTube video player"
          frameBorder="0"
          allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          ></iframe>
      </div>
    </div>
    </div>
  );
};

export default Videobox;
