
function ServiceCard({ service, user, onBook, onEdit, onDelete }) {
  const isOwner = user && user.uid === service.ownerId;

  return (
    <div className="bg-white rounded-xl shadow-sm overflow-hidden hover:shadow-lg transition">
      <img
        src={service.image}
        alt={service.name}
        className="w-full h-48 object-cover"
      />

      <div className="p-5">
        <p className="text-sm text-[#205C45] font-semibold">
          {service.category}
        </p>

        <h3 className="text-lg font-bold mt-2">
          {service.name}
        </h3>

        <p className="text-gray-500 mt-1">
          {service.location}
        </p>

        <div className="flex justify-between items-center mt-4 gap-3">
          <p className="font-bold text-[#205C45]">
            KSh {Number(service.price).toLocaleString()}
          </p>

          <button
            onClick={() => onBook(service)}
            className="bg-[#205C45] text-white px-4 py-2 rounded-lg"
          >
            Book Now
          </button>
        </div>

        {isOwner && (
          <div className="flex gap-3 mt-4 border-t pt-3">
            <button
              onClick={() => onEdit(service)}
              className="text-sm text-[#205C45] font-semibold"
            >
              Edit
            </button>

            <button
              onClick={() => onDelete(service)}
              className="text-sm text-red-600 font-semibold"
            >
              Delete
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default ServiceCard;
