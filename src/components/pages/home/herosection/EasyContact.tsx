import { useTranslation } from "react-i18next";
import ecLogo from "../../../../assets/8e0fa8045918f7ced470943cf69595fad0cba71c.gif";


export default function EasyContact(){
    const {t}=useTranslation();
    return(
        <div className="bg-white w-fit flex items-center rounded-lg text-black md:py-2 p-1">
            <span className="lg:text-2xl text-sm ml-5">{t("easyContact.title")}</span>
            <img src={ecLogo} alt='ec' loading="lazy" className="h-10 w-auto"/>
        </div>
    )
}