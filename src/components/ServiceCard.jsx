
function ServiceCard({ service, onBook }) {
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
            KSh {service.price.toLocaleString()}
          </p>

          <button
            onClick={() => onBook(service)}
            className="bg-[#205C45] text-white px-4 py-2 rounded-lg hover:bg-[#174632]"
          >
            Book Now
          </button>
        </div>
      </div>
    </div>
  );
}

export default ServiceCard;
