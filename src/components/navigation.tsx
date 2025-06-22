"use client";

import { HeaderLogo } from "@/components/header-logo";
import { Button } from "@/components/ui/button";
import { Drawer, DrawerContent, DrawerTrigger } from "@/components/ui/drawer";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import { MenuIcon, XIcon } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { ThemeToggleButton } from "@/components/theme-toggle-button";

const navItems = [
  {
    title: "Home",
    link: "/",
  },
  {
    title: "About Us",
    link: "/about-us",
  },
  {
    title: "Submit Salary",
    link: "/submit-salary",
  },
  {
    title: "Updates",
    link: "/updates",
  },
];

const ResponsiveNavigation = () => {
  return (
    <NavigationMenu className="items-start justify-start max-w-full [&>*]:w-full">
      <NavigationMenuList className="flex-col items-start w-full sm:flex-row">
        {navItems.map((item) => (
          <NavigationMenuItem key={item.title} className="w-full">
            <NavigationMenuLink
              className={`${navigationMenuTriggerStyle()} w-full items-start sm:w-max`}
            >
              <Link href={item.link}>{item.title}</Link>
            </NavigationMenuLink>
          </NavigationMenuItem>
        ))}
        <NavigationMenuItem className="hidden sm:flex">
          <ThemeToggleButton />
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  );
};
export const Navigation = () => {
  const [drawerOpen, setDrawerOpen] = useState(false);
  return (
    <div>
      <div className="flex sm:hidden">
        <Drawer open={drawerOpen} direction="right">
          <DrawerTrigger asChild>
            <Button onClick={() => setDrawerOpen(!drawerOpen)}>
              <MenuIcon />
            </Button>
          </DrawerTrigger>
          <DrawerContent className="min-w-full">
            <div className="py-5 px-2">
              <div className="flex items-center justify-between">
                <HeaderLogo />
                <Button
                  onClick={() => setDrawerOpen(!drawerOpen)}
                  className="sm:hidden"
                >
                  <XIcon />
                </Button>
              </div>
            </div>
            <ResponsiveNavigation />
            <div className="flex py-5 px-2 justify-end">
              <ThemeToggleButton />
            </div>
          </DrawerContent>
        </Drawer>
      </div>
      {/* desktop navigation */}
      <div className="hidden sm:flex">
        <ResponsiveNavigation />
      </div>
    </div>
  );
};
