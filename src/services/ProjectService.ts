import api from "@/services/api";

export interface ProjectFeature {
  feature: string
  description: string
}

export interface ProjectStacks {
  frontEndStack: string
  backEndStack: string
  databaseStack: string
}

export interface Project {
  id: number

  category: string

  title: string

  about: string

  uiuxLink: string

  githubLink: string

  description: string

  imgUrl: string

  mainImageFile: File | null

  additionalImages: File[]

  projectImages: File[]

  projectFeatures: ProjectFeature[]

  projectStacks: ProjectStacks
}


export const ProjectService = {
  getAllProjects: async () => {
    const response = await api.get("/Project")
    return response.data
  },

  addNewProject: async (payload: Project) => {
    const response = await api.post("/Project", payload)
    return response.data
  },
  updateProject: async (id:number,payload: Project) => {
    const response = await api.post(`/Project/${id}`, payload)
    return response.data
  },
  getProjectById: async (id:number) => {
    const response = await api.get(`/Project/${id}`)
    return response.data
  },

  deleteProject: async (id: number) => {
    const response = await api.delete(`/Project/${id}`)
    return response.data
  },
}

