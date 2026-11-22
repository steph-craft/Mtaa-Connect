
import { useState } from "react";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";

import { db } from "./services/firebase";
import Navbar from "./components/Navbar";
import ServiceCard from "./components/ServiceCard";
import Footer from "./components/Footer";

const services = [
  {
    id: 1,
    name: "Home Cleaning",
    category: "Cleaning",
    location: "Kilimani, Nairobi",
    price: 2500,
    image: "https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=800",
  },
  {
    id: 2,
    name: "Plumbing Services",
    category: "Plumbing",
    location: "Westlands, Nairobi",
    price: 1800,
    image: "https://images.unsplash.com/photo-1607472586893-edb57bdc0e39?w=800",
  },
  {
    id: 3,
    name: "Photography",
    category: "Photography",
    location: "Lavington, Nairobi",
    price: 5000,
    image: "https://images.unsplash.com/photo-1542038784456-1ea8e935640e?w=800",
  },
  {
    id: 4,
    name: "Beauty Services",
    category: "Beauty",
    location: "Kileleshwa, Nairobi",
    price: 3000,
    image: "https://images.unsplash.com/photo-1560066984-138dadb4c035?w=800",
  },
  {
    id: 5,
    name: "Electrical Repairs",
    category: "Electrical",
    location: "Kasarani, Nairobi",
    price: 2000,
    image: "https://images.unsplash.com/photo-1621905251918-48416bd8575a?w=800",
  },
  {
    id: 6,
    name: "Event Catering",
    category: "Catering",
    location: "Roysambu, Nairobi",
    price: 4500,
    image: "https://images.unsplash.com/photo-1555244162-803834f70033?w=800",
  },
];

const categories = [
  "All",
  "Cleaning",
  "Plumbing",
  "Electrical",
  "Beauty",
  "Catering",
  "Photography",
];

function App() {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");

  const [selectedService, setSelectedService] = useState(null);
  const [customerName, setCustomerName] = useState("");
  const [customerEmail, setCustomerEmail] = useState("");
  const [bookingDate, setBookingDate] = useState("");

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const filteredServices = services.filter((service) => {
    const matchesSearch =
      service.name.toLowerCase().includes(search.toLowerCase()) ||
      service.location.toLowerCase().includes(search.toLowerCase());

    const matchesCategory =
      category === "All" || service.category === category;

    return matchesSearch && matchesCategory;
  });

  function openBookingForm(service) {
    setSelectedService(service);
    setMessage("");
    setCustomerName("");
    setCustomerEmail("");
    setBookingDate("");
  }

  function closeBookingForm() {
    setSelectedService(null);
    setMessage("");
  }

  async function handleBooking(event) {
    event.preventDefault();

    if (!selectedService) return;

    setLoading(true);
    setMessage("");

    try {
      await addDoc(collection(db, "bookings"), {
        customerName,
        customerEmail,
        bookingDate,
        serviceId: selectedService.id,
        serviceName: selectedService.name,
        serviceLocation: selectedService.location,
        price: selectedService.price,
        status: "Pending",
        createdAt: serverTimestamp(),
      });

      setMessage("Your booking has been submitted successfully!");

      setCustomerName("");
      setCustomerEmail("");
      setBookingDate("");
    } catch (error) {
      console.error("Booking error:", error);
      setMessage("Booking failed. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-[#FAF7F0]">
      <Navbar />

      {/* HERO */}
      <section id="home" className="text-center px-6 py-20">
        <h1 className="text-4xl md:text-5xl font-bold text-[#205C45]">
          Find Trusted Services Near You
        </h1>

        <p className="mt-5 text-gray-600 max-w-2xl mx-auto">
          Connect with reliable local service providers in your
          neighbourhood. Find everything you need in one place.
        </p>

        <div className="max-w-2xl mx-auto mt-8 flex flex-col sm:flex-row gap-3">
          <input
            type="text"
            placeholder="Search for a service or location..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="flex-1 p-4 rounded-lg border bg-white outline-none focus:ring-2 focus:ring-[#205C45]"
          />

          <button
            onClick={() =>
              document.getElementById("services").scrollIntoView({
                behavior: "smooth",
              })
            }
            className="bg-[#F4A261] text-[#205C45] px-8 py-4 rounded-lg font-bold"
          >
            Find Services
          </button>
        </div>
      </section>

      {/* CATEGORIES */}
      <section id="categories" className="px-6 py-12 max-w-7xl mx-auto">
        <h2 className="text-2xl font-bold text-[#205C45] mb-6">
          Popular Categories
        </h2>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {categories.slice(1).map((item) => (
            <button
              key={item}
              onClick={() => {
                setCategory(item);
                document.getElementById("services").scrollIntoView({
                  behavior: "smooth",
                });
              }}
              className={`p-5 rounded-xl shadow-sm font-semibold transition ${
                category === item
                  ? "bg-[#205C45] text-white"
                  : "bg-white text-gray-700 hover:bg-[#205C45] hover:text-white"
              }`}
            >
              {item}
            </button>
          ))}
        </div>
      </section>

      {/* SERVICES */}
      <section id="services" className="px-6 py-12 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-wrap justify-between items-center gap-4 mb-8">
            <h2 className="text-2xl font-bold text-[#205C45]">
              Available Services
            </h2>

            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="p-3 border rounded-lg bg-white"
            >
              {categories.map((item) => (
                <option key={item} value={item}>
                  {item}
                </option>
              ))}
            </select>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredServices.map((service) => (
              <ServiceCard
                key={service.id}
                service={service}
                onBook={openBookingForm}
              />
            ))}
          </div>

          {filteredServices.length === 0 && (
            <p className="text-center text-gray-500 py-10">
              No services found. Try another search.
            </p>
          )}
        </div>
      </section>

      {/* BOOKING FORM */}
      {selectedService && (
        <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl p-6 w-full max-w-md max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-5">
              <h2 className="text-xl font-bold text-[#205C45]">
                Book a Service
              </h2>

              <button
                onClick={closeBookingForm}
                className="text-gray-500 text-2xl"
                aria-label="Close booking form"
              >
                &times;
              </button>
            </div>

            <p className="mb-4 text-gray-600">
              Service: <strong>{selectedService.name}</strong>
            </p>

            <p className="mb-5 text-[#205C45] font-bold">
              Price: KSh {selectedService.price.toLocaleString()}
            </p>

            <form onSubmit={handleBooking} className="space-y-4">
              <div>
                <label className="block mb-1 font-medium">
                  Your name
                </label>
                <input
                  type="text"
                  value={customerName}
                  onChange={(e) => setCustomerName(e.target.value)}
                  required
                  className="w-full border rounded-lg p-3"
                  placeholder="Enter your name"
                />
              </div>

              <div>
                <label className="block mb-1 font-medium">
                  Email address
                </label>
                <input
                  type="email"
                  value={customerEmail}
                  onChange={(e) => setCustomerEmail(e.target.value)}
                  required
                  className="w-full border rounded-lg p-3"
                  placeholder="Enter your email"
                />
              </div>

              <div>
                <label className="block mb-1 font-medium">
                  Preferred date
                </label>
                <input
                  type="date"
                  value={bookingDate}
                  onChange={(e) => setBookingDate(e.target.value)}
                  min={new Date().toISOString().split("T")[0]}
                  required
                  className="w-full border rounded-lg p-3"
                />
              </div>

              {message && (
                <p className="text-sm text-center text-[#205C45]">
                  {message}
                </p>
              )}

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-[#205C45] text-white py-3 rounded-lg font-semibold disabled:opacity-60"
              >
                {loading ? "Submitting..." : "Confirm Booking"}
              </button>
            </form>
          </div>
        </div>
      )}

      {/* ABOUT */}
      <section id="about" className="px-6 py-16 text-center">
        <h2 className="text-3xl font-bold text-[#205C45]">
          About MtaaConnect
        </h2>

        <p className="max-w-2xl mx-auto mt-5 text-gray-600 leading-7">
          MtaaConnect is a local services marketplace that connects
          customers with reliable service providers and small
          businesses around Nairobi. Our goal is to make finding
          local services easier while supporting our community.
        </p>
      </section>

      <Footer />
    </div>
  );
}

export default App;
