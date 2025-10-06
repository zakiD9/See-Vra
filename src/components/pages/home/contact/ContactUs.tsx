import ContactForm from "./ContactForm";
import pic from "../../../../assets/d1394f975cd059706476aaab08d5696438da4f4f.png"



export default function ContactUs(){

    return(
        <div className="flex w-full items-center gap-4 lg:gap-32">
            <img src={pic} alt="logo" loading="lazy" className="w-2/5 hidden md:block lg:w-1/3"/>
            <ContactForm />
        </div>
    )
}