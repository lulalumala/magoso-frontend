import styled from "styled-components";
import { Link } from "react-router-dom";
import Logo from "./Logo";
import Search from "./Search";

const Div = styled.div`

width: 90%;
text-align: end;
padding: 1em 0;
`

const UserDiv = styled.div`
display: flex;
gap: 1em;
justify-content: flex-end;
`

const P = styled.p`
cursor: pointer;
&hover:{
    color: blue;
}
`
const Nav = () => {
    return (
        <Div>
            <UserDiv>
                <P> <Link to="/login">LOGIN</Link></P>
                <P><Link to="/signup">REGISTER</Link></P>
            </UserDiv>
            <Logo />
            <Search />
        </Div>
    )
}
export default Nav