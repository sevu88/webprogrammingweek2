// image handling from: https://stackoverflow.com/questions/38763995/javascript-handling-image-loading-event-target-result-is-empty
// got the idea for the existing data from AI tool but then created the code myself

if (document.readyState !== "loading") {
  console.log("document is ready!");
  initializeCode();
} else {
  document.addEventListener("DOMContentLoaded", function () {
    console.log("document ready after waiting!");
    initializeCode();
  });
}

function initializeCode() {
  const submitbtn = document.getElementById("submit-data");
  const table = document.getElementById("tablebody");
  const emptybtn = document.getElementById("empty-table");

  submitbtn.addEventListener("click", function (event) {
    event.preventDefault();
    const username = document.getElementById("input-username").value;
    const email = document.getElementById("input-email").value;
    const address = document.getElementById("input-address").value;
    const admin = document.getElementById("input-admin").checked ? "X" : "-";
    const image = document.getElementById("input-image").files[0];

    let rowToEdit = null;

    // go trough all tr elements and find if the new input-username match with the existing username in the table
    const tableRows = table.getElementsByTagName("tr");
    for (let i = 0; i < tableRows.length; i++) {
      const row = tableRows[i];
      const usernameCell = row.getElementsByTagName("td")[0];

      if (usernameCell && usernameCell.textContent === username) {
        rowToEdit = row;
        break;
      }
    }
    // if not null replacing the values
    if (rowToEdit != null) {
      const emailCell = rowToEdit.getElementsByTagName("td")[1];
      const addressCell = rowToEdit.getElementsByTagName("td")[2];
      const adminCell = rowToEdit.getElementsByTagName("td")[3];

      emailCell.textContent = email;
      addressCell.textContent = address;
      adminCell.textContent = admin;
      // if null adding all the new values for the table
    } else {
      const newRow = document.createElement("tr");
      const newusername = document.createElement("td");
      const newemail = document.createElement("td");
      const newaddress = document.createElement("td");
      const newadmin = document.createElement("td");

      newusername.textContent = username;
      newemail.textContent = email;
      newaddress.textContent = address;
      newadmin.textContent = admin;

      newRow.appendChild(newusername);
      newRow.appendChild(newemail);
      newRow.appendChild(newaddress);
      newRow.appendChild(newadmin);

      const imageCell = document.createElement("td");
      if (image) {
        const reader = new FileReader();
        reader.onload = function (event) {
          const img = document.createElement("img");
          img.src = event.target.result;
          img.height = 64;
          img.width = 64;
          imageCell.appendChild(img);
        };
        reader.readAsDataURL(image);
      }
      newRow.appendChild(imageCell);

      table.appendChild(newRow);
    }
  });

  emptybtn.addEventListener("click", function () {
    const table = document.getElementById("tablebody");
    table.innerHTML = "";
  });
}
