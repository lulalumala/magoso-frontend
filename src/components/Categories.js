import styled from "styled-components";

const Div = styled.div`
width: 55%;
margin: 0 auto;
display: flex;
justify-content: space-around;
padding: .5em;

`
const P = styled.p`
color: #A1A0A5;
cursor: pointer;
padding: .5em ;
&:hover{
    background: #4EB2F2;
    color: white;
    border-radius: 5px;
}
`

const Categories = () => {
    return (
        <Div>
            <P>All</P>
            <P>Politics</P>
            <P>Sports</P>
            <P>Business</P>
            <P>Entertainment</P>
            <P>Transport</P>
        </Div>
    )
}
export default Categories