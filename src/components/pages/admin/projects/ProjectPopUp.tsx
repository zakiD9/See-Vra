"use client"

import * as React from "react"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog"
import Button from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { useProjectStore } from "@/stores/ProjectStore"
import { Plus, X } from "lucide-react"

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
  frontEnd: Stack[]
  backEnd: Stack[]
  dataBase: Stack[]
  projectStacks?: ResponseStack[]
}

interface ProjectDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  project?: Project | null
  onSave?: (project: Project) => void
}


export function ProjectDialog({
  open,
  onOpenChange,
  project,
  onSave,
}: ProjectDialogProps) {
  const isEditMode = !!project
  const { getProjectById, addProject, updateProject } = useProjectStore()
  const [error, setError] = React.useState("")
  const [loading, setLoading] = React.useState(false)
  const mainImageRef = React.useRef<File | null>(null);
  const [form, setForm] = React.useState<Project>({
    id: project?.id ?? 0,
    category: project?.category ?? "",
    title: project?.title ?? "",
    about: project?.about ?? "",
    uiUxLink: project?.uiUxLink ?? "",
    githubLink: project?.githubLink ?? "",
    description: project?.description ?? "",
    imgUrl: project?.imgUrl ?? "",
    projectImgs: project?.projectImgs ?? [],
    projectFeatures: project?.projectFeatures ?? [],
    frontEnd: project?.frontEnd ?? [],
    backEnd: project?.backEnd ?? [],
    dataBase: project?.dataBase ?? [],
  })

  React.useEffect(() => {
    const fetchProject = async () => {
      if (!isEditMode || !project?.id) return
      setLoading(true)
      try {
        const data = await getProjectById(project.id)
        if (data) setForm(data)
        console.log(data)
      } catch (error) {
        console.error("Failed to fetch project:", error)
      } finally {
        setLoading(false)
      }
    }
    fetchProject()
  }, [project?.id, isEditMode, getProjectById]);

  const validateForm = () => {
    if (
      !form.category ||
      !form.title ||
      !form.about ||
      !form.uiUxLink ||
      !form.githubLink ||
      !form.description
    ) {
      setError("Please fill in all required fields.")
      return false
    }
    setError("")
    return true
  }


  const handleSubmit = async () => {
    console.log("FORM BEFORE SUBMIT", form);
  if (!validateForm()) return
  setLoading(true)
  try {
    const payload = form

    if (isEditMode && project?.id) {
      await updateProject(project.id, payload)
    } else {
      await addProject(payload)
    }

    onSave?.(form)
    onOpenChange(false)
  } catch (error) {
    console.error("Error saving project:", error)
    setError("Failed to save project. Please try again.")
  } finally {
    setLoading(false)
  }
}


  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="bg-white text-black max-h-[80vh] overflow-y-auto rounded-2xl">
        {loading ? (
          <p>Loading project details...</p>
        ) : (
          <>
            <DialogHeader>
              <DialogTitle>{isEditMode ? "Edit Project" : "Add Project"}</DialogTitle>
              <DialogDescription>
                {isEditMode
                  ? "Update project details and save changes."
                  : "Fill in the form to create a new project."}
              </DialogDescription>
            </DialogHeader>

            <div className="space-y-4 py-2">
              {error && (
                <div className="bg-red-100 border border-red-400 text-red-600 p-2 rounded-lg">
                  {error}
                </div>
              )}

              <div className="space-y-2">
                <Label>Category</Label>
                <Input
                  value={form.category}
                  onChange={(e) => setForm({ ...form, category: e.target.value })}
                  placeholder="e.g. Web App"
                />
              </div>

              <div className="space-y-2">
                <Label>Title</Label>
                <Input
                  value={form.title}
                  onChange={(e) => setForm({ ...form, title: e.target.value })}
                  placeholder="Project title"
                />
              </div>

              <div className="space-y-2">
                <Label>About</Label>
                <Textarea
                  value={form.about}
                  onChange={(e) => setForm({ ...form, about: e.target.value })}
                  placeholder="Short summary"
                />
              </div>

              <div className="space-y-2">
                <Label>UI/UX Link</Label>
                <Input
                  value={form.uiUxLink}
                  onChange={(e) => setForm({ ...form, uiUxLink: e.target.value })}
                  placeholder="Figma or design link"
                />
              </div>

              <div className="space-y-2">
                <Label>Github Link</Label>
                <Input
                  value={form.githubLink}
                  onChange={(e) => setForm({ ...form, githubLink: e.target.value })}
                  placeholder="Repository link"
                />
              </div>

              <div className="space-y-2">
                <Label>Description</Label>
                <Textarea
                  value={form.description}
                  onChange={(e) => setForm({ ...form, description: e.target.value })}
                  placeholder="Detailed description"
                />
              </div>

              <div className="space-y-2">
                <Label>Main Image URL</Label>
                <Input
                  value={form.imgUrl}
                  onChange={(e) => setForm({ ...form, imgUrl: e.target.value })}
                  placeholder="Main image link"
                />
              </div>

              <div className="space-y-2">
                <Label>Upload Main Image</Label>
                <Input
                  type="file"
                  accept="image/*"
                  onChange={(e) => {
                    mainImageRef.current = e.target.files?.[0] || null;
                  }}
                />

              </div>

              <div className="space-y-2">
                <Label>Project Images</Label>
                <Input
                  type="file"
                  accept="image/*"
                  multiple
                  onChange={(e) =>
                            setForm({
                      ...form,
                      projectImgs: Array.from(e.target.files || []),
                    })
                  }
                />
              </div>
                  <div className="space-y-3 border p-4 rounded-xl mt-4">
  <div className="flex items-center justify-between">
    <Label className="text-lg font-semibold">Project Features</Label>
    <Button
      type="button"
      variant="outline"
      onClick={() =>
        setForm({
          ...form,
          projectFeatures: [...form.projectFeatures, { feature: "", description: "" }],
        })
      }
      className="flex items-center bg-white gap-2"
    >
      <Plus size={16} /> Add Feature
    </Button>
  </div>

  {form.projectFeatures.length === 0 && (
    <p className="text-sm text-gray-500">No features added yet.</p>
  )}

  {form.projectFeatures.map((feature, index) => (
    <div key={index} className="relative border p-3 rounded-xl bg-gray-50 mt-2">
      <button
        type="button"
        onClick={() =>
          setForm({
            ...form,
            projectFeatures: form.projectFeatures.filter((_, i) => i !== index),
          })
        }
        className="absolute top-2 right-2 text-red-500 hover:text-red-700"
      >
        <X size={16} />
      </button>

      <div className="space-y-2">
        <Label>Feature Title</Label>
        <Input
          value={feature.feature}
          onChange={(e) => {
            const updated = [...form.projectFeatures]
            updated[index].feature = e.target.value
            setForm({ ...form, projectFeatures: updated })
          }}
          placeholder="Feature title"
        />
      </div>

      <div className="space-y-2 mt-2">
        <Label>Description</Label>
        <Textarea
          value={feature.description}
          onChange={(e) => {
            const updated = [...form.projectFeatures]
            updated[index].description = e.target.value
            setForm({ ...form, projectFeatures: updated })
          }}
          placeholder="Feature description"
        />
      </div>
    </div>
  ))}
</div>
<div className="space-y-3 border p-4 rounded-xl mt-6">
  <div className="flex items-center justify-between">
    <Label className="text-lg font-semibold">Project Stacks</Label>
  </div>

  {(["frontEnd", "backEnd", "dataBase"] as const).map((stackType) => {
  const stackArray = form[stackType] || [];

  return (
    <div key={stackType} className="space-y-3 border p-3 rounded-xl bg-gray-50">
      <div className="flex items-center justify-between">
        <h3 className="font-medium">
          {stackType === "frontEnd"
            ? "Frontend Stack"
            : stackType === "backEnd"
            ? "Backend Stack"
            : "Database Stack"}
        </h3>

        <Button
          type="button"
          variant="outline"
          onClick={() => {
            setForm({
              ...form,
              [stackType]: [...stackArray, { iconFile: {} as File, name: "", imageUrl: "" }],
            });
          }}
          className="flex items-center bg-white gap-2"
        >
          <Plus size={16} /> Add Tech
        </Button>
      </div>

      {stackArray.length > 0 ? (
        stackArray.map((item, idx) => (
          <div key={idx} className="relative border p-3 rounded-xl bg-white">
            <button
              type="button"
              onClick={() => {
                setForm({
                  ...form,
                  [stackType]: stackArray.filter((_item, i) => i !== idx),
                });
              }}
              className="absolute top-2 right-2 text-red-500 hover:text-red-700"
            >
              <X size={16} />
            </button>

            <div className="space-y-2">
              <Label>Technology Name</Label>
              <Input
                value={item.name}
                onChange={(e) => {
                  const updatedArray = [...stackArray];
                  updatedArray[idx].name = e.target.value;
                  setForm({ ...form, [stackType]: updatedArray });
                }}
                placeholder="e.g. React, Node.js"
              />
            </div>

            <div className="space-y-2 mt-2">
              <Label>Upload Icon</Label>
              <Input
                type="file"
                accept="image/*"
                onChange={(e) => {
                  const file = e.target.files?.[0];
                  if (!file) return;
                  const updatedArray = [...stackArray];
                  updatedArray[idx].iconFile = file;
                  setForm({ ...form, [stackType]: updatedArray });
                }}
              />
              {item.iconFile && (item.iconFile as File).name && (
                <p className="text-xs text-gray-500 mt-1">
                  Selected: {(item.iconFile as File).name}
                </p>
              )}
            </div>
          </div>
        ))
      ) : (
        <p className="text-sm text-gray-500">No technologies added yet.</p>
      )}
    </div>
  );
})}




</div>
          
            </div>

            <DialogFooter>
              <Button variant="outline" className="bg-white" onClick={() => onOpenChange(false)}>
                Cancel
              </Button>
              <Button onClick={handleSubmit}>
                {isEditMode ? "Save Changes" : "Create Project"}
              </Button>
            </DialogFooter>
          </>
        )}
      </DialogContent>
    </Dialog>
  )
}
