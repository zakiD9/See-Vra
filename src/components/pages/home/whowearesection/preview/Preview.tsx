import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import CodePreview from "./codepreview/CodePreview"
import TextPreview from "./textpreview/TextPreview"
import { useTranslation } from "react-i18next"

export default function PreviewTabs() {
  const {t,i18n}=useTranslation();
  return (
    <div
  className={`w-full max-w-3xl mx-auto mt-6 xl:${
    i18n.language === "ar" ? " lg:border-r" : "lg:border-l"
  }`}
>
      <Tabs defaultValue="text" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="text">{t("whoweare.text")}</TabsTrigger>
          <TabsTrigger value="code">{t("whoweare.code")}</TabsTrigger>
        </TabsList>

        <TabsContent value="text" className="p-4">
        <TextPreview />
        </TabsContent>

        <TabsContent value="code" className="p-4">
          <CodePreview />
        </TabsContent>
      </Tabs>
    </div>
  )
}
