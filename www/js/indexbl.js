/*
SimpleSerial index.js
Created 7 May 2013
Modified 9 May 2013
by Tom Igoe
*/
var app = {
    macAddress: "84:A6:C8:0C:03:04", // get your mac address from bluetoothSerial.list
    chars: "",
    /*
    Application constructor
    */
    initialize: function () {
        this.bindEvents();
        console.log("Starting SimpleSerial app");
    },
    /*
    bind any events that are required on startup to listeners:
    */
    bindEvents: function () {
        document.addEventListener('deviceready', this.onDeviceReady, false);
        connectButton.addEventListener('touchend', app.test, false);
    },
    /*
    this runs when the device is ready for user interaction:
    */
    onDeviceReady: function () {
        app.test();
    },
    test: function() {
        app.clear()
        bluetoothSerial.list(function(list){
            app.display(JSON.stringify(list));
        }, function(err){
            app.display(err);
        });
        
        //Let's connect
        bluetoothSerial.connectInsecure(app.macAddress, app.connected, app.error);        
    },
    connected: function() {
        app.clear()
        app.display('Connection established')
        setTimeout(function() {
          app.display("yto")
          bluetoothSerial.write("Major tom to ground control", app.display, app.error);
          app.display("yti")
        },5000)
         bluetoothSerial.subscribe('x', function (data) {
            app.clear();
            app.display(data);
        });
    },
    /*
    appends @message to the message div:
    */
    display: function (message) {
        var display = document.getElementById("message"), // the message div
            lineBreak = document.createElement("br"), // a line break
            label = document.createTextNode(message); // create the label
        display.appendChild(lineBreak); // add a line break
        display.appendChild(label); // add the message node
    },
    error: function(message) {
        app.display('Error :' + message);
    },
    /*
    clears the message div:
    */
    clear: function () {
        var display = document.getElementById("message");
        display.innerHTML = "";
    }
}; // end of app


app.initialize();