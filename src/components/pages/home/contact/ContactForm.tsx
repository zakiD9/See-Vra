"use client"

import Button from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { useState } from "react"
import { useTranslation } from "react-i18next"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { useRequestStore } from "@/stores/RequestStore"
import type { ContactRequest } from "@/services/RequestService"

export default function ContactForm() {
  const { t } = useTranslation()
  const { addRequest, loading } = useRequestStore()
  const types = [
    { id: 1, name: t("siderbarTypes.eLearning"),},
    { id: 2, name: t("siderbarTypes.eCommerce"),},
    { id: 3, name: t("siderbarTypes.saas"),},
    { id: 4, name: t("siderbarTypes.erp"),},
    { id: 5, name: t("siderbarTypes.crm"),},
    { id: 6, name: t("siderbarTypes.healthcare"),},
    { id: 7, name: t("siderbarTypes.crossPlatform"),},
    { id: 8, name: t("siderbarTypes.androidMobile"),},
    { id: 9, name: t("siderbarTypes.others"),},
  ];

  const [form, setForm] = useState<ContactRequest>({
    company: "",
    service: "",
    email: "",
    phone: "",
    description: "",
  })

  const handleChange = (key: keyof ContactRequest, value: string) => {
    setForm((prev) => ({ ...prev, [key]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (
      !form.company ||
      !form.email ||
      !form.phone ||
      !form.service ||
      !form.description
    ) {
      alert(t("contactForm.fillAllFields") || "Please fill all fields.")
      return
    }

    try {
      await addRequest(form)
      alert(t("contactForm.success") || "Your message has been sent!")
      setForm({
        company: "",
        service: "",
        email: "",
        phone: "",
        description: "",
      })
    } catch {
      alert(t("contactForm.error") || "Something went wrong.")
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col rounded-2xl pb-5 lg:pb-14 shadow-[#146CF2] shadow-[0px_-0px_5px_rgba(0,0,0,0.4)] md:w-2/3 w-full py-2 px-5 gap-5"
    >
      <h1 className="text-2xl text-center">{t("contactForm.title")}</h1>

      <div className="grid grid-cols-2 grid-rows-2 mt-5 gap-4">
        <Select
          value={form.service}
          onValueChange={(value) => handleChange("service", value)}
        >
          <SelectTrigger className="py-5 border-[#146CF2]">
            <SelectValue placeholder={t("contactForm.chooseService")} />
          </SelectTrigger>
          <SelectContent>
            {types.map((service) => (
              <SelectItem key={service.id} value={service.name}>
                {t(service.name)}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Input
          className="py-5"
          placeholder={t("contactForm.company")}
          value={form.company}
          onChange={(e) => handleChange("company", e.target.value)}
        />

        <Input
          className="py-5"
          placeholder={t("contactForm.email")}
          type="email"
          value={form.email}
          onChange={(e) => handleChange("email", e.target.value)}
        />

        <Input
          className="py-5"
          placeholder={t("contactForm.phone")}
          value={form.phone}
          onChange={(e) => handleChange("phone", e.target.value)}
        />
      </div>

      <Textarea
        placeholder={t("contactForm.message")}
        className="min-h-[120px]"
        value={form.description}
        onChange={(e) => handleChange("description", e.target.value)}
      />

      <div className="flex mt-2 justify-end">
        <Button type="submit" disabled={loading}>
          {loading ? t("contactForm.sending") || "Sending..." : t("contactForm.send")}
        </Button>
      </div>
    </form>
  )
}
