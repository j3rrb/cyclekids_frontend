import { GetServerSideProps } from "next";
import HomePage from "../src/components/HomePage";

const homePage = () => <HomePage />;

const getServerSideProps: GetServerSideProps = async (ctx) => {
  return {
    props: {},
  };
};

export default homePage;
