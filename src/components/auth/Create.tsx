import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  makeStyles,
  TextField,
  Theme,
  Fade,
  Typography,
  Snackbar,
} from "@material-ui/core";
import { FormState } from "../../types";
import Api from "../../services/api";

// Estilos dos componentes
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

const CreateAcc: React.FC<FormState> = ({ switchForm }) => {
  const classes = useStyles();

  const [fade, setFade] = useState(false); // Estado da animação de Fade
  const [snack, setSnack] = useState({
    message: "",
    open: false,
  }); // Estado da snackbar
  const [createData, setCreateData] = useState({
    username: "",
    password: "",
    email: "",
    first_name: "",
    last_name: "",
  }); // Estado dos dados de criação de conta

  const [inputErrors, setInputErrors] = useState({
    username: false,
    password: false,
  }); // Estado dos erros de dados

  // Altera o estado dos dados do formulário de criação de conta
  const handleGetCreateData = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;

    setCreateData((prev) => ({ ...prev, [name]: value }));

    if (name === "username") {
      setInputErrors((prev) => ({ ...prev, username: value.length < 4 }));
    }

    if (name === "password") {
      setInputErrors((prev) => ({ ...prev, password: value.length < 8 }));
    }
  };

  // Realiza a criação da conta
  const signUp = async (event: React.FormEvent) => {
    event.preventDefault();

    await Api(null)
      .post("auth/register/", createData)
      .then(switchForm)
      .catch(() => {
        setSnack({
          open: true,
          message: "Esse nome de usuário já existe!",
        });
      });
  };

  // Verifica se o componente foi montado para controlar o estado da animação de Fade
  useEffect(() => {
    setFade(!fade);
  }, []);

  return (
    <Fade in={fade} timeout={500}>
      <form className={classes.form} method={"POST"} onSubmit={signUp}>
        <Box className={classes.title}>
          <Typography paragraph variant={"h2"}>
            Criar conta
          </Typography>
        </Box>
        <Box className={classes.inputs}>
          <TextField
            color={"secondary"}
            fullWidth
            required
            name={"username"}
            variant={"outlined"}
            label={"Nome de usuário"}
            error={inputErrors.username}
            helperText={
              inputErrors.username &&
              "O nome de usuário precisa ter pelo menos 4 caracteres"
            }
            onChange={handleGetCreateData}
          />
          <TextField
            color={"secondary"}
            required
            fullWidth
            type={"password"}
            error={!!inputErrors.password}
            helperText={
              inputErrors.password &&
              "A senha precisa ter pelo menos 8 caracteres!"
            }
            name={"password"}
            variant={"outlined"}
            label={"Senha"}
            onChange={handleGetCreateData}
          />
          <TextField
            color={"secondary"}
            fullWidth
            required
            type={"email"}
            name={"email"}
            variant={"outlined"}
            label={"E-mail"}
            onChange={handleGetCreateData}
          />
          <TextField
            color={"secondary"}
            fullWidth
            required
            name={"first_name"}
            variant={"outlined"}
            label={"Primeiro Nome"}
            onChange={handleGetCreateData}
          />
          <TextField
            color={"secondary"}
            fullWidth
            required
            name={"last_name"}
            variant={"outlined"}
            label={"Sobrenome"}
            onChange={handleGetCreateData}
          />
        </Box>
        <Box marginTop={2}>
          <Button onClick={() => switchForm()}>Fazer login</Button>
          <Button
            color={"secondary"}
            type={"submit"}
            disabled={inputErrors.password || inputErrors.username}
          >
            Criar
          </Button>
        </Box>
        {snack.open && (
          <Snackbar
            onClose={() => setSnack({ message: "", open: false })}
            open={snack.open}
            anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
            message={snack.message}
          />
        )}
      </form>
    </Fade>
  );
};

export default CreateAcc;
