import { FunctionComponent } from 'react'

interface Props {
  welcome?: string
}

const Header: FunctionComponent<Props> = ({ welcome }) => <div>{welcome}</div>

export default Header
