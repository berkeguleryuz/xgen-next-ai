import Navbar from "@/components/Navbar";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="text-white">
      <Navbar />
      {children}
    </div>
  );
}
