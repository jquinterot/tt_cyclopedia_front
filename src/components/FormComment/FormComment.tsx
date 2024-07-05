
export function FormComment() {
  return (
    <form  mt-2>
      <input className=" rounded-sm mb-2" type="text" />
      <div className="flex space-x-2">
      <button className=" bg-red-600 px-1">Cancel</button>
      <button className="bg-green-500 px-1">Add Comment</button>
      </div>
      
    </form>
    
  );
}





