import { createContext , useState } from "react";

export const Context = createContext()


const StateArea = ({children}) => {
    const [newsData, setNewsData] = useState(null)
    
    
    return (
        <Context.Provider value={{news:[newsData, setNewsData]}}>
        {children}
        </Context.Provider>
    )
}
export default StateArea