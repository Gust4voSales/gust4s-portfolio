"use client";

import { motion } from "framer-motion";
import { Home } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ThemeSwitch } from "@/components/theme-switch";
import { PortfolioTitle } from "@/components/portfolio-title";
import Link from "next/link";

const translations = {
  en: {
    badge: "Error 404",
    title: "404",
    heading: "Page Not Found",
    goHome: "Go Home",
  },
  "pt-BR": {
    badge: "Erro 404",
    title: "404",
    heading: "Página Não Encontrada",
    goHome: "Ir para Início",
  },
};

export default function NotFound() {
  // Since we can't reliably get the language from the URL in the root not-found page,
  // we'll default to English
  const lng = "en";
  const t = translations[lng];

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
            <ThemeSwitch />
          </nav>
        </div>
      </header>

      <main className="pt-16">
        <section className="min-h-screen flex items-center justify-center relative overflow-hidden">
          {/* Background decorative elements */}
          <div className="absolute inset-0 z-0">
            <div className="absolute top-20 right-[10%] w-72 h-72 bg-primary/20 rounded-full filter blur-3xl"></div>
            <div className="absolute bottom-20 left-[15%] w-96 h-96 bg-secondary/20 rounded-full filter blur-3xl"></div>
          </div>

          <div className="container mx-auto px-4 py-20 z-10 relative">
            <div className="max-w-2xl mx-auto text-center">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="space-y-8"
              >
                <Badge variant="outline" className="px-4 py-1 text-sm border-primary/50 bg-primary/5">
                  {t.badge}
                </Badge>

                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.8, delay: 0.2 }}
                  className="space-y-4"
                >
                  <h1 className="text-8xl md:text-9xl font-bold text-primary/80 tracking-tight">{t.title}</h1>
                  <h2 className="text-3xl md:text-4xl font-bold tracking-tight">{t.heading}</h2>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.6 }}
                  className="flex flex-col sm:flex-row gap-4 justify-center pt-8"
                >
                  <Button asChild size="lg" className="group">
                    <Link href={`/${lng}`}>
                      <Home className="mr-2 h-5 w-5 group-hover:scale-110 transition-transform" />
                      {t.goHome}
                    </Link>
                  </Button>
                </motion.div>
              </motion.div>

              {/* Decorative animated element */}
              <motion.div
                initial={{ opacity: 0, rotate: 0 }}
                animate={{ opacity: 1, rotate: 360 }}
                transition={{
                  duration: 20,
                  repeat: Infinity,
                  ease: "linear",
                  delay: 1,
                }}
                className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 border border-primary/10 rounded-full -z-10"
              ></motion.div>

              <motion.div
                initial={{ opacity: 0, rotate: 0 }}
                animate={{ opacity: 1, rotate: -360 }}
                transition={{
                  duration: 30,
                  repeat: Infinity,
                  ease: "linear",
                  delay: 1.5,
                }}
                className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 border border-secondary/10 rounded-full -z-10"
              ></motion.div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
