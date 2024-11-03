"use client";

import { motion } from "framer-motion";
import { Button } from "./ui/button";
import { ArrowRight, Wand2 } from "lucide-react";
import Link from "next/link";

export function Hero() {
  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0 bg-grid-white/[0.02] bg-grid-black/[0.02] dark:bg-grid-white/[0.02]" />
      <div className="relative container mx-auto px-4 pt-20 pb-12 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="max-w-4xl mx-auto"
        >
          <div className="inline-flex items-center justify-center px-4 py-1.5 mb-8 border rounded-full text-sm font-medium">
            <span className="text-muted-foreground">
              Introducing FormCraft Beta
            </span>
            <Wand2 className="w-4 h-4 ml-2" />
          </div>
          <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-8">
            Build Type-Safe Forms with{" "}
            <span className="text-primary">Zero Effort</span>
          </h1>
          <p className="text-xl text-muted-foreground mb-12 max-w-2xl mx-auto">
            Create production-ready forms with Zod validation, React Hook Form, and
            TypeScript. Design, customize, and deploy in minutes.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link href="/create">
              <Button size="lg" className="gap-2">
                Start Building
                <ArrowRight className="w-4 h-4" />
              </Button>
            </Link>
            <Button size="lg" variant="outline">
              View Examples
            </Button>
          </div>
        </motion.div>
      </div>
    </div>
  );
}