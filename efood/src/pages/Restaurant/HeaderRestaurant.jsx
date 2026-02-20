import { Link } from "react-router-dom";
import styled from "styled-components";

const Header = styled.header`
  background-image: url("https://e-food-flame-nine.vercel.app/static/media/Vector.784e90d06596c838a246.png");
  background-repeat: repeat;
  height: 186px;
  display: flex;
  align-items: center;
`;

const Container = styled.div`
  max-width: 1200px;
  width: 100%;
  margin: 0 auto;
  padding: 0 32px;
  display: grid;
  grid-template-columns: 1fr auto 1fr;
  align-items: center;
`;

const Left = styled.div`
  justify-self: start;
`;

const Center = styled.div`
  justify-self: center;
`;

const Right = styled.div`
  justify-self: end;
`;

const TextLink = styled(Link)`
  color: #e66767;
  font-size: 22px;
  font-weight: 700;
  text-decoration: none;
`;

const Logo = styled.img`
  height: 60px;
`;

const CartText = styled.span`
  color: #e66767;
  font-size: 22px;
  font-weight: 700;
`;

export default function HeaderRestaurant() {
  return (
    <Header>
      <Container>
        <Left>
          <TextLink to="/">Restaurantes</TextLink>
        </Left>

        <Center>
          <Link to="/">
            <Logo src="/efood.png" alt="efood" />
          </Link>
        </Center>

        <Right>
          <CartText>0 produto(s) no carrinho</CartText>
        </Right>
      </Container>
    </Header>
  );
}
