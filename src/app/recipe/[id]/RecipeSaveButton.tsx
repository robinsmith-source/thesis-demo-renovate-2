"use client";

import { Button } from "@nextui-org/react";
import { revalidatePath } from "next/cache";
import { useState } from "react";
import toast from "react-hot-toast";
import { api } from "~/trpc/react";

export default function RecipeSaveButton({
  recipeId,
  userId,
  isSaved,
}: {
  recipeId: string;
  userId: string;
  isSaved: boolean;
}) {
  const [savedStatus, setSavedStatus] = useState(isSaved);
  const [isSaving, setIsSaving] = useState(false);

  const saveMutation = api.recipe.save.useMutation({
    onSuccess: () => {
      setSavedStatus(true);
      setIsSaving(false);
      revalidatePath(`/user/${userId}/saved`);
    },
    onError: () => {
      toast.error("Failed to save recipe");
      setIsSaving(false);
    },
  });

  const unsaveMutation = api.recipe.unsave.useMutation({
    onSuccess: () => {
      setSavedStatus(false);
      setIsSaving(false);
      revalidatePath(`/user/${userId}/saved`);
    },
    onError: () => {
      toast.error("Failed to unsave recipe");
      setIsSaving(false);
    },
  });

  const onPress = () => {
    setIsSaving(true);
    if (savedStatus) {
      unsaveMutation.mutate({
        recipeId,
      });
    } else {
      saveMutation.mutate({
        recipeId,
      });
    }
  };

  return (
    <div className="flex justify-center">
      <Button onPress={onPress} isDisabled={isSaving}>
        {savedStatus ? "Unsave" : "Save"}
      </Button>
    </div>
  );
}
