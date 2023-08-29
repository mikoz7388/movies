import { useEffect, useState } from "react";

export function useWindowWidth(imgWidth: number, maxImagesPerPage: number) {
  const MAX_IMAGES_PER_PAGE = 5;
  const initialItemsPerPage =
    Math.floor(window.innerWidth / imgWidth) > maxImagesPerPage
      ? maxImagesPerPage
      : Math.floor(window.innerWidth / imgWidth);

  const [dimensions, setDimensions] = useState({
    height: window.innerHeight,
    width: window.innerWidth,
  });

  const [itemsPerPage, setImagesPerPage] = useState(initialItemsPerPage);
  useEffect(() => {
    function handleResize() {
      setDimensions({
        height: window.innerHeight,
        width: window.innerWidth,
      });
      const calculatedValue = Math.floor(dimensions.width / imgWidth);
      const imagesPerPage =
        calculatedValue > MAX_IMAGES_PER_PAGE
          ? MAX_IMAGES_PER_PAGE
          : calculatedValue;
      setImagesPerPage(imagesPerPage);
    }

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [window.innerWidth]);

  return { dimensions, itemsPerPage };
}
