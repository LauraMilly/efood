import { useParams } from "react-router-dom";
import styled from "styled-components";
import HeaderRestaurant from "./HeaderRestaurant";
import Footer from "../../components/Footer";

const Page = styled.div`
  background: #fff8f2;
  font-family: "Poppins", sans-serif;
`;

const Banner = styled.div`
  position: relative;
  height: 320px;
  background-size: cover;
  background-position: center;
  display: flex;
`;

const Overlay = styled.div`
  position: absolute;
  inset: 0;
  background: rgba(0, 0, 0, 0.55);
`;

const BannerContent = styled.div`
  position: relative;
  z-index: 2;
  max-width: 1200px;
  width: 100%;
  margin: 0 auto;
  padding: 32px 32px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

const Category = styled.span`
  font-family: "Roboto", sans-serif;
  font-weight: 100;
  font-size: 33px;
  color: #ffffff;
`;

const Title = styled.h1`
  font-size: 33,25px;
  font-weight: 700;
  color: #ffffff;
  margin: 0;
`;

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 56px 32px 80px;
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 40px;
`;

const Card = styled.div`
  background: #e66767;
  border: 6px solid #e86b6b;
  display: flex;
  flex-direction: column;
  width: 100%;
`;

const Image = styled.img`
  width: 100%;
  height: 220px;
  object-fit: cover;
  display: block;
`;

const Content = styled.div`
  padding: 8px 5px;
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

const Name = styled.h3`
  margin: 0;
  font-size: 20px;
  font-weight: 700;
  color: #fcecdc;
`;

const Description = styled.p`
  font-size: 14px;
  line-height: 20px;
  color: #fcecdc;
  margin: 0;
`;

const Button = styled.button`
  margin-top: 12px;
  background: #fcecdc;
  border: none;
  color: #e66767;
  padding: 6px 10px;
  width: 100%;
  font-size: 14px;
  font-weight: 700;
  cursor: pointer;
`;


export default function Restaurant() {
  const { id } = useParams();

  const restaurants = [
    {
      id: 1,
      name: "La Dolce Vita Trattoria",
      category: "Italiana",
      banner:
        "https://images.unsplash.com/photo-1543353071-873f17a7a088?auto=format&fit=crop&w=1600&q=80",
      dishes: [
        {
          id: 1,
          name: "Ravioli al Tartufo Nero",
          image:
            "https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=800&q=80"
        },
        {
          id: 2,
          name: "Spaghetti alla Carbonara",
          image:
            "https://images.unsplash.com/photo-1588013273468-315fd88ea34c?auto=format&fit=crop&w=800&q=80"
        },
        {
          id: 3,
          name: "Risotto ai Funghi Porcini",
          image:
            "https://images.unsplash.com/photo-1603133872878-684f208fb84b?auto=format&fit=crop&w=800&q=80"
        },
        {
          id: 4,
          name: "Ossobuco alla Milanese",
          image:
            "https://images.unsplash.com/photo-1606756790138-261d2b21cd75?auto=format&fit=crop&w=800&q=80"
        },
        {
          id: 5,
          name: "Melanzane alla Parmigiana",
          image:
            "https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=800&q=80"
        },
        {
          id: 6,
          name: "Frutti di Mare Linguine",
          image:
            "https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=800&q=80"
        }
      ]
    }
  ];

  const restaurant = restaurants.find(
    (item) => item.id === Number(id)
  );

  const descricaoPadrao =
    "Prato tradicional italiano preparado com ingredientes frescos e selecionados, garantindo sabor autêntico e experiência única.";

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
        <Overlay />
        <BannerContent>
          <Category>{restaurant.category}</Category>
          <Title>{restaurant.name}</Title>
        </BannerContent>
      </Banner>
      <Container>
        <Grid>
          {restaurant.dishes.map((dish) => (
            <Card key={dish.id}>
              <Image src={dish.image} alt={dish.name} />
              <Content>
                <Name>{dish.name}</Name>
                <Description>{descricaoPadrao}</Description>
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
