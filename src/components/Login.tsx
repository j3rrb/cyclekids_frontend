import {
  Box,
  Button,
  Container,
  makeStyles,
  TextField,
  Theme,
  Typography,
} from "@material-ui/core";
import { useState } from "react";
import { useRouter } from "next/router";
import { AxiosError } from "axios";
import Api from "../services/api";
import { setCookie } from "nookies";
import { decode } from "jsonwebtoken";

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    width: "100%",
    height: "100vh",
    padding: 0,
    margin: 0,
  },
  login: {
    width: "30%",
    height: "100%",
    padding: 15,
    backgroundColor: theme.palette.common.white,
  },
  background: {
    height: "100%",
    width: "100%",
    backgroundColor: theme.palette.primary.main,
  },
  inputs: {
    marginTop: "20%",
    "& > *": {
      margin: theme.spacing(1),
    },
  },
}));

const Login: React.FC = () => {
  const classes = useStyles();
  const router = useRouter();
  const [userData, setUserData] = useState({
    username: "",
    password: "",
  });
  const [error, setError] = useState("");

  const handleGetData = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;

    return setUserData((prev) => ({ ...prev, [name]: value }));
  };

  const signIn = async (event: React.FormEvent) => {
    event.preventDefault();

    return await Api(null)
      .post("login", userData)
      .then((res) => {
        const token: string = res.data.access;
        const tokenProps: any = decode(token);

        setCookie(null, "__cyclekids", token, {
          sameSite: tokenProps["exp"],
          path: "/",
        });

        return router.push("/home");
      })
      .catch((err: AxiosError) =>
        !err.response
          ? setError("Erro no servidor!")
          : setError("Usuário ou senha inválidos!")
      );
  };

  return (
    <Container maxWidth={"lg"} className={classes.root}>
      <Box display={"flex"} className={classes.root}>
        <form className={classes.login} method={"POST"} onSubmit={signIn}>
          <Typography paragraph variant={"h4"}>
            Login
          </Typography>
          <Box>
            <Box className={classes.inputs}>
              <TextField
                color={"secondary"}
                required
                name={"username"}
                variant={"outlined"}
                label={"Usuário"}
                onChange={handleGetData}
              />
              <TextField
                color={"secondary"}
                onBlur={() => setError("")}
                required
                type={"password"}
                error={!!error}
                helperText={error}
                name={"password"}
                variant={"outlined"}
                label={"Senha"}
                onChange={handleGetData}
              />
            </Box>
            <Box marginTop={2}>
              <Button color={"secondary"} type={"submit"}>
                Entrar
              </Button>
              <Button onClick={async () => router.push("/create")}>
                Criar uma conta
              </Button>
            </Box>
          </Box>
        </form>
        <Box className={classes.background}>
          <Typography>Image</Typography>
        </Box>
      </Box>
    </Container>
  );
};

export default Login;
