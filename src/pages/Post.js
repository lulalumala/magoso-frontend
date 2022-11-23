import { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import styled from "styled-components";
import Nav from "../components/Nav";
import loader from "../images/loader.gif";
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';

const Div = styled.div`
    padding: 1em;
    width: 70%;
    margin: 0 auto;
    `
const H1 = styled.h1`
    text-align: center;
    text-transform: uppercase;
    padding: 1em 0;
    font-size:2rem;
    `
const Img = styled.img`
    width: 100%;
    border-radius: 5px;
    `
const P = styled.p`
    font-size: 1.5rem;
    line-height: 1.5em;`

const Button = styled.button`
//   padding: 1em 2.5em;
  font-size:1rem;
  cursor: pointer;
  border-radius: 5px;
  border:none;
  color:white;
  background
  
  
  : transparent;
`
const ButtonDiv = styled.div`
display: flex;
gap: 1em;
align-items:center;
cursor:pointer;
box-shadow:0 0 5px lightgrey;
color:white;
padding: 1em 2em;
border-radius: 5px;
background:${props=>props.color==="edit"?"green":"red"}

`

const ButtonFlex = styled.div`
display: flex;
gap: 1em;`

const Post = () => {

    const [singlePost, setSinglePost] = useState(null)
    const [loading, setLoading] = useState(true)
    const id = useParams().id

    useEffect(() => {

        const fetchData = async () => {
            const response = await fetch(`http://localhost:8000/api/posts/${id}`)
            const data = await response.json()
            setSinglePost(data)
            setLoading(false)
        }

        fetchData()

    }, [])

const navigate=useNavigate()



    const handleDelete = async () => {
        
        if (window.confirm("Do you want to delete the selected post?")) {
            const res = await fetch(`http://localhost:8000/api/posts/${id}`, {
                method: "DELETE",
                headers:{"content-Type":"application/json"}      
            })
            const resjson = await res.json()       
            
            if (res.ok) {
              navigate("/")  
            }
        } else {
            return
        }

        
        
        

        console.log("haha")
    }

    return (
        <Div>
            <Nav />
            {loading && <img src={loader} style={{ display: "block", margin: "0 auto" }} alt=""/>}
            <H1>{singlePost && singlePost.title}</H1>
            <Img src={singlePost && singlePost.image} />
            <P dangerouslySetInnerHTML={{ __html: singlePost && singlePost.body }} />
            <ButtonFlex>
                <ButtonDiv color="edit">
                    <Link to={`/post/edit/${singlePost && singlePost._id}`}>
                    <EditIcon />
                    <Button >Edit</Button></Link>
                </ButtonDiv>
                <ButtonDiv color="delete">
                    <DeleteIcon /><Button onClick={handleDelete} >Delete</Button>
                </ButtonDiv>
            </ButtonFlex>
        </Div>

    )
}
export default Post