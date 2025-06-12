import React, { useState } from "react";
import type { dataSourse } from "../colors";
import { useCreateColor } from "../service/mutation/useCreateColor";
import { Button, Input } from "antd";
import { useQueryClient } from "@tanstack/react-query";
import { useUpdateColor } from "../service/mutation/useUpdateColor";

interface Props {
  closeModal: () => void;
  initialData?: dataSourse;
}

export const ColorForm = ({ closeModal, initialData }: Props) => {
    const { mutate, isPending } = useCreateColor();
const { mutate: mutateEdit} = useUpdateColor();
    const [name, setName] = useState(initialData?.name || "");
    const clinet = useQueryClient();

   React.useEffect(() => {
    setName(initialData?.name || "");
  },[initialData]);

const onFinish = (e: React.FormEvent) => {
  e.preventDefault();

  if (initialData?.id) {
    mutateEdit(
      { id: initialData.id, name },
      {
        onSuccess: () => {
          clinet.invalidateQueries({ queryKey: ["color"] });
          setName("");
          closeModal();
        },
        onError: (error) => {
          console.error("Update error:", error);
        },
      }
    );
  } else {
    mutate(
      { name },
      {
        onSuccess: () => {
          clinet.invalidateQueries({ queryKey: ["color"] });
          setName("");
          closeModal();
        },
        onError: (error) => {
          console.error("Create error:", error);
        },
      }
    );
  }
};


 return (
    <form onSubmit={onFinish} >
      <Input
        placeholder="Rang nomi"
        value={name}
        onChange={(e) => setName(e.target.value)}
        disabled={isPending}

      />
      <Button
        type="primary"
        htmlType="submit"
        loading={isPending}
        style={{ marginTop: "1rem" }}
      >
        Submit
      </Button>
    </form>
  );
};
