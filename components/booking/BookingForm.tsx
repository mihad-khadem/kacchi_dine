// Booking Form
export default function BookingForm() {
  return (
    <form className="max-w-md mx-auto p-4 border rounded">
      <h2 className="text-2xl font-bold mb-4">Book a Table</h2>
      <div className="mb-4">
        <label className="block mb-2">Name</label>
        <input
          type="text"
          className="w-full p-2 border rounded"
          placeholder="Your Name"
        />
      </div>
      <div className="mb-4">
        <label className="block mb-2">Date</label>
        <input type="date" className="w-full p-2 border rounded" />
      </div>
      <div className="mb-4">
        <label className="block mb-2">Time</label>
        <input type="time" className="w-full p-2 border rounded" />
      </div>
      <div className="mb-4">
        <label className="block mb-2">Number of Guests</label>
        <input
          type="number"
          className="w-full p-2 border rounded"
          placeholder="e.g., 2"
          min="1"
        />
      </div>
      <button
        type="submit"
        className="bg-green-500 text-white px-4 py-2 rounded"
      >
        Book Now
      </button>
    </form>
  );
}
