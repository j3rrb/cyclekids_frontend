import {
  Grid,
  Typography,
  Card,
  Box,
  CardHeader,
  Avatar,
  CardContent,
  CardActions,
  IconButton,
} from "@material-ui/core";
import { FavoriteBorderOutlined, Share, MoreVert } from "@material-ui/icons";
import useSWR from "swr";
import { Post } from "../../types";

const getAuthorInitials = (firstName: string, lastName: string) =>
  `${firstName[0]}${lastName[0]}`;

const getDate = (date: Date) => {
  date = new Date(date);

  return `${date.toLocaleDateString()} às ${date.toLocaleTimeString()}`;
};

const Posts: React.FC = () => {
  const { data } = useSWR<Post[]>("post/");

  if (!data) return <h1>Carregando...</h1>;

  return (
    <Box width={"100%"} marginTop={5}>
      <Grid container spacing={2}>
        {data.map((post: Post) => (
          <Grid item xs={6}>
            <Card key={post.id}>
              <CardHeader
                avatar={
                  <Avatar>
                    {getAuthorInitials(
                      post.author.first_name,
                      post.author.last_name
                    )}
                  </Avatar>
                }
                action={
                  <IconButton>
                    <MoreVert />
                  </IconButton>
                }
                title={`${post.author.first_name} ${post.author.last_name}`}
                subheader={getDate(post.created_at)}
              />
              <CardContent>
                <Typography noWrap variant={"h5"} paragraph>
                  {post.title}
                </Typography>
                <Typography>{post.content}</Typography>
              </CardContent>
              <CardActions>
                <IconButton>
                  <FavoriteBorderOutlined />
                </IconButton>
                <IconButton>
                  <Share />
                </IconButton>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default Posts;
