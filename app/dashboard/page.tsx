"use client"
import { AppSidebar } from "@/components/app-sidebar"
import { ModeToggle } from "@/components/button-theme"
import { Greed } from "@/components/greed"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbList,
  BreadcrumbPage,
} from "@/components/ui/breadcrumb"
import { Separator } from "@/components/ui/separator"
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar"
import { useState } from "react"

export default function Page() {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date())
  return (
    <SidebarProvider>
      <AppSidebar selectedDate={selectedDate} setSelectedDate={setSelectedDate} />
      <SidebarInset>
        <header className="bg-primary-foreground z-50 sticky top-0 flex h-16 shrink-0 items-center gap-2 border-b px-4">
          <SidebarTrigger className="-ml-1" />
          <Separator
            orientation="vertical"
            className="mr-2 data-[orientation=vertical]:h-4"
          />
          <Breadcrumb className="w-full flex justify-between">
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbPage>
                  {selectedDate
                    ? selectedDate.toLocaleString("default", { month: "long", year: "numeric" })
                    : ""}
                    
                </BreadcrumbPage>
                
              </BreadcrumbItem>
            </BreadcrumbList>
              <ModeToggle/>

          </Breadcrumb>
        </header>
        <div className="p-4 flex justify-center items-center">
          <Greed selectedDate={selectedDate ?? new Date()} />

        </div>
      </SidebarInset>
    </SidebarProvider>
  )
}
