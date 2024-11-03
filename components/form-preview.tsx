"use client";

import { FormField } from "@/types/form-builder";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { useToast } from "@/hooks/use-toast";

interface FormPreviewProps {
  fields: FormField[];
}

export function FormPreview({ fields }: FormPreviewProps) {
  const { toast } = useToast();

  // Dynamically generate Zod schema based on fields
  const generateSchema = () => {
    const shape: { [key: string]: z.ZodType<any, any> } = {};
    
    fields.forEach((field) => {
      let fieldSchema = z.string();
      
      if (field.type === "email") {
        fieldSchema = z.string().email("Invalid email address");
      } else if (field.type === "number") {
        fieldSchema = z.string().regex(/^\d+$/, "Must be a number");
      }
      
      if (field.required) {
        fieldSchema = fieldSchema.min(1, field.validation.required || "This field is required");
      } else {
        // @ts-ignore
        fieldSchema = fieldSchema.optional();
      }
      
      shape[field.name] = fieldSchema;
    });
    
    return z.object(shape);
  };

  const schema = generateSchema();
  type FormData = z.infer<typeof schema>;

  const form = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  const onSubmit = (data: FormData) => {
    toast({
      title: "Form Submitted",
      description: <pre className="mt-2 w-full rounded-md bg-slate-950 p-4">
        <code className="text-white">{JSON.stringify(data, null, 2)}</code>
      </pre>,
    });
  };

  if (fields.length === 0) {
    return (
      <div className="text-center py-12 text-muted-foreground">
        Add some fields to see the preview
      </div>
    );
  }

  return (
    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
      {fields.map((field) => (
        <div key={field.id} className="space-y-2">
          <Label htmlFor={field.name}>{field.label}</Label>
          <Input
            id={field.name}
            type={field.type}
            {...form.register(field.name)}
          />
          {form.formState.errors[field.name] && (
            <p className="text-sm text-destructive">
              {form.formState.errors[field.name]?.message?.toString()}
            </p>
          )}
        </div>
      ))}
      <Button type="submit">Submit</Button>
    </form>
  );
}