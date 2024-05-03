// SAMPLE CODE
// Not part of the solution

// The function will accept an Array or an Object
// If it's an array, it will display the array values
// If it's an object, it will create an array from the object values and display it

const inputArrayOrObject = (arrOrObj) => {
  if (arrOrObj instanceof Array) {
    console.log("Array values are: ", arrOrObj);
  } else {
    const objValuesArr = Object.values(arrOrObj);
    console.log("Object values are: ", objValuesArr);
  }
}

// Create an object and an array
const myArray = [1, 2, 3, 4];

const myObj = {
  n1: 1,
  n2: 2,
  n3: 3,
  n4: 4
}

// Test our function
inputArrayOrObject(myArray);
inputArrayOrObject(myObj);