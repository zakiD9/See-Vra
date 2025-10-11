import api from "@/services/api";

export interface ProjectFeature {
  feature: string
  description: string
}

export interface Stack{
  iconFile:File;
  name:string;
  projectTech:string;
  imageUrl:string;
}

export interface ProjectStacks {
  frontEnd: Stack[]
  backEnd: Stack[]
  dataBase: Stack[]
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
  projectImgs: (string | File)[]
  projectFeatures: ProjectFeature[]
  projectStacks: ProjectStacks
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

  payload.projectImgs.forEach((file) => {
  formData.append("AdditionalImageFiles", file);
})


  payload.projectFeatures.forEach((feature, index) => {
    formData.append(`ProjectFeatures[${index}].Feature`, feature.feature)
    formData.append(`ProjectFeatures[${index}].Description`, feature.description)
  })

payload.projectStacks.frontEnd.forEach((item, j) => {
  formData.append(`projectStacks[0].frontEnd[${j}].name`, item.name)
  if (item.iconFile instanceof File) {
    formData.append(`projectStacks[0].frontEnd[${j}].icon`, item.iconFile)
  }
})

payload.projectStacks.backEnd.forEach((item, j) => {
  formData.append(`projectStacks[0].backEnd[${j}].name`, item.name)
  if (item.iconFile instanceof File) {
    formData.append(`projectStacks[0].backEnd[${j}].icon`, item.iconFile)
  }
})

payload.projectStacks.dataBase.forEach((item, j) => {
  formData.append(`projectStacks[0].dataBase[${j}].name`, item.name)
  if (item.iconFile instanceof File) {
    formData.append(`projectStacks[0].dataBase[${j}].icon`, item.iconFile)
  }
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

  payload.projectFeatures.forEach((feature, index) => {
    formData.append(`ProjectFeatures[${index}].Feature`, feature.feature)
    formData.append(`ProjectFeatures[${index}].Description`, feature.description)
  })

  payload.projectStacks.frontEnd.forEach((item, j) => {
  formData.append(`projectStacks[0].frontEnd[${j}].name`, item.name)
  if (item.iconFile instanceof File) {
    formData.append(`projectStacks[0].frontEnd[${j}].icon`, item.iconFile)
  }
})

payload.projectStacks.backEnd.forEach((item, j) => {
  formData.append(`projectStacks[0].backEnd[${j}].name`, item.name)
  if (item.iconFile instanceof File) {
    formData.append(`projectStacks[0].backEnd[${j}].icon`, item.iconFile)
  }
})

payload.projectStacks.dataBase.forEach((item, j) => {
  formData.append(`projectStacks[0].dataBase[${j}].name`, item.name)
  if (item.iconFile instanceof File) {
    formData.append(`projectStacks[0].dataBase[${j}].icon`, item.iconFile)
  }
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

