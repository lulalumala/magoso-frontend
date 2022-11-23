import styled from "styled-components";
import Logo from "../components/Logo";
import { useState, useRef, createRef } from "react";
import Editar from "../components/Editor";

const NewsCont = styled.div`
padding: 1em;
`

const Div = styled.div`
width: 80%;
margin: 0 auto;
`
const ImgInput = styled.div``

const P = styled.p`
display: block;
color: red;
`

const Input = styled.input`
padding: 1em;
font-size: 1.5rem;
border: none;
outline: none;
box-shadow: 0 0 5px lightgrey;
background: inherit;
width: 85%;`

const Article = styled.div`
padding: .5em 0;
`
const Label = styled.label`
font-size: 1.5rem;
display: block;
width: 15%;`

const Container = styled.div`
display: flex;
align-items: center;
gap: 1em;
margin: .5em 0;`

const Button = styled.button`
display: block;
margin: 0 auto;
padding: 1em 2.5em;
border-radius: 5px;
border: none;
outline: none;
color: #7D41E1;
box-shadow: 0 0 5px #7D41E1;
font-size:1rem;
cursor: pointer;

`

const AddNews = () => {
    const [stateData, setStateData] = useState({
        image: "",
        title: "",
        author: "",
        description: "",
        body: "",
        category: "",
        tags: ""
    })
    const [error, setError] = useState({
        image: "",
        title: "",
        author: "",
        description: "",
        body: "",
        category: "",
        tags: []
    })

    const [clear, setClear]=useState(false)

    const imageRef = useRef(null)


    // imagechange
    const handleImageChange = (e) => {
        const file = e.target.files[0];
        const formData = new FormData();
        const CLOUDINARY_URL = "https://api.cloudinary.com/v1_1/ddcpp7puu/image/upload";
        const CLOUDINARY_UPLOAD_PRESET = "magosotoday";
        formData.append('file', file);
        formData.append('upload_preset', CLOUDINARY_UPLOAD_PRESET);



        fetch(CLOUDINARY_URL, {
            method: 'POST',
            body: formData,
        })
            .then(response => response.json())
            .then((data) => {
                setStateData(prev => ({ ...prev, image: data.secure_url }))
                if (data.secure_url !== '') {
                    const uploadedFileUrl = data.secure_url;
                    localStorage.setItem('passportUrl', uploadedFileUrl);
                }
            })
            .catch(err => console.error(err));
    }

    const handleAddNews = async () => {

        if (stateData.image === "") {
            setError({ ...error, image: "Upload an image" })
        }
        else if (stateData.title === "") {
            setError({ ...error, title: "Insert a title" })
        }
        else if (stateData.author === "") {
            setError({ ...error, author: "Indicate the author" })
        }
        else if (stateData.description === "") {
            setError({ ...error, description: "Describe the article" })
        }
        else if (stateData.body === "") {
            setError({ ...error, body: "You must include the body" })
        }
        else if (stateData.category === "") {
            setError({ ...error, category: "Type in the category" })
        }
        else if (stateData.tags === "") {
            setError({ ...error, tags: "Indicate the tag" })
        }
        else {
            const response = await fetch("http://localhost:8000/api/posts/new", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(stateData)
            })

            const responseJson = await response.json();

            console.log(responseJson)
            console.log(JSON.stringify(stateData))
            console.log(error)

            if (response.ok) {
                setStateData({
                    image: "",
                    title: "",
                    author: "",
                    description: "",
                    body: "",
                    category: "",
                    tags: []
                })
                setError({
                    image: "",
                    title: "",
                    author: "",
                    description: "",
                    body: "",
                    category: "",
                    tags: []
                })
                imageRef.current.value = ""
                setClear(true)
            }
        }
    }

    return (
        <NewsCont>
            <Logo />
            <Div>
                <P>{error.image} </P>
                <Container>
                    <Label>Image:</Label><ImgInput><Input ref={imageRef} type="file" onChange={(e) => handleImageChange(e)} />
                    </ImgInput></Container>
                <Article>
                    <P>{error.title} </P>
                    <Container>
                        <Label>Title:</Label><Input value={stateData.title} type="text" onChange={(e) => setStateData(prev => ({ ...prev, title: e.target.value }))} />
                    </Container>
                    <P>{error.author} </P>
                    <Container>
                        <Label>Author:</Label><Input value={stateData.author} type="text" required onChange={(e) => setStateData(prev => ({ ...prev, author: e.target.value }))} />
                    </Container>
                    <P>{error.description} </P>
                    <Container>
                        <Label>Description:</Label><Input value={stateData.description} type="text" required onChange={(e) => setStateData(prev => ({ ...prev, description: e.target.value }))} />
                    </Container>
                    <P>{error.body} </P>

                    <Container>
                        <Label>Body:</Label>  {<Editar setStateData={setStateData} setError={setError} stateData={stateData} clear={clear} setClear={setClear} />}
                    </Container>
                    {/* <Container><Label>Date:</Label><Input type="datetime-local" /></Container> */}
                    <P>{error.category} </P>
                    <Container>
                        <Label>Category:</Label><Input value={stateData.category} type="text" required onChange={(e) => setStateData(prev => ({ ...prev, category: e.target.value }))} /></Container>
                    <P>{error.tags} </P>
                    <Container>
                        <Label>Tag:</Label><Input value={stateData.tags} type="text" onChange={(e) => {
                            const tags = e.target.value.split(",");
                            setStateData(prev => ({ ...prev, tags }))
                        }} /></Container>
                </Article>
                <Button onClick={() => handleAddNews()} >Add News</Button>
            </Div>
        </NewsCont>
    )
}
export default AddNews