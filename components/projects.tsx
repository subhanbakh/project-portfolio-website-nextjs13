"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import React, { useRef } from "react";
import { projectsData } from "@/lib/data";
import { cn, isEven } from "@/lib/utils";
import { useSectionInView } from "@/lib/hooks";

export default function Projects() {
  const { ref } = useSectionInView("Projects");

  return (
    <div
      id="projects"
      ref={ref}
      className="mb-28 scroll-mt-28 text-center sm:mb-40"
    >
      <h2 className="text-3xl font-medium text-gray-950 dark:text-white">
        My Projects
      </h2>
      <div className="m-auto mt-8">
        {projectsData.map((project, index) => (
          <React.Fragment key={index}>
            <Project {...project} index={index} />
          </React.Fragment>
        ))}
      </div>
    </div>
  );
}

function Project({
  title,
  description,
  tags,
  imageUrl,
  index,
}: (typeof projectsData)[number] & { index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["0 1", "1.33 1"],
  });
  const scaleProgress = useTransform(scrollYProgress, [0, 1], [0.8, 1]);
  const opacityProgress = useTransform(scrollYProgress, [0, 1], [0.6, 1]);

  return (
    <motion.div
      ref={ref}
      className="mb-3 last:mb-0 sm:mb-8"
      style={{
        opacity: opacityProgress,
        scale: scaleProgress,
      }}
    >
      <section
        className={cn(
          "group relative mx-4 max-w-[42rem] cursor-default overflow-hidden rounded-lg border border-black/5 bg-gray-100 transition-all hover:bg-gray-200 dark:bg-white/10 dark:hover:bg-white/20 sm:h-[20rem]",
          {
            "flex-row-reverse sm:pl-8": isEven(index + 1),
            "sm:pr-8": !isEven(index + 1),
          }
        )}
      >
        <div
          className={cn(
            "flex h-full flex-col pb-4 pl-5 pr-5 pt-4 text-left sm:max-w-[50%] sm:pl-10 sm:pr-2 sm:pt-10",
            {
              "sm:ml-[18rem]": isEven(index + 1),
            }
          )}
        >
          <h3 className="text-2xl font-semibold">{title}</h3>
          <p className="mt-2 text-base leading-relaxed text-gray-700 dark:text-white/70">
            {description}
          </p>
          <ul className="mt-4 flex flex-wrap gap-2 sm:mt-auto">
            {tags.map((tag, index) => (
              <li
                key={index}
                className="rounded-full bg-black/[0.7] px-3 py-1 text-[0.7rem] uppercase tracking-wider text-white dark:text-white/70"
              >
                {tag}
              </li>
            ))}
          </ul>
        </div>

        <Image
          src={imageUrl}
          quality={90}
          alt="Project photo"
          className={cn(
            "absolute top-8 hidden w-[28.25rem] rounded-t-lg object-cover shadow-2xl transition-all group-hover:scale-[1.04] sm:block",
            {
              "-right-40 group-hover:-translate-x-3 group-hover:translate-y-3 group-hover:-rotate-2":
                !isEven(index + 1),
              "-left-40 group-hover:translate-x-3 group-hover:translate-y-3 group-hover:rotate-2":
                isEven(index + 1),
            }
          )}
        />
      </section>
    </motion.div>
  );
}
