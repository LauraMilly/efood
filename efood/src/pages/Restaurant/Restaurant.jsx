import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import styled from "styled-components";
import HeaderRestaurant from "./HeaderRestaurant";
import Footer from "../../components/Footer";
import Modal from "../../components/ProductModal";
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
  const [restaurant, setRestaurant] = useState(null);
  const [selectedProduct, setSelectedProduct] = useState(null);

  useEffect(() => {
    fetch("https://api-ebac.vercel.app/api/efood/restaurantes")
      .then((res) => res.json())
      .then((data) => {
        const found = data.find(
          (item) => item.id === Number(id)
        );
        setRestaurant(found);
      });
  }, [id]);

  if (!restaurant) {
    return (
      <Page>
        <HeaderRestaurant />
        <Container>
          <h2>Carregando...</h2>
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
          backgroundImage: `url(${restaurant.capa})`
        }}
      >
        <Overlay />
        <BannerContent>
          <Category>{restaurant.tipo}</Category>
          <Title>{restaurant.titulo}</Title>
        </BannerContent>
      </Banner>

      <Container>
        <Grid>
          {restaurant.cardapio.map((dish) => (
            <Card key={dish.id}>
              <Image src={dish.foto} alt={dish.nome} />
              <Content>
                <Name>{dish.nome}</Name>
                <Description>
                  {dish.descricao.slice(0, 120)}...
                </Description>
                <Button onClick={() => setSelectedProduct(dish)}>
                  Saiba mais
                </Button>
              </Content>
            </Card>
          ))}
        </Grid>
      </Container>

      {selectedProduct && (
        <Modal
          product={selectedProduct}
          onClose={() => setSelectedProduct(null)}
        />
      )}

      <Footer />
    </Page>
  );
}