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
{/*               <Grid
                xs={12}
                md={4}
              >
                <OverviewSummary
                  icon={
                    <Avatar
                      sx={{
                        backgroundColor: 'primary.main',
                        color: 'primary.contrastText',
                        height: 56,
                        width: 56
                      }}
                    >
                      <SvgIcon>
                        <ShoppingBagIcon />
                      </SvgIcon>
                    </Avatar>
                  }
                  label='Orders'
                  value='5610'
                />
              </Grid>
              <Grid
                xs={12}
                md={4}
              >
                <OverviewSummary
                  icon={
                    <Avatar
                      sx={{
                        backgroundColor: 'primary.main',
                        color: 'primary.contrastText',
                        height: 56,
                        width: 56
                      }}
                    >
                      <SvgIcon>
                        <ShoppingCartIcon />
                      </SvgIcon>
                    </Avatar>
                  }
                  label='Products'
                  value='23'
                />
              </Grid>
              <Grid
                xs={12}
                md={4}
              >
                <OverviewSummary
                  icon={
                    <Avatar
                      sx={{
                        backgroundColor: 'primary.main',
                        color: 'primary.contrastText',
                        height: 56,
                        width: 56
                      }}
                    >
                      <SvgIcon>
                        <CurrencyDollarIcon />
                      </SvgIcon>
                    </Avatar>
                  }
                  label='Transactions'
                  value='1942'
                />
              </Grid> */}

{/*               <Grid xs={12}>
                <OverviewKpi
                  chartSeries={[
                    {
                      data: [0, 20, 40, 30, 30, 44, 90],
                      name: 'Revenue'
                    }
                  ]}
                  stats={[
                    {
                      label: 'Revenue',
                      value: '$4,800.00'
                    },
                    {
                      label: 'NET',
                      value: '$4,900,24'
                    },
                    {
                      label: 'Pending orders',
                      value: '$1,600.50'
                    },
                    {
                      label: 'Due',
                      value: '$6,900.10'
                    },
                    {
                      label: 'Overdue',
                      value: '$6,500.80'
                    }
                  ]}
                />
              </Grid>

              <Grid xs={12}>
                <OverviewLatestCustomers
                  customers={[
                    {
                      id: 'a105ac46530704806ca58ede',
                      amountSpent: 684.45,
                      avatar: '/assets/avatars/avatar-fabiano-jorioz.jpg',
                      createdAt: subDays(subHours(subMinutes(now, 7), 3), 2).getTime(),
                      isOnboarded: true,
                      name: 'Fabiano Jorioz',
                      orders: 2
                    },
                    {
                      id: '126ed71fc9cbfabc601c56c5',
                      amountSpent: 0,
                      avatar: '/assets/avatars/avatar-meggie-heinonen.jpg',
                      createdAt: subDays(subHours(subMinutes(now, 7), 3), 2).getTime(),
                      isOnboarded: false,
                      name: 'Meggie Heinonen',
                      orders: 0
                    },
                    {
                      id: 'aafaeb0545357922aff32a7b',
                      amountSpent: 32.25,
                      avatar: '/assets/avatars/avatar-sean-picott.jpg',
                      createdAt: subDays(subHours(subMinutes(now, 11), 2), 3).getTime(),
                      isOnboarded: true,
                      name: 'Sean Picott',
                      orders: 1
                    },
                    {
                      id: '16b526d9e0fefe53f7eba66b',
                      amountSpent: 0,
                      avatar: '/assets/avatars/avatar-bell-covely.jpg',
                      createdAt: subDays(subHours(subMinutes(now, 18), 9), 5).getTime(),
                      isOnboarded: true,
                      name: 'Bell Covely',
                      orders: 0
                    },
                    {
                      id: 'fe035356923629912236d9a2',
                      amountSpent: 125.70,
                      avatar: '/assets/avatars/avatar-giraud-lamlin.jpg',
                      createdAt: subDays(subHours(subMinutes(now, 19), 18), 7).getTime(),
                      isOnboarded: false,
                      name: 'Giraud Lamlin',
                      orders: 1
                    }
                  ]}
                />
              </Grid> */}

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
                  View Now
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
      Name: "Electronics",
      Caption: "Electrify your friends!",
      contentPosition: "left",
      Items: [
          {
              Name: "Macbook Pro",
              Image: "https://source.unsplash.com/featured/?macbook"
          },
          {
              Name: "iPhone",
              Image: "https://source.unsplash.com/featured/?iphone"
          }
      ]
  },
  {
      Name: "Home Appliances",
      Caption: "Say no to manual home labour!",
      contentPosition: "middle",
      Items: [
          {
              Name: "Washing Machine WX9102",
              Image: "https://source.unsplash.com/featured/?washingmachine"
          },
          {
              Name: "Learus Vacuum Cleaner",
              Image: "https://source.unsplash.com/featured/?vacuum,cleaner"
          }
      ]
  },
  {
      Name: "Decoratives",
      Caption: "Give style and color to your living room!",
      contentPosition: "right",
      Items: [
          {
              Name: "Living Room Lamp",
              Image: "https://source.unsplash.com/featured/?lamp"
          },
          {
              Name: "Floral Vase",
              Image: "https://source.unsplash.com/featured/?vase"
          }
      ]
  }
]

export default Page;
