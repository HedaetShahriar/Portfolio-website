// A simple component to group the Edit and Delete buttons.
const EditDeleteButtons = ({ onEdit, onDelete }) => {
  return (
    <div className="space-x-2">
      <button onClick={onEdit} className="bg-yellow-500 hover:bg-yellow-600 text-white font-bold py-1 px-3 rounded text-sm">Edit</button>
      <button onClick={onDelete} className="bg-red-500 hover:bg-red-600 text-white font-bold py-1 px-3 rounded text-sm">Delete</button>
    </div>
  );
};

export default EditDeleteButtons;