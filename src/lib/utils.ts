import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function debounce<T extends (...args: any[]) => void>(
  fn: T,
  ms: number
): (...args: Parameters<T>) => void {
  let timer: NodeJS.Timeout | null;

  return function (this: ThisParameterType<T>, ...args: Parameters<T>) {
    if (timer) {
      clearTimeout(timer);
    }

    timer = setTimeout(() => {
      timer = null;
      fn.apply(this, args);
    }, ms);
  };
}
export function translateCarousel(
  direction: "left" | "right",
  carousel: React.RefObject<HTMLDivElement>,
  translateValue: number,
  setTranslateValue: React.Dispatch<React.SetStateAction<number>>
) {
  const TRANSISION_VALUE = 300;

  if (direction === "left") {
    const newValue = translateValue + TRANSISION_VALUE;
    if (newValue > 0) {
      setTranslateValue(0);
      carousel.current!.style.transform = `translateX(0px)`;
      return;
    }

    carousel.current!.style.transform = `translateX(${newValue}px)`;
    setTranslateValue(newValue);
    // console.log(translateValue);
    return;
  }
  if (direction === "right") {
    const newValue = translateValue - TRANSISION_VALUE;
    if (newValue < -carousel.current!.clientWidth) {
      setTranslateValue(-carousel.current!.clientWidth);
      carousel.current!.style.transform = `translateX(${-carousel.current!
        .clientWidth}px)`;

      return;
    }

    carousel.current!.style.transform = `translateX(${newValue}px)`;
    setTranslateValue(newValue);

    return;
  }
}
