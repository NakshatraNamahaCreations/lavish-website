import React from "react";

const PhotoGrid = () => {
  return (
    <div className="bg-gray-100 lg:min-h-screen px-4 flex g:gap-4 gap-1 justify-center pb-5">
      <div>
        <img
          loading="lazy"
          decoding="async"
          src="https://lavisheventzz-bangalore.b-cdn.net/momentsgallery1.png"
          className="lg:pb-5 pb-2"
          alt="Birthday balloon decoration backdrop in Bangalore"
        />
        <img
          loading="lazy"
          decoding="async"
          src="https://lavisheventzz-bangalore.b-cdn.net/momentsgallery2.png"
          className=""
          alt="Adults Birthday balloon decoration setup"
        />
      </div>
      <div>
        <img
          loading="lazy"
          decoding="async"
          src="https://lavisheventzz-bangalore.b-cdn.net/momentsgallery3.png"
          className="lg:pt-10 lg:pb-5 pt-5 pb-2"
          alt="Baby shower pastel balloon decoration in Bangalore"
        />
        <img
          loading="lazy"
          decoding="async"
          src="https://lavisheventzz-bangalore.b-cdn.net/momentsgallery4.png"
          className=""
          alt="Mehandi Function decoration with flowers"
        />
      </div>
      <div>
        <img
          loading="lazy"
          decoding="async"
          src="https://lavisheventzz-bangalore.b-cdn.net/momentsgallery5.png"
          className="lg:pb-5 lg:pt-3 pb-2 pt-2"
          alt="Naming ceremony decoration in Bangalore"
        />
        <img
          loading="lazy"
          decoding="async"
          src="https://lavisheventzz-bangalore.b-cdn.net/momentsgallery6.png"
          className=""
          alt="Marry me decoration in Bangalore"
        />
      </div>
      <div>
        <img
          loading="lazy"
          decoding="async"
          src="https://lavisheventzz-bangalore.b-cdn.net/momentsgallery7.png"
          className="lg:pb-5 pb-2"
          alt="Happy Anniversary balloon decoration theme"
        />
        <img
          loading="lazy"
          decoding="async"
          src="https://lavisheventzz-bangalore.b-cdn.net/momentsgallery8.png"
          className=""
          alt="Welcome Baby balloon decoration setup"
        />
      </div>
    </div>
  );
};

export default PhotoGrid;
