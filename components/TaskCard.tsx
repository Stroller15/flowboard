import { Task } from "@/types";
import DeleteButton from "../assets/DeleteButton";
import { useState } from "react";
import { Id } from "@/types";
interface Props {
  task: Task;
  deleteTask: (id: Id) => void;
  updateTask: (id: Id, content: string) => void;
}

const TaskCard = ({ task, deleteTask, updateTask }: Props) => {
  const [mouseIsOver, setMouseIsOver] = useState(false);
  const [editMode, setEditMode] = useState(false);

  const toggleEditMode = () => {
    setEditMode((prev) => !prev);
    setMouseIsOver(false);
  };

  if (editMode) {
    return (
      <div
        className="bg-black p-2.5 h-[100px]
      min-h-[100px] items-center flex text-left rounded-xl hover:ring-2 hover:ring-inset hover:ring-fuchsia-600
      cursor-grab relative
      "
      >
        <textarea
          className="h-[90%]
        w-full resize-none border-none rounded bg-transparent text-white focus:outline-none
        "
        value={task.content}
        autoFocus
        placeholder="Task Content Here"
        onBlur={toggleEditMode}
        onKeyDown={(e) => {
          if(e.key === "Enter" && e.shiftKey) toggleEditMode();
        }}
        onChange={(e) => updateTask(task.id, e.target.value)}
        ></textarea>
      </div>
    );
  }

  return (
    <div
      onClick={toggleEditMode}
      className="bg-black p-2.5 h-[100px]
    min-h-[100px] items-center flex text-left rounded-xl hover:ring-2 hover:ring-inset hover:ring-fuchsia-600
    cursor-grab relative task
    "
      onMouseEnter={() => {
        setMouseIsOver(true);
      }}
      onMouseLeave={() => {
        setMouseIsOver(false);
      }}
    >
      <p className="my-auto h-[90%] w-full overflow-y-auto overflow-x-hidden whitespace-pre-wrap">{task.content}</p>
      {mouseIsOver && (
        <button
          onClick={() => {
            deleteTask(task.id);
          }}
          className="stroke-white absolute right-4 top-1/2 -translate-y-1/2 bg-black p-2 rounded opacity-60 hover:opacity-100"
        >
          <DeleteButton />
        </button>
      )}
    </div>
  );
};

export default TaskCard;
