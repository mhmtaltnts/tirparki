import DashSideNav from '@/components/sidebar/dash-side-nav';

export const metadata = {
  title: 'Tır Parkı Uygulaması',
  description: 'Mhmt Altnts tarafından geliştirildi',
};

export default function DashLayout({ children }) {
  return (
    <section>
      <DashSideNav />
      <div className="md:ml-[56px]">{children}</div>
    </section>
  );
}
