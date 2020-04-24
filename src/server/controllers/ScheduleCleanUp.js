//TODO:  npm install node-cron
//required for scheduling
const cron = require("node-cron");
const Event = require("../model/event");

// schedule tasks to be run on the server
//here, if an event is more than a day old, then delete it
module.exports = function() {
    // cron.schedule("* * * * *", function() {
    //Seconds Minutes Hours DayOfMonth Month DayOfWeek Year

    //rune very 10 seconds
    cron.schedule("10 * * * * *", function() {
    console.log("running a task every 10 second");

        //TODO: could not assign listEvents to this global variable
        var listEvents = [];
        //TODO: move get events and delete event to a separate module
        Event.find({}).exec(function(err, listEvents) {
            if (err) {
                console.log("Error : unable to fetch list of events from the DB");
            } else {
                //Time Now
                var currTime = new Date();

                for (var i in listEvents) {

                    console.log(listEvents[i].isActive + " " + listEvents[i].postedTime);

                    var eventTime = new Date(listEvents[i].postedTime);
                    // Calculate the difference in milliseconds
                    // Convert dates to milliseconds
                    var difference_ms = currTime.getTime() - eventTime.getTime();
                    //timeDifference = Math.abs(secondDate.getTime() - firstDate.getTime());
                    //let differentDays = Math.ceil(timeDifference / (1000 * 3600 * 24));
                    // console.log("Ye ye " + difference_ms);
                    // console.log("Ye ye "+currTime.getMonth());

                    //it's true or 'true' - both in the DB :(
                    //using (1000 * 3600 * 24) for 1 day, elements older than a day should be deleted
                    //TODO: mark isActive as false, rather than deleting
                    if (listEvents[i].isActive == true && difference_ms >= (1000 * 3600 * 24)) {

                        console.log("HIHIHIHIHIHIHI......................");
                        var rawEventId = listEvents[i]._id;

                        let updatedEvent = new Event({
                            "eventTitle": listEvents[i].eventTitle,
                            "emailId": listEvents[i].emailId,
                            "school": listEvents[i].school,
                            "description": listEvents[i].description,
                            "location": listEvents[i].location,
                            "isActive" : false,  //updating it to false
                            "image": listEvents[i].image,
                            "postedTime": listEvents[i].postedTime,
                            "duration": listEvents[i].duration,
                            "category" : listEvents[i].category
                        });

                        console.log("HUHUHIHUHIHIHI......................" + updatedEvent.isActive);
                        //Marking the event as inactive
                        updatedEvent.isActive = 'false';
                        //Contact.update({_id: contact.id}, upsertData, {upsert: true}, function(err{...});
                        //Event.update({'_id':rawEventId},updatedEvent, {upsert: true});
                        //Event.update({_id : rawEventId},{$set: { isActive: 'false' }}, {upsert: true});
                        const res =  Event.updateOne({ _id : rawEventId }, { isActive: 'false' },
                                            // {upsert: true},
                        function(err){
                             if(err){
                             throw err;
                              }
                              console.log("DONE!");
                              });
                            // res.n; // Number of documents matched
                            console.log( res.nModified ); // Number of documents modified
                        console.log("Yippeee Modified");

                        /*
                        //This is the code if we want to delete a code after a certain time
                        Event.findByIdAndDelete(rawEventId, function(err) {
                            if (err) {
                                console.log({
                                    "Error": "deleting event _id = " + rawEventId
                                });
                            } else {
                                let logMessage = "Success: deleted event _id = " + rawEventId;
                                console.log(logMessage);
                            }
                        });*/
                    } //end of if
                } //end of for
            }
        }); //end of Event.find

        console.log("*****ENDED***** "  + listEvents.length);
    }); //end of cron.schedule.

}; //end of module


//TODO: fix isActive is saved as string, change to boolean
// It should store boolean value, currently it's storing a list and that too as a string
// All operations are done in the frontend, should be fixed

//TODO: postedTime is saved as string, change to Data Object
//TODO: Line 43 and 52 - true and false should be changed to boolean and not string.


//https://stackoverflow.com/questions/7267102/how-do-i-update-upsert-a-document-in-mongoose