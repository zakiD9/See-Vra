import React, { lazy, Suspense, useState } from "react";
import Footer from "@/components/layout/user/footer";
import NavBar from "@/components/layout/user/header/NavBar";
import { ReusableTabs } from "@/components/pages/project/projecttabs/tabsSection";
import { useParams } from "react-router-dom";
import { useProjectStore } from "@/stores/ProjectStore";

const ProjectDetails = lazy(() => import("@/components/pages/project/ProjectDetails"));
const ProjectPics = lazy(() => import("@/components/pages/project/ProjectPics"));
const OfferndUsed = lazy(() => import("@/components/pages/project/OfferndUsed"));



export default function ProjectPage(){
  const { id } = useParams<{ id: string }>()
  const{ getProjectById }=useProjectStore();
  const[project,setProject]=useState<any>({});

  React.useEffect(() => {
      const fetchProject = async () => {
        try {
          const data = await getProjectById(id)
          setProject(data);
          console.log(data)
        } catch (error) {
          console.error("Failed to fetch project:", error)
        }
      }
      fetchProject()
    }, [id])


    return(
        <div className="bg-background flex flex-col items-center w-full gap-10">
            <NavBar />
            <main className="flex flex-col gap-10">
            <div className="container mx-auto px-4 flex flex-col gap-10">
            <Suspense fallback={<div>Loading project...</div>}>
            <ProjectDetails figmaLink={project.uiUxLink} mainImage={project.imgUrl} projectTitle={project.title} seeAllLink={project.about} />
            <ReusableTabs tabs={project.projectFeatures || []} />
            <ProjectPics githubLink={project.githubLink} projectImgs={project.projectImgs}  />
            <OfferndUsed about={project.about} used={[project.frontEnd,project.backEnd,project.dataBase]} />
            </Suspense>
            </div>
            </main>
            <Footer />
        </div>
    )
}