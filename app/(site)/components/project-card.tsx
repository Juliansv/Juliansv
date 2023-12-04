"use client";

import React, { useState, useEffect, useRef } from "react";
import { Project } from "@/types/Project";
import Image from "next/image";

interface ProjectCardProps {
  project: Project;
}

const ProjectCard: React.FC<ProjectCardProps> = ({ project }) => {
  return (
    <>
      <a
        href={project.url}
        className="flex flex-col items-center bg-white border border-gray-200 rounded-lg shadow md:flex-row md:max-w-xl hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700 hover:scale-105 transition"
      >
        <Image
          className="object-none w-full bg-white rounded-t-lg h-96 md:h-full md:w-48 md:max-w-[10rem] md:rounded-none md:rounded-s-lg"
          src={project.image}
          alt=""
          width={120}
          height={120}
        />
        <div className="flex flex-col justify-between p-4 leading-normal">
          <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
            {project.name}
          </h5>
          <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
            {project.content}
          </p>
        </div>
      </a>
    </>
  );
};

export default ProjectCard;
