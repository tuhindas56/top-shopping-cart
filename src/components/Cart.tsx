import { useOutletContext } from "react-router-dom"
import Product from "../product"
import styled from "styled-components"
import { Trash2 } from "lucide-react"
import React from "react"

const Wrapper = styled.main`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
`

const CartList = styled.ul`
  max-width: 800px;
  padding: 1rem;
  list-style-type: none;
`

const CartItem = styled.li`
  display: flex;
  justify-content: space-between;
  align-items: end;
  gap: 3rem;
  padding: 2rem 0rem;
  border-bottom: 1px solid grey;

  img {
    height: 100px;
  }

  h2 {
    margin-block: 0.4rem;
    font-weight: normal;
  }

  p {
    font-weight: 600;
    font-size: 1.4rem;
  }

  form {
    display: flex;
    justify-content: right;
    gap: 2rem;
    height: 52px;
  }
`

const PurchaseDetails = styled.div`
  display: flex;
  gap: 2rem;
  padding: 2rem 0;
  justify-content: flex-end;
`

const Cart = () => {
  const {
    cart,
    setCart,
    products,
    setProducts,
  }: {
    cart: Product[]
    setCart: React.Dispatch<React.SetStateAction<Product[]>>
    products: Product[]
    setProducts: React.Dispatch<React.SetStateAction<Product[]>>
  } = useOutletContext()

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    product: Product
  ) => {
    const quantity = parseInt(e.target.value)
    const newCart = cart.map((item: Product) =>
      item.id === product.id ? { ...item, quantity } : item
    )

    setCart(newCart)

    setProducts(
      products.map((p: Product) =>
        p.id === product.id ? { ...p, quantity } : p
      )
    )
  }

  const handleRemove = (e: React.FormEvent, product: Product) => {
    e.preventDefault()

    const newCart = cart.filter((item) => item.id !== product.id)
    setCart(newCart)

    setProducts(
      products.map((p: Product) =>
        p.id === product.id ? { ...p, quantity: 0 } : p
      )
    )
  }

  return (
    <Wrapper>
      <CartList>
        {cart.length ? (
          cart.map((product) => (
            <CartItem key={product.id}>
              <div>
                <img src={product.image} alt={product.title} />
                <h2>{product.title}</h2>
                <p>${(product.price * (product.quantity || 1)).toFixed(2)}</p>
              </div>
              <form onSubmit={(e) => handleRemove(e, product)}>
                <input
                  type="number"
                  value={product.quantity}
                  onChange={(e) => handleChange(e, product)}
                  min="1"
                  max="10"
                  aria-label="quantity"
                />
                <button aria-label="Remove item from cart" type="submit">
                  <Trash2 size={24} />
                </button>
              </form>
            </CartItem>
          ))
        ) : (
          <p>Your cart is empty.</p>
        )}
        {cart.length ? (
          <PurchaseDetails>
            <div>
              <h2>Order Total</h2>
              <p data-testid="orderTotal">
                $
                {cart
                  .reduce((acc, p) => acc + p.price * (p.quantity || 1), 0)
                  .toFixed(2)}
              </p>
            </div>
            <button
              onClick={() =>
                window.location.assign(
                  "https://www.youtube.com/watch?v=dQw4w9WgXcQ"
                )
              }
            >
              Checkout
            </button>
          </PurchaseDetails>
        ) : null}
      </CartList>
    </Wrapper>
  )
}
export default Cart
