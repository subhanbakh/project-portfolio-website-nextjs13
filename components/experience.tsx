"use client";

import {
  VerticalTimeline,
  VerticalTimelineElement,
} from "react-vertical-timeline-component";
import "react-vertical-timeline-component/style.min.css";
import { useInView } from "react-intersection-observer";
import { useActiveSectionContext } from "@/context/active-section-context";
import { Fragment, useEffect } from "react";
import { LuGraduationCap } from "react-icons/lu";
import { CgWorkAlt } from "react-icons/cg";
import { FaReact } from "react-icons/fa";
import { useTheme } from "@/context/theme-context";

const experienceItems = [
  {
    title: "Graduated bootcamp",
    location: "Miami, FL",
    description:
      "I graduated after 6 months of studying. I immediately found a job as a front-end developer.",
    icon: <LuGraduationCap />,
    date: "2019",
  },
  {
    title: "Front-End Developer",
    location: "Orlando, FL",
    description:
      "I worked as a front-end developer for 2 years in 1 job and 1 year in another job. I also upskilled to the full stack.",
    icon: <CgWorkAlt />,
    date: "2019 - 2021",
  },
  {
    title: "Full-Stack Developer",
    location: "Houston, TX",
    description:
      "I'm now a full-stack developer working as a freelancer. My stack includes React, Next.js, TypeScript, Tailwind, Prisma and MongoDB. I'm open to full-time opportunities.",
    icon: <FaReact />,
    date: "2021 - present",
  },
];

export default function Experience() {
  const { ref, inView, entry } = useInView({
    threshold: 0.75,
  });
  const { activeSection, setActiveSection, timeOfLastClick } =
    useActiveSectionContext();
  const { theme, toggleTheme } = useTheme();

  useEffect(() => {
    if (inView && Date.now() - timeOfLastClick > 1000) {
      setActiveSection("Experience");
    }
  }, [inView, timeOfLastClick, setActiveSection]);

  return (
    <section
      id="experience"
      className="max-w-[1200px] px-4 m-auto text-center my-28 sm:my-44 scroll-mt-28"
      ref={ref}
    >
      <h2 className="text-3xl text-gray-950 font-medium mb-8 dark:text-white">
        My Experience
      </h2>

      <VerticalTimeline lineColor="">
        {experienceItems.map((item, index) => (
          <Fragment key={index}>
            <VerticalTimelineElement
              contentStyle={{
                background:
                  theme === "light" ? "#f3f4f6" : "rgba(255, 255, 255, 0.05)",
                boxShadow: "none",
                border: "1px solid rgba(0, 0, 0, 0.05)",
                textAlign: "left",
                padding: "1.3rem 2rem",
              }}
              contentArrowStyle={{
                borderRight:
                  theme === "light"
                    ? "7px solid #9ca3af"
                    : "7px solid rgba(255, 255, 255, 0.5)",
              }}
              date={item.date}
              iconStyle={{
                background:
                  theme === "light" ? "white" : "rgba(255, 255, 255, 0.15)",
                fontSize: "1.5rem",
              }}
              icon={item.icon}
            >
              <h3 className="font-semibold capitalize">{item.title}</h3>
              <p className="font-normal !mt-0">{item.location}</p>
              <p className="text-gray-700 !mt-1 !font-normal dark:text-white/75">
                {item.description}
              </p>
            </VerticalTimelineElement>
          </Fragment>
        ))}
      </VerticalTimeline>
    </section>
  );
}
