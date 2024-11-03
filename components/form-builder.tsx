"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "./ui/button";
import { Card } from "./ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { FormFieldEditor } from "./form-field-editor";
import { FormPreview } from "./form-preview";
import { FormCodeGenerator } from "./form-code-generator";
import { useToast } from "@/hooks/use-toast";
import { FormField } from "@/types/form-builder";

export function FormBuilder() {
  const [fields, setFields] = useState<FormField[]>([]);
  const { toast } = useToast();

  const addField = (type: string) => {
    const newField: FormField = {
      id: `field-${Date.now()}`,
      type,
      label: `New ${type} field`,
      name: `field${fields.length + 1}`,
      required: false,
      validation: {
        required: "This field is required",
      },
    };
    setFields([...fields, newField]);
  };

  const updateField = (id: string, updates: Partial<FormField>) => {
    setFields(fields.map((field) => 
      field.id === id ? { ...field, ...updates } : field
    ));
  };

  const deleteField = (id: string) => {
    setFields(fields.filter((field) => field.id !== id));
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="grid grid-cols-1 lg:grid-cols-2 gap-8"
      >
        <div>
          <Card className="p-6">
            <h2 className="text-2xl font-bold mb-6">Form Builder</h2>
            <div className="space-y-4">
              <div className="flex flex-wrap gap-2">
                <Button
                  variant="outline"
                  onClick={() => addField("text")}
                >
                  Add Text Field
                </Button>
                <Button
                  variant="outline"
                  onClick={() => addField("email")}
                >
                  Add Email Field
                </Button>
                <Button
                  variant="outline"
                  onClick={() => addField("password")}
                >
                  Add Password Field
                </Button>
                <Button
                  variant="outline"
                  onClick={() => addField("number")}
                >
                  Add Number Field
                </Button>
              </div>
              <div className="space-y-4">
                {fields.map((field) => (
                  <FormFieldEditor
                    key={field.id}
                    field={field}
                    onUpdate={(updates) => updateField(field.id, updates)}
                    onDelete={() => deleteField(field.id)}
                  />
                ))}
              </div>
            </div>
          </Card>
        </div>

        <div>
          <Tabs defaultValue="preview">
            <TabsList className="mb-4">
              <TabsTrigger value="preview">Preview</TabsTrigger>
              <TabsTrigger value="code">Code</TabsTrigger>
            </TabsList>
            <TabsContent value="preview">
              <Card className="p-6">
                <FormPreview fields={fields} />
              </Card>
            </TabsContent>
            <TabsContent value="code">
              <Card className="p-6">
                <FormCodeGenerator fields={fields} />
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </motion.div>
    </div>
  );
}