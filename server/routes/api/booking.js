const { json } = require('express');
const express = require('express');
const router = express.Router();
const db = require('../../db/mysql')


router.post('/', (req, res) => {
    //fetch data from shift table
    if (!(req.body.emp_id)) {
        res.json({ "success": false, "message": "Please Enter a Valid Employee ID" });
    }
    else if ((req.body.desk_id) && (req.body.date) && (req.body.shift) && (req.body.booked_by)) {

        let slectSqlfromShift = `SELECT * FROM shift WHERE id='${req.body.shift}';`;
        db.query(slectSqlfromShift, (err, result) => {
            if (err) {
                res.json({ 'success': false, 'message': `${err}` });
            }
            //fetch data from booking table
            if (req.body.booking_type == 0) {
                let slectSqlfromRules = `SELECT * FROM booking_rules WHERE type='regular';`;
                db.query(slectSqlfromRules, (errRules, resultRules) => {
                    if (errRules) {
                        res.json({ 'success': false, 'message': `${errRules}` });
                    }

                    let shift_start_time = result[0].start_time.split(":");

                    let shiftStartTime = new Date(`${req.body.date}`);
                    shiftStartTime.setHours(`${shift_start_time[0]}`);
                    shiftStartTime.setMinutes(`${shift_start_time[1]}`);

                    let maximumtimetobook = new Date(`${req.body.date}`);
                    maximumtimetobook.setHours(`${shift_start_time[0] - resultRules[0].maximum_booking_time}`);
                    maximumtimetobook.setMinutes(`${shift_start_time[1]}`);

                    let minimumtimetobook = new Date(`${req.body.date}`);
                    minimumtimetobook.setHours(`${shift_start_time[0] - resultRules[0].minimum_booking_time}`);
                    minimumtimetobook.setMinutes(`${shift_start_time[1]}`);

                    let now = new Date();

                    // res.json({ 'start': `${shiftStartTime.toLocaleString()}`, 'maximun':`${maximumtimetobook.toLocaleString()}`, 'minimum':`${minimumtimetobook.toLocaleString()}`});
                    //check booking time is not less than 6 and more than 48 hrs.
                    console.log(minimumtimetobook.toLocaleString());
                    console.log(maximumtimetobook.toLocaleString());
                    console.log(now.toLocaleString());
                    if ((now > minimumtimetobook) && (now < maximumtimetobook)) {
                        let slectSqlfromBooking = `SELECT * FROM booking WHERE date='${req.body.date}' AND status='1'`;
                        db.query(slectSqlfromBooking, (errbook, resultbook) => {
                            if (errbook) {
                                res.json({ 'success': false, 'message': `${errbook}` });
                            }
                            let userDataisSame = 0;
                            let sameSlot = 0
                            //check each already booked date is inside a week
                            resultbook.forEach((element, index) => {
                                if (req.body.emp_id == element.emp_id) {
                                    userDataisSame = 1;
                                }
                                else if ((req.body.desk_id == element.seat_id)) {
                                    if (req.body.shift == element.shift_id) {
                                        sameSlot = 1
                                    }
                                }
                            });
                            //check user apply seat for same day
                            if (userDataisSame === 1) {
                                res.json({ 'success': false, 'message': 'You already booked for the day' });
                            }
                            else if (sameSlot === 1) {
                                res.json({ 'success': false, 'message': `Unable to make booking for #${req.body.desk_id} Slot, Please try a different slot` });
                            }


                            //check user apply only 3 days in a week this is for advace booking
                            else {
                                let userData = { emp_id: `${req.body.emp_id}`, seat_id: `${req.body.desk_id}`, date: `${req.body.date}`, shift_id: `${req.body.shift}`, status: `1`, booked_by: `${req.body.booked_by}`, booking_type: `${req.body.booking_type}` };
                                let sql = 'INSERT INTO booking SET ?';
                                db.query(sql, userData, (errinsert, resultinsert, fields) => {
                                    if (errinsert) {
                                        res.json({ 'success': false, 'message': `${errinsert}` });
                                    }
                                    res.json({ 'success': true, 'message': `Seat #${req.body.desk_id} Booked Successfully` });
                                });

                            }
                            // res.send('ok')
                        });
                    }
                    else {
                        res.json({ 'success': false, 'message': 'Unable to make booking for this day. Please try a different day' });
                    }
                });
            }
            else {
                let slectSqlfromRules = `SELECT * FROM booking_rules WHERE type='advance';`;
                db.query(slectSqlfromRules, (errRules, resultRules) => {
                    if (errRules) {
                        res.json({ 'success': false, 'message': `${errRules}` });
                    }

                    let userBookingDate = new Date(`${req.body.date}`);
                    let nextDate = new Date(userBookingDate);
                    let nextDateTwo = new Date(userBookingDate);
                    let dateArray = [];
                    let getUserDate=[];
                    let getUserSlot=[];

               
                    if (req.body.booking_dates == 3) {

                        if(userBookingDate.getDay()==5){
                            nextDate.setDate(nextDate.getDate() + 3);
                            nextDateTwo.setDate(nextDateTwo.getDate() + 4);  
                        }else if(userBookingDate.getDay()==4){
                            nextDate.setDate(nextDate.getDate() + 1);
                            nextDateTwo.setDate(nextDateTwo.getDate() + 4);
                        }
                        else{
                            nextDate.setDate(nextDate.getDate() + 1);
                            nextDateTwo.setDate(nextDateTwo.getDate() + 2);
                        }
                        
                        dateArray.push(userBookingDate);
                        dateArray.push(nextDate);
                        dateArray.push(nextDateTwo);

                    }
                    console.log("nextDate"+nextDate.getDay());
                    if (req.body.booking_dates == 2) {

                        if(userBookingDate.getDay()==5){
                            nextDate.setDate(nextDate.getDate() + 3);
                        } 
                        else{
                            nextDate.setDate(nextDate.getDate() + 1);

                        }
                        dateArray.push(userBookingDate);
                        dateArray.push(nextDate);
                        console.log(nextDate);
                        console.log(userBookingDate);


                    }
                    if(req.body.booking_dates == 1){
                        dateArray.push(userBookingDate);

                    }
                    let minimumtimetobookadvance = new Date();
                    let startadvanceBookngDate = new Date(`${dateArray[0]}`);
                    let advanceBookngDate = new Date(`${dateArray[dateArray.length-1]}`);
                    minimumtimetobookadvance.setHours(resultRules[0].minimum_booking_time);
                    minimumtimetobookadvance.setMinutes(0);
                    minimumtimetobookadvance.setSeconds(0);


                    let maximumtimetobookadvance = new Date();
                    maximumtimetobookadvance.setHours(resultRules[0].maximum_booking_time);
                    maximumtimetobookadvance.setMinutes(0);
                    maximumtimetobookadvance.setSeconds(0);

                    // res.json({ 'userDate': advanceBookngDate.toLocaleString(), 'maximum': maximumtimetobookadvance.toLocaleString(), 'minimum': minimumtimetobookadvance.toLocaleString() });
                    //check booking time is not less than 6 and more than 48 hrs.
           
console.log(advanceBookngDate);
                    // if ((startadvanceBookngDate > minimumtimetobookadvance) && (advanceBookngDate < maximumtimetobookadvance)) {

                        if (startadvanceBookngDate) {

                        let slectSqlfromBooking = `SELECT * FROM booking WHERE  status='1';`;
                        db.query(slectSqlfromBooking, (errbook, resultbook) => {
                            if (errbook) {
                                res.json({ 'success': false, 'message': `${errbook}` });
                            }
                            let bookingcount = 0;
                            let userDataisSame = 0;
                            let sameSlot = 0

                            //check each already booked date is inside a week
console.log(dateArray);
                            resultbook.forEach((element) => {

                                let userBookedDate = new Date(`${element.date}`);
                                dateArray.forEach((dateElement, index)=>{
                                    if (dateElement.toLocaleDateString() == userBookedDate.toLocaleDateString()) {

                                        if (req.body.emp_id == element.emp_id) {
                                            userDataisSame++;
                                            getUserDate.push(index)

                                        }
                                        else if ((req.body.desk_id == element.seat_id)) {
                                            if (req.body.shift == element.shift_id) {
                                                sameSlot ++;
                                                getUserSlot.push(index);
                                            }
                                        }
                                    }
                                })

                                console.log("serDate"+userDataisSame);

                                console.log("sameSlot"+sameSlot);
                                console.log(getUserSlot);


                                if (element.booking_type == 1) {
                                    bookingcount++

                                }
                            });
                            //check user apply seat for same day
                            if (userDataisSame >= 1) {
                                if(getUserDate.length==2){
                                    res.json({ 'success': false, 'message': `You already booked for ${dateArray[getUserDate[0]].toLocaleDateString()}, ${dateArray[getUserDate[1]].toLocaleDateString()} these days` });
                                }
                                else if(getUserDate.length==1){
                                    res.json({ 'success': false, 'message': `You already booked for ${dateArray[getUserDate[0]].toLocaleDateString()} this day` });
                                }
                            }
                            else if (sameSlot >=1) {
                                if(getUserSlot.length==2){
                                    res.json({ 'success': false, 'message': `This slot already booked for ${dateArray[getUserSlot[0]].toLocaleDateString()}, ${dateArray[getUserSlot[1]].toLocaleDateString()} these days` });
                                }
                                else if(getUserSlot.length==1){
                                    res.json({ 'success': false, 'message': `This slot already booked for ${dateArray[getUserSlot[0]].toLocaleDateString()} this day` });
                                }
                                // res.json({ 'success': false, 'message': `Unable to make booking for #${req.body.desk_id} Slot, Please try a different slot` });
                            }
                            else {
                                //check user apply only 3 days in a week this is for advace booking
                                let insertResult=[];
                                // if (bookingcount < resultRules[0].maximum_slot) {
                                    console.log("bookingcount"+bookingcount);

                                    console.log("arraylength"+dateArray.length);

                               if ((bookingcount+dateArray.length) <= resultRules[0].maximum_slot) {

                                    console.log(bookingcount);

                                    let userData = [];
                                    dateArray.forEach((date) => {
                                        userData.push({ emp_id: `${req.body.emp_id}`, seat_id: `${req.body.desk_id}`, date: `${date.toISOString()}`, shift_id: `${1}`, status: '1', booked_by: `${req.body.booked_by}`, booking_type: `${req.body.booking_type}` })

                                    });
                                    // console.log(userData);
                              
                                    // let userData = { emp_id: `${req.body.emp_id}`, seat_id: `${req.body.desk_id}`, date: `${req.body.date}`, shift_id: `${1}`, status: `1`, booked_by: `${req.body.booked_by}`, booking_type: `${req.body.booking_type}` };
                                    let sql = 'INSERT INTO booking SET ?';

                                   let insertError=[];
                                   let resultStatus=0;
                                   let errorStatus=0;
                                    userData.forEach((userValues, index)=>{
                                        db.query(sql, userValues, (errinsert, resultinsert) => {
                                            insertError.push(errinsert);
                                            insertResult.push(resultinsert);
                                            if((userData.length-1)==index){

                                                // if(insertError.length !=0){
                                                //     res.json({ 'success': false, 'message': `Something went wrong.`, 'message': `${insertError}` });
                                                // } 
                                                insertError.forEach((insertErrorElement, index)=>{
                                                    if(insertErrorElement!=null){
                                                        errorStatus++;
                                                    }
                                                    if((insertError.length-1)==index){
                                                        if(insertError.length==errorStatus){
                                                            res.json({ 'success': false, 'message': `Somethig went wrong`, 'data':insertError });
    
                                                        }
                                                    }
                                                })
                                               
                                                insertResult.forEach((element, resultindex)=>{
                                                    if(element.affectedRows==1){
                                                        resultStatus++;
                                                    }

                                                if((insertResult.length-1)==resultindex){
                                                    if(insertResult.length==resultStatus){
                                                        res.json({ 'success': true, 'message': `Successfuly Booked Seats for ${resultStatus} Days` });

                                                    }
                                                }
                                                })

                                            }

                                        });

                                    })  

                                } else {
                                    res.json({ 'success': false, 'message': 'Unable to make booking, Only 3 bookings in a week' });
                                }
                            }
                        });

                    }

                    else {
                        res.json({ 'success': false, 'message': 'Unable to make booking for this day. Please try a different day' });
                    }
                });

            }
        });
    }
    else {
        res.send({ 'success': false, 'message': 'fill the all fieleds' })
    }
});

router.get('/:id', (req, res) => {

    let slectSqlfromTable = `SELECT booking.id, users.emp_id AS emp_id, booking.emp_id AS emp_id_primary, seat_id, date, shift_id, shift_name, seats.name AS seat_name, booking.status, wings.name AS wing_name, tables.id AS table_id, tables.name AS table_name FROM booking
INNER JOIN shift ON shift.id=booking.shift_id
INNER JOIN seats ON seats.id=booking.seat_id 
INNER JOIN tables ON tables.id=seats.table_id 
INNER JOIN wings ON wings.id=tables.wing_id 
INNER JOIN users ON users.id=booking.emp_id WHERE booking.emp_id='${req.params.id}'AND booking.status='1'`;

    // res.send()
    // let slectSqlfromBooking = `SELECT * FROM booking WHERE emp_id='${req.params.id}'AND status='1'`;
    db.query(slectSqlfromTable, (errfetch, resultfetch) => {
        if (errfetch) {
            res.json({ 'success': false, 'message': `${errfetch}` });
        }
else{
    res.json({ 'success': true, 'message': 'Booking data fetched successfully', 'data': resultfetch });

}
    });
});

module.exports = router;