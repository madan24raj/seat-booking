import React, { useEffect, useState } from "react";
import axios from "axios";
import "./CreateWing.css"


function CreateWing() {
const [wingData, setWingData]=useState({wingName:"", tableNumber:"", seatNumber:"", emp_id:'1'})

  const getData=(e)=>{
    e.preventDefault()

    axios.post("http://webarania.tech/build/wing/", {wingData}).then((response) => {
      if (response.status == 200) {
      console.log(response.data);
      }
    });
  }
  return (
    <div className='container'>
      <div className="wrap">
        <div className="create-wing">
        <h5>Create a Wing</h5>
        <form className="wing-form">
          <div className="form-group">
            <label forHtml="nameImput">Name</label>
            <input type="text"  className="form-control" id="nameInput" placeholder="Ex. Digital" onChange={(e)=>(setWingData({...wingData, wingName:e.target.value}))} />
            </div>
            <div className="form-group">
            <label forHtml="nameImput">No.of Table</label>
            <input type="number" className="form-control" id="tableInput" placeholder="Ex. 10" onChange={(e)=>(setWingData({...wingData,tableNumber:e.target.value}))}/></div>
            <div className="form-group">
            <label forHtml="nameImput">Name</label>
            <input type="number" className="form-control" id="seatInput" placeholder="Ex. 10" onChange={(e)=>(setWingData({...wingData,seatNumber:e.target.value}))}/></div>


            <button className="btn btn-primary" onClick={getData}>Create</button>
          
        </form>
        </div>
      </div>
    </div>
  );
}

export default CreateWing;