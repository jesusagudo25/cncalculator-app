import { Helmet } from 'react-helmet-async';

import {
  Card,
  Box,
  Container,
  Stack,
  CardContent,
  CardMedia,
  Typography,
  Unstable_Grid2 as Grid,
  Paper,
  Button
} from '@mui/material';

import Carousel from 'react-material-ui-carousel'
import '../style/carousel.scss';


const Page = () => (
  
  <>
    <Helmet>
      <title>
        Inicio | C:N Calculator
      </title>
    </Helmet>
    <Box
      sx={{
        flexGrow: 1,
        py: 8
      }}
    >
      <Container maxWidth="xl">
        <Stack spacing={3}>
          <div>
            <Typography variant="h4">
              Hola, bienvenido de nuevo
            </Typography>
          </div>
          <div>
            <Grid
              container
              spacing={3}
            >

            </Grid>
          </div>
          <Carousel
                autoPlay={true}
                animation={"fade"}
                indicators={true}
                duration={500}
                navButtonsAlwaysVisible={false}
                navButtonsAlwaysInvisible={false}
                cycleNavigation={true}
                navButtonsProps={{
                    style: {
                        backgroundColor: 'white',
                        color: 'black',
                        borderRadius: 0
                    }
                }}
                fullHeightHover={true}
                swipe={true}
            >
                {
                    items.map((item, index) => {
                        return <Banner item={item} key={index} contentPosition={item.contentPosition} />
                    })
                }
            </Carousel>
        </Stack>
      </Container>
    </Box>
  </>
);

const Banner = (props) => {

  const contentPosition = props.contentPosition ? props.contentPosition : "left"
  const totalItems = props.length ? props.length : 3;
  const mediaLength = totalItems - 1;

  let items = [];
  const content = (
      <Grid item xs={4} key="content">
          <CardContent className="Content">
              <Typography className="Title">
                  {props.item.Name}
              </Typography>

              <Typography className="Caption">
                  {props.item.Caption}
              </Typography>

              <Button variant="outlined" className="ViewButton">
                  Ver más
              </Button>
          </CardContent>
      </Grid>
  )


  for (let i = 0; i < mediaLength; i++) {
      const item = props.item.Items[i];

      const media = (
          <Grid item xs={4} key={item.Name}>
              <CardMedia
                  className="Media"
                  image={item.Image}
                  title={item.Name}
              >
                  <Typography className="MediaCaption">
                      {item.Name}
                  </Typography>
              </CardMedia>

          </Grid>
      )

      items.push(media);
  }

  if (contentPosition === "left") {
      items.unshift(content);
  } else if (contentPosition === "right") {
      items.push(content);
  } else if (contentPosition === "middle") {
      items.splice(items.length / 2, 0, content);
  }

  return (
      <Card raised className="Banner">
          <Grid container spacing={0} className="BannerGrid">
              {items}
          </Grid>
      </Card>
  )
}

const items = [
  {
      Name: "Innovación Agropecuaria",
      Caption: "Impulsa tu emprendimiento y se parte de la economía circular del agro!",
      contentPosition: "left",
      Items: [
          {
              Name: "Economia Circular",
              Image: "https://i.imgur.com/ZRIFi0h.png"
          },
          {
              Name: "Emprendimiento",
              Image: "https://i.imgur.com/fLITOfo.jpeg"
          }
      ]
  },
  {
      Name: "Automatización de procesos",
      Caption: "Automatiza el cálculo de los insumos o ingredientes que necesitas para tu producción!",
      contentPosition: "middle",
      Items: [
          {
              Name: "Calculos matemáticos",
              Image: "https://i.imgur.com/8J2ott0.jpeg"
          },
          {
              Name: "Automatización",
              Image: "https://i.imgur.com/tGvvAzv.jpeg"
          }
      ]
  },
  {
      Name: "Planificación a la medida",
      Caption: "Planificas tu compostaje y dejas atrás el ensayo y error!",
      contentPosition: "right",
      Items: [
          {
              Name: "Evita el ensayo y error",
              Image: "https://i.imgur.com/gjEkjIZ.jpeg"
          },
          {
              Name: "Compostaje",
              Image: "https://i.imgur.com/yEN6JLy.jpeg"
          }
      ]
  }
]

export default Page;
