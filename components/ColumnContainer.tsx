import DeleteButton from "@/assets/DeleteButton";
import { Column, Id } from "@/types";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

interface Props {
  column: Column;
  deleteColumn: (id: Id) => void;
}

const ColumnContainer = (props: Props) => {
  const { column, deleteColumn } = props;

  const {
    setNodeRef,
    attributes,
    listeners,
    transform,
    transition,
    isDragging,
  } = useSortable({
    id: column.id,
    data: {
      type: "Column",
      column,
    },
  });

  const style = {
    transition,
    transform: CSS.Transform.toString(transform),
  };

  if (isDragging) {
    return (
      <div
        ref={setNodeRef}
        style={style}
        className=" bg-buttonBackgroundColor w-[350px] h-[500px] max-h-[500px]
        rounded-md flex flex-col opacity-40
        border-2
        border-rose-500"
      ></div>
    );
  }

  return (
    <div
      ref={setNodeRef}
      style={style}
      className="
    bg-buttonBackgroundColor
    w-[350px]
    h-[500px]
    max-h-[500px]
    rounded-md
    flex
    flex-col
    "
    >
      {/* column title */}
      <div
        {...attributes}
        {...listeners}
        className="
        bg-neutral-900
        text-md
        h-[60px]
        cursor-grab
        rounded-md
        p-3
        font-bold
        rounded-b-none
        border-x-neutral-900
        border-y-neutral-900
        border-4
        m-1
        flex
        items-center
        justify-between
        "
      >
        <div className="flex gap-2">
          <div
            className="
        flex 
        justify-center 
        items-center 
        bg-buttonBackgroundColor 
        px-2 
        py-1 
        text-sm
        rounded-full

        "
          >
            0
          </div>
          {column.title}
        </div>
        <button
          onClick={() => deleteColumn(column.id)}
          className="
        stroke-gray-500
        hover:stroke-white
        "
        >
          <DeleteButton />
        </button>
      </div>

      {/* column task container */}
      <div className="flex flex-grow ">content</div>
      {/* column footer */}
      <div>footer</div>
    </div>
  );
};

export default ColumnContainer;
