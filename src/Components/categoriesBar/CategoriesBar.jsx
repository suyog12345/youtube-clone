import React,{ useState } from "react";
import { useDispatch } from "react-redux";
import { getVideosByCategory } from "../../redux/actions/videos.action";
import "./_categoriesBar.scss";
const keywords=[
    'All',
    'React JS','Angular JS','React Native','Python','Data  Science','Blockchain',
    'Matplotlib','Machine Learning','HTML','Current Affairs','Mongo DB'
]

const CategoriesBar=()=>{
const [activeElement,setActiveElement]=useState('All')

const dispatch=useDispatch();

const handleClick=value=>{
    setActiveElement(value)
    dispatch(getVideosByCategory(value))
}
   return <div className="categoriesBar">
       {
           keywords.map((value,i)=>(
           <span
           onClick={()=>handleClick(value)}
           key={i}
           className={activeElement===value? 'active' : ''}
           >{value}</span>
           ))}
   </div>
}
export default CategoriesBar;