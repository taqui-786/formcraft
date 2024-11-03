"use client";

import { motion } from "framer-motion";
import {
  ShieldCheck,
  Sparkles,
  Code2,
  PenTool,
  Zap,
  FileCode,
} from "lucide-react";

const features = [
  {
    icon: ShieldCheck,
    title: "Type-Safe Forms",
    description:
      "Built-in TypeScript support with full type inference and autocompletion.",
  },
  {
    icon: Sparkles,
    title: "Zod Validation",
    description:
      "Powerful schema validation with custom error messages and complex rules.",
  },
  {
    icon: Code2,
    title: "React Hook Form",
    description:
      "Efficient form handling with built-in validation and performance optimization.",
  },
  {
    icon: PenTool,
    title: "Visual Builder",
    description:
      "Drag-and-drop interface to design forms with real-time preview.",
  },
  {
    icon: Zap,
    title: "Instant Deploy",
    description:
      "Copy and paste generated code directly into your React or Next.js app.",
  },
  {
    icon: FileCode,
    title: "Custom Components",
    description:
      "Extend and customize form components to match your design system.",
  },
];

export function Features() {
  return (
    <section className="py-24 bg-muted/50">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl font-bold mb-4">
            Everything You Need to Build Forms
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            FormCraft combines the best tools and practices to help you create
            forms that are both powerful and easy to maintain.
          </p>
        </motion.div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="p-6 rounded-lg bg-card"
            >
              <feature.icon className="w-12 h-12 text-primary mb-4" />
              <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
              <p className="text-muted-foreground">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}