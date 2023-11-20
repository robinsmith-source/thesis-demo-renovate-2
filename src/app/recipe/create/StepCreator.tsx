import React from "react";
import { useFieldArray, useFormContext } from "react-hook-form";
import { Input, Select, Button, SelectItem, Textarea } from "@nextui-org/react";
import type { RecipeStepType } from "@prisma/client";

const StepCreator: React.FC = () => {
  const { control, register } = useFormContext();

  const { fields, append, remove } = useFieldArray({
    control,
    name: "steps",
  });

  return (
    <>
      {fields.map((step, index) => (
        <div key={step.id}>
          <Textarea
            {...register(`steps.${index}.description`)}
            label="Description"
          />
          <Input
            {...register(`steps.${index}.duration`)}
            label="Duration"
            type="number"
          />
          <Select
            isRequired
            label="Step Type"
            variant="bordered"
            {...register(`steps.${index}.stepType`, { required: true })}
            selectedKeys={[step.value]}
          >
            {["PREP", "COOK", "REST", "SEASON", "SERVE", "MIX"].map(
              (difficulty) => (
                <SelectItem
                  key={difficulty}
                  value={difficulty as RecipeStepType}
                >
                  {difficulty}
                </SelectItem>
              ),
            )}
          </Select>
          <Button type="button" onClick={() => remove(index)}>
            Remove Step
          </Button>
        </div>
      ))}
      <Button
        type="button"
        onClick={() =>
          append({ description: "", duration: 0, stepType: "PREP" })
        }
      >
        Add Step
      </Button>
    </>
  );
};

export default StepCreator;
