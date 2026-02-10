"use client";

import Image from "next/image";
import {
  adjectives,
  animals,
  colors,
  uniqueNamesGenerator
} from "unique-names-generator"
import { Poppins } from "next/font/google";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {  PlusIcon, FolderOpenIcon } from "lucide-react";
import { Kbd } from "@/components/ui/kbd";
import { ProjectList } from "./project-list";
import { useCreateProject } from "../hooks/use-projects";
import { useEffect, useState } from "react";
import { ProjectsCommandDialog } from "./projects-command-dialog";

const font = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const ProjectsView = () => {
  const createProject = useCreateProject();
  const[commandDialagoOpen,setCommandDialogOpen] = useState(false);

  useEffect(()=>{
    const handleKeyDown= (e: KeyboardEvent) =>{
      if(e.metaKey || e.ctrlKey ) {
        if(e.key === "k") {
          e.preventDefault();
          setCommandDialogOpen(true);
        }
      }
    }
    document.addEventListener("keydown",handleKeyDown);
    return()=> document.removeEventListener("keydown", handleKeyDown)
  },[]);

  return (
    <>
    <ProjectsCommandDialog
    open={commandDialagoOpen}
    onOpenChange={setCommandDialogOpen}
    />
    <div className="min-h-screen bg-sidebar flex flex-col items-center justify-center p-6 md:p-16">
      <div className="w-full max-w-2xl mx-auto flex flex-col gap-8">
        
        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="flex items-center gap-3 group/logo">
            <div className="bg-primary/10 p-2 rounded-xl">
               <Image src="/logo.svg" alt="logo" width={32} height={32} />
            </div>
            <h1 className={cn("text-4xl font-bold tracking-tight", font.className)}>
              Aiide
            </h1>
          </div>

          <div className="flex flex-col gap-2">
            <p className="text-sm text-muted-foreground font-medium">Quick Actions</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <ActionButton 
                icon={<PlusIcon className="size-4" />} 
                label="New Project" 
                shortcut="⌘J"
                onClick={()=>{
                   const projectName = uniqueNamesGenerator({
                     dictionaries: [adjectives,animals,colors],
                     separator: "-",
                     length: 3
                   })
                   createProject({
                     name: projectName
                   })
                  console.log("hi")
                }} 
              />
              <ActionButton 
                icon={<FolderOpenIcon className="size-4" />} 
                label="Import" 
                shortcut="⌘O" 
              />
            </div>
          </div>
        </div>
        

        {/* You can add a "Recent Projects" list or a Search bar here later */}
        <ProjectList onViewAll={()=>setCommandDialogOpen(true)}/>
      </div>
    </div>
    </>
  );
};

// Extracted Button Component for cleaner code
const ActionButton = ({ icon, label, shortcut, onClick}: { icon: React.ReactNode, label: string, shortcut: string, onClick?: ()=>void }) => (
  <Button
    onClick={onClick}
    variant="outline"
    className="h-auto w-full items-start justify-start p-4 bg-background hover:bg-accent/50 transition-all border flex flex-col gap-4 rounded-xl group"
  >
    <div className="flex items-center justify-between w-full">
      <div className="p-2 bg-secondary rounded-md group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
        {icon}
      </div>
      <Kbd className="bg-muted/50 border text-[10px] opacity-70">
        {shortcut}
      </Kbd>
    </div>
    <span className="text-sm font-medium">{label}</span>
  </Button>
);