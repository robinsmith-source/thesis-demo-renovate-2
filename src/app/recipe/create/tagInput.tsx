import { Chip, Input } from "@nextui-org/react";
import React, { useState } from "react";
import { useFieldArray, useFormContext } from "react-hook-form";

export default function TagInput() {
  const methods = useFormContext();

  const { fields, append, remove } = useFieldArray({
    control: methods.control,
    name: "tags",
  });
  const fieldState = methods.getFieldState("tags");

  const [inputValue, setInputValue] = useState<string>("");
  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
  };
  const handleInputKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter" || event.key === " " || event.key === ",") {
      event.preventDefault();
      addTag();
    }
  };

  const addTag = async () => {
    if (inputValue.trim() !== "") {
      append(inputValue.trim());
      await methods.trigger("tags");
      setInputValue("");
    }
  };

  const handleClose = (tagToRemove: number) => {
    remove(tagToRemove);
  };

  console.log(fieldState);
  return (
    <>
      <Input
        type="text"
        label="Tags"
        value={inputValue}
        onChange={handleInputChange}
        onKeyDown={handleInputKeyDown}
        isInvalid={!!fieldState?.invalid}
        errorMessage={fieldState?.error?.message}
        variant="bordered"
      />
      <div className="flex gap-2">
        {fields.map((field, index) => (
          <Chip
            key={field.id}
            onClose={() => handleClose(index)}
            color="secondary"
            variant="faded"
            {...methods.register(`tags.${index}`)}
          >
            {methods.getValues(`tags.${index}`)}
          </Chip>
        ))}
      </div>
    </>
  );
}
