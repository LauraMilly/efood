import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import {
  selectCartItems,
  selectCartTotal,
  removeFromCart
} from "../store/cartSlice";

const Overlay = styled.div`
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.7);
  z-index: 1000;
`;

const Drawer = styled.div`
  position: fixed;
  top: 0;
  right: 0;
  width: 360px;
  height: 100vh; /* ocupa tela toda */
  background: #e66767;
  padding: 32px 16px;
  display: flex;
  flex-direction: column;
  z-index: 1001;
  overflow-y: auto; /* 🔥 scroll no drawer inteiro */
`;

const CloseButton = styled.button`
  position: absolute;
  top: 16px;
  right: 16px;
  background: transparent;
  border: none;
  color: #fff;
  font-size: 28px;
  cursor: pointer;
`;

const Items = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
  margin-top: 32px;
`;

const Item = styled.div`
  background: #f5e6d6;
  padding: 12px;
  display: flex;
  gap: 12px;
  position: relative;
`;

const Img = styled.img`
  width: 80px;
  height: 80px;
  object-fit: cover;
`;

const Info = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  color: #e66767;
`;

const Name = styled.h4`
  margin: 0;
  font-size: 18px;
  font-weight: 700;
`;

const Price = styled.p`
  margin-top: 12px;
  font-size: 16px;
  font-weight: 500;
`;

const Remove = styled.button`
  background-image: url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAADrSURBVHgBzZI7CsJAGIT/3fWBlSgpxVIsrK0E7T2ACIJYKErOIVgEBUFExANY2lhbJCkSq7R2ioW5gZDNCoGFmIdJ0MKpZn5mPrZYgC+Fgo7dSkWYtVpHwJiX0FJV25JhmBBHt9Fo571dA27uF6D7ZLIF23aCxVgjRYjMM2PMYgBNjJDiZABS2mwGPpopiguI0GM8XrkzdgdKaSZiD7Yn47BiI58vcK90OrWwXijg0OvJ3FcFYZ8YEFd/DCjmciL3c13vJwYgSTpxP9W0cyzAk1JnC5+E8dtX8JUvw6GSJSQdOEYIyut1HX6pF13FPTvfs0EIAAAAAElFTkSuQmCC");
  background-repeat: no-repeat;
  background-position: center;
  background-size: contain;
  border: none;
  width: 20px;
  height: 20px;
  position: absolute;
  bottom: 12px;
  right: 12px;
  background-color: transparent;
  cursor: pointer;
`;

const Footer = styled.div`
  margin-top: 32px;
`;

const Total = styled.div`
  display: flex;
  justify-content: space-between;
  color: #fff;
  font-weight: 700;
  font-size: 18px;
  margin-bottom: 16px;
`;

const Button = styled.button`
  width: 100%;
  background: #f5e6d6;
  border: none;
  padding: 12px;
  font-weight: 700;
  color: #e66767;
  cursor: pointer;
`;

export default function CartDrawer({ onClose }) {
  const dispatch = useDispatch();
  const items = useSelector(selectCartItems);
  const total = useSelector(selectCartTotal);

  return (
    <>
      <Overlay onClick={onClose} />

      <Drawer>
        <CloseButton onClick={onClose}>✕</CloseButton>

        <Items>
          {items.map((item) => (
            <Item key={item.id}>
              <Img src={item.foto} alt={item.nome} />

              <Info>
                <Name>{item.nome}</Name>
                <Price>
                  R$ {Number(item.preco || 0).toFixed(2)}
                </Price>
              </Info>

              <Remove
                onClick={() => dispatch(removeFromCart(item.id))}
              />
            </Item>
          ))}
        </Items>

        <Footer>
          <Total>
            <span>Valor total</span>
            <span>
              R$ {Number(total || 0).toFixed(2)}
            </span>
          </Total>

          <Button>Continuar com a entrega</Button>
        </Footer>
      </Drawer>
    </>
  );
}