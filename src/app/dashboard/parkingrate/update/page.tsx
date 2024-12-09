import UpdateParkingRateForm from "./update-parking-rate-form";
import { getParkingRate } from "@/lib/data/parking-rate-data";

export default async function UpdateParkingRatePage({searchParams}) {
    const id = searchParams?.id;
  const parkingRate = await getParkingRate(id);

  return (
    <div className="container mx-auto py-10">
      <h1 className="mb-5 text-2xl font-bold">Update Parking Rate</h1>
      <UpdateParkingRateForm parkingRate={parkingRate} />
    </div>
  );
}
