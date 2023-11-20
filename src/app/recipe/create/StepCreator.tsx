import React from "react";
import { Controller, useFieldArray, useFormContext } from "react-hook-form";
import { Button, Input, Select, SelectItem, Textarea } from "@nextui-org/react";
import { RecipeStepType } from "@prisma/client";

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
          <Controller
            control={control}
            name={`steps.${index}.description`}
            render={({ fieldState }) => (
              <Textarea
                {...register(`steps.${index}.description`)}
                label="Description"
              />
            )}
          />

          <Controller
            control={control}
            name={`steps.${index}.duration`}
            render={({ fieldState }) => (
              <Input
                {...register(`steps.${index}.duration`)}
                label="Duration"
                type="number"
              />
            )}
          />

          <Controller
            control={control}
            name={`steps.${index}.stepType`}
            render={({ field, fieldState }) => (
              <Select
                isRequired
                label="StepType"
                description="Select step type"
                variant="bordered"
                {...register(`steps.${index}.stepType`, { required: true })}
                /* isInvalid={!!fieldState.error}
                                                                                errorMessage={fieldState.error?.message} */
                selectedKeys={[field.value]}
                defaultSelectedKeys={["PREP"]}
              >
                {["PREP", "COOK", "REST", "SEASON", "SERVE", "MIX"].map(
                  (stepType) => (
                    <SelectItem
                      key={stepType}
                      value={stepType as RecipeStepType}
                    >
                      {stepType as RecipeStepType}
                    </SelectItem>
                  ),
                )}
              </Select>
            )}
          />
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
