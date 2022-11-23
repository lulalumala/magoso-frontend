import styled from "styled-components";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Nav from "../components/Nav";
import { useNavigate } from "react-router-dom";
import Editor2 from "../components/Editor2";
import loader from "../images/loader.gif"


const Div = styled.div`
width: 80%;
margin: 0 auto;`

const Img = styled.img`
width: 100%;`

const Button = styled.button`
padding: 1em 2em;
cursor: pointer;
background: inherit;
border: none;
box-shadow: 0 0 5px lightgrey;
border-radius: 5px;
margin:1em;
color: white;
font-size: 1rem;
background: ${props => {
        if (props.color === "save") {
            return "green"
        }
        else {
            return "grey"
        }
    }}
`
const Input = styled.input`
padding: 1em;
font-size: 1.5em;
font-weight: bold;
display: block;
margin-top: .5em;
width: 100%;
background: inherit;
`

const EditPost = () => {
    const [item, setItem] = useState(null)
    const id = useParams().id
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const fetchData = async () => {
            const response = await fetch(`http://localhost:8000/api/posts/${id}`)
            const data = await response.json()
            setItem(data)
            setLoading(false)
        }
        fetchData()
    }, [])

    useEffect(() => {
        setUpdateData({ ...item })

    }, [item])

    const [updateData, setUpdateData] = useState(null)


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
                setUpdateData(prev => ({ ...prev, image: data.secure_url }))
                if (data.secure_url !== '') {
                    const uploadedFileUrl = data.secure_url;
                    localStorage.setItem('passportUrl', uploadedFileUrl);
                }
            })
            .catch(err => console.error(err));
        console.log(updateData.image)
    }
    const navigate = useNavigate()

    const handleSaveButton = async () => {
        const res = await fetch(`http://localhost:8000/api/posts/${id}`, {
            method: "PATCH",
            headers: { "content-Type": "application/json" },
            body: JSON.stringify(updateData)
        })
        const resjson = await res.json()
        console.log(updateData)
        if (res.ok) {
            navigate(`/post/${id}`)
        }
    }

    const discardButton = () => {
        window.confirm("Do you want to discard your changes?")

        navigate(`/post/${id}`)
    }

    return (
        <Div>
            <Nav />
            {loading && <img src={loader} style={{ display: "block", margin: "0 auto" }} />}
            <Input defaultValue={updateData && updateData.title} onChange={(e) => setUpdateData(prev => ({ ...prev, title: e.target.value }))} />
            <Input type="file" onChange={(e) => handleImageChange(e)} />
            <Img src={updateData && updateData.image !== "" ? updateData.image : updateData && updateData.image} alt="" />
            <Input defaultValue={updateData && updateData.author} onChange={(e) => setUpdateData(prev => ({ ...prev, author: e.target.value }))} />
            <Input defaultValue={updateData && updateData.description} onChange={(e) => setUpdateData(prev => ({ ...prev, description: e.target.value }))} />
            <Input defaultValue={updateData && updateData.category} onChange={(e) => setUpdateData(prev => ({ ...prev, category: e.target.value }))} />
            <Editor2 updateData={updateData} setUpdateData={setUpdateData} />
            <Input defaultValue={updateData && updateData.tags} onChange={(e) => setUpdateData(prev => ({ ...prev, tags: e.target.value }))} />
            <Button color="save" onClick={handleSaveButton}> Save Changes</Button>
            <Button color="discard" onClick={discardButton}>Discard Changes</Button>
        </Div>
    )
}
export default EditPost