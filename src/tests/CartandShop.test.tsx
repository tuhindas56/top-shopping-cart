import { describe, it, expect } from "vitest"
import { render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { MemoryRouter, Routes, Route } from "react-router-dom"
import Root from "./mockRoot"
import Home from "../components/Home"
import Shop from "../components/Shop"
import Cart from "../components/Cart"
import "@testing-library/jest-dom"

describe("Cart Integration", () => {
  it("should update cart quantity and show product in cart page when user adds an item", async () => {
    const user = userEvent.setup()

    render(
      <MemoryRouter initialEntries={["/products"]}>
        <Routes>
          <Route path="/" element={<Root />}>
            <Route index element={<Home />} />
            <Route path="products" element={<Shop />} />
            <Route path="cart" element={<Cart />} />
          </Route>
        </Routes>
      </MemoryRouter>
    )

    const addToCartButtons = await screen.findAllByRole("button", {
      name: /add to cart/i,
    })
    const cartLink = await screen.findByRole("link", { name: /cart/i })
    const cartQuantity = await screen.findByTestId("cartQuantity")

    expect(cartQuantity.textContent).toBe("0")

    await user.click(addToCartButtons[0])
    expect(cartQuantity.textContent).toBe("1")

    await user.click(cartLink)

    const productInCart = screen.getByRole("heading", {
      name: /Fjallraven - Foldsack No. 1 Backpack, Fits 15 Laptops/i,
    })
    expect(productInCart).toBeInTheDocument()
  })

  it("should increase quantity of product in cart when user types a higher quantity and adds to cart", async () => {
    const user = userEvent.setup()

    render(
      <MemoryRouter initialEntries={["/products"]}>
        <Routes>
          <Route path="/" element={<Root />}>
            <Route index element={<Home />} />
            <Route path="products" element={<Shop />} />
            <Route path="cart" element={<Cart />} />
          </Route>
        </Routes>
      </MemoryRouter>
    )

    const addToCartButtons = await screen.findAllByRole("button", {
      name: /add to cart/i,
    })
    const quantityInputs = await screen.findAllByRole("spinbutton", {
      name: /quantity/i,
    })
    const cartQuantity = await screen.findByTestId("cartQuantity")

    expect(cartQuantity.textContent).toBe("0")

    await user.click(addToCartButtons[0])
    expect(cartQuantity.textContent).toBe("1")

    await user.clear(quantityInputs[0])
    await user.type(quantityInputs[0], "10")

    await user.click(addToCartButtons[0])
    expect(cartQuantity.textContent).toBe("10")
  })

  it("should recalculate order total in cart page when more products are added or removed or when quantity of a product changes", async () => {
    const user = userEvent.setup()

    render(
      <MemoryRouter initialEntries={["/products"]}>
        <Routes>
          <Route path="/" element={<Root />}>
            <Route index element={<Home />} />
            <Route path="products" element={<Shop />} />
            <Route path="cart" element={<Cart />} />
          </Route>
        </Routes>
      </MemoryRouter>
    )

    const addToCartButtons = await screen.findAllByRole("button", {
      name: /add to cart/i,
    })
    const cartLink = await screen.findByRole("link", { name: /cart/i })
    const cartQuantity = await screen.findByTestId("cartQuantity")

    expect(cartQuantity.textContent).toBe("0")

    await user.click(addToCartButtons[0])
    expect(cartQuantity.textContent).toBe("1")

    await user.click(cartLink)

    const cartItemQtyInput = await screen.findByRole("spinbutton", {
      name: /quantity/i,
    })
    const orderTotal = await screen.findByTestId("orderTotal")

    expect(orderTotal.textContent).toMatch(/109.95/)

    await user.clear(cartItemQtyInput)
    await user.type(cartItemQtyInput, "10")
    expect(cartQuantity.textContent).toBe("10")
    expect(orderTotal.textContent).toMatch(/1099.50/)

    await user.clear(cartItemQtyInput)
    await user.type(cartItemQtyInput, "2")
    expect(cartQuantity.textContent).toBe("2")
    expect(orderTotal.textContent).toMatch(/219/)

    const deleteItemButton = await screen.findByRole("button", {
      name: /Remove item from cart/i,
    })

    await user.click(deleteItemButton)
    expect(cartQuantity.textContent).toBe("0")
    expect(orderTotal).not.toBeInTheDocument()
  })
})
