import Nav from "../components/Nav";
import Categories from "../components/Categories";
import MainBlog from "../components/MainBlog";
import OtherBlogs from "../components/OtherBlogs";
import Grid from "../components/grid";
import { useEffect, useContext, useState } from "react";
import { Context } from "../context/state";
import loader from "../images/loader.gif"


const Home = () => {

    const { news } = useContext(Context)
    const [newsData, setNewsData] = news
    const [loading, setLoading]=useState(true)

    useEffect(() => {
        const fetchData =()=> {fetch("http://localhost:8000/api/posts")
            .then(res => res.json())
            .then(data => {
                setNewsData(data)
                setLoading(false)
            }
            
        )
            .catch(error => console.log(error))
        }
        fetchData()
        
    }, [])
    


    return (
        <div>

            <Nav />
            <Categories />
            {loading && <img style={{display:"block",margin: "0 auto"}} src={loader } alt=""/> }
            <MainBlog newsData={newsData} />
            <OtherBlogs newsData={newsData} />
            <Grid />
        </div>
    )
}
export default Home
