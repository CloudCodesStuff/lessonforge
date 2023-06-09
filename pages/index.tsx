import Features from "@/components/features";
import Hero from "@/components/hero";
import Pricing from "@/components/pricing";
import Cta from "@/components/cta";
import Nav from "@/components/nav";
import Footer from "@/components/footer";
const home = () => {
  return (
    <div>
      <Nav></Nav>

      <Hero></Hero>
      <Features></Features>
      <Cta></Cta>
      <Pricing></Pricing>
      <Footer></Footer>

    </div>
  );
}

export default home;