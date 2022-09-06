function createEmployeeRecord ([firstName, familyName, title, payPerHour]) {
   const timeInEvents = [];
   const timeOutEvents = [];
    return {firstName, familyName, title, payPerHour, timeInEvents, timeOutEvents}

}

function createEmployeeRecords(array) {
    const newArray = [];
    for (let i = 0; i < array.length; i++) {
        newArray.push(createEmployeeRecord(array[i]));
    }
    return newArray;
}

function createTimeInEvent(employeeRecord, dateTime) {
    const dateTimeArray = dateTime.split(' ');
    

    const newEvent = {type: 'TimeIn',
    hour: parseInt(dateTimeArray[1], 10),
    date: dateTimeArray[0] };
   employeeRecord.timeInEvents.push(newEvent);

   return employeeRecord;


}
function createTimeOutEvent(employeeRecord, dateTime) {
    const dateTimeArray = dateTime.split(' ');

    const newEvent = {type: 'TimeOut',
    hour: parseInt(dateTimeArray[1], 10),
    date: dateTimeArray[0]    
};

    employeeRecord.timeOutEvents.push(newEvent);
    return employeeRecord;

}
function hoursWorkedOnDate (employeeRecord, date) {
    
    let filteredtimeInEvent = employeeRecord.timeInEvents.find(function(timeInEvent) { return timeInEvent.date === date })
    let filteredtimeOutEvent = employeeRecord.timeOutEvents.find(function(timeOutEvent) { return timeOutEvent.date === date})

   return (filteredtimeOutEvent.hour - filteredtimeInEvent.hour)/100
    
    //let timeIn = parseInt(filteredtimeInEvent.hour, 10);
   //let timeOut = parseInt(filteredtimeOutEvent.hour, 10);
   
   return timeOut - timeIn; 
}
function wagesEarnedOnDate(employeeRecord, date) {
    const payRate = employeeRecord.payPerHour;

    return hoursWorkedOnDate(employeeRecord, date) * payRate
}
let allWagesFor = function (employeeRecord) {
    let dailyWages = employeeRecord.timeInEvents.map(function (timeInEvent) {
     return timeInEvent.date})

     let sumWithInitial = dailyWages.reduce(function(previousValue, currentValue) {return previousValue + wagesEarnedOnDate(employeeRecord, currentValue)},
       0)
    return sumWithInitial;
    }
function calculatePayroll (employeeRecords) {
    return employeeRecords.reduce(function (previousValue, currentValue) {
        return previousValue + allWagesFor(currentValue)
    }, 0)   
}

