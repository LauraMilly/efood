import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import {
  selectCartItems,
  selectCartTotal,
  clearCart
} from "../store/cartSlice";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

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
  width: 420px;
  height: 100vh;
  background: #e66767;
  padding: 32px;
  display: flex;
  flex-direction: column;
  z-index: 1001;
  overflow-y: auto;
`;

const Title = styled.h2`
  color: #fff;
  font-size: 16px;
  font-weight: 700;
  margin-bottom: 16px;
`;

const Label = styled.label`
  color: #fff;
  font-size: 12px;
  font-weight: 700;
  margin-bottom: 4px;
  display: block;
`;

const Input = styled.input`
  width: 100%;
  height: 32px;
  padding: 8px;
  border: ${(props) => (props.error ? "2px solid #ffb3b3" : "none")};
  background: #f5e6d6;
  font-size: 12px;
  margin-bottom: 4px;
`;

const ErrorText = styled.span`
  color: #ffe5e5;
  font-size: 11px;
  margin-bottom: 8px;
  display: block;
`;

const Row = styled.div`
  display: flex;
  gap: 16px;

  div {
    flex: 1;
  }
`;

const Button = styled.button`
  width: 100%;
  height: 32px;
  margin-top: 8px;
  background: #f5e6d6;
  border: none;
  font-weight: 700;
  font-size: 14px;
  color: #e66767;
  cursor: pointer;
`;

const SecondaryButton = styled(Button)`
  margin-top: 8px;
`;

const Text = styled.p`
  color: #fff;
  font-size: 14px;
  line-height: 22px;
  margin-bottom: 16px;
`;

export default function Checkout({ onClose }) {
  const cartItems = useSelector(selectCartItems);
  const total = useSelector(selectCartTotal);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [step, setStep] = useState("delivery");
  const [orderId, setOrderId] = useState(null);

  const [form, setForm] = useState({
    receiver: "",
    address: "",
    city: "",
    zipCode: "",
    number: "",
    complement: "",
    cardName: "",
    cardNumber: "",
    cvv: "",
    month: "",
    year: ""
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    let { name, value } = e.target;

    if (
      name === "zipCode" ||
      name === "number" ||
      name === "cardNumber" ||
      name === "cvv" ||
      name === "month" ||
      name === "year"
    ) {
      value = value.replace(/\D/g, "");
    }

    setForm({
      ...form,
      [name]: value
    });

    setErrors({
      ...errors,
      [name]: ""
    });
  };

  const validateDelivery = () => {
    const newErrors = {};

    if (!form.receiver.trim())
      newErrors.receiver = "Informe quem irá receber";

    if (!form.address.trim())
      newErrors.address = "Informe o endereço";

    if (!form.city.trim())
      newErrors.city = "Informe a cidade";

    if (!form.zipCode.trim()) {
      newErrors.zipCode = "Informe o CEP";
    } else if (!/^\d{8}$/.test(form.zipCode)) {
      newErrors.zipCode = "CEP deve conter 8 números";
    }

    if (!form.number.trim()) {
      newErrors.number = "Informe o número";
    } else if (!/^\d+$/.test(form.number)) {
      newErrors.number = "Número deve conter apenas números";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const validatePayment = () => {
    const newErrors = {};

    if (!form.cardName.trim())
      newErrors.cardName = "Informe o nome no cartão";

    if (!form.cardNumber.trim()) {
      newErrors.cardNumber = "Informe o número do cartão";
    } else if (!/^\d{16}$/.test(form.cardNumber)) {
      newErrors.cardNumber = "Cartão deve conter 16 números";
    }

    if (!form.cvv.trim()) {
      newErrors.cvv = "Informe o CVV";
    } else if (!/^\d{3,4}$/.test(form.cvv)) {
      newErrors.cvv = "CVV inválido";
    }

    if (!form.month.trim()) {
      newErrors.month = "Informe o mês";
    } else if (!/^(0?[1-9]|1[0-2])$/.test(form.month)) {
      newErrors.month = "Mês inválido (1-12)";
    }

    if (!form.year.trim()) {
      newErrors.year = "Informe o ano";
    } else if (!/^\d{4}$/.test(form.year)) {
      newErrors.year = "Ano inválido";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleCheckout = async () => {
    if (!validatePayment()) return;

    try {
      const payload = {
        products: cartItems.map((item) => ({
          id: item.id,
          price: item.preco
        })),
        delivery: {
          receiver: form.receiver,
          address: {
            description: form.address,
            city: form.city,
            zipCode: form.zipCode,
            number: Number(form.number),
            complement: form.complement || ""
          }
        },
        payment: {
          card: {
            name: form.cardName,
            number: form.cardNumber,
            code: Number(form.cvv),
            expires: {
              month: Number(form.month),
              year: Number(form.year)
            }
          }
        }
      };

      const response = await fetch(
        "https://api-ebac.vercel.app/api/efood/checkout",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload)
        }
      );

      if (!response.ok) throw new Error();

      const data = await response.json();
      setOrderId(data.orderId);
      setStep("confirmation");
      dispatch(clearCart());
    } catch {
      alert("Erro ao finalizar pedido.");
    }
  };

  return (
    <>
      <Overlay onClick={onClose} />

      <Drawer>
        {step === "delivery" && (
          <>
            <Title>Entrega</Title>

            <Label>Quem irá receber</Label>
            <Input
              name="receiver"
              onChange={handleChange}
              error={errors.receiver}
            />
            {errors.receiver && <ErrorText>{errors.receiver}</ErrorText>}

            <Label>Endereço</Label>
            <Input
              name="address"
              onChange={handleChange}
              error={errors.address}
            />
            {errors.address && <ErrorText>{errors.address}</ErrorText>}

            <Label>Cidade</Label>
            <Input name="city" onChange={handleChange} error={errors.city} />
            {errors.city && <ErrorText>{errors.city}</ErrorText>}

            <Row>
              <div>
                <Label>CEP</Label>
                <Input
                  name="zipCode"
                  onChange={handleChange}
                  error={errors.zipCode}
                />
                {errors.zipCode && <ErrorText>{errors.zipCode}</ErrorText>}
              </div>

              <div>
                <Label>Número</Label>
                <Input
                  name="number"
                  onChange={handleChange}
                  error={errors.number}
                />
                {errors.number && <ErrorText>{errors.number}</ErrorText>}
              </div>
            </Row>

            <Label>Complemento (opcional)</Label>
            <Input name="complement" onChange={handleChange} />

            <Button
              onClick={() => {
                if (validateDelivery()) setStep("payment");
              }}
            >
              Continuar com o pagamento
            </Button>
          </>
        )}

        {step === "payment" && (
          <>
            <Title>Pagamento - Valor a pagar R$ {total.toFixed(2)}</Title>

            <Label>Nome no cartão</Label>
            <Input
              name="cardName"
              onChange={handleChange}
              error={errors.cardName}
            />
            {errors.cardName && <ErrorText>{errors.cardName}</ErrorText>}

            <Row>
              <div>
                <Label>Número do cartão</Label>
                <Input
                  name="cardNumber"
                  onChange={handleChange}
                  error={errors.cardNumber}
                />
                {errors.cardNumber && (
                  <ErrorText>{errors.cardNumber}</ErrorText>
                )}
              </div>

              <div>
                <Label>CVV</Label>
                <Input name="cvv" onChange={handleChange} error={errors.cvv} />
                {errors.cvv && <ErrorText>{errors.cvv}</ErrorText>}
              </div>
            </Row>

            <Row>
              <div>
                <Label>Mês de vencimento</Label>
                <Input
                  name="month"
                  onChange={handleChange}
                  error={errors.month}
                />
                {errors.month && <ErrorText>{errors.month}</ErrorText>}
              </div>

              <div>
                <Label>Ano de vencimento</Label>
                <Input
                  name="year"
                  onChange={handleChange}
                  error={errors.year}
                />
                {errors.year && <ErrorText>{errors.year}</ErrorText>}
              </div>
            </Row>

            <Button onClick={handleCheckout}>
              Finalizar pagamento
            </Button>

            <SecondaryButton onClick={() => setStep("delivery")}>
              Voltar para edição de endereço
            </SecondaryButton>
          </>
        )}

        {step === "confirmation" && (
          <>
            <Title>Pedido realizado - {orderId}</Title>

            <Text>
              Estamos felizes em informar que seu pedido já está em processo
              de preparação e, em breve, será entregue.
            </Text>

            <Text>
              Nossos entregadores não estão autorizados a realizar cobranças
              extras.
            </Text>

            <Text>
              Lembre-se de higienizar as mãos após o recebimento.
            </Text>

            <Text>
              Esperamos que desfrute de uma deliciosa experiência. Bom apetite!
            </Text>

            <Button
              onClick={() => {
                onClose();
                navigate("/");
              }}
            >
              Concluir
            </Button>
          </>
        )}
      </Drawer>
    </>
  );
}