import { Activity, Ellipsis, FolderCog, GraduationCap, Handbag, HandCoins, Network } from "lucide-react";
import React, { lazy, Suspense, useEffect } from "react";
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
    const types = [
    { id: 1, name: t("siderbarTypes.eLearning"), logo: <GraduationCap size={18} />, checked: true },
    { id: 2, name: t("siderbarTypes.eCommerce"), logo: <Handbag size={18} />, checked: false },
    { id: 3, name: t("siderbarTypes.saas"), logo: <HandCoins size={18} />, checked: true },
    { id: 4, name: t("siderbarTypes.erp"), logo: <FolderCog size={18} />, checked: false },
    { id: 5, name: t("siderbarTypes.crm"), logo: <Network size={18} />, checked: true },
    { id: 6, name: t("siderbarTypes.healthcare"), logo: <Activity size={18} />, checked: false },
    { id: 7, name: t("siderbarTypes.crossPlatform"), logo: <span className="text-xs">IOS</span>, checked: true },
    { id: 8, name: t("siderbarTypes.androidMobile"), logo: <span className="text-xs">And</span>, checked: true },
    { id: 9, name: t("siderbarTypes.others"), logo: <Ellipsis size={18} />, checked: false },
  ];


    useEffect(() => {
      fetchProjects()
    }, [fetchProjects])

    return(
        <div className="flex flex-col gap-2 items-center">
            <h1 className="text-3xl font-semibold flex gap-2">{i18n.language !== "ar" && <>{t("projectSection.title1")}</>}<span className="text-[#1963B9]">{t("projectSection.title2")}</span></h1>
            <span className="font-semibold">{t("projectSection.title3")}</span>
            <div className="flex w-full gap-2">
        <div className="w-1/4 sticky top-20 h-fit">
          <SideBar isFooter={false} types={types} />
        </div>
            <div className="grid md:grid-cols-2 gap-10 w-3/4 overflow-y-auto hide-scrollbar">
            <Suspense fallback={<div>Loading projects...</div>}>
            {projects.map((project) => (
            <ProjectCard
              key={project.id}
              id={project.id}
              name={project.title}
              image={project.imgUrl}
              description={project.description}
            />
          ))}
          </Suspense>
            </div>
            </div>
        </div>
    )
}