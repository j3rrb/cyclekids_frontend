import {
  Button,
  createMuiTheme,
  Tab,
  Tabs,
  ThemeProvider,
  withStyles,
} from "@material-ui/core";
import { Theme } from "@material-ui/core";
import { Container } from "@material-ui/core";
import { Box, makeStyles, Typography } from "@material-ui/core";
import { ExitToApp } from "@material-ui/icons";
import Image from "next/image";
import { ChangeEvent, useState } from "react";
import theme from "../theme";
import Community from "./Community";
import { useRouter } from "next/router";

const useStyles = makeStyles((theme: Theme) => ({
  sidebar: {
    backgroundColor: theme.palette.primary.main,
    padding: theme.spacing(2),
  },
  bg: {
    backgroundImage: `url('${require("../../public/kids.jpg")}')`,
    backgroundRepeat: "no-repeat",
    backgroundSize: "100% 100%",
    height: "100vh",
    width: "100vw",
    zIndex: -100,
    position: "fixed",
    filter: "blur(8px)",
    transform: "scale(1.01)",
  },
  content: {
    zIndex: 9999,
  },
  logoutButton: {
    "&:hover": {
      transition: "color .3s",
      color: "#ff1f1f",
    },
    "&:not(:hover)": {
      transition: "color .3s",
      color: "black",
    },
  },
}));

const typotheme = createMuiTheme({
  typography: {
    fontFamily: ['"Nanum pen Script"', "TitilliumWeb", "Roboto"].join(","),
  },
});

const VerticalTabs = withStyles(() => ({
  flexContainer: {
    flexDirection: "column",
  },
  indicator: {
    display: "none",
  },
}))(Tabs);

const VerticalTab = withStyles(() => ({
  selected: {
    color: "#005C4F",
  },
}))(Tab);

const TabContainer = (props) => {
  return (
    <Box margin={theme.spacing(0.5)}>
      <Typography
        style={{
          fontSize: 30,
          fontWeight: "lighter",
          padding: 10,
          backgroundColor: "rgba(255, 255, 255, 0.1)",
          borderRadius: 20,
        }}
        component={"div"}
      >
        {props.children}
      </Typography>
    </Box>
  );
};

const SectionTitle = (props) => {
  return (
    <ThemeProvider theme={typotheme}>
      <Typography align={"center"} variant={"h2"} paragraph>
        {props.children}
      </Typography>
    </ThemeProvider>
  );
};

const HomePage: React.FC = () => {
  const router = useRouter();
  const classes = useStyles();
  const [tab, setTab] = useState<number>(0);

  const handleSetTab = (_: ChangeEvent<{}>, active: number) => setTab(active);

  const logout = () => {
    document.cookie =
      "__cyclekids=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    router.push("/login");
  };

  return (
    <Box display={"flex"} width={"100%"} height={"100vh"}>
      <Box maxWidth={"30%"} height={"100%"} className={classes.sidebar}>
        <ThemeProvider theme={typotheme}>
          <Box
            marginBottom={4}
            display={"flex"}
            justifyContent={"center"}
            alignItems={"center"}
          >
            <Image src={"/ck_img.png"} width={150} height={150} />
            <Typography
              style={{
                padding: 10,
                margin: 10,
                color: "#005C4F",
              }}
              variant={"h3"}
            >
              Cycle Kids
            </Typography>
          </Box>
        </ThemeProvider>
        <Box>
          <VerticalTabs value={tab} onChange={handleSetTab}>
            <VerticalTab label={"Sistema 5 Rs"} />
            <VerticalTab label={"O que é lixo?"} />
            <VerticalTab label={"O que é reciclagem?"} />
            <VerticalTab label={"Como descartar"} />
            <VerticalTab label={"Comunidade"} />
            <Box marginTop={5} display={"flex"} justifyContent={"center"}>
              <Button
                onClick={() => logout()}
                className={classes.logoutButton}
                startIcon={<ExitToApp />}
              >
                Sair
              </Button>
            </Box>
          </VerticalTabs>
        </Box>
      </Box>
      <Box className={classes.bg}></Box>
      <Box
        className={classes.content}
        overflow={"auto"}
        width={"100%"}
        height={"100%"}
      >
        <Container maxWidth={"lg"}>
          {tab === 0 && (
            <TabContainer>
              <SectionTitle>Sistema 5 Rs</SectionTitle> &emsp;&emsp;Os 5 Rs são
              uma política que visa reduzir a geração de resíduos no nosso
              planeta, pensando na mudança de comportamento diante do consumo e
              a forma que lida com os resíduos gerados. Os 5 Rs consistem em
              cinco palavras: repensar, recusar, reduzir, reutilizar e reciclar.
              A reutilização se refere a utilizar de um produto novamente que
              seria descartado posteriormente ao seu uso. Redução se refere o
              pensamento consumista, onde pergunta-se se é realmente necessário
              adquirir um novo objeto ou também saber poupar, repensar significa
              ter um novo pensamento sobre o meio ambiente, recusar é o
              pensamento que temos de não utilizar de empresas, ou bens, que não
              se importam com o meio ambiente.
            </TabContainer>
          )}
          {tab === 1 && (
            <TabContainer>
              <SectionTitle>O que e lixo?</SectionTitle>
              &emsp;&emsp;Os resíduos sólidos urbanos, ou lixo urbano, são
              sobras de um determinado produto que podem, ou não, ter uma
              reutilização. Existem diversos tipos de materiais e estes são
              classificados em algumas condições, os mais citados são: materiais
              orgânicos, eletrônicos, hospitalares, radioativos, recicláveis e
              não recicláveis.
            </TabContainer>
          )}
          {tab === 2 && (
            <TabContainer>
              <SectionTitle>O que e reciclagem?</SectionTitle>
              &emsp;&emsp;Os materiais orgânicos podem ser definidos,
              biologicamente, como um material de origem animal ou vegetal, que
              são as sobras de alimentos consumidos pelos humanos. Os materiais
              eletrônicos são declarados como resíduos de equipamento
              eletroeletrônico, sendo normalmente descartados por não terem mais
              utilidade. Materiais hospitalares são proveniente de uso de
              atendimento hospitalar quanto para pacientes humanos quanto para
              animais. Lixos radioativos são oriundos de atividades nucleares,
              podendo ser produzidos em laboratórios de exames e também de
              usinas nucleares. materiais recicláveis são aqueles que possui
              propriedades restaurativas, total ou parcial, de algum produto
              para que possa novamente ser utilizado como matéria prima. Não
              recicláveis são os que não possuem essa capacidade restaurativa.
            </TabContainer>
          )}
          {tab === 3 && (
            <TabContainer>
              <SectionTitle>Como descartar</SectionTitle>
            </TabContainer>
          )}
          {tab === 4 && (
            <TabContainer>
              <SectionTitle>Comunidade</SectionTitle>
              &emsp;&emsp;Veja o que a comunidade já reciclou até agora e siga
              seu exemplo!
              <Community />
            </TabContainer>
          )}
        </Container>
      </Box>
    </Box>
  );
};

export default HomePage;
