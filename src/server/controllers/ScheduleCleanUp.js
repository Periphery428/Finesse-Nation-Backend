// //TODO:  npm install node-cron
// //require for scheduling
// const cron = require("node-cron");
// const Event = require("../model/event");
//
//
//
// // module.exports = function(req, res, next) {
// // //TODO: move to a separate file
// // // schedule tasks to be run on the server
// // // cron.schedule("* * * * *", function() {
// // //Seconds Minutes Hours	DayOfMonth Month DayOfWeek	Year
// //
// // console.log("YAY YAY YAY");
// // cron.schedule("1 * * * * *", function() {
// //     console.log("running a task every 10 second");
// //
// //     var listEvents = null;
// //     //TODO: move get events to separate module
// //     var date = new Date();
// //
// //     Event.find({}).exec(function(err, listEvents) {
// // //             if(err) {
// // //                 console.log("Error : unable to get events");
// // //
// // //                 res.status(400).end();
// // //             } else {
// // //             var currTime = new Date();
// // //             // Convert dates to milliseconds
// // //             var currTime_ms = currTime.getTime();
// // // //                 var count = 0;
// // // //                 console.log(listEvents);
// // //                 for (var i  in listEvents){
// // //                      console.log(listEvents[i].isActive + " " + listEvents[i].postedTime);
// // //
// // //                      var eventTime = new Date(listEvents[i].postedTime);
// // //                      var eventTime_ms = eventTime.getTime();
// // //                      // Calculate the difference in milliseconds
// // //                      var difference_ms = currTime_ms - eventTime_ms;
// // //                      console.log("Ye lo ji "+ difference_ms);
// //
// // //                      console.log("Ye lo ji "+currTime.getMonth());
// //
// //                      //it's true or 'true' - both in the DB :(
// // //                      if(listEvents[i].isActive == 'true')
// // //                         count++;
// //
// //
// // //                  }
// // // //                  console.log(count);
// // // //                 res.json(listEvents);
// // //             }
// //
// //             //TODO: fix isActive is saved as string, change to boolean
// //             //TODO: postedTime is saved as string, change to Data Object
// //      });
// //
// // });
// //
// // };
//
//
//
//
// /*exports.getEvents = function(req, res) {
//     Event.find({}).exec(function(err, listEvents) {
//         if(err) {
//             console.log("Error: unable to get events");
//             res.status(400).end();
//         } else {
//             res.json(listEvents);
//         }
//     });
// };
//
// exports.deleteEvent = function(req, res) {
//     let rawEventId = req.body.eventId;
//     Event.findByIdAndDelete(rawEventId, function(err) {
//         if(err) {
//             res.send({"Error": "deleting event _id = " + rawEventId});
//             res.status(400).end();
//         } else {
//             let logMessage = "Success: deleted event _id = " + rawEventId;
//             console.log(logMessage);
//             res.send(logMessage);
//         }
//     });
// };
// */
//
// //BUG REPORT:
//
// //Change isEvent to false. abcd