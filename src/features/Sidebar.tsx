import { ScrollArea } from "@radix-ui/react-scroll-area";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../lib/components/accordion";
import { NavItem } from "../lib/types";
import { NavLink } from "react-router-dom";
import { DarkModeToggle } from "./dark-mode";

interface SidebarProps {
  navItems: NavItem[];
}

export function Sidebar({ navItems }: SidebarProps) {
  return (
    <nav className="w-64 bg-gray-100 dark:bg-gray-800 h-full overflow-auto p-4 flex flex-col space-y-4">
      <NavLink
        to="/"
        className="cursor-pointer text-2xl font-bold flex justify-center py-2 text-gray-800 dark:text-gray-100"
      >
        frontendguides.io
      </NavLink>
      <div>Search</div>
      <DarkModeToggle />
      <ScrollArea className="h-[80vh]">
        <Accordion type="single" collapsible>
          {navItems.map((item) => (
            <AccordionItem key={item.title} value={item.title}>
              <AccordionTrigger className="text-gray-800 dark:text-gray-100">
                {item.title}
              </AccordionTrigger>
              {item.children && item.children.length > 0 && (
                <AccordionContent>
                  {item.children.map((child) => (
                    <div
                      className={`flex items-center justify-between p-2 rounded cursor-pointer hover:bg-gray-200 dark:hover:bg-gray-700`}
                    >
                      <NavLink
                        to={child.path}
                        className={({ isActive }) =>
                          `flex-1 text-sm font-medium ${
                            isActive
                              ? "text-blue-600 dark:text-blue-400"
                              : "text-gray-700 dark:text-gray-300"
                          }`
                        }
                      >
                        {child.title}
                      </NavLink>
                    </div>
                  ))}
                </AccordionContent>
              )}
            </AccordionItem>
          ))}
        </Accordion>
      </ScrollArea>
    </nav>
  );
}
