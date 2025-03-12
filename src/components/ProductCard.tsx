import React, { useState } from "react"
import styled from "styled-components"
import Product from "../product"
import { useOutletContext } from "react-router-dom"

const ProductCardWrapper = styled.li`
  background-color: #fff;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  gap: 1rem;
  padding: 2rem;
  border-radius: 8px;
  box-shadow: 0 0 4px rgba(0, 0, 0, 0.1);
  text-align: center;
  transition: box-shadow 0.3s ease;

  &:hover {
    box-shadow: 0 0 8px rgba(0, 0, 0, 0.2);
  }

  h2 {
    font-size: 1rem;
    margin-top: 1rem;
  }

  p {
    font-weight: bold;
  }

  img {
    height: 200px;
    object-fit: contain;
  }

  input[type="number"] {
    width: 20%;
    border: 2px solid #ccc;
    border-radius: 4px;
    color: #333;
  }

  button {
    flex: 1;
  }
`

const ProductCard = ({
  cartUtils,
  product,
}: {
  cartUtils: {
    cart: Product[]
    setCart: React.Dispatch<React.SetStateAction<Product[]>>
  }
  product: Product
}) => {
  const [quantity, setQuantity] = useState(product.quantity || 1)
  const { cart, setCart } = cartUtils
  const {
    products,
    setProducts,
  }: {
    products: Product[]
    setProducts: React.Dispatch<React.SetStateAction<Product[]>>
  } = useOutletContext()

  const addToCart = (product: Product) => {
    const existingProduct = cart.find((item) => item.id === product.id)

    if (!existingProduct) {
      setCart([...cart, { ...product, quantity }])
    } else {
      const newCart = cart.map((item) =>
        item.id === product.id ? { ...item, quantity } : item
      )

      setCart(newCart)
    }

    setProducts(
      products.map((p: Product) =>
        p.id === product.id ? { ...p, quantity } : p
      )
    )
  }

  return (
    <ProductCardWrapper>
      <img src={product.image} alt={product.title} />
      <h2>{product.title}</h2>
      <p>${product.price}</p>
      <form
        style={{
          display: "flex",
          gap: "1rem",
          justifyContent: "center",
        }}
        onSubmit={(e) => {
          e.preventDefault()
          addToCart(product)
        }}
      >
        <input
          type="number"
          value={quantity}
          onChange={(e) => setQuantity(parseInt(e.target.value))}
          min="1"
          max="10"
        />
        <button type="submit">Add to cart</button>
      </form>
    </ProductCardWrapper>
  )
}

export default ProductCard
