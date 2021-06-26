import { AxiosError } from "axios";
import { GetStaticProps } from "next";
import { SWRConfig } from "swr";
import HomePage from "../src/components/HomePage";
import Api from "../src/services/api";
import { useRouter } from "next/router";

const homePage: React.FC = () => {
  const router = useRouter();

  const fetcher = (url: string) =>
    Api(null)
      .get(url)
      .then((res) => res.data)
      .catch(async (err: AxiosError) => {
        err.response?.status === 401 && (await router.push("/auth"));
      });

  return (
    <SWRConfig
      value={{
        fetcher,
        revalidateOnFocus: false,
        revalidateOnMount: true,
        revalidateOnReconnect: true,
      }}
    >
      <HomePage />
    </SWRConfig>
  );
};

export const getStaticProps: GetStaticProps = async () => {
  return {
    props: {},
  };
};

export default homePage;
