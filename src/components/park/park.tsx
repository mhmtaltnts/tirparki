import { getInPark } from "@/lib/data/park-data";
import styles from "./park.module.css";
import Image from "next/image";

import Link from "next/link";

const ParkNotes = async () => {
  const data = await getInPark();

  return (
    <div className={styles.container}>
      <h1>Parkta Araçlar</h1>
      {data.length > 0 ? (
        data.map((note) => (
          <div className={styles.note} key={note.id}>
            <div className={styles.detail}>
              <Image src={"/trailer.jpg"} alt="" width={50} height={50} />
              <span>{note.trailer}</span>
            </div>
            <Link href={`notes/${note._id}`}>Değiştir</Link>
            <Link href={`${note._id}`}>Çıkış Yap</Link>
            <form>
              <input type="hidden" name="id" value={note.id} />
              <button className={styles.noteButton}>Sil</button>
            </form>
          </div>
        ))
      ) : (
        <h3>Parkta Araç Bulunamadı.</h3>
      )}
    </div>
  );
};

export default ParkNotes;
