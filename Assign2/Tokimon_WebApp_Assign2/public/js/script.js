// Week 2:
// What is javascript? JS is an event-based language. We wirte functions in js mostly to response to events thaht are happening within a webpage
// When we interact with the browser, we invoke events by clicking, pressing a button, highlighting, hovering mouse over text, etc.
// JS takes those inputs/events and turns them into actions. JS is an interpreted language (similar to python)
// We can use console in the web browser as the interpreter, by giving one command at a time.
// Everything in js is an objects, with attributes and functions associated with them

// Week 3:
// JS is a single-thread language: when it acts as the server, it listens to the process requests coming in
// It doesn't block any processes coming in

var a = 5; // var is a variable that exists within a block of code
// var b = document.getElementById("button1");
// b.innerHTML = "CLICK ME!!!!!!!";

function allleeerrrttttt(){
    window.alert("HILFE!!!");
}

// b.onclick=allleeerrrttttt; // all functions after on are associated with the object "button"
// 						   // onclick requires a function as part of its prototype (see js doc for reference)
// 						   // This attaches the function allleeerrrttttt to event onclick
// 						   // onclick is an eventhandler which look at the fcn from HTML point of view
// 						   // when we click on the button, HTML is sending that request to js and js is running the fcn
// 						   // Contrast: event listener: js is listening and responding to the events
// 						   // Difference? Can add as many event listeners to an object as we want!
// 						   // (whereas if attach an onclick event handler, we can only have one of those)
// 						   // js can actively listen to many events whereas HTML can handle only one event at a time (for an object)
// 						   // If we add multiple event handlers for the same object, one will overwrite all others


// b.onclick=function(){ // anonymous definition of function (there is no reason to name our function as we will most likely call it only once!)
//     window.alert("Call me maybe");
// }

// Event Listener is js-built in and can be attached to any objects directly
// document.getElementById("button1").addEventListener("click", function(){
// 	console.log("baghbagh"); // can use this as a debugging tool
// 	document.getElementById("para").innerHTML="FIRST PARAGRAPH";
// })

document.querySelector("input[name='user']").value="Kiarash";

document.getElementById("in").addEventListener('keypress', process_key);

function process_key(ev){
	console.log(ev.key);
}

// In 3 seconds, js is free to do other processes if they come in
// non-blocking architecture is what we see here
// Every 3 seconds console.log("Hello!!!") will be place on the stack to be processed
// In-between, we are free to do other processes/requests. What js does is once executed
// it will run through the whole code. If there are any callback fcns, it is placed on js stack
// to process later.

function sayHello(){ // callback function
	console.log("Hello!!!");
}

// var inter = setInterval(sayHello, 3000) // time given in milliseconds

// console.log("World!!!"); // JS doesn't wait for a process to end to execute the next (unlike some programs)

function drive(miles, distance){
	console.log("WEEEE!!!!");
}

// Objects in JS is represented in JSON form-JavaScript Object Notation
// When communicate with there server, we have to be very clear what this notation looks like.
// This notation allows us to create a variable (which is an object, like everything else in JS)
// with attribute value pairs in JS, which allows us to send information from client side (browser) to the server side
// and server to understand the request and respond
var car = {color: "black", make: "Tesla", model: "X"} // if space between words, use ""
													  // attribute: value pair for "car" object
													  // can be function(input1, input2, ...)
car.color // ="black"
car["color"] // ="black"
car.mileage="100" // adds attribute: pair to the object car
car.drive // adds method/function "drive" to object "car"!

// Demonstrating serialization of JSON objects
// Whenever you have objects ready to be sent to server, they'll be in object notation form
var clientObject = {name: "Bobby Chan", age: 45} // To send this to a server, we need to transform it into a string
												 // Done by node.js for us. This is on the client/browser side


var serverObject = JSON.parse(JSON.stringify(clientObject)); // JSON.parse performs opposite operation of JSON.stringify
