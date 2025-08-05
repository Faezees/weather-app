import Footer from "@/components/layout/footer";
import Header from "@/components/layout/header";
import Weather from "@/components/Weather";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col ">
      <Header />
      <Weather />
      <Footer />
    </div>
  );
}
