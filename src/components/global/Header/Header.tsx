import { FunctionComponent } from 'react'
import Link from 'next/link'
import styled from 'styled-components'

import Cart from '../../checkout/Cart'

const TopBar = styled.div`
  display: flex;
  justify-content: space-between;
  background: #ddd;
  padding: 1rem;

  ul {
    list-style: none;
    margin: 0;
    padding: 0;

    li {
      display: inline-block;
    }
  }
`

const MainBar = styled.div`
  display: flex;
  justify-content: space-between;

  ul {
    list-style: none;
    margin: 0;
    padding: 0;

    li {
      display: inline-block;
    }
  }
`

interface Props {
  welcome?: string
}

const Header: FunctionComponent<Props> = ({ welcome }) => {
  return (
    <header>
      <TopBar>
        <div>{welcome}</div>
        <nav>
          <ul>
            <li>
              <Link href='/customer/account'>
                <a>Account</a>
              </Link>
            </li>
            <li>
              <Link href='/customer/account/login'>
                <a>Login</a>
              </Link>
            </li>
            <li>
              <Link href='/customer/account/logout'>
                <a>Logout</a>
              </Link>
            </li>
          </ul>
        </nav>
      </TopBar>

      <MainBar>
        <nav>
          <ul>
            <li>
              <Link href='/'>
                <a>Home</a>
              </Link>
            </li>
            <li>
              <Link href='/products'>
                <a>Products</a>
              </Link>
            </li>
          </ul>
        </nav>
        <Cart />
      </MainBar>
    </header>
  )
}

export default Header
