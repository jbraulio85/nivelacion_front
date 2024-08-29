import { useEffect, useState } from "react";
import img1 from "../../assets/img/Landscape1.jpg";
import img2 from "../../assets/img/Landscape2.jpg";
import img3 from "../../assets/img/Landscape3.jpg";
import img4 from "../../assets/img/Landscape4.jpg";
import img5 from "../../assets/img/Landscape5.jpg";

export const Home = () => {
  const [currentImg, setCurrentImg] = useState(0);

  const images = [img1, img2, img3, img4, img5];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImg((prevImage) => (prevImage + 1) % images.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [images.length]);

  return (
    <div className="relative w-full h-full overflow-hidden">
      {images.map((image, index) => (
        <img
          key={index}
          src={image}
          className={`absolute w-full h-full object-cover transition-opacity duration-700 ${
            index === currentImg ? "opacity-100" : "opacity-0"
          } `}
          alt={`Imagen ${index + 1}`}
        />
      ))}
      ;
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-2">
        {images.map((_, index) => (
          <button
            key={index}
            className={`btn btn-xs ${index === currentImg ? "btn-active" : ""}`}
            onClick={() => setCurrentImg(index)}
          >
            {index + 1}
          </button>
        ))}
      </div>
    </div>
  );
};
