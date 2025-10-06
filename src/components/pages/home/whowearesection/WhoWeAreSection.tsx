import { useTranslation } from "react-i18next"
import pic from "../../../../assets/3685a61af3545f31734689320177e8859e493475.png"
import Preview from "./preview/Preview"


export default function WhoWeAreSection(){
const {t}=useTranslation();

    return(
        <div className="my-10 gap-10 flex xl:flex-row  flex-col items-center w-full">
            <div className="flex flex-col lg:items-center w-1/3">
            <h1 className="text-2xl md:text-3xl font-semibold ml-10">{t("whoweare.who")}</h1>
            <img alt="pic" loading="lazy" src={pic} className="w-full hidden md:block lg:h-60 lg:w-60 xl:w-80 xl:h-80 h-auto"/>
            </div>
            <Preview />
        </div>
    )
}