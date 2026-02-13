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
  background: #ffffff;
  border: 1px solid #e66767;
  display: flex;
  flex-direction: column;
`;

const ImageWrapper = styled.div`
  position: relative;
`;

const Image = styled.img`
  width: 100%;
  height: 217px;
  object-fit: cover;
`;

const TagsContainer = styled.div`
  position: absolute;
  top: 16px;
  right: 16px;
  display: flex;
  gap: 8px;
`;

const Tag = styled.span`
  background: #e66767;
  color: #fff;
  font-size: 12px;
  font-weight: 700;
  padding: 6px 8px;
`;

const Content = styled.div`
  padding: 9px;
  flex: 1;
`;

const HeaderCard = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 8px;
`;

const Name = styled.h3`
  color: #e66767;
  font-size: 18px;
  font-weight: 700;
  margin: 0;
`;

const RatingContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 6px;
`;

const RatingNumber = styled.span`
  color: #e66767;
  font-size: 18px;
  font-weight: 700;
`;

const Star = styled.svg`
  width: 30px;
  height: 30px;
  fill: #ffb930;
`;

const Description = styled.p`
  font-size: 15px;
  line-height: 20px;
  color: #e66767;
  margin: 16px 0;
   font-weight: 230;
`;

const Button = styled(Link)`
  display: inline-block;
  background: #e66767;
  color: #fff;
  padding: 6px 12px;
  font-size: 14px;
  font-weight: 700;
  text-decoration: none;
`;

export default function Home() {
  const restaurants = [
    {
      id: 1,
      name: "Bella Tavola Italiana",
      category: "Italiana",
      rating: 4.7,
      description:
        "Peça já o melhor da culinária italiana no conforto da sua casa! Massas frescas, pizzas artesanais e pratos quentes irresistíveis.",
      image:
        "https://images.unsplash.com/photo-1528605248644-14dd04022da1"
    },
    {
      id: 2,
      name: "Casa das Delícias Árabes",
      category: "Árabe",
      rating: 4.8,
      description:
        "Sabores autênticos do Oriente Médio preparados com ingredientes selecionados e muito carinho.",
      image:
        "https://images.unsplash.com/photo-1542528180-a1208c5169a5"
    },
    {
      id: 3,
      name: "Hioki Sushi",
      category: "Japonesa",
      rating: 4.9,
      description:
        "Peça já o melhor da culinária japonesa no conforto da sua casa! Sushis frescos, sashimis deliciosos e pratos quentes irresistíveis.",
      image:
        "https://images.unsplash.com/photo-1553621042-f6e147245754"
    },
    {
      id: 4,
      name: "Cantinho Lusitano",
      category: "Portuguesa",
      rating: 4.8,
      description:
        "Receitas clássicas portuguesas feitas com tradição e sabor.",
      image:
        "https://images.unsplash.com/photo-1529692236671-f1f6cf9683ba"
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
                <TagsContainer>
                  <Tag>Destaque da semana</Tag>
                  <Tag>{r.category}</Tag>
                </TagsContainer>
              </ImageWrapper>

              <Content>
                <HeaderCard>
                  <Name>{r.name}</Name>
                  <RatingContainer>
                    <RatingNumber>{r.rating}</RatingNumber>
                    <Star viewBox="0 0 24 24">
                      <path d="M12 17.27L18.18 21 16.54 13.97 22 9.24 14.81 8.63 12 2 9.19 8.63 2 9.24 7.46 13.97 5.82 21z" />
                    </Star>
                  </RatingContainer>
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
