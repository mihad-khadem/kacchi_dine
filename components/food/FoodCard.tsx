// Food Card
export default function FoodCard() {
  return (
    <div className="border rounded-lg p-4 shadow-md">
      <h2 className="text-xl font-semibold mb-2">Delicious Food Item</h2>
      <p className="text-gray-600 mb-4">
        A brief description of the food item.
      </p>
      <button className="bg-blue-500 text-white px-4 py-2 rounded">
        Order Now
      </button>
    </div>
  );
}
