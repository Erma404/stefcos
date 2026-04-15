import Header from "./Header";
import Footer from "./Footer";
import WhatsAppButton from "./WhatsAppButton";
import ExitIntentSidebar from "./ExitIntentSidebar";

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 pt-[116px]">{children}</main>
      <Footer />
      <WhatsAppButton />
      <ExitIntentSidebar />
    </div>
  );
};

export default Layout;
