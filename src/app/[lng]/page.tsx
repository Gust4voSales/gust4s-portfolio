"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  ArrowDown,
  Github,
  Mail,
  FileText,
  Calendar,
  Briefcase,
  GraduationCap,
  Home,
  FolderOpen,
  ExternalLink,
  Linkedin,
  ArrowUp,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ThemeSwitch } from "@/components/theme-switch";
import { MobileNav } from "@/components/mobile-nav";
import Image from "next/image";
import { MediaCarousel } from "@/components/media-carousel";
import { ExternalLinkAnchor } from "@/components/ui/external-link-anchor";
import portfolioData from "@/data/portfolio.json";
import { ExpandableText } from "@/components/expandable-text";
import { LanguageSwitcher } from "@/components/language-switcher";
import { useT } from "@/app/i18n/client";
import { PortfolioTitle } from "@/components/portfolio-title";
import { useParams } from "next/navigation";

interface Project {
  title: string;
  description: string;
  descriptionEN: string;
  media: {
    type: "image" | "video";
    src: string;
    alt?: string;
    title?: string;
  }[];
  tags: string[];
  links: {
    live: string;
    github: string;
  };
}

interface TimelineItem {
  date: string;
  dateEN: string;
  institution: string;
  type: "job" | "study";
  title: string;
  description: string;
  descriptionEN: string;
}

interface NavigationItem {
  id: string;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
}

export default function Portfolio() {
  const { t } = useT("translation");
  const [activeSection, setActiveSection] = useState("home");
  const [showBackToTop, setShowBackToTop] = useState(false);
  const params = useParams();
  const currentLng = params?.lng as string;
  const currentLanguage = currentLng as "pt-BR" | "en";

  const navigationItems: NavigationItem[] = [
    { id: "home", label: t("navigation.home"), icon: Home },
    { id: "experience", label: t("navigation.experience"), icon: Briefcase },
    { id: "projects", label: t("navigation.projects"), icon: FolderOpen },
  ];

  useEffect(() => {
    const handleScroll = () => {
      const sections = document.querySelectorAll("section");
      const scrollPosition = window.scrollY + 100;

      // Check if user has scrolled past the first section
      const homeSection = document.getElementById("home");
      if (homeSection) {
        const homeSectionBottom = homeSection.offsetTop + homeSection.offsetHeight;
        setShowBackToTop(window.scrollY > homeSectionBottom - 200);
      }

      sections.forEach((section) => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.offsetHeight;

        if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
          setActiveSection(section.id);
        }
      });
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (sectionId: string) => {
    const section = document.getElementById(sectionId);
    if (section) {
      window.scrollTo({
        top: section.offsetTop,
        behavior: "smooth",
      });
    }
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      <header className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border">
        <div className="container mx-auto px-4 py-4">
          <nav className="flex justify-between items-center">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
              className="text-xl font-bold"
            >
              <PortfolioTitle />
            </motion.div>
            <ul className="hidden md:flex space-x-8">
              {navigationItems.map((item) => (
                <li key={item.id}>
                  <button
                    onClick={() => scrollToSection(item.id)}
                    className={`cursor-pointer text-sm font-medium capitalize transition-colors hover:text-primary active:text-primary ${
                      activeSection === item.id ? "text-primary" : "text-muted-foreground"
                    }`}
                  >
                    {item.label}
                  </button>
                </li>
              ))}
            </ul>
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm" className="hidden md:flex" asChild>
                <ExternalLinkAnchor
                  href={
                    currentLanguage === "pt-BR"
                      ? portfolioData.personal.links.resume
                      : portfolioData.personal.links.resumeEN
                  }
                >
                  {t("navigation.resume")} <FileText className="ml-2 h-4 w-4" />
                </ExternalLinkAnchor>
              </Button>
              <LanguageSwitcher />
              <ThemeSwitch />
              <MobileNav
                activeSection={activeSection}
                scrollToSection={scrollToSection}
                navigationItems={navigationItems}
              />
            </div>
          </nav>
        </div>
      </header>

      <main className="pt-16">
        {/* Welcome Section */}
        <section id="home" className="min-h-screen flex mt-10 lg:items-center lg:mt-0 relative overflow-hidden">
          <div className="absolute inset-0 z-0">
            <div className="absolute top-20 right-[10%] w-72 h-72 bg-primary/20 rounded-full filter blur-3xl"></div>
            <div className="absolute bottom-20 left-[15%] w-96 h-96 bg-secondary/20 rounded-full filter blur-3xl"></div>
          </div>

          <div className="container mx-auto px-4 py-0 lg:py-20 z-10 relative">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="space-y-6 flex flex-col items-center lg:items-start"
              >
                <Badge variant="outline" className="px-4 py-1 text-sm border-primary/50 bg-primary/5 ">
                  {t("sections.home.badge")}
                </Badge>
                <h1 className="text-4xl md:text-6xl font-bold tracking-tight">
                  {t("sections.home.greeting")} <span className="text-primary">{portfolioData.personal.name}</span>
                </h1>
                <p className="text-md md:text-xl text-justify text-muted-foreground">
                  {t("sections.home.description")}
                </p>
                <div className="flex flex-col sm:flex-row items-center gap-6 pt-4">
                  <Button size="lg" asChild variant="default">
                    <ExternalLinkAnchor
                      href={
                        currentLanguage === "pt-BR"
                          ? portfolioData.personal.links.resume
                          : portfolioData.personal.links.resumeEN
                      }
                    >
                      {t("buttons.viewResume")}
                      <FileText className="ml-2 h-4 w-4" />
                    </ExternalLinkAnchor>
                  </Button>
                  <div className="flex gap-6">
                    <ExternalLinkAnchor
                      href={portfolioData.personal.links.github}
                      className={`text-muted-foreground hover:text-primary active:text-primary transition-colors`}
                    >
                      <span className="sr-only">GitHub</span>
                      <Github className="h-6 w-6" />
                    </ExternalLinkAnchor>
                    <ExternalLinkAnchor
                      href={portfolioData.personal.links.linkedin}
                      className={`text-muted-foreground hover:text-primary active:text-primary transition-colors`}
                    >
                      <span className="sr-only">LinkedIn</span>
                      <Linkedin className="h-6 w-6" />
                    </ExternalLinkAnchor>
                    <ExternalLinkAnchor
                      href={`mailto:${portfolioData.personal.links.email}`}
                      className={`text-muted-foreground hover:text-primary active:text-primary transition-colors`}
                    >
                      <span className="sr-only">Email</span>
                      <Mail className="h-6 w-6" />
                    </ExternalLinkAnchor>
                  </div>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="relative"
              >
                <div className="relative aspect-square w-3/5 h-3/5 md:w-2/5 md:h-2/5 lg:w-full lg:h-full max-w-[400px] max-h-[400px] mx-auto flex justify-center items-center">
                  <Image
                    src={portfolioData.personal.profileImage}
                    alt={portfolioData.personal.name}
                    width={400}
                    height={400}
                    className="rounded-full object-cover w-full h-full max-w-[400px] max-h-[400px] border-4 border-foreground dark:border-border"
                    priority
                  />
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.5, duration: 1 }}
                className="absolute bottom-40 lg:bottom-0 left-1/2 transform -translate-x-1/2 cursor-pointer"
                onClick={() => scrollToSection("experience")}
              >
                <ArrowDown className="h-10 w-10 text-muted-foreground animate-bounce" />
              </motion.div>
            </div>
          </div>
        </section>

        {/* Experience Section */}
        <section id="experience" className="py-20 relative">
          <div className="absolute inset-0 z-0">
            <div className="absolute top-1/4 left-[10%] w-64 h-64 bg-secondary/10 rounded-full filter blur-3xl"></div>
            <div className="absolute bottom-1/3 right-[5%] w-80 h-80 bg-primary/10 rounded-full filter blur-3xl"></div>
          </div>

          <div className="container mx-auto px-4 z-10 relative">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-center mb-16 max-w-3xl mx-auto"
            >
              <Badge variant="outline" className="mb-4 px-4 py-1 text-sm border-primary/50 bg-primary/5">
                {t("sections.experience.badge")}
              </Badge>
              <h2 className="text-3xl md:text-5xl font-bold mb-6">{t("navigation.experience")}</h2>
              <p className="text-muted-foreground text-lg">{t("sections.experience.description")}</p>
            </motion.div>

            <div className="relative max-w-4xl mx-auto">
              {/* Timeline line */}
              <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-px bg-gradient-to-b from-transparent via-gray-700 to-transparent"></div>

              {/* Experience Items */}
              {portfolioData.sections.experience.timeline.map((item, index) => {
                const timelineItem = item as TimelineItem;
                return (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: index * 0.2 }}
                    className={`relative mb-16 md:w-[calc(50%-40px)] ${index % 2 === 0 ? "md:mr-auto" : "md:ml-auto"}`}
                  >
                    <div className="bg-secondary/15 text-secondary-foreground backdrop-blur-sm border border-border rounded-xl p-6 shadow-xl hover:shadow-primary/15 dark:hover:shadow-primary/5 transition-all duration-300 relative">
                      {/* Triangle pointer for desktop */}
                      <div
                        className={`hidden md:block absolute top-11 w-0 h-0 border-t-[12px] border-t-transparent border-b-[12px] border-b-transparent ${
                          index % 2 === 0
                            ? "right-[-12px] border-l-[12px] border-l-secondary/15"
                            : "left-[-12px] border-r-[12px] border-r-secondary/15"
                        }`}
                      ></div>

                      <div
                        className={`bg-primary absolute top-[-2rem] md:top-8 left-1/2 transform -translate-x-1/2 ${
                          index % 2 === 0 ? "md:left-[calc(100%+40px)]" : "md:left-[-40px]"
                        } flex items-center justify-center w-12 h-12 rounded-full bg-surface border border-border shadow-lg`}
                      >
                        {timelineItem.type === "job" ? (
                          <Briefcase className="h-5 w-5 text-primary-foreground" />
                        ) : (
                          <GraduationCap className="h-5 w-5 text-primary-foreground" />
                        )}
                      </div>

                      <div className="flex items-center mb-4 text-sm text-muted-foreground">
                        <Calendar className="h-4 w-4 mr-2" />
                        {currentLanguage === "pt-BR" ? timelineItem.date : timelineItem.dateEN}
                      </div>

                      <h3 className="text-xl font-bold mb-1">{timelineItem.institution}</h3>
                      <h4 className="text-primary mb-4">{timelineItem.title}</h4>
                      <ExpandableText
                        text={currentLanguage === "pt-BR" ? timelineItem.description : timelineItem.descriptionEN}
                        className="text-muted-foreground"
                      />
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Projects Section */}
        <section id="projects" className="py-20 bg-background/50 relative">
          <div className="absolute inset-0 z-0">
            <div className="absolute top-1/3 right-[20%] w-72 h-72 bg-primary/10 rounded-full filter blur-3xl"></div>
            <div className="absolute bottom-1/4 left-[10%] w-80 h-80 bg-secondary/10 rounded-full filter blur-3xl"></div>
          </div>

          <div className="container mx-auto px-4 z-10 relative">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-center mb-16 max-w-3xl mx-auto"
            >
              <Badge variant="outline" className="mb-4 px-4 py-1 text-sm border-primary/50 bg-primary/5">
                {t("sections.projects.badge")}
              </Badge>
              <h2 className="text-3xl md:text-5xl font-bold mb-6">{t("navigation.projects")}</h2>
              <p className="text-muted-foreground text-lg">{t("sections.projects.description")}</p>
            </motion.div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {portfolioData.sections.projects.items.map((projectData, index) => {
                const project = projectData as Project;
                return (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                  >
                    <Card className="bg-secondary/15 backdrop-blur-sm border-border pt-0 overflow-hidden h-full hover:shadow-lg hover:shadow-primary/20 dark:hover:shadow-primary/10 transition-all duration-300 group">
                      <MediaCarousel media={project.media} projectTitle={project.title} />

                      <CardHeader>
                        <CardTitle className="text-xl leading-4">{project.title}</CardTitle>
                        <div className="flex flex-wrap gap-2 mt-2">
                          {project.tags.map((tag: string, tagIndex: number) => (
                            <Badge key={tagIndex} variant="secondary" className="bg-muted text-muted-foreground">
                              {tag}
                            </Badge>
                          ))}
                        </div>
                      </CardHeader>

                      <CardContent>
                        <CardDescription className="text-foreground">
                          {currentLanguage === "pt-BR" ? project.description : project.descriptionEN}
                        </CardDescription>
                      </CardContent>

                      <CardFooter className="flex justify-between mt-auto">
                        {project.links.live && (
                          <Button variant="outline" size="sm" asChild>
                            <ExternalLinkAnchor href={project.links.live}>
                              <ExternalLink className="h-4 w-4 mr-2" />
                              {t("buttons.viewLive")}
                            </ExternalLinkAnchor>
                          </Button>
                        )}
                        <Button variant="outline" size="sm" asChild className="ml-auto">
                          <ExternalLinkAnchor href={project.links.github}>
                            <Github className="h-4 w-4 mr-2" />
                            {t("buttons.viewCode")}
                          </ExternalLinkAnchor>
                        </Button>
                      </CardFooter>
                    </Card>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </section>
      </main>

      <footer className="bg-background border-t border-border py-12">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-6 md:mb-0">
              <div className="text-xl font-bold text-center md:text-left">
                <span className="text-primary">{portfolioData.personal.name.split(" ")[0]}</span>
                {portfolioData.personal.name.split(" ").slice(1).join(" ")}
              </div>
              <ExternalLinkAnchor
                href={`mailto:${portfolioData.personal.links.email}`}
                className={`text-muted-foreground hover:text-primary hover:underline active:text-primary active:underline transition-colors`}
              >
                {portfolioData.personal.links.email}
              </ExternalLinkAnchor>
            </div>

            <div className="flex space-x-6">
              <ExternalLinkAnchor
                href={portfolioData.personal.links.github}
                className={`text-muted-foreground hover:text-primary active:text-primary transition-colors`}
              >
                <span className="sr-only">GitHub</span>
                <Github className="h-6 w-6" />
              </ExternalLinkAnchor>
              <ExternalLinkAnchor
                href={portfolioData.personal.links.linkedin}
                className={`text-muted-foreground hover:text-primary active:text-primary transition-colors`}
              >
                <span className="sr-only">LinkedIn</span>
                <Linkedin className="h-6 w-6" />
              </ExternalLinkAnchor>
            </div>
          </div>

          <div className="border-t border-border mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
            <p className="text-muted-foreground text-sm mx-auto">
              © {new Date().getFullYear()} {portfolioData.personal.name}. {t("footer.copyright")}
            </p>
          </div>
        </div>
      </footer>

      {/* Back to Top Button */}
      <motion.button
        initial={{ opacity: 0, scale: 0 }}
        animate={{
          opacity: showBackToTop ? 1 : 0,
          scale: showBackToTop ? 1 : 0,
        }}
        transition={{ duration: 0.3 }}
        onClick={scrollToTop}
        className={`fixed cursor-pointer bottom-8 right-8 z-50 bg-primary text-primary-foreground p-3 rounded-full shadow-lg hover:shadow-xl active:shadow-xl transition-all duration-300 hover:scale-110 active:scale-110`}
        aria-label={t("buttons.backToTop")}
      >
        <ArrowUp className="h-5 w-5" />
      </motion.button>
    </div>
  );
}
