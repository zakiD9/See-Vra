import EasyContact from "./EasyContact";
import Pic from "../../../../assets/c8224e385a94a6a6778bce4bbae4e756b2dcf6cf.png"
import bgVideo from "../../../../assets/hero-dark-lg.mp4"
import backfall from "../../../../assets/image.png"
import { useTranslation } from "react-i18next";




export default function HeroSection(){
  const {t}=useTranslation();

    return(
        <div className="relative sm:py-5 w-full items-center py-20 px-10 flex justify-between rounded-lg overflow-hidden">
      <video
        autoPlay
        loop
        muted
        playsInline
        preload="none"
        poster={backfall}
        className="absolute top-0 left-0 w-full h-full object-cover  opacity-40 z-0"
      >
        <source src={bgVideo} type="video/mp4" />
      </video>

      <div className="absolute top-0 left-0 w-full h-full bg-black/10 z-10" />

      <div className="relative flex md:justify-between text-center md:test-start w-full items-center z-20">
        <div className="flex flex-col items-center md:items-start gap-16">
          <div className="flex flex-col gap-5">
            <h1 className="text-[#146CF2] text-5xl">{t("hero.title1")}</h1>
            <h1 className="text-4xl text-white">{t("hero.title2")}</h1>
          </div>
          <EasyContact />
        </div>
        <img src={Pic} alt="pic" loading="lazy" className="h-48 hidden md:block md:h-80" />
      </div>
    </div>
    )
}