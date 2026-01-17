import UserLayout from "@/components/layout/UserLayout";

const ContactPage = () => {
  return (
    <UserLayout>
      <div className="max-w-4xl mx-auto p-6 my-16">
        <h1 className="text-4xl font-bold mb-4 text-gray-900">Contact Us</h1>
        <p className="text-gray-600 mb-8 text-lg">
          Have questions? We'd love to hear from you. Reach out to us anytime.
        </p>

        <div className="grid md:grid-cols-2 gap-8">
          <div>
            <h2 className="text-2xl font-bold mb-4 text-gray-900">
              Get in Touch
            </h2>
            <form className="space-y-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Name
                </label>
                <input
                  type="text"
                  placeholder="Your Name"
                  className="w-full p-3 border border-gray-300 rounded-lg"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Email
                </label>
                <input
                  type="email"
                  placeholder="your@email.com"
                  className="w-full p-3 border border-gray-300 rounded-lg"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Message
                </label>
                <textarea
                  placeholder="Your message"
                  rows={5}
                  className="w-full p-3 border border-gray-300 rounded-lg"
                ></textarea>
              </div>
              <button
                type="submit"
                className="bg-yellow-400 hover:bg-yellow-500 text-black font-bold px-6 py-3 rounded-lg transition w-full"
              >
                Send Message
              </button>
            </form>
          </div>

          <div>
            <h2 className="text-2xl font-bold mb-4 text-gray-900">
              Contact Info
            </h2>
            <div className="space-y-6">
              <div>
                <h3 className="font-bold text-gray-900 mb-2">📍 Address</h3>
                <p className="text-gray-600">
                  Jahan Buliding-05 (4th Floor), Agrabad C/A, Chattogram,
                  Bangladesh.
                </p>
              </div>
              <div>
                <h3 className="font-bold text-gray-900 mb-2">📞 Phone</h3>
                <p className="text-gray-600">+880 01810190812</p>
              </div>
              <div>
                <h3 className="font-bold text-gray-900 mb-2">📧 Email</h3>
                <p className="text-gray-600">kacchidineoffice@gmail.com</p>
              </div>
              <div>
                <h3 className="font-bold text-gray-900 mb-2">🕐 Hours</h3>
                <p className="text-gray-600">Every day 10:00 AM - 09:00 PM</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </UserLayout>
  );
};

export default ContactPage;
