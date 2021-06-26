import { Box } from "@material-ui/core";
import useSWR from "swr";
import { Post } from "../types";
import Groups from "./group/Groups";

const Community: React.FC = () => {
  const { data } = useSWR<Post[]>("group/");

  if (!data) return <h1>Carregando...</h1>;

  return (
    <Box width={"100%"} marginTop={5}>
      <Groups />
    </Box>
  );
};

export default Community;
