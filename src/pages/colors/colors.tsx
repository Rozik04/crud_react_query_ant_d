import { Button, Modal, Table, type TableProps } from "antd";
import { UseGetColors } from "./service/query/useGetColors";
import { useToggle } from "../../hooks/useToggle";
import { ColorForm } from "./components/color-form";
import { UseDeleteColor } from "./service/mutation/useDeleteColor";
import { useQueryClient } from "@tanstack/react-query";
import React from "react";

export interface dataSourse  {
  name : string,
  id ?: string,
  createAt?: string
}

export const Colors = () => {
  const { data, isLoading, isError } = UseGetColors();
  console.log(data);
  const { isOpen, open, close } = useToggle();
  const { isOpen: isOpen2, open: open2, close:close2 } = useToggle();

  const {mutate} = UseDeleteColor()
  const client = useQueryClient()

  const [initialData, setInitialData] = React.useState<
      dataSourse | undefined
    >();

 const handleDelete = (id:string) => {
  let isConfirm = window.confirm("Do you want to delete?")
  if(isConfirm) mutate(id,{onSuccess:()=> client.invalidateQueries({queryKey:["color"]})})}


const handleUpdate = (el : dataSourse) => {
  setInitialData(el)
}

  if (isLoading) return <p>Loading...</p>;
  if (isError) return <p>Error loading data</p>;

  const dataSource : dataSourse[]= data?.data?.map((item: any) => ({
    id: item.id,
    name: item.name,
    createdAt: item.createdAt?.slice(0, 10),
  }));

  const columns: TableProps<dataSourse>["columns"] = [
    {
      title: "CreatedAt",
      dataIndex: "createdAt",
      key: "createdAt",
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
      {
        title: "Action",
        key:'action',
        render: (record) => (
          <div>
            <Button onClick={() => record.id && handleDelete(record.id)}>
              Delete
            </Button>
            <Button onClick={() => record.id && handleUpdate(record)}>
              Edit
            </Button>
          </div>
        )
      },]

  return (
    <div>
      <Button onClick={open} type="primary">
        Create
      </Button>
      <Modal footer={false} onCancel={close} open={isOpen}>
        <ColorForm closeModal={close} />
      </Modal>
      <Modal footer={false} onCancel={close2} open={isOpen2}>
        <ColorForm initialData={initialData} closeModal={close2}/>
      </Modal>
      <Table<dataSourse> dataSource={dataSource} columns={columns}  rowKey={'id'}/>;
    </div>
  );
};



