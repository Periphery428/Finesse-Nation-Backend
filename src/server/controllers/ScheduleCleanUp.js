
//TODO: move to a separate file
// schedule tasks to be run on the server
// cron.schedule("* * * * *", function() {
//Seconds Minutes Hours	DayOfMonth Month DayOfWeek	Year
cron.schedule("10 * * * * *", function() {
    console.log("running a task every 10 second");
});