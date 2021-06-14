import { Grid, Typography } from "@material-ui/core";
import useSWR from "swr";
import { Post } from "../types";

const Community: React.FC = () => {
  const { data, error } = useSWR<Post>("posts/");

  if (!data) console.log("loading");

  return (
    <Grid container>
      <Grid item xs={6}>
        <Typography>Teste</Typography>
      </Grid>
    </Grid>
  );
};

export default Community;
