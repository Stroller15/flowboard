import PlusIcon from "@/assets/PlusIcon"


const FlowBoard = () => {
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
      <div className="m-auto">
        <button className="
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