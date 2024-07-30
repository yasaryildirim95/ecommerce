import Header from "../header/Header";
import PopularProducts from "../popularproducts/PopularProducts";
import Slider from "../slider/Slider";

const Home = ({ examples, topproducts }) => {
  return (
    <>
      <Header />
      <Slider examples={examples} seconds={5} />
      <PopularProducts populars={topproducts} />
    </>
  );
};

export default Home;
