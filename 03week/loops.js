'use strict';

// for loop
// Use a for loop to console.log each item in the array carsInReverse.
const carsInReverse = [
  'Audi',
  'BMW',
  'Ferrari',
  'Ford',
  'Honda',
  'Mercedez',
  'Toyota',
  'VW' ];

function showMeCars(listOfCars) {
  for (let i = 0; i < listOfCars.length; i++) {
    console.log(listOfCars[i]);
  }
};
showMeCars(carsInReverse);

// for...in loop
// Create an object (an array with keys and values) called persons with the following data:
// firstName: "Jane"
// lastName: "Doe"
// birthDate: "Jan 5, 1925"
// gender: "female"


 let persons = {
  firstName: "Jane",
  lastName: "Doe",
  birthDate: "Jan 5, 1925",
  gender: "female"
};

// Use a for...in loop to console.log each key.


for (key in persons) {
  console.log(key);
}


// Then use a for...in loop and if state to console.log the value associated with the key birthDate.
for (key in persons) {
  if (key === 'birthDate') {
    console.log(persons['birthDate']);
  }
};


// while loop
// Use a for loop to console.log the numbers 1 to 1000.
let i = 0;
while (i < 1001) {
  console.log(i);
  i++
};


// do...while loop
// Use a do...while loop to console.log the numbers from 1 to 1000.
let num = 0;
do {
  console.log(num);
  num++
} while (num < 1001) {
};




// When is a for loop better than a while loop?
// How is the readability of the code affected?
// What is the difference between a for loop and a for...in loop?
// What is the difference between a while loop and a do...while loop?
