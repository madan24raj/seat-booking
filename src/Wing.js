import React, { useEffect, useState } from "react";
import axios from "axios";
import "./Wing.css";
import CreateWing from "./CreateWing";


function Wing() {
  const [wingform, setWingform]=useState(false);
 const[data, setData]=useState();
 const getWing=()=>{
axios.get('http://webarania.tech/build/wing').then((response)=>{
  setData(response.data.wing_name);
  
})
 }

 const toggleWing=()=>{
  console.log(wingform);
  setWingform(!wingform)
 }
 console.log(data);
useEffect(()=>{
  getWing();
}, [])
  return (
    <div className='container nopage'>
             <div className="small-Nav">
      <h3>Wing</h3>
      <span className="badge bg-danger"><i className="fas fa-sign-out-alt"></i> Log Out</span>
      </div>


      <div className="wrap">
        <div className="wing-list">
<h5>Wing List</h5>
{data != undefined && data.map((wing)=>{
return(
  <div>{wing.name}</div>
)
})}
        </div>
        <div className="wing-forms">
        <div className="create-wing">
          <button onClick={toggleWing} className="button">Create Wing</button>
          {wingform &&  <CreateWing/>}
       
        </div>
        </div>
      </div>
    </div>
  );
}

export default Wing;