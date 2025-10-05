import "../../styles/globals.css";
import ReduxProvider from "@/components/hooks/ReduxProvider";

export const metadata = {
  title: "YieldWitness Dashboard",
  description: "Dashboard layout.",
};

export default function AdminLayout({ children }) {
  return (
    <main className="bg-white text-black overflow-x-hidden min-h-screen">
      <ReduxProvider>{children}</ReduxProvider>
    </main>
  );
}