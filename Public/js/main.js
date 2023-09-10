// Wait for the DOM to be fully loaded
document.addEventListener("DOMContentLoaded", function () {
  // Add event listeners, manipulate the DOM, etc.
  
  // Handle a button click
  const button = document.querySelector("#myButton");
  button.addEventListener("click", function () {
    alert("Button clicked!");
  });
  
  // Make an AJAX request
  fetch("/api/data")
    .then((response) => response.json())
    .then((data) => {
      // Update page with retrieved data
      console.log(data);
    })
    .catch((error) => {
      console.error("Error:", error);
    });
});
