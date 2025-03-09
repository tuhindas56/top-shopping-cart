import styled from "styled-components"
import { NavLink as RouterNavLink } from "react-router-dom"
import { ShoppingCart } from "lucide-react"

const Nav = styled.nav`
  width: 100%;
  display: grid;
  place-content: center;
  gap: 2rem;
  padding: 2rem;

  h1 {
    text-align: center;
    font-size: 1.6rem;
  }

  ul {
    display: flex;
    justify-content: center;
    gap: 1rem;
    list-style-type: none;
    padding: 0;
  }
`

const NavLink = styled(RouterNavLink)`
  &.active {
    text-decoration: underline;
  }
`

const Cart = styled.div`
  position: relative;

  span {
    position: absolute;
    top: -4px;
    right: -8px;
    display: grid;
    place-content: center;
    height: 16px;
    width: 16px;
    padding: 0.2rem;
    background-color: black;
    color: white;
    border-radius: 50%;
  }
`

const Header = () => {
  return (
    <header>
      <Nav>
        <h1>FAKESTORE</h1>
        <ul>
          <li>
            <NavLink to="/" className="animated" viewTransition>
              Home
            </NavLink>
          </li>
          <li>
            <NavLink to="/shop" className="animated" viewTransition>
              Shop
            </NavLink>
          </li>
          <li>
            <NavLink to="/cart" viewTransition>
              <Cart>
                <ShoppingCart />
                <span>{0}</span>
              </Cart>
            </NavLink>
          </li>
        </ul>
      </Nav>
    </header>
  )
}
export default Header
