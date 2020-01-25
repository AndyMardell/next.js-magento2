import { FunctionComponent } from 'react'

interface Props {
  title?: string
}

const Header: FunctionComponent<Props> = ({ title }) => <div>{title}</div>

export default Header
