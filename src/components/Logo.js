import styled from "styled-components";
import { Link } from "react-router-dom";

const Div = styled.div`
display: flex;
align-items: center;
justify-content: center;
background: #7D41E1;
width: 90%;
margin: 0 auto;
border-radius: 25px;
height: 15vh;
color: white;
`
const P = styled.p`
font-size: 2.5rem;
font-weight: bold;
cursor: pointer;
color: white;
`

const Logo = () => {
    return (
        <Div>
            <P> <Link to="/" >MAGOSO TODAY</Link></P>
        </Div>
    )
}
export default Logo