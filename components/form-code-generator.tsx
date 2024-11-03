"use client";

import { FormField } from "@/types/form-builder";
import { Button } from "./ui/button";
import { useToast } from "@/hooks/use-toast";
import { Copy } from "lucide-react";

interface FormCodeGeneratorProps {
  fields: FormField[];
}

export function FormCodeGenerator({ fields }: FormCodeGeneratorProps) {
  const { toast } = useToast();

  const generateZodSchema = () => {
    let schema = "import { z } from 'zod';\n\n";
    schema += "export const formSchema = z.object({\n";
    
    fields.forEach((field, index) => {
      let fieldSchema = "  " + field.name + ": z.string()";
      
      if (field.type === "email") {
        fieldSchema += ".email('Invalid email address')";
      } else if (field.type === "number") {
        fieldSchema += ".regex(/^\\d+$/, 'Must be a number')";
      }
      
      if (field.required) {
        fieldSchema += `.min(1, '${field.validation.required}')`;
      } else {
        fieldSchema += ".optional()";
      }
      
      fieldSchema += (index < fields.length - 1) ? "," : "";
      schema += fieldSchema + "\n";
    });
    
    schema += "});\n\n";
    schema += "export type FormData = z.infer<typeof formSchema>;";
    
    return schema;
  };

  const generateFormComponent = () => {
    return `import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { formSchema, type FormData } from './schema';

export function Form() {
  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
  });

  const onSubmit = (data: FormData) => {
    console.log(data);
  };

  return (
    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
${fields
  .map(
    (field) => `      <div className="space-y-2">
        <label
          htmlFor="${field.name}"
          className="block text-sm font-medium text-gray-700"
        >
          ${field.label}
        </label>
        <input
          id="${field.name}"
          type="${field.type}"
          {...form.register("${field.name}")}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
        />
        {form.formState.errors.${field.name} && (
          <p className="text-sm text-red-600">
            {form.formState.errors.${field.name}?.message}
          </p>
        )}
      </div>`
  )
  .join("\n")}
      <button
        type="submit"
        className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
      >
        Submit
      </button>
    </form>
  );
}`;
  };

  const copyCode = (code: string) => {
    navigator.clipboard.writeText(code);
    toast({
      title: "Copied to clipboard",
      description: "The code has been copied to your clipboard.",
    });
  };

  if (fields.length === 0) {
    return (
      <div className="text-center py-12 text-muted-foreground">
        Add some fields to generate code
      </div>
    );
  }

  const zodSchema = generateZodSchema();
  const formComponent = generateFormComponent();

  return (
    <div className="space-y-8">
      <div>
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold">Zod Schema</h3>
          <Button
            variant="outline"
            size="sm"
            onClick={() => copyCode(zodSchema)}
          >
            <Copy className="h-4 w-4 mr-2" />
            Copy
          </Button>
        </div>
        <pre className="p-4 rounded-lg bg-muted overflow-x-auto">
          <code>{zodSchema}</code>
        </pre>
      </div>

      <div>
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold">Form Component</h3>
          <Button
            variant="outline"
            size="sm"
            onClick={() => copyCode(formComponent)}
          >
            <Copy className="h-4 w-4 mr-2" />
            Copy
          </Button>
        </div>
        <pre className="p-4 rounded-lg bg-muted overflow-x-auto">
          <code>{formComponent}</code>
        </pre>
      </div>
    </div>
  );
}