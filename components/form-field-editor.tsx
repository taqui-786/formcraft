"use client";

import { FormField } from "@/types/form-builder";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Switch } from "./ui/switch";
import { Trash2 } from "lucide-react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "./ui/card";

interface FormFieldEditorProps {
  field: FormField;
  onUpdate: (updates: Partial<FormField>) => void;
  onDelete: () => void;
}

export function FormFieldEditor({
  field,
  onUpdate,
  onDelete,
}: FormFieldEditorProps) {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">
          {field.type.charAt(0).toUpperCase() + field.type.slice(1)} Field
        </CardTitle>
        <Button
          variant="ghost"
          size="sm"
          onClick={onDelete}
          className="text-destructive"
        >
          <Trash2 className="h-4 w-4" />
        </Button>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor={`${field.id}-label`}>Label</Label>
          <Input
            id={`${field.id}-label`}
            value={field.label}
            onChange={(e) => onUpdate({ label: e.target.value })}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor={`${field.id}-name`}>Field Name</Label>
          <Input
            id={`${field.id}-name`}
            value={field.name}
            onChange={(e) => onUpdate({ name: e.target.value })}
          />
        </div>
        <div className="flex items-center space-x-2">
          <Switch
            id={`${field.id}-required`}
            checked={field.required}
            onCheckedChange={(checked) => {
              onUpdate({
                required: checked,
                validation: {
                  ...field.validation,
                  required: checked ? "This field is required" : undefined,
                },
              });
            }}
          />
          <Label htmlFor={`${field.id}-required`}>Required</Label>
        </div>
        {field.required && (
          <div className="space-y-2">
            <Label htmlFor={`${field.id}-error`}>Error Message</Label>
            <Input
              id={`${field.id}-error`}
              value={field.validation.required}
              onChange={(e) =>
                onUpdate({
                  validation: { ...field.validation, required: e.target.value },
                })
              }
            />
          </div>
        )}
      </CardContent>
    </Card>
  );
}