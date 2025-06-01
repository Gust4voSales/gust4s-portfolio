"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { ArrowDown, ExternalLink, Github, Mail, FileText, Calendar, Briefcase, GraduationCap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ThemeSwitch } from "@/components/theme-switch";
import Image from "next/image";
import { MediaCarousel, MediaItem } from "@/components/media-carousel";

interface Project {
  title: string;
  description: string;
  media: MediaItem[];
  tags: string[];
}

export default function Portfolio() {
  const [activeSection, setActiveSection] = useState("home");

  useEffect(() => {
    const handleScroll = () => {
      const sections = document.querySelectorAll("section");
      const scrollPosition = window.scrollY + 100;

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
              {["home", "experience", "projects", "contact"].map((section) => (
                <li key={section}>
                  <button
                    onClick={() => scrollToSection(section)}
                    className={`text-sm font-medium capitalize transition-colors hover:text-primary ${
                      activeSection === section ? "text-primary" : "text-muted-foreground"
                    }`}
                  >
                    {section}
                  </button>
                </li>
              ))}
            </ul>
            <div className="flex items-center">
              <Button variant="outline" size="sm" className="hidden md:flex">
                Resume <FileText className="ml-2 h-4 w-4" />
              </Button>
              <ThemeSwitch />
              <Button variant="outline" size="icon" className="md:hidden ml-4">
                <span className="sr-only">Menu</span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="h-5 w-5"
                >
                  <line x1="4" x2="20" y1="12" y2="12" />
                  <line x1="4" x2="20" y1="6" y2="6" />
                  <line x1="4" x2="20" y1="18" y2="18" />
                </svg>
              </Button>
            </div>
          </nav>
        </div>
      </header>

      <main className="pt-16">
        {/* Welcome Section */}
        <section id="home" className="min-h-screen flex items-center relative overflow-hidden">
          <div className="absolute inset-0 z-0">
            <div className="absolute top-20 right-[10%] w-72 h-72 bg-primary/20 rounded-full filter blur-3xl"></div>
            <div className="absolute bottom-20 left-[15%] w-96 h-96 bg-secondary/20 rounded-full filter blur-3xl"></div>
          </div>

          <div className="container mx-auto px-4 py-20 z-10 relative">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="space-y-6"
              >
                <Badge variant="outline" className="px-4 py-1 text-sm border-primary/50 bg-primary/5">
                  Full-Stack Developer
                </Badge>
                <h1 className="text-4xl md:text-6xl font-bold tracking-tight">
                  Hi, I'm <span className="text-primary">Alex Johnson</span>
                </h1>
                <p className="text-xl text-muted-foreground max-w-lg">
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
                <div className="relative w-full aspect-square max-w-[400px] max-h-[400px] mx-auto flex justify-center items-center">
                  <Image
                    src="/me.jpg"
                    alt="Gustavo Sales"
                    width={400}
                    height={400}
                    className="rounded-full object-cover max-w-[400px] max-h-[400px] border-4 border-foreground dark:border-border"
                    priority
                  />
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.5, duration: 1 }}
                className="absolute bottom-10 left-1/2 transform -translate-x-1/2 cursor-pointer"
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
                A timeline of my professional journey and the skills I've developed along the way.
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
                    media: [
                      { type: "image", src: "/placeholder.svg", alt: "E-Commerce Dashboard" },
                      { type: "video", src: "dQw4w9WgXcQ", title: "E-Commerce Demo" },
                      { type: "image", src: "/placeholder.svg", alt: "Product Page" },
                    ],
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

        {/* Contact Section */}
        <section id="contact" className="py-20 relative">
          <div className="absolute inset-0 z-0">
            <div className="absolute top-1/4 right-[10%] w-64 h-64 bg-primary/10 rounded-full filter blur-3xl"></div>
            <div className="absolute bottom-1/3 left-[15%] w-72 h-72 bg-secondary/10 rounded-full filter blur-3xl"></div>
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
                Get In Touch
              </Badge>
              <h2 className="text-3xl md:text-5xl font-bold mb-6">Let's Work Together</h2>
              <p className="text-muted-foreground text-lg">
                Have a project in mind or just want to chat? Feel free to reach out. I'm always open to new
                opportunities and collaborations.
              </p>
            </motion.div>

            <div className="grid md:grid-cols-2 gap-12 max-w-4xl mx-auto">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="space-y-6"
              >
                <h3 className="text-2xl font-bold">Contact Information</h3>
                <p className="text-muted-foreground">
                  Feel free to reach out through any of these channels. I'm typically able to respond within 24 hours.
                </p>

                <div className="space-y-4 pt-4">
                  <div className="flex items-center">
                    <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center mr-4">
                      <Mail className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Email</p>
                      <p className="font-medium">alex.johnson@example.com</p>
                    </div>
                  </div>

                  <div className="flex items-center">
                    <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center mr-4">
                      <Github className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">GitHub</p>
                      <p className="font-medium">github.com/alexjohnson</p>
                    </div>
                  </div>

                  <div className="flex items-center">
                    <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center mr-4">
                      <svg
                        className="h-5 w-5 text-primary"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                      </svg>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">LinkedIn</p>
                      <p className="font-medium">linkedin.com/in/alexjohnson</p>
                    </div>
                  </div>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >
                <form className="space-y-6">
                  <div className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <label htmlFor="name" className="text-sm font-medium">
                          Name
                        </label>
                        <input
                          id="name"
                          className="w-full px-4 py-3 rounded-lg border border-border bg-surface/50 text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
                          placeholder="Your name"
                        />
                      </div>
                      <div className="space-y-2">
                        <label htmlFor="email" className="text-sm font-medium">
                          Email
                        </label>
                        <input
                          id="email"
                          type="email"
                          className="w-full px-4 py-3 rounded-lg border border-border bg-surface/50 text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
                          placeholder="Your email"
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <label htmlFor="subject" className="text-sm font-medium">
                        Subject
                      </label>
                      <input
                        id="subject"
                        className="w-full px-4 py-3 rounded-lg border border-border bg-surface/50 text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
                        placeholder="Subject"
                      />
                    </div>

                    <div className="space-y-2">
                      <label htmlFor="message" className="text-sm font-medium">
                        Message
                      </label>
                      <textarea
                        id="message"
                        rows={5}
                        className="w-full px-4 py-3 rounded-lg border border-border bg-surface/50 text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
                        placeholder="Your message"
                      ></textarea>
                    </div>
                  </div>

                  <Button className="w-full" size="lg">
                    Send Message
                  </Button>
                </form>
              </motion.div>
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
              <p className="text-muted-foreground mt-2">Full-Stack Developer</p>
            </div>

            <div className="flex space-x-6">
              <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                <span className="sr-only">GitHub</span>
                <Github className="h-6 w-6" />
              </a>
              <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                <span className="sr-only">LinkedIn</span>
                <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                </svg>
              </a>
              <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                <span className="sr-only">Twitter</span>
                <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z" />
                </svg>
              </a>
            </div>
          </div>

          <div className="border-t border-border mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
            <p className="text-muted-foreground text-sm">
              © {new Date().getFullYear()} Alex Johnson. All rights reserved.
            </p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <a href="#" className="text-muted-foreground hover:text-gray-400 text-sm">
                Privacy Policy
              </a>
              <a href="#" className="text-muted-foreground hover:text-gray-400 text-sm">
                Terms of Service
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
