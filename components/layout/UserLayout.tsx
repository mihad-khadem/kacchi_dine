import Navbar from "./Navbar";
import Footer from "./Footer";

export default function UserLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="bg-[#fffaf5] min-h-screen flex flex-col">
      {/* Navbar for normal users */}
      <Navbar />

      {/* Page content */}
      <main className="flex-1">{children}</main>

      {/* Footer */}
      <Footer />
    </div>
  );
}
