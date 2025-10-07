"use client";

import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@workspace/ui/components/sidebar";
import { CustomNavigation } from "@repo/types/";
import Link from "next/link";
import { usePathname } from "next/navigation";

export function NavMain({ items }: { items: CustomNavigation[] }) {
  const pathname = usePathname();
  const segment = pathname.split("/").filter(Boolean);

  return (
    <SidebarGroup>
      <SidebarGroupLabel>Dashboard</SidebarGroupLabel>
      <>
        {items.map((item) => (
          <SidebarMenuItem
            key={item.title}
            className={`${segment[segment.length - 1] === item.title.toLowerCase() ? "bg-sidebar-accent" : ""} rounded-sm mb-2`}
          >
            <SidebarMenuButton asChild tooltip={item.title}>
              <Link href={item.url}>
                <item.icon />
                <span>{item.title}</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        ))}
      </>
    </SidebarGroup>
  );
}
