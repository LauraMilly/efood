import { Link } from "react-router-dom";
import styled from "styled-components";
import Footer from "../../components/Footer";

const Page = styled.div`
  background: #fff8f2;
`;

const Hero = styled.section`
  background-image: url("https://e-food-flame-nine.vercel.app/static/media/Vector.784e90d06596c838a246.png");
  background-repeat: repeat;
  padding: 64px 16px 96px;
  text-align: center;
`;

const LogoWrapper = styled.div`
  margin-bottom: 48px;
`;

const LogoImage = styled.img`
  height: 40px;
`;

const Title = styled.h1`
  color: #e66767;
  font-size: 36px;
  max-width: 640px;
  margin: 0 auto;
  line-height: 1.2;

  @media (max-width: 768px) {
    font-size: 28px;
  }
`;

const Container = styled.section`
  max-width: 1024px;
  margin: 0 auto;
  padding: 48px 16px;
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 32px;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const Card = styled.div`
  background: #fff;
  border: 1px solid #e66767;
`;

const ImageWrapper = styled.div`
  position: relative;
`;

const Image = styled.img`
  width: 100%;
  height: 200px;
  object-fit: cover;
`;

const Tag = styled.span`
  position: absolute;
  top: 8px;
  right: 8px;
  background: #e66767;
  color: #fff;
  font-size: 12px;
  padding: 4px 8px;
`;

const Content = styled.div`
  padding: 16px;
`;

const HeaderCard = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Name = styled.h3`
  color: #e66767;
  font-size: 18px;
`;

const Rating = styled.span`
  color: #e66767;
  font-size: 14px;
`;

const Description = styled.p`
  font-size: 14px;
  margin: 16px 0;
  color: #333;
`;

const Button = styled(Link)`
  display: inline-block;
  background: #e66767;
  color: #fff;
  padding: 8px 16px;
  font-size: 14px;
`;

export default function Home() {
  const restaurants = [
    {
      id: 1,
      name: "Bella Tavola Italiana",
      category: "italiana",
      rating: 4.7,
      description:
        "A paixão dos nossos chefs pela culinária italiana é evidente em cada prato.",
      image:
        "https://images.unsplash.com/photo-1528605248644-14dd04022da1"
    },
    {
      id: 2,
      name: "Casa das Delícias Árabes",
      category: "árabe",
      rating: 4.8,
      description:
        "Uma verdadeira experiência culinária do Oriente Médio.",
      image:
        "https://images.unsplash.com/photo-1542528180-a1208c5169a5"
    },
    {
      id: 3,
      name: "Sakura Sushi House",
      category: "japonês",
      rating: 4.9,
      description:
        "Culinária japonesa sofisticada e autêntica.",
      image:
        "https://images.unsplash.com/photo-1553621042-f6e147245754"
    },
    {
      id: 4,
      name: "Cantinho Lusitano",
      category: "português",
      rating: 4.8,
      description:
        "Restaurante tradicional português com receitas clássicas.",
      image:
        "https://images.unsplash.com/photo-1529692236671-f1f6cf9683ba"
    },
    {
      id: 5,
      name: "Piazza del Forno",
      category: "pizzaria",
      rating: 4.7,
      description:
        "Pizzas artesanais assadas em forno a lenha.",
      image:
        "https://images.unsplash.com/photo-1513104890138-7c749659a591"
    },
    {
      id: 6,
      name: "Jardim da Terra",
      category: "vegano",
      rating: 4.8,
      description:
        "Pratos criativos e saudáveis à base de plantas.",
      image:
        "https://images.unsplash.com/photo-1504754524776-8f4f37790ca0"
    }
  ];

  return (
    <Page>
      <Hero>
        <LogoWrapper>
          <LogoImage src="/efood.png" alt="efood" />
        </LogoWrapper>

        <Title>
          Viva experiências gastronômicas
          <br />
          no conforto da sua casa
        </Title>
      </Hero>

      <Container>
        <Grid>
          {restaurants.map((r) => (
            <Card key={r.id}>
              <ImageWrapper>
                <Image src={r.image} alt={r.name} />
                <Tag>{r.category}</Tag>
              </ImageWrapper>

              <Content>
                <HeaderCard>
                  <Name>{r.name}</Name>
                  <Rating>⭐ {r.rating}</Rating>
                </HeaderCard>

                <Description>{r.description}</Description>

                <Button to={`/restaurante/${r.id}`}>
                  Saiba mais
                </Button>
              </Content>
            </Card>
          ))}
        </Grid>
      </Container>

      <Footer />
    </Page>
  );
}
