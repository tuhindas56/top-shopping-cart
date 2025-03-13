import { useEffect, useState } from "react"
import { Outlet } from "react-router-dom"
import mockProducts from "./mockProducts"
import Product from "../product"
import Header from "../components/Nav"

const Root = () => {
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [cart, setCart] = useState<Product[]>([])

  useEffect(() => {
    const abortController = new AbortController()

    new Promise((resolve) => {
      resolve(mockProducts)
    })
      .then((data) => {
        const products = (data as Product[])
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
        setError(err.message)
      })

      .finally(() => setLoading(false))

    return () => abortController.abort()
  }, [])

  if (loading) return <div>Loading..</div>
  if (error) return <div>Error: {error}</div>

  return (
    <>
      <Header cart={cart} />
      <Outlet
        context={{
          products,
          setProducts,
          loading,
          error,
          cart,
          setCart,
          Spinner: <div>Loading..</div>,
        }}
      />
    </>
  )
}

export default Root
