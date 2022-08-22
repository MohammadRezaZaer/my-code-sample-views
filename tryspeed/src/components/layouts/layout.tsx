import useLayout from '@framework/utils/use-layout';
import Header from './header';
import HeaderMinimal from './header-minimal';
import MobileNavigation from './mobile-navigation';
import Footer from "@components/layouts/footer";

const SiteLayout: React.FC = ({ children }) => {
  // const { layout } = useLayout();
  return (
    <div className="flex flex-col items-center min-h-screen transition-colors duration-150 bg-dark ">
      {/*{layout === 'minimal' ? <HeaderMinimal /> : <Header />}*/}
      <Header />
      {children}
      <MobileNavigation />
      <Footer />
    </div>
  );
};
export const getLayout = (page: React.ReactElement) => (
  <SiteLayout>{page}</SiteLayout>
);
export default SiteLayout;
