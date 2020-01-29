import { FunctionComponent } from 'react'

interface Props {
  title?: string
  welcome?: string
}

const Header: FunctionComponent<Props> = ({ title, welcome }) => (
  <div>
    <div>{welcome}</div>
    <div>{title}</div>
  </div>
)

export default Header
