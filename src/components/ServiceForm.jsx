
import { useState } from "react";

function ServiceForm({ service, onSave, onClose, loading }) {
  const [name, setName] = useState(service?.name || "");
  const [category, setCategory] = useState(service?.category || "Cleaning");
  const [location, setLocation] = useState(service?.location || "");
  const [price, setPrice] = useState(service?.price || "");
  const [image, setImage] = useState(service?.image || "");

  function handleSubmit(event) {
    event.preventDefault();

    onSave({
      name: name.trim(),
      category,
      location: location.trim(),
      price: Number(price),
      image: image.trim(),
    });
  }

  return (
    <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4">
      <div className="bg-white rounded-xl p-6 w-full max-w-lg max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-5">
          <h2 className="text-xl font-bold text-[#205C45]">
            {service ? "Edit Service" : "Add a Service"}
          </h2>

          <button
            type="button"
            onClick={onClose}
            className="text-gray-500 text-2xl"
            aria-label="Close service form"
          >
            &times;
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block mb-1 font-medium">Service name</label>
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              maxLength={80}
              className="w-full border rounded-lg p-3"
              placeholder="e.g. Home Cleaning"
            />
          </div>

          <div>
            <label className="block mb-1 font-medium">Category</label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full border rounded-lg p-3"
            >
              {[
                "Cleaning",
                "Plumbing",
                "Electrical",
                "Beauty",
                "Catering",
                "Photography",
              ].map((item) => (
                <option key={item} value={item}>{item}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block mb-1 font-medium">Location</label>
            <input
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              required
              maxLength={100}
              className="w-full border rounded-lg p-3"
              placeholder="e.g. Kilimani, Nairobi"
            />
          </div>

          <div>
            <label className="block mb-1 font-medium">Price (KSh)</label>
            <input
              type="number"
              min="1"
              step="1"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              required
              className="w-full border rounded-lg p-3"
              placeholder="e.g. 2500"
            />
          </div>

          <div>
            <label className="block mb-1 font-medium">Image URL</label>
            <input
              type="url"
              value={image}
              onChange={(e) => setImage(e.target.value)}
              required
              className="w-full border rounded-lg p-3"
              placeholder="https://example.com/image.jpg"
            />
          </div>

          <div className="flex gap-3 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="w-1/2 border rounded-lg py-3"
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={loading || Number(price) <= 0}
              className="w-1/2 bg-[#205C45] text-white rounded-lg py-3 disabled:opacity-60"
            >
              {loading ? "Saving..." : service ? "Update Service" : "Add Service"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default ServiceForm;
