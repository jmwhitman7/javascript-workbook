'use strict';

const partnerObj = {
  firstName: 'Jdonathan',
  lastName: 'Rowlitman',
  age: 30,
  location: 'Austin',
  talk: function() {
    console.log("Hello!");
  }
};


console.log(partnerObj.firstName);

console.log(partnerObj['firstName']);

console.log(partnerObj.lastName);
partnerObj.talk();
console.log(partnerObj);


partnerObj.location = 'cars';
console.log(partnerObj);


const partnerArr = Object.keys(partnerObj);

console.log(partnerArr);

for (let i = 0; i < partnerArr.length; i++) {
    partnerArr[i]
    console.log(partnerArr[i])
    console.log(partnerObj[partnerArr[i]])

};
