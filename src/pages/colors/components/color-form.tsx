import React, { useState } from "react";
import type { dataSourse } from "../colors";
import { useCreateColor } from "../service/mutation/useCreateColor";
import { Button, Input } from "antd";
import { useQueryClient } from "@tanstack/react-query";

interface Props {
  closeModal: () => void;
  defaultValue?: dataSourse;
}

export const ColorForm = ({ closeModal, defaultValue }: Props) => {
    const { mutate, isPending } = useCreateColor();
    const [name, setName] = useState(defaultValue?.name || "");
    const clinet = useQueryClient();


  const onFinish = (e: React.FormEvent) => {
    e.preventDefault()
    mutate(
      { name },
      {
        onSuccess: () => {
          clinet.invalidateQueries({ queryKey: ["color"] });
          setName("")
          closeModal();
        },
        onError: (error) => {
          console.error("Error:", error);
        },
      }
    );
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
