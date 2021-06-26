import {
  Box,
  Button,
  makeStyles,
  TextField,
  Theme,
  Typography,
  Fade,
} from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { AxiosError } from "axios";
import Api from "../../services/api";
import { setCookie } from "nookies";
import { FormState } from "../../types";

// Estilo dos componentes
const useStyles = makeStyles((theme: Theme) => ({
  root: {
    width: "100vw",
    height: "100vh",
    padding: 0,
    margin: 0,
  },
  title: {
    margin: 20,
  },
  form: {
    maxWidth: "20%",
    height: "100%",
    padding: 15,
    backgroundColor: theme.palette.common.white,
  },
  inputs: {
    marginTop: "20%",
    "& > *": {
      margin: theme.spacing(1),
    },
    paddingRight: 15,
  },
}));

const Login: React.FC<FormState> = ({ switchForm }) => {
  const classes = useStyles();
  const router = useRouter();

  const [loginData, setLoginData] = useState({
    username: "",
    password: "",
  }); // Estado dos dados do formulário de login

  const [error, setError] = useState(""); // Estado de erro
  const [fade, setFade] = useState(false); // Estado da animação de Fade

  // Altera o estado dos dados do formulário de login
  const handleGetLoginData = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;

    setLoginData((prev) => ({ ...prev, [name]: value }));
  };

  // Realiza o login
  const signIn = async (event: React.FormEvent) => {
    event.preventDefault();

    await Api(null)
      .post("auth/login/", loginData)
      .then((res) => {
        const token: string = res.data.access;

        setCookie(null, "__cyclekids", token, {
          sameSite: true,
          maxAge: 300,
          path: "/",
        });

        router.push("/home");
      })
      .catch((err: AxiosError) =>
        !err.response
          ? setError("Erro no servidor!")
          : setError("Usuário ou senha inválidos!")
      );
  };

  // Altera o estado da animação de Fade ao montar o componente
  useEffect(() => {
    setFade(!fade);
  }, []);

  return (
    <Fade in={fade} timeout={500}>
      <form className={classes.form} method={"POST"} onSubmit={signIn}>
        <Box className={classes.title}>
          <Typography paragraph variant={"h2"}>
            Login
          </Typography>
        </Box>
        <Box className={classes.inputs}>
          <TextField
            color={"secondary"}
            fullWidth
            required
            name={"username"}
            variant={"outlined"}
            label={"Usuário"}
            onChange={handleGetLoginData}
          />
          <TextField
            color={"secondary"}
            onBlur={() => setError("")}
            required
            fullWidth
            type={"password"}
            error={!!error}
            helperText={error}
            name={"password"}
            variant={"outlined"}
            label={"Senha"}
            onChange={handleGetLoginData}
          />
        </Box>
        <Box marginTop={2}>
          <Button onClick={() => switchForm()}>Criar uma conta</Button>
          <Button color={"secondary"} type={"submit"}>
            Entrar
          </Button>
        </Box>
      </form>
    </Fade>
  );
};

export default Login;
