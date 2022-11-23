import styled from "styled-components";
import Logo from "../components/Logo";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import CheckIcon from '@mui/icons-material/Check';
import ClearIcon from '@mui/icons-material/Clear';


const SignUpDiv = styled.div`
// order: 2;
grid-row:1/span 2;
grid-column:2;
width: 70%;
margin: 0 auto;
padding: 1em;
box-shadow: 0 0 3px #4EB2F2;
margin-top: 3em;
`
const ErrorP = styled.p`
display: block; 
margin: 0.5em auto;
width: fit-content;
background: rgba(255, 0, 0, .1);
padding: .3em 1em;
border-radius: 5px;

color: rgb(255, 0, 0);
font-size: 1.5rem;
`

const P = styled.p`
font-weight: bold;
font-size: 2rem;
text-align: center;
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
font-size:1rem;
// &:active{
//     background: inherit;
// }
`

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

const ConfirmDiv = styled.div`
width: fit-content;
`


const SignUp = () => {

    const [message, setMessage] = useState(null)

    const [userData, setUserData] = useState({
        userName: "",
        email: "",
        country: "",
        password: ""
    })
    const [confirmPassword, setConfirmPassword] = useState("")
    const [pushError, setPushError] = useState([])
    const [error, setError] = useState("")
    const navigate = useNavigate()
    const handleSignUp = async () => {
        setPushError([])
        setMessage(null)

        try {

            if (userData.userName === "") {
                setPushError(prev => [...prev, "name"])
            }
            if (userData.email === "") {
                setPushError(prev => [...prev, "email"])
            }

            if (userData.country === "") {
                setPushError(prev => [...prev, "country"])
            }
            if (userData.password === "") {
                setPushError(prev => [...prev, "password"])
            }

            if (userData.userName === "" || userData.email === "" || userData.country === "" || userData.password === "") {
                setError("Please insert all the fields")
            } else {
                setError("")
                const register = await fetch(`/api/user/register`,
                    {
                        method: "POST",
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify(userData)
                    })

                const json = await register.json()


                if (!json.ok) {
                    setError(json.error)
                }

                if (json.savedUser !== undefined) {
                    setMessage("Congratulations, you have successfully been registered")
                    navigate("/login")
                }

            }
        } catch (error) {

            console.log(error)
        }
    }

    return (
        <Div>
            <Logo />
            <SignUpDiv>
                {/* {pushError.includes("name")?console.log("error"):console.log("")} */}
                <P>Sign up to join the conversation   </P>

                {error &&

                    <ErrorP >{error}</ErrorP>}
                <LabelInput>
                    <Label>User Name:</Label>
                    <Input type="text" className={pushError.includes("name") ? "error" : ""} onChange={(e) => setUserData(prev => ({ ...prev, userName: e.target.value }))} />
                </LabelInput>
                <LabelInput>
                    <Label>Email:</Label>
                    <Input value={userData.email} type="email" className={pushError.includes("email") ? "error" : ""} onChange={(e) => setUserData(prev => ({ ...prev, email: e.target.value }))} />
                </LabelInput>

                <LabelInput>
                    <Label>Country:</Label>
                    <Input type="text" className={pushError.includes("country") ? "error" : ""} onChange={(e) => setUserData(prev => ({ ...prev, country: e.target.value }))} />
                </LabelInput>
                <LabelInput>
                    <Label>Password:</Label>
                    <Input type="password" className={pushError.includes("password") ? "error" : ""} onChange={(e) => setUserData(prev => ({ ...prev, password: e.target.value }))} />
                </LabelInput>
                <LabelInput>
                    <Label>Confirm Password:</Label>
                    <Input type="password" onChange={(e) => setConfirmPassword(e.target.value)} />
                    {
                        confirmPassword !== "" &&
                        <ConfirmDiv>{
                            confirmPassword === userData.password ? <CheckIcon style={{ color: "green" }} /> : <ClearIcon style={{ color: "red" }} />} </ConfirmDiv>
                    }
                </LabelInput>

                <Button onClick={handleSignUp}>Sign Up</Button>
                {message && <P>{message}</P>}
            </SignUpDiv>
        </Div>
    )
}
export default SignUp