import Link from 'next/link';

const PublicFooter = () => {
  return (
    <footer className="flex items-center justify-between">
      <address className="left">
        <a href="http://maps.google.com/maps/place/Gebze+Konak+Tır+Parkı/@40.814112,29.4578733,17z/data=!3m1!4b1!4m6!3m5!1s0x14cb20d9dd4dd139:0x70a1165aa635b25e!8m2!3d40.814108!4d29.460062!16s%2Fg%2F11b7q2wk4h">
          <p>
            <span style={{ fontWeight: '700' }}>Adres:</span> Kirazpınar Mah.
            Yeni Bağdat Cd. No:791 PK:41400 Gebze/ Kocaeli
          </p>
        </a>
        <a href="tel:+902627541406">Tel: +90 262 754 14 06</a>
      </address>
      <div className="">
        <Link href="/araclar">
          Parkımızda MİSAFİR araçlara buradan ulaşabilirsiniz.
        </Link>
      </div>
    </footer>
  );
};

export default PublicFooter;
