import styled from "styled-components"

const Div = styled.div`
width: 90%;
margin: 0 auto;
// display: grid;
// grid-template-columns:1fr 1fr;
// gap: 9px;
box-shadow: 0 0 5px lightgrey;
padding: 1em;

`

const P = styled.p`
font-weight: bold;
font-size: 2rem;
padding: .5em 0;
`



const Input = styled.input`
width: 90%;
border: none;
box-shadow:0 0 5px lightgrey;
outline: none;
padding: .5em;
font-size:1rem;`




const Subscribe = styled.div`
// display: flex;
// flex-direction: column;
// align-items: center;
// justify-content: center;
padding: .5em 0;
text-align: center;
`

const Button = styled.button`
padding: 1em 2em;
border-radius:5px;
font-size:1rem;
color: #4EB2F2;
cursor: pointer;
border: none;
box-shadow:0 0 3px #4EB2F2;
`
const SubscribeEmail = styled.div`
display: flex;
gap: 1em;
// border: 1px solid black;`

const Grid = () => {
    return (
        <Div>

            <Subscribe>
                <P>Subscribe to our newsletter to stay updated</P>
                <SubscribeEmail>
                    {/* <Label>Email:</Label> */}
                    <Input type="email" placeholder="Enter your email address" />
                    <Button>Subscribe</Button>
                </SubscribeEmail>
            </Subscribe>

            {/* <Feedback>
                <Individual>
                    <Name>Stephen Lumala</Name>
                    <Comment>Hope that he will continue with his legacy</Comment>
                </Individual>
                <Individual>
                    <Name>Gh Pages </Name>
                    <Comment>It is believed that veterinaries visits Messi whenever they are sick.</Comment>
                </Individual>
                <Individual>
                    <Name>Degenerate Gamble</Name>
                    <Comment>I support savings so as to avoid repetitive loss of money</Comment>
                </Individual>
            </Feedback> */}

        </Div>
    )
}
export default Grid