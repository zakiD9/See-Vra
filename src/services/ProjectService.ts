import api from "@/services/api";

export interface ProjectFeature {
  feature: string
  description: string
}

export interface Stack{
  iconFile:File;
  name:string;
  imageUrl:string;
}
export interface ResponseStack{
  id:number
  iconUrl:string | File
  name:string
  typeStack:number
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
  projectStacks?: ResponseStack[]
  frontEnd: Stack[]
  backEnd: Stack[]
  dataBase: Stack[]
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

payload.frontEnd.forEach((item, j) => {
  formData.append(`FrontEnd[${j}].name`, item.name)
  formData.append(`FrontEnd[${j}].imageUrl`, item.imageUrl)
  if (item.iconFile instanceof File) {
    formData.append(`FrontEnd[${j}].iconFile`, item.iconFile)
  }
})

payload.backEnd.forEach((item, j) => {
  formData.append(`BackEnd[${j}].name`, item.name)
  formData.append(`BackEnd[${j}].imageUrl`, item.imageUrl)
  if (item.iconFile instanceof File) {
    formData.append(`BackEnd[${j}].iconFile`, item.iconFile)
  }
})

payload.dataBase.forEach((item, j) => {
  formData.append(`DataBase[${j}].name`, item.name)
  formData.append(`DataBase[${j}].imageUrl`, item.imageUrl)
  if (item.iconFile instanceof File) {
    formData.append(`DataBase[${j}].iconFile`, item.iconFile)
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

  
payload.frontEnd.forEach((item, j) => {
  formData.append(`FrontEnd[${j}].name`, item.name)
  formData.append(`FrontEnd[${j}].imageUrl`, item.imageUrl)
  if (item.iconFile instanceof File) {
    formData.append(`FrontEnd[${j}].iconFile`, item.iconFile)
  }
})

payload.backEnd.forEach((item, j) => {
  formData.append(`BackEnd[${j}].name`, item.name)
  formData.append(`BackEnd[${j}].imageUrl`, item.imageUrl)
  if (item.iconFile instanceof File) {
    formData.append(`BackEnd[${j}].iconFile`, item.iconFile)
  }
})

payload.dataBase.forEach((item, j) => {
  formData.append(`DataBase[${j}].name`, item.name)
  formData.append(`DataBase[${j}].imageUrl`, item.imageUrl)
  if (item.iconFile instanceof File) {
    formData.append(`DataBase[${j}].iconFile`, item.iconFile)
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

