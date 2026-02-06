import { Link } from "react-router-dom";
import styled from "styled-components";

const Header = styled.header`
  background-image: url("https://e-food-flame-nine.vercel.app/static/media/Vector.784e90d06596c838a246.png");
  background-repeat: repeat;
  padding: 24px 16px;
`;

const Container = styled.div`
  max-width: 1024px;
  margin: 0 auto;
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
  font-size: 16px;
  font-weight: 600;
`;

const Logo = styled.img`
  height: 36px;
`;

const CartText = styled.span`
  color: #e66767;
  font-size: 16px;
  font-weight: 600;
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
