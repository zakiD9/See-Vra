import Button from "@/components/ui/button";
import { useTranslation } from "react-i18next";

export default function TextPreview() {
  const{t}=useTranslation();

  return (
    <div className="relative w-full py-10">
      <div className="absolute inset-20 sm:bg-[#146CF2]/20 rounded-3xl transform left-60 -skew-y-3 right-0 top-14 bottom-16 -rotate-1"></div>

      <div className="relative flex w-full  items-center gap-10 p-10">
        <img
          src="https://picsum.photos/400/200"
          loading="lazy"
          alt=""
          className="object-cover hidden sm:block skew-y-3  rotate-2 w-64 h-32 md:w-80 md:h-40 rounded-2xl"
        />
        <div className="flex flex-col gap-5 items-center text-center sm:text-start sm:items-start sm:w-1/2 justify-start">
          <h1 className="md:text-2xl xm:text-lg font-semibold">{t("textPreview.title")}</h1>
          <span className="text-gray-400 text-lg sm:text-xs md:text-sm">{t("textPreview.description")}</span>
          <Button className="text-xl mt-10 w-fit px-7 py-7 bg-[#00B7C3] rounded-xl">
            {t("textPreview.button")}
          </Button>
        </div>
      </div>
    </div>
  );
}
