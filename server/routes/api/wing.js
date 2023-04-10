const express = require('express');
const router = express.Router();
const db = require('../../db/mysql');
const moment = require('moment');


router.get('/',(req,res) => {
	let getWings = 'SELECT id,name FROM wings WHERE is_active = 0';
	let query = db.query(getWings, (err, result, fields) => {
		if (err) {
			res.send({"success":false,"message":"Something Went Wrong. Try Again Later."});
		} 
		else {
			res.send({"wing_name":result});
		}
	});	
});

router.post('/',(req,res) => {
	let lastTableName;
	let wingId;
	let lastTableNumber;
	let lastSeatName;
	let lastSeatNumber;

console.log(req.body);
let sql = 'INSERT INTO wings SET ?';
let wingData = { name: `${req.body.wingData.wingName}`, total_tables: `${req.body.wingData.tableNumber}`, total_seats: `${req.body.wingData.seatNumber}`, created_by: `${req.body.wingData.emp_id}`, is_active: `0`};
db.query(sql, wingData, (errinsert, resultinsert, fields) => {
	if (errinsert) {
		res.json({ 'success': false, 'message': `${errinsert}`, 'data':'wing table error' });
	}
	
	let slectSqlfromWing = `SELECT * FROM wings WHERE name='${req.body.wingData.wingName}';`

	db.query(slectSqlfromWing, (errwing, resultwing) => {
		if (errwing) {
			res.json({ 'success': false, 'message': `${errwing}` });
		}
		 wingId=resultwing[0].id;
		



	let slectSqlfroTable = `SELECT * FROM tables`

	db.query(slectSqlfroTable, (errtable, resulttable) => {
		if (errtable) {
			res.json({ 'success': false, 'message': `${errtable}` });
		}
if(resulttable.length==0){
	lastTableName='ws0';
}else{
	lastTableName=resulttable[resulttable.length-1].name;
}
 lastTableNumber = lastTableName.substring(2);
 
for(let i=0; i<req.body.wingData.tableNumber; i++){
	lastTableNumber++;
	let tablesql = 'INSERT INTO tables SET ?';

	let tableData = { name: `ws${lastTableNumber}`, wing_id: `${wingId}`,created_by: `${req.body.wingData.emp_id}`, is_active: `0`};
db.query(tablesql, tableData, (errinserttable, resultinserttable) => {
	if (errinserttable) {
		res.json({ 'success': false, 'message': `${errinserttable}` });
	}
	if(i==(req.body.wingData.tableNumber-1)){
console.log('insidenew');
let slectSqlfroTable = `SELECT * FROM seats`

db.query(slectSqlfroTable, (errseats, resultseats) => {
	if (errseats) {
		res.json({ 'success': false, 'message': `${errseats}` });
	}
if(resultseats.length==0){
	lastSeatName='ws-seat0';
}else{
	lastSeatName=resultseats[resultseats.length-1].name;
}
lastSeatNumber = lastSeatName.substring(7);

		let slectSqlfromTable = `SELECT * FROM tables WHERE wing_id='${wingId}';`

		db.query(slectSqlfromTable, (errtableselect, resulttableselect) => {
			if (errtableselect) {
				res.json({ 'success': false, 'message': `${errtableselect}` });
			}
			resulttableselect.forEach((element, index)=>{

				for(let i=0; i<req.body.wingData.seatNumber; i++){
					lastSeatNumber++;
					console.log('tableid'+element.id);
					console.log('seatname'+"ws-seat"+lastSeatNumber);

					let seatsql = 'INSERT INTO seats SET ?';

					let seatData = { name: `ws-seat${lastSeatNumber}`, table_id: `${element.id}`, type: `0`, created_by: `${req.body.wingData.emp_id}`, is_active: `0`};
					db.query(seatsql, seatData, (errinsertseat, resultinsertseat) => {
						if (errinsertseat) {
							res.json({ 'success': false, 'message': `${errinsertseat}` });
						}
						if((i==(req.body.wingData.seatNumber-1))&&(index==(req.body.wingData.tableNumber-1))){
							res.json({ 'success': true, 'message': `Seats Created Succesfully` });

						}



					});
				}

			});

		});
	})
	}

});

}

	});
	});

});
});

module.exports = router;