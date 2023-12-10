"use client";

import PlusIcon from "@/assets/PlusIcon";
import { useMemo, useState } from "react";
import { Column, Id } from "@/types";
import ColumnContainer from "./ColumnContainer";
import { DndContext, DragEndEvent, DragOverlay, DragStartEvent, PointerSensor, useSensor, useSensors } from "@dnd-kit/core";
import { SortableContext, arrayMove } from "@dnd-kit/sortable";
import { createPortal } from "react-dom";

const FlowBoard = () => {
  const [columns, setColumns] = useState<Column[]>([]);
  const columnsId = useMemo(() => columns.map((col) => col.id), [columns]);
  const [activeColumn, setActiveColumn] = useState<Column | null>(null);



  

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

  //UpdateColumn

  function updateColumn(id: Id, title: string) {
    const newColumn = columns.map((col) => {
      if(col.id !== id) return col;
      return {...col, title};
    });
    setColumns(newColumn);
  }

  // onDragStart function

  function onDragStart(event: DragStartEvent) {
    console.log("Drag start", event);
    if (event.active.data.current?.type === "Column") {
      setActiveColumn(event.active.data.current.column);
      return;
    }
  }

  // OnDragEnd function

  function onDragEnd(event: DragEndEvent) {
    const {active, over} = event;
    if(!over) return;

    const activeColumnId = active.id;
    const overColumnId = over.id;

    if(activeColumnId === overColumnId) return;

    setColumns((columns) => {
      const activeColumnIndex = columns.findIndex(
        (col) => col.id === activeColumnId
      );
      const overColumnIndex = columns.findIndex(
        (col) => col.id === overColumnId
      );

      return arrayMove(columns, activeColumnIndex, overColumnIndex);
    })
  }


  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 10,
      },
    })
  );

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
      <DndContext sensors={sensors} onDragStart={onDragStart} onDragEnd={onDragEnd}>
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
                    updateColumn={updateColumn}
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
        ring-fuchsia-600
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
                updateColumn={updateColumn}
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
