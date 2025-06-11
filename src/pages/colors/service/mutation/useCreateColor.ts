import { request } from "../../../../config/request";
import { useMutation } from "@tanstack/react-query";

type FieldType = {
  name : string,
  id ?: string,
  createAt?: string
};

export const useCreateColor= () => {
  return useMutation({
    mutationFn: (data: FieldType) =>
      request
        .post("/color", data)
        .then((res) => res.data)
        
  });
};
