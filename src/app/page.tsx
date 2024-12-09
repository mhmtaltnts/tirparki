import { auth } from "./api/auth/[...nextauth]/auth";
import Slider from "./slider";
import { Truck, Trucks } from "@/components/svg-icons/money";

export default async function Home() {
  const session = await auth();
  return (
    <section className="container">
      <Slider id={session?.user.id} />
    </section>
  );
}
