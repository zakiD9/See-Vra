import React, { lazy, Suspense } from "react";
import NavBar from "@/components/layout/user/header/NavBar";
import Footer from "@/components/layout/user/footer";
import LanguageSwitcher from "@/components/layout/user/header/LanguageDropdown";

const HeroSection = lazy(() => import("@/components/pages/home/herosection/HeroSection"));
const WhoWeAreSection = lazy(() => import("@/components/pages/home/whowearesection/WhoWeAreSection"));
const Stats = lazy(() => import("@/components/pages/home/Statssection/StatsSection"));
const ProjectsSection = lazy(() => import("@/components/pages/home/projectssection/ProjectSection"));
const ServicesSection = lazy(() => import("@/components/pages/home/service/ServicesSection"));
const ContactUs = lazy(() => import("@/components/pages/home/contact/ContactUs"));

export default function HomePage() {
  return (
    <div className="bg-background flex flex-col items-center w-full gap-10">
      <div className="flex w-full md:hidden justify-center mt-2">
          <LanguageSwitcher />
      </div>
      <NavBar />

      <main className="flex flex-col gap-10 w-full">
        <div className="container mx-auto px-4 flex-col gap-10 hidden md:flex">
          <Suspense fallback={<div>Loading...</div>}>
            <section id="home"><HeroSection /></section>
            <section id="about"><WhoWeAreSection /></section>
            <section id="clients"><Stats /></section>
            <section id="projects"><ProjectsSection /></section>
            <section id="services"><ServicesSection /></section>
            <section id="contact"><ContactUs /></section>
          </Suspense>
        </div>

        <div className="px-3 flex flex-col gap-6 md:hidden">
          <Suspense fallback={<div>Loading...</div>}>
            <section id="home"><HeroSection /></section>
            <section id="about"><WhoWeAreSection /></section>
            <section id="clients"><Stats /></section>
            <section id="projects"><ProjectsSection /></section>
            <section id="services"><ServicesSection /></section>
            <section id="contact"><ContactUs /></section>
          </Suspense>
        </div>
      </main>

      <Footer />
    </div>
  );
}
