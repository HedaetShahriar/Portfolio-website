// A reusable modal to confirm deletions.
const DeleteConfirmationModal = ({ onConfirm, onCancel }) => {
  return (
    <div className="fixed inset-0 bg-black/80 flex items-center justify-center p-4 z-50">
      <div className="bg-gray-800 rounded-lg shadow-2xl w-full max-w-md p-8">
        <h2 className="text-2xl font-bold text-white mb-4">Are you sure?</h2>
        <p className="text-gray-400 mb-6">This action cannot be undone. This will permanently delete the item.</p>
        <div className="flex justify-end space-x-4">
          <button onClick={onCancel} className="bg-gray-600 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded-lg">Cancel</button>
          <button onClick={onConfirm} className="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-lg">Delete</button>
        </div>
      </div>
    </div>
  );
};

export default DeleteConfirmationModal;