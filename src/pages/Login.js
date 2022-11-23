import styled from "styled-components";
import Logo from "../components/Logo";
import { useState } from "react";

const LoginDiv = styled.div`
// order: 2;
grid-row:1/span 2;
grid-column:2;
width: 70%;
margin: 0 auto;
padding: 1em;
box-shadow: 0 0 3px #4EB2F2;
margin-top: 3em;
`

const Label = styled.label`
width:20%;
display:block;
font-weight: bold;
font-size: 1.5em;`

const LabelInput = styled.div`
display: flex;
margin:.5em 0;
gap: 1em;`

const Input = styled.input`
width: 70%;
border: none;
box-shadow:0 0 5px lightgrey;
outline: none;
padding: 1em;
font-size:1rem;`

const Button = styled.button`
color: #4EB2F2;
padding: 1em 2em;
border: none;
box-shadow: 0 0 5px #4EB2F2;
font-size: 1rem;
cursor: pointer;
display: block;
margin: 0 auto;
`
const Div = styled.div`
padding: 1em;`

const Login = () => {
    const [loginItem, setLoginItem] = useState({
        email: "",
        password: ""
    })

    const [error, setError] = useState("")

    const handleLogin = async () => {
        try {
            
          if (loginItem.email === "" || loginItem.password === "") {
            setError("Please insert all fields")
          } else {
              
        setError("")

        const user = await fetch("/api/user/login", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(loginItem)
        })
        const resjson = await user.json()
              console.log(user)
            }
    } catch (error) {
          console.log(error)  
        }


    }

    return (
        <Div>
            <Logo />
            <LoginDiv>
                {error && <p style={{ textAlign: "center", color:"red"}}>{error}</p>}
                <LabelInput>
                    <Label>Email:</Label>
                    <Input value={loginItem.email} type="email" onChange={(e) => setLoginItem(prev => ({ ...prev, email: e.target.value }))} />
                </LabelInput>
                <LabelInput>
                    <Label>Password:</Label>
                    <Input value={loginItem.password} type="password" onChange={(e) => setLoginItem(prev => ({ ...prev, password: e.target.value }))} />
                </LabelInput>
                <Button onClick={handleLogin}>Login</Button>
            </LoginDiv>
        </Div>
    )
}
export default Login