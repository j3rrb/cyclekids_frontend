import { Grid, Typography, Card } from "@material-ui/core";
import useSWR from "swr";
import { Post } from "../types";

const Community: React.FC = () => {
  const { data } = useSWR<{ posts: Post[] }>("posts/");

  return data ? (
    <Grid container>
      {data.posts.map((post: Post) => (
        <Card key={post.id}>
          <Typography>{post.text}</Typography>
        </Card>
      ))}
    </Grid>
  ) : (
    <h1>Carregando</h1>
  );
};

export default Community;
