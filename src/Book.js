import React, { useEffect, useState } from "react";
import axios from "axios";
import "./Book.css";
import "./Spinner.css";

const Book = () => {
  let todatDate = new Date();
  let finalTodayDate=  todatDate.toISOString().split('T')[0];
  const [data, setData] = useState();
  const [wing, setWing] = useState();
  const [shift, setShift] = useState();
  const [getwing, setGetwing] = useState();
  const [getshift, setGetshift] = useState();
  const [getdate, setGetdate] = useState(finalTodayDate);
  const [getseat, setGetseat] = useState();
  const [isOpen, setIsOpen] = useState(false);
  const [empId, setempId] = useState();
  const [bookingResponse, setBookingResponse] = useState();
  const [resultPop, setResultPop] = useState(false);

  const [fgetwing, setFgetwing] = useState();
  const [fgetshift, setFgetshift] = useState();
  const [fgetdate, setFgetdate] = useState(finalTodayDate);

  const [isLoading, setIsLoading] = useState(false);



  function toggle() {
    setIsOpen((isOpen) => !isOpen);
  }
  function handleClose() {
    setResultPop((resultPop) => !resultPop);
  }

  const getSeatData = (wingn, daten, shiftn) => {
    let datas = {
      wing: wingn,
      date: `${daten}`,
      shift: `${shiftn}`,
    };
   

    

    setIsLoading(true);
    axios.post("http://webarania.tech/build/availablity", datas).then((response) => {
      if (response.status == 200) {
        setData(response.data);
        setIsLoading(false);
      }
    });
  };

  const fetchapi = () => {
    getSeatData(getwing, getdate, getshift);
  };

  const getWings = () => {
 

    axios.get("http://webarania.tech/build/availablity/wings").then((response) => {
      if (response.status == 200) {
        setWing(response.data.wings);
        setFgetwing(response.data.wings[0].id);
        setGetwing(response.data.wings[0].id);
        
      }
    });
  };

  const getShifts = () => {
    

    axios.get("http://webarania.tech/build/availablity/shifts").then((response) => {
      if (response.status == 200) {
        setShift(response.data.shifts);
        console.log(response.data.shifts);
        setFgetshift(response.data.shifts[0].id);
        setGetshift(response.data.shifts[0].id);

   

       
      }
    });
  };
  useEffect(() => {

    getWings();
    getShifts();
  
  }, []);
  useEffect(()=>{
    if((fgetwing != undefined)&&(fgetshift != undefined)){
      getSeatData(fgetwing, fgetdate, fgetshift);

    }

  }, [fgetwing, fgetshift])
  const callBooking = (e) => {
    e.preventDefault();
    setIsOpen((isOpen) => !isOpen);
    bookSeat();
  };
  const bookSeat = () => {
    let bookData = {
      desk_id: `${getseat}`,
      emp_id: `${empId}`,
      date: `${getdate}`,
      shift: `${getshift}`,
      booked_by: `${empId}`,
      booking_type: 0,
    };
 

    axios.post("http://webarania.tech/build/booking", bookData).then((response) => {
      setBookingResponse(response.data.message);
      setResultPop(true);
    });
  };
  const testa = (e) => {
    setGetseat(e.target.id);
    setIsOpen(true);
  };
  return (
    <div className="container">
          {isLoading && <div className="loading-spinner"></div> }  
      <div className="small-Nav">
      <h3>Booking</h3>
      <span class="badge bg-danger"><i class="fas fa-sign-out-alt"></i> Log Out</span>
      </div>
      <div className="header">
        <div className="wings-coloum">
          <label>
            Select Wing
            </label>
            <select onLoad={(e) => setGetwing(e.target.value)} onClick={(e) => setGetwing(e.target.value)} >
              {wing != undefined &&
                wing.map((wings) => {
                  return <option value={wings.id}>{wings.wingname}</option>;
                })}
            </select>
         
        </div>
        <div className="shift-coloum">
          <label>
            Select Shift
            </label>
            <select onChange={(e) => setGetshift(e.target.value)}>
              {shift != undefined &&
                shift.map((shifts) => {
                  return <option value={shifts.id}>{shifts.shiftname}</option>;
                })}
            </select>
         
        </div>
        <div className="shift-coloum">
          <label>
            Select Date
            </label>
            <input type="date" defaultValue={finalTodayDate} onChange={(e) => setGetdate(e.target.value)} />
        </div>
        <div className="submit-coloum">
          <button onClick={fetchapi}>Submit</button>
        </div>
      </div>
      <div className="wing">
        {data != undefined &&
          data.wings.map((wing, index) => {
            return (
              <div key={wing.tableid} className="tableC">
                <div className="seat-top">
                  {wing.seats.map((seat, index) => {
                    return (
                      seat.seatid % 2 != 0 && (
                        <div
                          key={seat.seatid}
                          className={seat.availability== 1? "seat orange" : seat.availability== 2 ? "seat red" : seat.availability== 0 && "seat"}
                          onClick={testa}
                          id={seat.seatid}
                        >
                          {seat.seatid}
                        </div>
                      )
                    );
                  })}
                </div>
                <div className="table-main"></div>
                <div className="seat-bottom">
                  {wing.seats.map((seat, index) => {
                    return (
                      seat.seatid % 2 == 0 && (
                        <div
                          key={seat.seatid}
                          className={seat.availability== 1? "seat orange" : seat.availability== 2 ? "seat red" : seat.availability== 0 && "seat"}
                          onClick={testa}
                          id={seat.seatid}
                        >
                          {seat.seatid}
                        </div>
                      )
                    );
                  })}
                </div>
              </div>
            );
          })}
      </div>

      {isOpen && (
        <div className="fix">
          <div className="form">
            <span onClick={toggle}>
              {" "}
              <button>X</button>
            </span>
            <form>
              <h1>Fill to Book Seat </h1>
              <label>
                Desk Id
                <input type="text" value={getseat} required disabled />
              </label>
              <label>
                Employee ID
                <input
                  type="text"
                  required
                  onChange={(e) => setempId(e.target.value)}
                />
              </label>

              <label>
                Date
                <input type="date" value={getdate} required disabled />
              </label>

              <button onClick={callBooking}>Book</button>
            </form>
          </div>
        </div>
      )}

      {resultPop && (
        <div className="form pop">
          <span onClick={handleClose}> X</span>
          <div>
            <p>{bookingResponse}</p>
          </div>
        </div>
      )}
    </div>
  );
};
export default Book;
