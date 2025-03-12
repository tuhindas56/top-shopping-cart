import React from "react"
import styled from "styled-components"
import { useOutletContext } from "react-router-dom"
import Product from "../product"
import ProductCard from "./ProductCard"

const ProductGrid = styled.ul`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
  padding: 2rem;
  background-color: antiquewhite;
`

const Shop = () => {
  const {
    cart,
    setCart,
    products,
    loading,
    error,
    Spinner,
  }: {
    cart: Product[]
    setCart: React.Dispatch<React.SetStateAction<Product[]>>
    products: Product[]
    loading: boolean
    error: null | string
    Spinner: React.FC<{ size: number }>
  } = useOutletContext()

  if (loading) return <Spinner size={64} />
  if (error) return <div>Error: {error}</div>

  return (
    <main>
      <ProductGrid>
        {products.length &&
          products.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              cartUtils={{ cart, setCart }}
            />
          ))}
      </ProductGrid>
    </main>
  )
}
export default Shop
