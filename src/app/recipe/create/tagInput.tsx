import { Chip, Input } from "@nextui-org/react";
import { useState } from "react";
import { Control, useFieldArray, UseFormRegister } from "react-hook-form";
import { Recipe } from "@prisma/client";

interface TagInputProps {
  control: Control<Recipe>;
  register: UseFormRegister<Recipe>; // Update with the actual type if needed
}
export default function TagInput({ control, register }: TagInputProps) {
  const { fields, append, remove } = useFieldArray({
    control,
    name: "tags", // This should match the name used in the form
  });

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

  const addTag = () => {
    if (inputValue.trim() !== "") {
      append({ tag: inputValue.trim() });
      setInputValue("");
    }
  };

  const handleClose = (tagToRemove: number) => {
    remove(tagToRemove);
  };

  return (
    <>
      <Input
        type="text"
        label="Tags"
        value={inputValue}
        onChange={handleInputChange}
        onKeyDown={handleInputKeyDown}
      />
      <div className="flex gap-2">
        {fields.map((field, index) => (
          <Chip
            key={index}
            onClose={() => handleClose(index)}
            color="secondary"
            variant="faded"
            {...register(`tags.${index}`)}
          >
            {field.tag}
          </Chip>
        ))}
      </div>
    </>
  );
}
