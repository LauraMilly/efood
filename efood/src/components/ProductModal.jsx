import styled from "styled-components";
import { useDispatch } from "react-redux";
import { addToCart } from "../store/cartSlice";
import { toast } from "react-toastify";

const Overlay = styled.div`
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.8);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
  padding: 0 32px;
`;

const ModalContainer = styled.div`
  background: #e66767;
  width: 100%;
  max-width: 1200px;
  display: flex;
  padding: 32px;
  position: relative;
  gap: 32px;
`;

const Image = styled.img`
  width: 280px;
  height: 280px;
  object-fit: cover;
`;

const Content = styled.div`
  flex: 1;
  color: #fff;
  display: flex;
  flex-direction: column;
`;

const CloseButton = styled.button`
  position: absolute;
  top: 16px;
  right: 16px;
  background: transparent;
  border: none;
  color: #fff;
  font-size: 22px;
  cursor: pointer;
`;

const Title = styled.h2`
  font-size: 24px;
  font-weight: 700;
  margin-bottom: 16px;
`;

const Description = styled.p`
  font-size: 14px;
  line-height: 22px;
  margin-bottom: 16px;
  font-weight: 400;
`;

const Portion = styled.p`
  font-size: 14px;
  margin-bottom: 16px;
`;

const Button = styled.button`
  background: #fcecdc;
  border: none;
  color: #e66767;
  padding: 8px 12px;
  font-weight: 700;
  font-size: 14px;
  cursor: pointer;
  width: fit-content;
`;

export default function ProductModal({ product, onClose }) {
  const dispatch = useDispatch();

  if (!product) return null;

  const handleAddToCart = () => {
    dispatch(addToCart(product));
    toast.success("Produto adicionado ao carrinho!");
    onClose();
  };

  return (
    <Overlay onClick={onClose}>
      <ModalContainer onClick={(e) => e.stopPropagation()}>
        <CloseButton onClick={onClose}>✕</CloseButton>

        <Image
          src={product.foto || ""}
          alt={product.nome || "Produto"}
        />

        <Content>
          <Title>{product.nome || "Produto"}</Title>

          <Description>
            {product.descricao || "Descrição não disponível."}
          </Description>

          <Portion>
            {product.porcao || "Porção não informada"}
          </Portion>

          <Button onClick={handleAddToCart}>
            Adicionar ao carrinho - R${" "}
            {Number(product.preco || 0).toFixed(2)}
          </Button>
        </Content>
      </ModalContainer>
    </Overlay>
  );
}