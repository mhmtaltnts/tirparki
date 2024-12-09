import CreateParkingRateForm from "./create-parking-rate-form";

export default function CreateParkingRatePage() {
  return (
    <div className="container mx-auto py-10">
      <h1 className="mb-5 text-2xl font-bold">Create New Parking Rate</h1>
      <CreateParkingRateForm />
    </div>
  );
}
