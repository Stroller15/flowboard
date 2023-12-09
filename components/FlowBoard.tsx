"use client";

import PlusIcon from "@/assets/PlusIcon";
import { useMemo, useState } from "react";
import { Column, Id } from "@/types";
import ColumnContainer from "./ColumnContainer";
import { DndContext, DragOverlay, DragStartEvent } from "@dnd-kit/core";
import { SortableContext } from "@dnd-kit/sortable";
import { createPortal } from "react-dom";

const FlowBoard = () => {
  const [columns, setColumns] = useState<Column[]>([]);
  const columnsId = useMemo(() => columns.map((col) => col.id), [columns]);
  const [activeColumn, setActiveColumn] = useState<Column | null>(null);

  console.log(columns);

  // Generated random id
  const generateId = () => {
    return Math.floor(Math.random() * 1001);
  };

  // made function for adding a new column

  const createNewColumn = () => {
    const columnToAdd: Column = {
      id: generateId(),
      title: `Column ${columns.length + 1}`,
    };

    setColumns([...columns, columnToAdd]);
  };

  // delete column

  const deleteColumn = (id: Id) => {
    const filterColumn = columns.filter((col) => col.id !== id);
    setColumns(filterColumn);
  };

  // onDragStart function

  function onDragStart(event: DragStartEvent) {
    console.log("Drag start", event);
    if (event.active.data.current?.type === "Column") {
      setActiveColumn(event.active.data.current.column);
      return;
    }
  }

  return (
    <div
      className="
    m-auto
    flex
    min-h-screen
    w-full
    items-center
    overflow-x-auto
    overflow-y-hidden
    px-[40px]
    "
    >
      <DndContext onDragStart={onDragStart}>
        <div className="flex gap-4 m-auto">
          {/* render colums here */}
          <div className="flex gap-2">
            <SortableContext items={columnsId}>
              {columns.map((col) => (
                <div>
                  <ColumnContainer
                    key={col.id}
                    column={col}
                    deleteColumn={deleteColumn}
                  />
                </div>
              ))}
            </SortableContext>
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
        "
          >
            <div className="w-6 h-6">
              <PlusIcon />
            </div>
            Add Column
          </button>
        </div>
        {createPortal(
          <DragOverlay>
            {activeColumn && (
              <ColumnContainer
                column={activeColumn}
                deleteColumn={deleteColumn}
              />
            )}
          </DragOverlay>,
          document.body
        )}
      </DndContext>
    </div>
  );
};

export default FlowBoard;
