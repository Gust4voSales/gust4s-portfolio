"use client";

import { useParams, usePathname } from "next/navigation";
import { Globe } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const languageNames = {
  en: { name: "English", flag: "🇺🇸" },
  "pt-BR": { name: "Português", flag: "🇧🇷" },
};

export function LanguageSwitcher() {
  const params = useParams();
  const pathname = usePathname();
  const currentLng = params?.lng as string;

  const getLocalizedPath = (newLng: string) => {
    return `/${newLng}${pathname.replace(`/${currentLng}`, "")}`;
  };

  const handleLanguageChange = (newLng: string) => {
    const path = getLocalizedPath(newLng);
    window.location.href = path; // Use window.location for a full page reload
  };

  const currentLanguage = languageNames[currentLng as keyof typeof languageNames];

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="sm" className="h-9 px-3 flex items-center justify-center">
          <Globe className="h-4 w-4" />
          <span>{currentLanguage?.flag}</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="space-y-1">
        {Object.entries(languageNames).map(([code, { name, flag }]) => (
          <DropdownMenuItem
            key={code}
            onClick={() => handleLanguageChange(code)}
            className={`cursor-pointer w-full ${currentLng === code ? "bg-accent text-accent-foreground" : ""}`}
          >
            <span className="mr-2">{flag}</span>
            {name}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
