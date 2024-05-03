

const inputArrayOrObject = (arrOrObj) => {
  if (arrOrObj instanceof Array) {
    console.log("Array values are: ", arrOrObj);
  } else {
    const objValues = Object.values(arrOrObj);
    console.log("Object values are: ", objValues);
  }
}

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