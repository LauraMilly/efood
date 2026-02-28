import { Link } from "react-router-dom";
import styled from "styled-components";
import { useSelector } from "react-redux";
import { selectCartItems } from "../../store/cartSlice";
import { useState } from "react";
import CartDrawer from "../../components/CartDrawer";
import Checkout from "../../components/Checkout";

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

const Left = styled.div`justify-self: start;`;
const Center = styled.div`justify-self: center;`;
const Right = styled.div`justify-self: end;`;

const TextLink = styled(Link)`
  color: #e66767;
  font-size: 22px;
  font-weight: 700;
  text-decoration: none;
`;

const Logo = styled.img`height: 60px;`;

const CartText = styled.button`
  background: transparent;
  border: none;
  color: #e66767;
  font-size: 22px;
  font-weight: 700;
  cursor: pointer;
`;

export default function HeaderRestaurant() {
  const items = useSelector(selectCartItems);

  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);

  const totalQuantidade = items.reduce(
    (acc, item) => acc + item.quantidade,
    0
  );

  return (
    <>
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
            <CartText onClick={() => setIsCartOpen(true)}>
              {totalQuantidade} produto(s) no carrinho
            </CartText>
          </Right>
        </Container>
      </Header>

      {isCartOpen && (
        <CartDrawer
          onClose={() => setIsCartOpen(false)}
          openCheckout={() => {
            setIsCartOpen(false);
            setIsCheckoutOpen(true);
          }}
        />
      )}

      {isCheckoutOpen && (
        <Checkout
          onClose={() => setIsCheckoutOpen(false)}
        />
      )}
    </>
  );
}