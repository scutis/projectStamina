function Coffee(timestamp, quantity) {
    this.time = timestamp;
    this.quantity = quantity;
}

function Activity(startTimestamp, endTimestamp, intensity) {
    this.start = startTimestamp;
    this.end = endTimestamp;
    this.intensity = intensity;
}

function WakeUp(timestamp, quality) {
    this.time = timestamp;
    this.quality = quality;
}

function Sleep(timestamp) {
    this.time = timestamp;
}

function Data(wakeup, sleep, coffeeList, activityList) {
    this.wakeup = wakeup;
    this.sleep = sleep;
    this.coffee = coffeeList;
    this.activity = activityList;
}

function Entry(userId, data) {
    this.user = userId;
    this.data = data;
}

module.exports.Coffee = Coffee;
module.exports.Activity = Activity;
module.exports.WakeUp = WakeUp;
module.exports.Sleep = Sleep;
module.exports.Data = Data;
module.exports.Entry = Entry;

