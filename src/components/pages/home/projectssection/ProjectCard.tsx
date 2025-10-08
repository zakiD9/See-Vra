import React, { ReactNode } from "react";
import Button from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

interface ProjectCardProps {
  id: number;
  name: string;
  image: string;
  description: string;
  action?: ReactNode;
}

 function ProjectCard({
  id,
  name,
  image,
  description,
  action,
}: ProjectCardProps) {
  const navigate = useNavigate()

  const handleViewProject = () => {
    navigate(`/projects/${id}`)
  }


  return (
    <div className="flex flex-col gap-2">
      <div className="flex items-center gap-2">
        <span className="text-[#146CF2]">Project {id}</span>
        <span className="text-gray-500">//</span>
        <span className="text-gray-500">{name}</span>
      </div>
      <div className="flex flex-col pb-5 gap-5 rounded-2xl border border-gray-800 bg-black text-gray-300">
        <img
          src={image}
          alt={name}
          loading="lazy"
          className="object-cover border-b-2 border-gray-800 rounded-t-lg w-full h-[150px]"
        />
        <span className="px-4 text-gray-400 truncate">{description}</span>
        <div className="px-4">
          {action ? action : <Button onClick={handleViewProject}>view-project</Button>}
        </div>
      </div>
    </div>
  );
}

export default React.memo(ProjectCard);