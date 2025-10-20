import { create } from "zustand"
import { Project, ProjectService, Stack ,ResponseStack } from "@/services/ProjectService"

interface ProjectState {
  projects: Project[]
  loading: boolean
  error: string | null
  addProject: (payload: Project) => Promise<void>
  fetchProjects: () => Promise<void>
  deleteProject: (id:number) => Promise<void>
  updateProject: (id:number,payload: Project) => Promise<void>
  getProjectById: (id:number | string) => Promise<Project | null>
}

function splitStacks(responseStacks: ResponseStack[]) {
  const frontEnd: Stack[] = []
  const backEnd: Stack[] = []
  const dataBase: Stack[] = []

  responseStacks.forEach((stack) => {
    const stackItem: Stack = {
      iconFile: stack.iconUrl instanceof File ? stack.iconUrl : ({} as File),
      name: stack.name,
      imageUrl: typeof stack.iconUrl === "string" ? stack.iconUrl : URL.createObjectURL(stack.iconUrl),
    }

    if (stack.typeStack === 0) frontEnd.push(stackItem)
    else if (stack.typeStack === 1) backEnd.push(stackItem)
    else if (stack.typeStack === 2) dataBase.push(stackItem)
  })

  return { frontEnd, backEnd, dataBase }
}





export const useProjectStore = create<ProjectState>((set) => ({
  projects: [],
  loading: false,
  error: null,

  fetchProjects: async () => {
    set({ loading: true, error: null })
    try {
      const response = await ProjectService.getAllProjects()
      set({ projects: response, loading: false })
    } catch (error: any) {
      set({ error: error.message || "Failed to fetch projects", loading: false })
    }
  },

  addProject: async (project:Project) => {
  set({ loading: true, error: null })
  try {

    const newProject = await ProjectService.addNewProject(project)
    set((state) => ({
      projects: [...state.projects, newProject],
      loading: false,
    }))
  } catch (error: any) {
    set({ error: error.message || "Failed to add project", loading: false })
  }
},

  deleteProject: async (id:number) => {
    set({ loading: true, error: null })
    try {
    await ProjectService.deleteProject(id)
    console.log("deleted successfuly: ",id)
    } catch (error: any) {
      set({ error: error.message || "Failed to delete project", loading: false })
    }
  },
    updateProject: async (id:number,payload:Project) => {
  set({ loading: true, error: null })
  try {
    await ProjectService.updateProject(id, payload)
    console.log("updated successfully: ", id)
  } catch (error: any) {
    set({ error: error.message || "Failed to update project", loading: false })
  }
},

    getProjectById: async (id: number): Promise<Project | null> => {
  set({ error: null });
  try {
    const project = await ProjectService.getProjectById(id);

    if (project.projectStacks?.length) {
      const { frontEnd, backEnd, dataBase } = splitStacks(project.projectStacks)
      return { ...project, frontEnd, backEnd, dataBase }
    }

    return project;
  } catch (error: any) {
    set({ error: error.message || "Failed to get project"});
    return null;
  }
},

}))
