import { ArrowRight } from "lucide-react"
import { Link as RouterLink } from "react-router-dom"
import styled from "styled-components"

const Heading = styled.h2`
  margin-bottom: 1rem;
  font-weight: 400;
  text-align: center;

  @media screen and (max-width: 768px) {
    color: black;
  }
`

const Hero = styled.main`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-image: url("/hero.webp");
  background-position: top;
  background-repeat: no-repeat;
  background-size: cover;
  padding: 8rem;
  color: white;
  flex: 1;

  @media screen and (max-width: 768px) {
    background-image: url("/hero_mobile.webp");
  }
`

const Link = styled(RouterLink)`
  display: flex;
  align-items: center;
  gap: 0.4rem;
  color: white;

  @media screen and (max-width: 768px) {
    color: black;
  }
`

const Home = () => {
  return (
    <Hero>
      <Heading>STYLE THAT SPEAKS</Heading>
      <Link to="/shop" viewTransition>
        <ArrowRight style={{ display: "inline" }} />
        Shop Now
      </Link>
    </Hero>
  )
}
export default Home
