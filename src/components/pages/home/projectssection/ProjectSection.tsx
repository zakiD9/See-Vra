import { Activity, Ellipsis, FolderCog, GraduationCap, Handbag, HandCoins, Network } from "lucide-react";
import React, { lazy, Suspense, useEffect, useState } from "react";
import SideBar from "./SideBar";
import { useTranslation } from "react-i18next";
import { useProjectStore } from "@/stores/ProjectStore";

const ProjectCard = lazy(() => import("./ProjectCard"));

export default function ProjectsSection(){

    const {
      projects,
      fetchProjects
    } = useProjectStore()
    const{t,i18n}=useTranslation();
    const [types, setTypes] = useState([
  { id: 1, name: t("siderbarTypes.eLearning"), logo: <GraduationCap size={18} />, checked: false },
  { id: 2, name: t("siderbarTypes.eCommerce"), logo: <Handbag size={18} />, checked: false },
  { id: 3, name: t("siderbarTypes.saas"), logo: <HandCoins size={18} />, checked: false },
  { id: 4, name: t("siderbarTypes.erp"), logo: <FolderCog size={18} />, checked: false },
  { id: 5, name: t("siderbarTypes.crm"), logo: <Network size={18} />, checked: false },
  { id: 6, name: t("siderbarTypes.healthcare"), logo: <Activity size={18} />, checked: false },
  { id: 7, name: t("siderbarTypes.crossPlatform"), logo: <span className="text-xs">IOS</span>, checked: false },
  { id: 8, name: t("siderbarTypes.androidMobile"), logo: <span className="text-xs">And</span>, checked: false },
  { id: 9, name: t("siderbarTypes.others"), logo: <Ellipsis size={18} />, checked: false },
]);

const handleTypeChange = (id: number) => {
    setTypes((prev) =>
      prev.map((type) =>
        type.id === id ? { ...type, checked: !type.checked } : type
      )
    );
  };

    useEffect(() => {
      fetchProjects()
    }, [fetchProjects])

    const activeTypes = types.filter((t) => t.checked).map((t) => t.name);
  const filteredProjects = projects.filter((p) =>
    activeTypes.includes(p.category)
  );

    return(
        <div className="flex flex-col gap-2 items-center">
            <h1 className="text-3xl font-semibold flex gap-2">{i18n.language !== "ar" && <>{t("projectSection.title1")}</>}<span className="text-[#1963B9]">{t("projectSection.title2")}</span></h1>
            <span className="font-semibold">{t("projectSection.title3")}</span>
            <div className="flex w-full gap-2">
        <div className="w-1/4 sticky top-20 h-fit">
          <SideBar
            isFooter={false}
            types={types}
            onTypeChange={handleTypeChange}
          />
        </div>
            <div className="grid md:grid-cols-2 gap-10 w-3/4 overflow-y-auto hide-scrollbar">
            <Suspense fallback={<div>Loading projects...</div>}>
            {filteredProjects.length > 0 ? (
              filteredProjects.map((project) => (
                <ProjectCard
                  key={project.id}
                  id={project.id}
                  name={project.title}
                  image={project.imgUrl}
                  description={project.description}
                />
              ))
            ) : (
              <div className="text-center flex justify-center items-center text-gray-500">No projects found.</div>
            )}
          </Suspense>
            </div>
            </div>
        </div>
    )
}