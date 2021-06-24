import { AxiosError } from "axios";
import { GetServerSideProps } from "next";
import { parseCookies } from "nookies";
import { SWRConfig } from "swr";
import HomePage from "../src/components/HomePage";
import Api from "../src/services/api";
import { useRouter } from "next/router";

const homePage: React.FC<{ token: string }> = ({ token }) => {
  const router = useRouter();

  const fetcher = (url: string) =>
    Api(token)
      .get(url)
      .then((res) => res.data)
      .catch(async (err: AxiosError) => {
        err.response?.status === 401 && (await router.push("/login"));
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

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const token = parseCookies(ctx).__cyclekids;

  if (!token) {
    return {
      redirect: {
        destination: "/login",
        permanent: true,
      },
    };
  }

  return {
    props: {
      token,
    },
  };
};

export default homePage;
