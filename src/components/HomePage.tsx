import {
  createMuiTheme,
  Tab,
  Tabs,
  ThemeProvider,
  withStyles,
} from "@material-ui/core";
import { Theme } from "@material-ui/core";
import { Container } from "@material-ui/core";
import { Box, makeStyles, Typography } from "@material-ui/core";
import Image from "next/image";
import { ChangeEvent, useState } from "react";
import theme from "../theme";

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
  const classes = useStyles();
  const [tab, setTab] = useState<number>(0);

  const handleSetTab = (_: ChangeEvent<{}>, active: number) => setTab(active);

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
            <VerticalTab label={"O que ?? lixo?"} />
            <VerticalTab label={"O que ?? reciclagem?"} />
            <VerticalTab label={"Como descartar"} />
            <VerticalTab label={"Comunidade"} />
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
              <SectionTitle>Sistema 5 Rs</SectionTitle> &emsp;&emsp;Os 5 Rs s??o
              uma pol??tica que visa reduzir a gera????o de res??duos no nosso
              planeta, pensando na mudan??a de comportamento diante do consumo e
              a forma que lida com os res??duos gerados. Os 5 Rs consistem em
              cinco palavras: repensar, recusar, reduzir, reutilizar e reciclar.
              A reutiliza????o se refere a utilizar de um produto novamente que
              seria descartado posteriormente ao seu uso. Redu????o se refere o
              pensamento consumista, onde pergunta-se se ?? realmente necess??rio
              adquirir um novo objeto ou tamb??m saber poupar, repensar significa
              ter um novo pensamento sobre o meio ambiente, recusar ?? o
              pensamento que temos de n??o utilizar de empresas, ou bens, que n??o
              se importam com o meio ambiente.
            </TabContainer>
          )}
          {tab === 1 && (
            <TabContainer>
              <SectionTitle>O que e lixo?</SectionTitle>
              &emsp;&emsp;Os res??duos s??lidos urbanos, ou lixo urbano, s??o
              sobras de um determinado produto que podem, ou n??o, ter uma
              reutiliza????o. Existem diversos tipos de materiais e estes s??o
              classificados em algumas condi????es, os mais citados s??o: materiais
              org??nicos, eletr??nicos, hospitalares, radioativos, recicl??veis e
              n??o recicl??veis.
            </TabContainer>
          )}
          {tab === 2 && (
            <TabContainer>
              <SectionTitle>O que e reciclagem?</SectionTitle>
              &emsp;&emsp;Os materiais org??nicos podem ser definidos,
              biologicamente, como um material de origem animal ou vegetal, que
              s??o as sobras de alimentos consumidos pelos humanos. Os materiais
              eletr??nicos s??o declarados como res??duos de equipamento
              eletroeletr??nico, sendo normalmente descartados por n??o terem mais
              utilidade. Materiais hospitalares s??o proveniente de uso de
              atendimento hospitalar quanto para pacientes humanos quanto para
              animais. Lixos radioativos s??o oriundos de atividades nucleares,
              podendo ser produzidos em laborat??rios de exames e tamb??m de
              usinas nucleares. materiais recicl??veis s??o aqueles que possui
              propriedades restaurativas, total ou parcial, de algum produto
              para que possa novamente ser utilizado como mat??ria prima. N??o
              recicl??veis s??o os que n??o possuem essa capacidade restaurativa.
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
              &emsp;&emsp;Veja o que a comunidade j?? reciclou at?? agora e siga
              seu exemplo!
            </TabContainer>
          )}
        </Container>
      </Box>
    </Box>
  );
};

export default HomePage;
