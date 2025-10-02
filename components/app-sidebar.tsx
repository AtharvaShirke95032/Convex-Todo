import * as React from "react"
import { Plus } from "lucide-react"

import { DatePicker } from "@/components/date-picker"
import { NavUser } from "@/components/nav-user"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
  SidebarSeparator,
} from "@/components/ui/sidebar"
import { Cal } from "./calendars"

// This is sample data.


interface AppSidebarProps extends React.ComponentProps<typeof Sidebar> {
  selectedDate: Date | undefined
  setSelectedDate: (date: Date | undefined) => void
}

export function AppSidebar({selectedDate, setSelectedDate, ...props }: AppSidebarProps){
  return (
    <Sidebar {...props}>
      <SidebarHeader className="border-sidebar-border h-16 border-b">
        <NavUser />
      </SidebarHeader>
      <SidebarContent className="flex items-center">
      
        <SidebarSeparator className="mx-0" />
        <Cal date={selectedDate} setDate={setSelectedDate}/>
      </SidebarContent>
      <SidebarFooter>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton>
              <Plus />
              <span>New Calendar</span>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  )
}
