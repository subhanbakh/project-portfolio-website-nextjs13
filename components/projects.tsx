"use client";

import Image from "next/image";
import React, { useEffect, useRef } from "react";
import clsx from "clsx";
import { StaticImageData } from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { useActiveSectionContext } from "@/context/active-section-context";
import corpcomment from "@/public/corpcomment.png";
import rmtdev from "@/public/rmtdev.png";
import wordanalytics from "@/public/wordanalytics.png";

const projectsData = [
  {
    title: "CorpComment",
    description:
      "I worked as a full-stack developer on this startup project for 2 years. Users can give public feedback to companies.",
    tags: ["React", "Next.js", "MongoDB", "Tailwind", "Prisma"],
    imageUrl: corpcomment,
  },
  {
    title: "rmtDev",
    description:
      "Job board for remote developer jobs. I was the front-end developer. It has features like filtering, sorting and pagination.",
    tags: ["React", "TypeScript", "Next.js", "Tailwind", "Redux"],
    imageUrl: rmtdev,
  },
  {
    title: "Word Analytics",
    description:
      "A public web app for quick analytics on text. It shows word count, character count and social media post limits.",
    tags: ["React", "Next.js", "SQL", "Tailwind", "Framer"],
    imageUrl: wordanalytics,
  },
];

export default function Projects() {
  const { ref, inView, entry } = useInView({
    threshold: 0.75,
  });
  const { activeSection, setActiveSection, timeOfLastClick } =
    useActiveSectionContext();

  useEffect(() => {
    if (inView && Date.now() - timeOfLastClick > 1000) {
      setActiveSection("Projects");
    }
  }, [inView, timeOfLastClick, setActiveSection]);

  return (
    <div
      id="projects"
      ref={ref}
      className="flex flex-col m-auto text-center scroll-mt-28 my-28 sm:my-44"
    >
      <h2 className="text-3xl text-gray-950 font-medium dark:text-white">
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

type ProjectProps = {
  title: string;
  description: string;
  tags: string[];
  imageUrl: StaticImageData;
  index: number;
};

const isEven = (number: number) => number % 2 === 0;

function Project({ title, description, tags, imageUrl, index }: ProjectProps) {
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
      className="mb-3 sm:mb-8 last:mb-0"
      style={{
        opacity: opacityProgress,
        scale: scaleProgress,
      }}
    >
      <section
        className={clsx(
          "group relative overflow-hidden cursor-default bg-gray-100 dark:bg-white/10 dark:hover:bg-white/20  hover:bg-gray-200 border border-black/5 max-w-[42rem] mx-4 rounded-lg sm:h-[20rem] transition-all",
          {
            "flex-row-reverse": isEven(index + 1),
            "sm:pr-8": !isEven(index + 1),
            "sm:pl-8": isEven(index + 1),
          }
        )}
      >
        <div
          className={clsx(
            "sm:max-w-[50%] flex flex-col h-full text-left pl-5 sm:pl-10 pr-5 pt-4 pb-4 sm:pr-2 sm:pt-10",
            {
              "sm:ml-[18rem]": isEven(index + 1),
            }
          )}
        >
          <h3 className="text-2xl font-semibold">{title}</h3>
          <p className="text-gray-700 text-base leading-relaxed mt-2 dark:text-white/70">
            {description}
          </p>
          <ul className="flex flex-wrap mt-4 sm:mt-auto gap-2">
            {tags.map((tag, index) => (
              <li
                key={index}
                className="text-[0.7rem] uppercase tracking-wider bg-black/[0.7] text-white dark:text-white/70 rounded-full px-3 py-1"
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
          className={clsx(
            "hidden sm:block object-cover absolute top-8 w-[28.25rem] transition-all rounded-t-lg shadow-2xl group-hover:scale-[1.04]",
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
