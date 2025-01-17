"use client";
import { TypewriterEffectSmooth } from "../ui/typewriter-effect";
export function TypewriterEffectSmoothDemo1() {
  const words1 = [
    {
      text: "Welcome",
    },
    {
      text: "to",
    },
    {
      text: "Galactic",
      className: "text-blue-500 dark:text-blue-500",
    },
    {
      text: "pet",
      className: "text-blue-500 dark:text-blue-500",
    },
    {
      text: "adoption",
      className: "text-blue-500 dark:text-blue-500",
    },
  ];
  return (
    <div className="flex flex-col items-center justify-center h-[30rem]">
      <TypewriterEffectSmooth words={words1} />
    </div>
  );
}
