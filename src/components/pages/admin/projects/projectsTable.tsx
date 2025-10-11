"use client"

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import EditButton from "@/components/ui/table/edit"
import DeleteButton from "@/components/ui/table/delete"
import { ProjectDialog } from "./ProjectPopUp"
import { useEffect, useState } from "react"
import { useProjectStore } from "@/stores/ProjectStore"
import { ConfirmDialog } from "@/components/ui/dialog/confirmationDialog"

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
  projectStacks: ProjectStacks[]
}

export default function ProjectsTable() {
  const {
    projects,
    fetchProjects,
    deleteProject,
    loading,
    error,
  } = useProjectStore()

  const [selectedProject, setSelectedProject] = useState<Project | null>(null)
  const [open, setOpen] = useState(false)
  const [confirmOpen, setConfirmOpen] = useState(false)
  const [deleteId, setDeleteId] = useState<number | null>(null)

  useEffect(() => {
    fetchProjects()
  }, [fetchProjects])

  const handleDelete = async () => {
    if (deleteId === null) return
    await deleteProject(deleteId)
    await fetchProjects()
  }

  if (loading) return <p className="p-4">Loading projects...</p>
  if (error) return <p className="p-4 text-red-500">{error}</p>

  return (
    <div className="rounded-xl border shadow-md overflow-hidden">
      <Table>
        <TableHeader>
          <TableRow className="bg-gray-100">
            <TableHead>ID</TableHead>
            <TableHead>Category</TableHead>
            <TableHead>Title</TableHead>
            <TableHead>About</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {projects.map((project) => (
            <TableRow key={project.id} className="hover:bg-gray-50">
              <TableCell>{project.id}</TableCell>
              <TableCell className="font-medium">{project.category}</TableCell>
              <TableCell>{project.title}</TableCell>
              <TableCell className="max-w-[250px] truncate">{project.about}</TableCell>
              <TableCell className="text-right">
                <div className="flex gap-2 items-center">
                  <EditButton
                    onClick={() => {
                      setSelectedProject(project)
                      setOpen(true)
                    }}
                  />
                  <DeleteButton
                    onClick={() => {
                      setDeleteId(project.id)
                      setConfirmOpen(true)
                    }}
                  />
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <ProjectDialog
        open={open}
        onOpenChange={setOpen}
        project={selectedProject}
      />
      <ConfirmDialog
        open={confirmOpen}
        onOpenChange={setConfirmOpen}
        title="Delete Project"
        description="Are you sure you want to delete this project? This action cannot be undone."
        actionLabel="Delete"
        variant="destructive"
        onConfirm={handleDelete}
      />
    </div>
  )
}
