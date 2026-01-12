// order Checkout form
export default function CheckoutForm() {
  return (
    <form className="p-4 border rounded">
      <h2 className="text-2xl font-bold mb-4">Checkout</h2>
      <div className="mb-4">
        <label className="block mb-2">Name</label>
        <input
          type="text"
          className="w-full p-2 border rounded"
          placeholder="Your Name"
        />
      </div>
      <div className="mb-4">
        <label className="block mb-2">Address</label>
        <input
          type="text"
          className="w-full p-2 border rounded"
          placeholder="Your Address"
        />
      </div>
      <div className="mb-4">
        <label className="block mb-2">Payment Method</label>
        <select className="w-full p-2 border rounded">
          <option value="credit-card">Credit Card</option>
          <option value="paypal">PayPal</option>
          <option value="cash-on-delivery">Cash on Delivery</option>
        </select>
      </div>
      <button
        type="submit"
        className="bg-blue-500 text-white px-4 py-2 rounded"
      >
        Place Order
      </button>
    </form>
  );
}
