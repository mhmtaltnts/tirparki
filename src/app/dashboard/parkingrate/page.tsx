import { getParkingRates } from "@/lib/data/parking-rate-data";
import { DataTable } from "./data-table";
import { columns } from "./columns";
import Link from "next/link";

export default async function ParkingRateList() {
  const parkingRates = await getParkingRates();

  return (
    <div className="container mx-auto py-10">
      <h1 className="mb-5 text-2xl font-bold">Parking Rates</h1>
      <Link href="/dashboard/parkingrate/create">Yeni Parklama Oranı Ekle</Link>
      <DataTable columns={columns} data={parkingRates} />
    </div>
  );
}
