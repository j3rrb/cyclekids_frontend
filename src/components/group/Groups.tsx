import {
  Grid,
  Typography,
  Card,
  CardHeader,
  Avatar,
  CardContent,
  IconButton,
  TextField,
} from "@material-ui/core";
import { MoreVert } from "@material-ui/icons";
import useSWR from "swr";
import { Group } from "../../types";

// Formata o nome do admin do grupo
const getAdminInitials = (firstName: string, lastName: string) =>
  `${firstName[0]}${lastName[0]}`;

const Groups: React.FC = () => {
  // Consome a API e gerencia os efeitos colaterais de estado
  let { data } = useSWR<Group[]>("group/");

  if (!data) return <h1>Carregando...</h1>;

  return (
    <div>
      <TextField
        style={{
          backgroundColor: "white",
        }}
        variant={"outlined"}
        label={"Procurar grupos"}
        fullWidth
      />
      {data.length ? (
        <Grid container spacing={2}>
          {data.map((group: Group) => (
            <Grid item xs={6}>
              <Card key={group.id}>
                <CardHeader
                  avatar={
                    <Avatar>
                      {getAdminInitials(
                        group.admin.first_name,
                        group.admin.last_name
                      )}
                    </Avatar>
                  }
                  action={
                    <IconButton title={"Denunciar grupo"}>
                      <MoreVert />
                    </IconButton>
                  }
                  title={group.name}
                  subheader={`${group.members.length} membros`}
                />
                <CardContent>
                  <Typography>{group.description}</Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      ) : (
        <Typography
          align={"center"}
          style={{
            marginTop: 30,
          }}
        >
          Sem resultados
        </Typography>
      )}
    </div>
  );
};

export default Groups;
