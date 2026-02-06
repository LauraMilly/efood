import { useParams } from "react-router-dom";
import styled from "styled-components";
import HeaderRestaurant from "./HeaderRestaurant";
import Footer from "../../components/Footer";


const Page = styled.div`
  background: #fff8f2;
`;

const Banner = styled.div`
  height: 280px;
  background-size: cover;
  background-position: center;
  display: flex;
  align-items: flex-end;
  padding: 32px;
`;

const BannerInfo = styled.div`
  color: #fff;
`;

const Category = styled.span`
  font-size: 14px;
`;

const Title = styled.h1`
  font-size: 32px;
`;

const Container = styled.div`
  max-width: 1024px;
  margin: 0 auto;
  padding: 48px 16px;
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 32px;
`;

const Card = styled.div`
  background: #e66767;
  color: #fff;
`;

const Image = styled.img`
  width: 100%;
  height: 160px;
  object-fit: cover;
`;

const Content = styled.div`
  padding: 16px;
`;

const Name = styled.h3`
  margin-bottom: 8px;
`;

const Description = styled.p`
  font-size: 14px;
  margin-bottom: 16px;
`;

const Button = styled.button`
  background:  #fcecdc ;
  border: 1px solid #fff;
  color: #e66767;
  padding: 8px;
  width: 100%;
  cursor: pointer;
`;

export default function Restaurant() {
  const { id } = useParams();

  const restaurants = [
    {
      id: 1,
      name: "Bella Tavola Italiana",
      category: "Italiana",
      banner:
        "https://images.unsplash.com/photo-1528605248644-14dd04022da1",
      dishes: [
        {
          id: 1,
          name: "Ravioli al Tartufo Nero",
          description: "Ravioli artesanal com trufas negras.",
          image:
            "https://images.unsplash.com/photo-1544025162-d76694265947"
        },
        {
          id: 2,
          name: "Spaghetti alla Carbonara",
          description: "Clássico italiano com molho cremoso.",
          image:
            "https://images.unsplash.com/photo-1588013273468-315fd88ea34c"
        },
        {
          id: 3,
          name: "Risotto ai Funghi Porcini",
          description: "Risoto cremoso com cogumelos.",
          image:
            "https://images.unsplash.com/photo-1603133872878-684f208fb84b"
        },
        {
          id: 4,
          name: "Frutti di Mare Linguine",
          description: "Massa com frutos do mar.",
          image:
            "https://images.unsplash.com/photo-1551183053-bf91a1d81141"
        },
        {
          id: 5,
          name: "Melanzane alla Parmigiana",
          description: "Berinjela assada com parmesão.",
          image:
            "https://images.unsplash.com/photo-1598866594230-a7c12756260f"
        },
        {
          id: 6,
          name: "Frutti di Mare Linguine",
          description: "Massa com frutos do mar.",
          image:
            "https://images.unsplash.com/photo-1551183053-bf91a1d81141"
        }
      ]
    }
  ];

  const restaurant = restaurants.find(
    (item) => item.id === Number(id)
  );

  if (!restaurant) {
    return (
      <Page>
        <HeaderRestaurant />
        <Container>
          <h2>Restaurante não encontrado</h2>
        </Container>
        <Footer />
      </Page>
    );
  }

  return (
    <Page>
      <HeaderRestaurant />

      <Banner
        style={{
          backgroundImage: `url(${restaurant.banner})`
        }}
      >
        <BannerInfo>
          <Category>{restaurant.category}</Category>
          <Title>{restaurant.name}</Title>
        </BannerInfo>
      </Banner>

      <Container>
        <Grid>
          {restaurant.dishes.map((dish) => (
            <Card key={dish.id}>
              <Image src={dish.image} alt={dish.name} />
              <Content>
                <Name>{dish.name}</Name>
                <Description>{dish.description}</Description>
                <Button>Saiba mais</Button>
              </Content>
            </Card>
          ))}
        </Grid>
      </Container>

      <Footer />
    </Page>
  );
}
