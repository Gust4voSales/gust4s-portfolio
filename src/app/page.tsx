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
import { MediaCarousel, MediaItem } from "@/components/media-carousel";
import { ExternalLinkAnchor } from "@/components/ui/external-link-anchor";

interface Project {
  title: string;
  description: string;
  media: MediaItem[];
  tags: string[];
}

interface NavigationItem {
  id: string;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
}

export default function Portfolio() {
  const [activeSection, setActiveSection] = useState("home");
  const [showBackToTop, setShowBackToTop] = useState(false);

  const navigationItems: NavigationItem[] = [
    { id: "home", label: "Home", icon: Home },
    { id: "experience", label: "Experience", icon: Briefcase },
    { id: "projects", label: "Projects", icon: FolderOpen },
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
              <span className="text-primary">Dev</span>Portfolio
            </motion.div>
            <ul className="hidden md:flex space-x-8">
              {navigationItems.map((item) => (
                <li key={item.id}>
                  <button
                    onClick={() => scrollToSection(item.id)}
                    className={`cursor-pointer text-sm font-medium capitalize transition-colors hover:text-primary ${
                      activeSection === item.id ? "text-primary" : "text-muted-foreground"
                    }`}
                  >
                    {item.label}
                  </button>
                </li>
              ))}
            </ul>
            <div className="flex items-center">
              <Button variant="outline" size="sm" className="hidden md:flex">
                Resume <FileText className="ml-2 h-4 w-4" />
              </Button>
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
                  Full-Stack Developer
                </Badge>
                <h1 className="text-4xl md:text-6xl font-bold tracking-tight">
                  Hi, I&apos;m <span className="text-primary">Alex Johnson</span>
                </h1>
                <p className="text-md md:text-xl text-justify text-muted-foreground max-w-lg">
                  I build exceptional digital experiences that are fast, accessible, visually appealing, and responsive.
                  Focused on turning ideas into elegant solutions.
                </p>
                <div className="flex flex-wrap gap-4 pt-4">
                  <Button onClick={() => scrollToSection("contact")} size="lg">
                    Contact Me
                    <Mail className="ml-2 h-4 w-4" />
                  </Button>
                  <Button variant="outline" size="lg">
                    View Resume
                    <FileText className="ml-2 h-4 w-4" />
                  </Button>
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
                    src="/me.jpg"
                    alt="Gustavo Sales"
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
                My Journey
              </Badge>
              <h2 className="text-3xl md:text-5xl font-bold mb-6">Professional Experience</h2>
              <p className="text-muted-foreground text-lg">
                A timeline of my professional journey and the skills I&apos;ve developed along the way.
              </p>
            </motion.div>

            <div className="relative max-w-4xl mx-auto">
              {/* Timeline line */}
              <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-px bg-gradient-to-b from-transparent via-gray-700 to-transparent"></div>

              {/* Experience Items */}
              {[
                {
                  date: "2022 - Present",
                  institution: "TechNova Solutions",
                  type: "job",
                  title: "Senior Full-Stack Developer",
                  description:
                    "Led the development of a SaaS platform serving over 50,000 users. Implemented CI/CD pipelines and microservices architecture that improved deployment efficiency by 40%.",
                },
                {
                  date: "2020 - 2022",
                  institution: "Digital Frontier",
                  type: "job",
                  title: "Frontend Developer",
                  description:
                    "Developed responsive web applications using React and Next.js. Collaborated with designers to implement pixel-perfect UIs and improved site performance by 35%.",
                },
                {
                  date: "2018 - 2020",
                  institution: "UFAPE",
                  type: "study",
                  title: "Bachelor of Computer Science",
                  description:
                    "Bla bla ... Worked with JavaScript, HTML, and CSS to create interactive user experiences. Participated in agile development processes.",
                },
              ].map((item, index) => (
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
                      {item.type === "job" ? (
                        <Briefcase className="h-5 w-5 text-primary-foreground" />
                      ) : (
                        <GraduationCap className="h-5 w-5 text-primary-foreground" />
                      )}
                    </div>

                    <div className="flex items-center mb-4 text-sm text-muted-foreground">
                      <Calendar className="h-4 w-4 mr-2" />
                      {item.date}
                    </div>

                    <h3 className="text-xl font-bold mb-1">{item.institution}</h3>
                    <h4 className="text-primary mb-4">{item.title}</h4>
                    <p className="text-muted-foreground">{item.description}</p>
                  </div>
                </motion.div>
              ))}
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
                My Work
              </Badge>
              <h2 className="text-3xl md:text-5xl font-bold mb-6">Featured Projects</h2>
              <p className="text-muted-foreground text-lg">
                A collection of my most recent and notable work. Each project represents a unique challenge and
                solution.
              </p>
            </motion.div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {(
                [
                  {
                    title: "E-Commerce Platform",
                    description:
                      "A full-featured online store with cart functionality, payment processing, and inventory management.",
                    media: [{ type: "image", src: "/placeholder.svg", alt: "E-Commerce Dashboard" }],
                    tags: ["Next.js", "Stripe", "Tailwind CSS"],
                  },
                  {
                    title: "Task Management App",
                    description:
                      "A collaborative task management tool with real-time updates, drag-and-drop interface, and team features.",
                    media: [
                      { type: "image", src: "/placeholder.svg", alt: "Task Dashboard" },
                      { type: "video", src: "dQw4w9WgXcQ", title: "Task Management Demo" },
                      { type: "image", src: "/placeholder.svg", alt: "Team Collaboration" },
                    ],
                    tags: ["React", "Firebase", "TypeScript"],
                  },
                  {
                    title: "Finance Dashboard",
                    description:
                      "An analytics dashboard for financial data visualization with interactive charts and reports.",
                    media: [
                      { type: "image", src: "/placeholder.svg", alt: "Finance Charts" },
                      { type: "video", src: "dQw4w9WgXcQ", title: "Dashboard Overview" },
                    ],
                    tags: ["Vue.js", "D3.js", "Node.js"],
                  },
                  {
                    title: "Social Media Platform",
                    description: "A community platform with user profiles, content sharing, and real-time messaging.",
                    media: [
                      { type: "image", src: "/placeholder.svg", alt: "Social Feed" },
                      { type: "image", src: "/placeholder.svg", alt: "User Profile" },
                      { type: "video", src: "dQw4w9WgXcQ", title: "Platform Demo" },
                    ],
                    tags: ["React", "GraphQL", "MongoDB"],
                  },
                  {
                    title: "Fitness Tracker",
                    description: "A mobile-first application for tracking workouts, nutrition, and fitness goals.",
                    media: [
                      { type: "video", src: "dQw4w9WgXcQ", title: "Fitness App Demo" },
                      { type: "image", src: "/placeholder.svg", alt: "Workout Tracking" },
                    ],
                    tags: ["React Native", "Redux", "Express"],
                  },
                  {
                    title: "AI Content Generator",
                    description:
                      "A tool that uses AI to generate marketing content, blog posts, and social media updates.",
                    media: [
                      { type: "image", src: "/placeholder.svg", alt: "AI Interface" },
                      { type: "video", src: "dQw4w9WgXcQ", title: "AI Generator Demo" },
                      { type: "image", src: "/placeholder.svg", alt: "Generated Content" },
                    ],
                    tags: ["Python", "TensorFlow", "Next.js"],
                  },
                ] as Project[]
              ).map((project, index) => (
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
                        {project.tags.map((tag, tagIndex) => (
                          <Badge key={tagIndex} variant="secondary" className="bg-muted text-muted-foreground">
                            {tag}
                          </Badge>
                        ))}
                      </div>
                    </CardHeader>

                    <CardContent>
                      <CardDescription className="text-foreground">{project.description}</CardDescription>
                    </CardContent>

                    <CardFooter className="flex justify-between">
                      <Button variant="outline" size="sm">
                        <ExternalLink className="h-4 w-4 mr-2" />
                        View Live
                      </Button>
                      <Button variant="outline" size="sm">
                        <Github className="h-4 w-4 mr-2" />
                        View Code
                      </Button>
                    </CardFooter>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      </main>

      <footer className="bg-background border-t border-border py-12">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-6 md:mb-0">
              <div className="text-xl font-bold">
                <span className="text-primary">Alex</span>Johnson
              </div>
              <ExternalLinkAnchor
                href="mailto:manoel0gustavo@gmail.com"
                className="text-muted-foreground hover:text-primary hover:underline transition-colors"
              >
                manoel0gustavo@gmail.com
              </ExternalLinkAnchor>
            </div>

            <div className="flex space-x-6">
              <ExternalLinkAnchor
                href="https://github.com/manoel0gustavo"
                className="text-muted-foreground hover:text-primary transition-colors"
              >
                <span className="sr-only">GitHub</span>
                <Github className="h-6 w-6" />
              </ExternalLinkAnchor>
              <ExternalLinkAnchor
                href="https://www.linkedin.com/in/manoel0gustavo/"
                className="text-muted-foreground hover:text-primary transition-colors"
              >
                <span className="sr-only">LinkedIn</span>
                <Linkedin className="h-6 w-6" />
              </ExternalLinkAnchor>
            </div>
          </div>

          <div className="border-t border-border mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
            <p className="text-muted-foreground text-sm mx-auto">
              © {new Date().getFullYear()} Alex Johnson. All rights reserved.
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
        className="fixed cursor-pointer bottom-8 right-8 z-50 bg-primary text-primary-foreground p-3 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110"
        aria-label="Back to top"
      >
        <ArrowUp className="h-5 w-5" />
      </motion.button>
    </div>
  );
}
