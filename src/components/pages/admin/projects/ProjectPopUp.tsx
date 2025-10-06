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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

type ProjectFeature = {
  feature: string
  description: string
}

type ProjectStacks = {
  frontEndStack: string
  backEndStack: string
  databaseStack: string
}

interface Project {
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
  const [error, setError] = React.useState("")

  const [form, setForm] = React.useState<Project>({
    id: project?.id ?? Date.now(),
    category: project?.category ?? "",
    title: project?.title ?? "",
    about: project?.about ?? "",
    uiuxLink: project?.uiuxLink ?? "",
    githubLink: project?.githubLink ?? "",
    description: project?.description ?? "",
    imgUrl: project?.imgUrl ?? "",
    mainImageFile: project?.mainImageFile ?? null,
    additionalImages: project?.additionalImages ?? [],
    projectImages: project?.projectImages ?? [],
    projectFeatures: project?.projectFeatures ?? [],
    projectStacks: project?.projectStacks ?? {
      frontEndStack: "",
      backEndStack: "",
      databaseStack: "",
    },
  })

  // Handle change for nested structures
  const handleStackChange = (field: keyof ProjectStacks, value: string) => {
    setForm((prev) => ({
      ...prev,
      projectStacks: { ...prev.projectStacks, [field]: value },
    }))
  }

  const handleFeatureChange = (
    index: number,
    field: keyof ProjectFeature,
    value: string
  ) => {
    const updated = [...form.projectFeatures]
    updated[index][field] = value
    setForm({ ...form, projectFeatures: updated })
  }

  const addFeature = () => {
    setForm({
      ...form,
      projectFeatures: [...form.projectFeatures, { feature: "", description: "" }],
    })
  }

  const validateForm = () => {
    if (
      !form.category ||
      !form.title ||
      !form.about ||
      !form.uiuxLink ||
      !form.githubLink ||
      !form.description ||
      !form.imgUrl ||
      !form.mainImageFile ||
      !form.projectStacks.frontEndStack ||
      !form.projectStacks.backEndStack ||
      !form.projectStacks.databaseStack
    ) {
      setError("Please fill in all required fields.")
      return false
    }
    setError("")
    return true
  }

  const handleSubmit = () => {
    if (!validateForm()) return
    if (onSave) onSave(form)
    onOpenChange(false)
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        className="bg-white text-black max-h-[80vh] overflow-y-auto rounded-2xl"
      >
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
              placeholder="e.g. Web App, Mobile App"
              value={form.category}
              onChange={(e) => setForm({ ...form, category: e.target.value })}
            />
          </div>

          <div className="space-y-2">
            <Label>Title</Label>
            <Input
              placeholder="Enter project title"
              value={form.title}
              onChange={(e) => setForm({ ...form, title: e.target.value })}
            />
          </div>

          <div className="space-y-2">
            <Label>About</Label>
            <Textarea
              placeholder="Short about the project"
              value={form.about}
              onChange={(e) => setForm({ ...form, about: e.target.value })}
            />
          </div>

          <div className="space-y-2">
            <Label>UI/UX Link</Label>
            <Input
              placeholder="Figma or design link"
              value={form.uiuxLink}
              onChange={(e) => setForm({ ...form, uiuxLink: e.target.value })}
            />
          </div>

          <div className="space-y-2">
            <Label>Github Link</Label>
            <Input
              placeholder="GitHub repository link"
              value={form.githubLink}
              onChange={(e) => setForm({ ...form, githubLink: e.target.value })}
            />
          </div>

          <div className="space-y-2">
            <Label>Description</Label>
            <Textarea
              placeholder="Detailed description"
              value={form.description}
              onChange={(e) => setForm({ ...form, description: e.target.value })}
            />
          </div>

          <div className="space-y-2">
            <Label>Image URL</Label>
            <Input
              placeholder="Main image URL"
              value={form.imgUrl}
              onChange={(e) => setForm({ ...form, imgUrl: e.target.value })}
            />
          </div>

          {/* File Inputs */}
          <div className="space-y-2">
            <Label>Main Image File</Label>
            <Input
              type="file"
              accept="image/*"
              onChange={(e) =>
                setForm({ ...form, mainImageFile: e.target.files?.[0] || null })
              }
            />
          </div>

          <div className="space-y-2">
            <Label>Additional Images</Label>
            <Input
              type="file"
              accept="image/*"
              multiple
              onChange={(e) =>
                setForm({ ...form, additionalImages: Array.from(e.target.files || []) })
              }
            />
          </div>

          <div className="space-y-2">
            <Label>Project Images</Label>
            <Input
              type="file"
              accept="image/*"
              multiple
              onChange={(e) =>
                setForm({ ...form, projectImages: Array.from(e.target.files || []) })
              }
            />
          </div>

          {/* Project Stacks */}
          <div className="space-y-2">
            <Label>Frontend Stack</Label>
            <Input
              placeholder="React, Next.js, etc."
              value={form.projectStacks.frontEndStack}
              onChange={(e) => handleStackChange("frontEndStack", e.target.value)}
            />
          </div>

          <div className="space-y-2">
            <Label>Backend Stack</Label>
            <Input
              placeholder="Node.js, Express, etc."
              value={form.projectStacks.backEndStack}
              onChange={(e) => handleStackChange("backEndStack", e.target.value)}
            />
          </div>

          <div className="space-y-2">
            <Label>Database Stack</Label>
            <Input
              placeholder="MongoDB, PostgreSQL, etc."
              value={form.projectStacks.databaseStack}
              onChange={(e) => handleStackChange("databaseStack", e.target.value)}
            />
          </div>

          {/* Features Section */}
          <div className="space-y-3">
            <Label>Project Features</Label>
            {form.projectFeatures.map((feat, index) => (
              <div key={index} className="flex gap-2">
                <Input
                  placeholder="Feature"
                  value={feat.feature}
                  onChange={(e) =>
                    handleFeatureChange(index, "feature", e.target.value)
                  }
                />
                <Input
                  placeholder="Description"
                  value={feat.description}
                  onChange={(e) =>
                    handleFeatureChange(index, "description", e.target.value)
                  }
                />
              </div>
            ))}
            <Button
              type="button"
              variant="outline"
              onClick={addFeature}
            >
              + Add Feature
            </Button>
          </div>
        </div>

        <DialogFooter>
          <Button
            variant="outline"
            className="bg-white"
            onClick={() => onOpenChange(false)}
          >
            Cancel
          </Button>
          <Button onClick={handleSubmit}>
            {isEditMode ? "Save Changes" : "Create Project"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
