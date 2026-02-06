import styled from "styled-components";
import { FaInstagram, FaFacebookF, FaTwitter } from "react-icons/fa";

const FooterWrapper = styled.footer`
  background: #fcecdc;
  padding: 64px 16px;
  text-align: center;
`;

const Logo = styled.img`
  height: 40px;
  margin-bottom: 24px;
`;

const Socials = styled.div`
  display: flex;
  justify-content: center;
  gap: 12px;
  margin-bottom: 32px;
`;

const Social = styled.a`
  width: 32px;
  height: 32px;
  background: #e66767;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #fff;
  font-size: 14px;
`;

const Text = styled.p`
  max-width: 520px;
  margin: 0 auto;
  font-size: 12px;
  color: #e66767;
  line-height: 1.4;
`;

export default function Footer() {
  return (
    <FooterWrapper>
      <Logo src="/efood.png" alt="efood" />

      <Socials>
        <Social href="#">
          <FaInstagram />
        </Social>
        <Social href="#">
          <FaFacebookF />
        </Social>
        <Social href="#">
          <FaTwitter />
        </Social>
      </Socials>

      <Text>
        A efood é uma plataforma para divulgação de estabelecimentos, a
        responsabilidade pela entrega, qualidade dos produtos é toda do
        estabelecimento contratado.
      </Text>
    </FooterWrapper>
  );
}
