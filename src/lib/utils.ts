import { type ClassValue, clsx } from "clsx";
import { LoaderFunction } from "react-router-dom";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
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
  container: React.RefObject<HTMLDivElement>,
  translateValue: number,
  setTranslateValue: React.Dispatch<React.SetStateAction<number>>
) {
  const TRANSITION_VALUE = 185 + 16;
  const containerWidth = container.current!.offsetWidth;

  let newValue;

  if (direction === "left") {
    newValue = Math.min(0, translateValue + TRANSITION_VALUE);
  } else if (direction === "right") {
    const maxTranslateValue = containerWidth - carousel.current!.offsetWidth;
    newValue = Math.max(maxTranslateValue, translateValue - TRANSITION_VALUE);
  } else {
    throw new Error("Invalid direction");
  }

  carousel.current!.style.transform = `translateX(${newValue}px)`;
  setTranslateValue(newValue);
}

export const currencyFormatter = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
  minimumFractionDigits: 0,
});

export type LoaderData<TLoaderFn extends LoaderFunction> = Awaited<
  ReturnType<TLoaderFn>
> extends Response | infer D
  ? D
  : never;
