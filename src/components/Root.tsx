import { useEffect, useState } from "react"
import axios, { CanceledError } from "axios"
import { Outlet } from "react-router-dom"
import { Global, Spinner } from "./Global"
import Header from "./Nav"
import Product from "../product"

const Root = () => {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [cart, setCart] = useState<Product[]>([])

  useEffect(() => {
    const abortController = new AbortController()

    axios
      .get("https://fakestoreapi.com/products", {
        signal: abortController.signal,
      })

      .then(({ data }) => {
        const products = data
          .filter((product: Product) => product.category !== "electronics")
          .map(({ id, title, price, image }: Product) => ({
            id,
            title,
            price,
            image,
            quantity: 0,
          }))

        setProducts(products)
      })

      .catch((err) => {
        setError(err instanceof CanceledError ? null : err.message)
      })

      .finally(() => setLoading(false))

    return () => abortController.abort()
  }, [])

  if (loading) return <Spinner />
  if (error) return <div>Error: {error}</div>

  return (
    <>
      <Global />
      <Header cart={cart} />
      <Outlet
        context={{
          products,
          setProducts,
          loading,
          error,
          cart,
          setCart,
          Spinner,
        }}
      />
    </>
  )
}
export default Root
