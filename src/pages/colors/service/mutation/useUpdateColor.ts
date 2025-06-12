import { request } from "../../../../config/request";
import { useMutation } from "@tanstack/react-query";

export interface colorEditT {
  name: string;
  id?: string;
}

export const useUpdateColor = () => {
  return useMutation({
    mutationFn: (data: colorEditT) =>
      request
        .patch(`/color/${data.id}`, { name: data.name })
        .then((res) => res.data),
  });
};
