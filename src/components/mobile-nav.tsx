"use client";

import { motion } from "framer-motion";
import { Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger, SheetClose } from "@/components/ui/sheet";
import { useT } from "@/app/i18n/client";
import { PortfolioTitle } from "./portfolio-title";

interface NavigationItem {
  id: string;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
}

interface MobileNavProps {
  activeSection: string;
  scrollToSection: (sectionId: string) => void;
  navigationItems: NavigationItem[];
}

export function MobileNav({ activeSection, scrollToSection, navigationItems }: MobileNavProps) {
  const { t } = useT("translation");

  const handleNavClick = (sectionId: string) => {
    scrollToSection(sectionId);
  };

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline" size="icon" className="md:hidden ml-4">
          <Menu className="h-5 w-5" />
          <span className="sr-only">{t("mobile.openNavigation")}</span>
        </Button>
      </SheetTrigger>
      <SheetContent side="right" className="w-[300px] sm:w-[400px]">
        <SheetHeader className="border-b border-border pb-4">
          <SheetTitle className="text-left">
            <PortfolioTitle asLink={false} />
          </SheetTitle>
        </SheetHeader>

        <div className="flex flex-col gap-4 py-3">
          {/* Navigation Links */}
          <nav className="flex flex-col gap-2">
            {navigationItems.map((item, index) => {
              const Icon = item.icon;
              const isActive = activeSection === item.id;

              return (
                <SheetClose asChild key={item.id}>
                  <motion.button
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.1 }}
                    onClick={() => handleNavClick(item.id)}
                    className={`cursor-pointer flex items-center gap-3 px-4 py-3 rounded-lg text-left transition-all duration-200 ${
                      isActive
                        ? "bg-primary/10 text-primary border border-primary/20"
                        : "text-muted-foreground hover:text-foreground hover:bg-primary/10 active:text-foreground active:bg-primary/10"
                    }`}
                  >
                    <Icon className="h-5 w-5" />
                    <span className="font-medium">{item.label}</span>
                  </motion.button>
                </SheetClose>
              );
            })}
          </nav>
        </div>
      </SheetContent>
    </Sheet>
  );
}
