import { Box, Container, makeStyles, Theme, Fade } from "@material-ui/core";
import React, { useState } from "react";
import Login from "./auth/Login";
import CreateAcc from "../components/auth/Create";

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    width: "100vw",
    height: "100vh",
    padding: 0,
    margin: 0,
  },
  background: {
    height: "100%",
    width: "100%",
    backgroundColor: theme.palette.primary.main,
    backgroundImage: `url('${require("../../public/bg_login_img.jpg")}')`,
    backgroundRepeat: "no-repeat",
    backgroundSize: "100% 100%",
    zIndex: -100,
  },
}));

const Auth: React.FC = () => {
  const classes = useStyles();
  const [formState, setFormState] = useState(false);

  const handleFormState = () => setFormState(!formState);

  return (
    <Container maxWidth={"lg"} className={classes.root}>
      <Box display={"flex"} className={classes.root}>
        {!formState ? (
          <Fade>
            <Login switchForm={handleFormState} />
          </Fade>
        ) : (
          <CreateAcc switchForm={handleFormState} />
        )}
        <Box className={classes.background} />
      </Box>
    </Container>
  );
};

export default Auth;
