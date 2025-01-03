import Image from "next/image";
import HomePage from "./Components/HomePage";
import AddPlayer from "./Components/AddPlayer"
export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-10">
      <HomePage />
    </main>
  );
}
