import Navbar from "../components/Header";
import Beatiful from "../components/Beatiful";
import Reciters from "../components/Reciters";
import LiveTv from "../components/LiveTv";
import Footer from "../components/Footer";

import Section from "../components/Section";

const Home = () => {
  return (
    <>
      <Navbar />
      <Beatiful />
      <Reciters />
      <LiveTv />
      <Section />
      <Footer />
    </>
  );
};

export default Home;