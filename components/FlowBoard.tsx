"use client"

import PlusIcon from "@/assets/PlusIcon"
import { useState } from "react";
import { Column, Id } from "@/types";
import ColumnContainer from "./ColumnContainer";

const FlowBoard = () => {
  const [columns, setColumns] = useState<Column[]>([]);

  console.log(columns);

  // Generated random id 
  const generateId = () => {
    return Math.floor(Math.random() * 1001);
  }

  // made function for adding a new column

  const createNewColumn = () => {
    const columnToAdd: Column = {
      id: generateId(),
      title: `Column ${columns.length + 1}`
    }

    setColumns([...columns, columnToAdd]);
  }

  // delete column

  const deleteColumn = (id: Id) => {
    const filterColumn = columns.filter((col) => col.id !== id);
    setColumns(filterColumn);
  }


  return (
    <div className="
    m-auto
    flex
    min-h-screen
    w-full
    items-center
    overflow-x-auto
    overflow-y-hidden
    px-[40px]
    ">
      <div className="flex gap-4 m-auto">
        {/* render colums here */}
        <div className="flex gap-2">
          {columns.map((column) => (
            <div><ColumnContainer key={column.id} column={column} deleteColumn={deleteColumn}/></div>
          ))}
        </div>
        <button
        onClick={() => createNewColumn()}
        
        className="
        h-[60px]
        w-[350px]
        min-w-[350px]
        cursor-pointer
        rounded-lg
        bg-buttonBackgroundColor
        p-4
        ring-amber-400
        hover:ring-2
        flex
        gap-2
        ">
          <div className="w-6 h-6">
          <PlusIcon/> 
          </div>
           
            Add Column
        </button>
        </div>
    </div>
  );


};

export default FlowBoard