// Function to display results
const displayResults = (result) => {
  const divElement = document.getElementById("output");
  // Reset output for each call
  divElement.innerHTML = "";

  if (result.trans === "Error") {
      // Create h2 and paragraph elements and add to div
      const h2Elem = document.createElement("h2");
      h2Elem.innerText = "Application Error";
      const paraElement = document.createElement("p");
      paraElement.innerText = result.error;
      // Add elements
      divElement.appendChild(h2Elem);
      divElement.appendChild(paraElement);
  } else {
      if (result.rows.length === 0) {
        // Create h3 and add to div
        const h3Elem = document.createElement("h3");
        h3Elem.innerText = "No Records found!";
        divElement.appendChild(h3Elem);
      } else {
          // Create a table element and table header row
          const tblElement = document.createElement("table");
          const theadElement = document.createElement("thead");
          const thRowElement = document.createElement("tr");
          const thIdElement = document.createElement("td");
          thIdElement.innerText = "ID";
          const thNameElement = document.createElement("td");
          thNameElement.innerText = "Name";
          const thDescElement = document.createElement("td");
          thDescElement.innerText = "Desc";
          const thPriceElement = document.createElement("td");
          thPriceElement.innerText = "Price";
          // Add elements
          thRowElement.appendChild(thIdElement);
          thRowElement.appendChild(thNameElement);
          thRowElement.appendChild(thDescElement);
          thRowElement.appendChild(thPriceElement);
          //
          theadElement.appendChild(thRowElement);
          //
          tblElement.appendChild(theadElement);

          // Loop
          result.rows.forEach(product => { 
            // Create table rows
            const trElement = document.createElement("tr");
            const tdIdElement = document.createElement("td");
            tdIdElement.innerText = product.prod_id;
            const tdNameElement = document.createElement("td");
            tdNameElement.innerText = product.prod_name;
            const tdDescElement = document.createElement("td");
            tdDescElement.innerText = product.prod_desc;
            const tdPriceElement = document.createElement("td");
            tdPriceElement.innerText = product.prod_price;
            // Add elements
            trElement.appendChild(tdIdElement);
            trElement.appendChild(tdNameElement);
            trElement.appendChild(tdDescElement);
            trElement.appendChild(tdPriceElement);
            //
            tblElement.appendChild(trElement);
          });
          // Add table to div
          divElement.appendChild(tblElement);
       };
  };
};

// Handle form submission
document.querySelector("form").addEventListener("submit", e => {
  // Cancel default behavior of sending a synchronous POST request
  e.preventDefault();
  // Create a FormData object, passing the form as a parameter
  const formData = new FormData(e.target);
  fetch("/searchajax", {
      method: "POST",
      body: formData
  })
      .then(response => response.json())
      .then(result => {
          displayResults(result);
      })
      .catch(err => {
          console.error(err.message);
      });
});