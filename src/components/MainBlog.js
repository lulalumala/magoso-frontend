import styled from "styled-components";
import img1 from "../images/tbt.png"
import { Link } from "react-router-dom";

const Div = styled.div`
width: 80%;
margin: 0 auto;
display: flex;
gap: 0.5em;
cursor: pointer;
`

const P = styled.p`
font-size: 1.5rem;
`
const ImgDiv = styled.div`
width: 50%;
border-radius: 10px; 
`

const Img = styled.img`
width: 100%;
border-radius: 10px;
`

const Article = styled.div`
width: 50%;
padding: 0 1em;
`
const Title = styled.p`
color: #4EB2F2;
font-size: 1.5rem;
font-weight: bold;
padding: .5em 0;
text-transform: uppercase;
`

const Description = styled.p`
font-size: 2rem;
`

const MainBlog = ({ newsData }) => {


    return (


        <Link to={`post/${newsData && newsData[0]._id}`}>
            <Div>
                <ImgDiv><Img src={newsData && newsData[0].image} alt="" /></ImgDiv>
                <Article>
                    <Title>{newsData && newsData[0].title}</Title>
                    <Description>{newsData && newsData[0].description}</Description>
                    <P>Author: {newsData && newsData[0].author}</P>
                    <P>{newsData && newsData[0].date} </P>
                </Article>
            </Div>
        </Link>
    )
}
export default MainBlog