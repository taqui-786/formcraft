"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Button } from "./ui/button";
import { ModeToggle } from "./mode-toggle";
import { Wand2 } from "lucide-react";

export function Navbar() {
  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className="fixed w-full z-50 top-0 px-4 lg:px-8 py-4 bg-background/80 backdrop-blur-sm border-b"
    >
      <div className="container mx-auto flex items-center justify-between">
        <Link href="/" className="flex items-center space-x-2">
          <Wand2 className="w-6 h-6" />
          <span className="font-bold text-xl">FormCraft</span>
        </Link>
        <div className="flex items-center space-x-4">
          <Link href="/create">
            <Button variant="default">Create Form</Button>
          </Link>
          <ModeToggle />
        </div>
      </div>
    </motion.nav>
  );
}