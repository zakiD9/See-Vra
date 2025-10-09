import api from "@/services/api";

export interface ProjectFeature {
  feature: string
  description: string
}

export interface Stack{
  icon:File;
  title:string;
}

export interface ProjectStack {
  frontEndStack: Stack[]
  backEndStack: Stack[]
  databaseStack: Stack[]
}

export interface Project {
  id:number;
  category: string
  title: string
  about: string
  uiUxLink: string
  githubLink: string
  description: string
  imgUrl: string
  projectImgs: string[]
  projectFeatures: ProjectFeature[]
  projectStacks: ProjectStack[]
}



export const ProjectService = {
  getAllProjects: async () => {
    const response = await api.get("/Project")
    return response.data
  },

  addNewProject: async (payload: Project) => {
  const formData = new FormData()
  formData.append("Category", payload.category)
  formData.append("Title", payload.title)
  formData.append("About", payload.about)
  formData.append("UiUxLink", payload.uiUxLink)
  formData.append("GithubLink", payload.githubLink)
  formData.append("Description", payload.description)
  formData.append("ImgUrl", payload.imgUrl)

  payload.projectImgs.forEach((imgUrl, index) => {
    formData.append(`ProjectImgs[${index}].ImgsUrl`, imgUrl)
  })

  payload.projectFeatures.forEach((feature, index) => {
    formData.append(`ProjectFeatures[${index}].Feature`, feature.feature)
    formData.append(`ProjectFeatures[${index}].Description`, feature.description)
  })

  payload.projectStacks.forEach((stack, i) => {

  stack.frontEndStack.forEach((item, j) => {
    formData.append(`projectStacks[${i}].frontEndStack[${j}].title`, item.title)
    if (item.icon instanceof File) {
      formData.append(`projectStacks[${i}].frontEndStack[${j}].icon`, item.icon)
    }
  })


  stack.backEndStack.forEach((item, j) => {
    formData.append(`projectStacks[${i}].backEndStack[${j}].title`, item.title)
    if (item.icon instanceof File) {
      formData.append(`projectStacks[${i}].backEndStack[${j}].icon`, item.icon)
    }
  })

  stack.databaseStack.forEach((item, j) => {
    formData.append(`projectStacks[${i}].databaseStack[${j}].title`, item.title)
    if (item.icon instanceof File) {
      formData.append(`projectStacks[${i}].databaseStack[${j}].icon`, item.icon)
    }
  })
})

  const response = await api.post("/Project", formData, {
    headers: { "Content-Type": "multipart/form-data" },
  })

  return response.data
},
  updateProject: async (id: number, payload: Project) => {
  const formData = new FormData()
  formData.append("Category", payload.category)
  formData.append("Title", payload.title)
  formData.append("About", payload.about)
  formData.append("UiUxLink", payload.uiUxLink)
  formData.append("GithubLink", payload.githubLink)
  formData.append("Description", payload.description)
  formData.append("ImgUrl", payload.imgUrl)

  payload.projectImgs.forEach((file) => {
  formData.append("AdditionalImageFiles", file);
  });

  payload.projectFeatures.forEach((feature, index) => {
    formData.append(`ProjectFeatures[${index}].Feature`, feature.feature)
    formData.append(`ProjectFeatures[${index}].Description`, feature.description)
  })

  payload.projectStacks.forEach((stack, index) => {
    formData.append(`ProjectStacks[${index}].FrontEndStack`, stack.frontEndStack)
    formData.append(`ProjectStacks[${index}].BackEndStack`, stack.backEndStack)
    formData.append(`ProjectStacks[${index}].DatabaseStack`, stack.databaseStack)
  })

  const response = await api.patch(`/Project/${id}`, formData, {
    headers: { "Content-Type": "multipart/form-data" },
  })

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

