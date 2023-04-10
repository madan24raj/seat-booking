import React, { useEffect, useState } from 'react';
import axios from "axios";
import './Mybooking.css'

function Mybooking() {

  const [bookingData, setBookingData]=useState();



let getData=()=>{
  axios.get("http://webarania.tech/build/booking/1").then((response) => {

      setBookingData(response.data.data);
      console.log(response.data);
});
}



useEffect(() => {
getData();
}, []);
  
  return (
    <div className='container mybooking'>
      <div className='small-Nav'>
           <h3>My-Booking</h3>
      <span class="badge bg-danger"><i class="fas fa-sign-out-alt"></i> Log Out</span>
      </div>

       

        <div className='card-container'>

  {bookingData != undefined && bookingData.map((booking, index)=>{
    return(
      <div className="card">
  
      <div className="card-body  bg-blue">
        <h5 className="card-title">{booking.seat_name}</h5>
   </div>
      <ul className="list-group list-group-flush">
        <li className="list-group-item">    <span class="badge text-bg-light">Date: {booking.date}</span>
</li>
        <li className="list-group-item"> <span class="badge text-bg-light">Table Name: {booking.table_name}</span></li>
        <li className="list-group-item"><span class="badge text-bg-light">Shift Name: {booking.shift_name}</span></li>
      </ul>
      <div className="card-body">
        <button className="btn btn-outline-danger mx-2 btn-sm">Cancel</button>
        <button className="btn btn-outline-success mx-2 btn-sm">Check-In</button>
      </div>
    </div>
   




   
    
  )})}
    </div>

    </div>
  );
}

export default Mybooking;