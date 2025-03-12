import { CircleOffIcon } from "lucide-react"
import styled, { createGlobalStyle } from "styled-components"

const Global = createGlobalStyle`
:root {
  font-size: 16px;
  font-family: Raleway;
}

*, *::before, *::after {
  box-sizing: border-box;
}

* {
  margin: 0;
}

body {
  line-height: 1.5;
  -webkit-font-smoothing: antialiased;

}

img, picture, video, canvas, svg {
  display: block;
  max-width: 100%;
}

input, button, textarea, select {
  font: inherit;
}

p, h1, h2, h3, h4, h5, h6 {
  overflow-wrap: break-word;
}

p {
  text-wrap: pretty;
}
h1, h2, h3, h4, h5, h6 {
  text-wrap: balance;
}

#root, #__next {
  isolation: isolate;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

a {
  color: #000;
  text-decoration: none;
  position: relative;

  &.animated::after {
    content: '';
    position: absolute;
    bottom: 2px;
    left: 0;
    height:1px;
    width: 1px;
    background-color: black;
    transition: width .2s ease-out;
  }

  &.animated:hover::after {
    width: 100%;
  }
}

button {
    width: max-content;

    background-color: black;
    color: white;
    border: none;
    border-radius: 4px;
    padding: 10px 20px;
    cursor: pointer;
    transition: background-color 0.3s ease;
  }

  button:hover {
    background-color: #333;
  }
`

const Spinner = styled(CircleOffIcon)`
  position: fixed;
  top: 20%;
  left: 50%;
  @keyframes spin {
    from {
      transform: translateX(-50%) rotate(0deg);
    }
    to {
      transform: translateX(-50%) rotate(360deg);
    }
  }
  animation: spin 1s linear infinite;
`

export { Global, Spinner }
