// Food Grid
export default function FoodGrid() {
  const foods = [
    { id: 1, name: "Biryani", description: "Delicious spiced rice with meat." },
    { id: 2, name: "Kebabs", description: "Grilled skewered meat." },
    { id: 3, name: "Naan", description: "Soft Indian flatbread." },
    { id: 4, name: "Curry", description: "Spicy and flavorful stew." },
  ];
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 p-4">
      {foods.map((food) => (
        <div key={food.id} className="border rounded-lg p-4 shadow-md">
          <h2 className="text-xl font-semibold mb-2">{food.name}</h2>
          <p className="text-gray-600 mb-4">{food.description}</p>
          <button className="bg-blue-500 text-white px-4 py-2 rounded">
            Order Now
          </button>
        </div>
      ))}
    </div>
  );
}
