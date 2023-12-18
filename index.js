var btn1 = document.getElementById("btn1");
        btn1.addEventListener('click', clicked);

        var tableBody = document.getElementById("tbody");

        // Load data from localStorage on page load
        window.addEventListener('load', function () {
            loadData();
        });

        function loadData() {
            // Clear existing rows
            tableBody.innerHTML = "";

            // Load data from localStorage
            for (var key in localStorage) {
                if (localStorage.hasOwnProperty(key)) {
                    var data = JSON.parse(localStorage[key]);
                    addRow(data, key);
                }
            }
        }

        function clicked(e) {
            e.preventDefault();

            var expense = document.getElementById("Expense").value;
            var description = document.getElementById("Expense_Discription").value;
            var type = document.getElementById("option").value;

            var obj = {
                "Expense": expense,
                "Description": description,
                "Type": type,
            };

            var key = new Date().toUTCString();
            localStorage.setItem(key, JSON.stringify(obj));

            // Add a row with the data
            addRow(obj, key);

            showData();
        }

        function addRow(data, key) {
            var row = tableBody.insertRow();
            var cell1 = row.insertCell(0);
            var cell2 = row.insertCell(1);
            var cell3 = row.insertCell(2);
            var cell4 = row.insertCell(3);
            cell1.innerHTML = data.Expense;
            cell2.innerHTML = data.Description;
            cell3.innerHTML = data.Type;

            var deleteBtn = document.createElement('button');
            deleteBtn.setAttribute('class', 'delBtn');
            deleteBtn.textContent = "Delete";
            deleteBtn.addEventListener('click', function () {
                deleteRow(row, key);
            });
            cell4.appendChild(deleteBtn);

            var editBtn = document.createElement('button');
            editBtn.setAttribute('class', 'Editbtn');
            editBtn.textContent = "Edit";
            editBtn.addEventListener('click', function () {
                editRow(row, data, key);
            });
            cell4.appendChild(editBtn);
        }

        function deleteRow(row, key) {
            tableBody.deleteRow(row.rowIndex);
            localStorage.removeItem(key); // Remove data from localStorage
            showData();
        }

        function editRow(row, data, key) {
            var expense = prompt("Edit Expense:", data.Expense);
            var description = prompt("Edit Description:", data.Description);
            var type = prompt("Edit Type:", data.Type);

            data.Expense = expense;
            data.Description = description;
            data.Type = type;

            row.cells[0].innerHTML = expense;
            row.cells[1].innerHTML = description;
            row.cells[2].innerHTML = type;

            localStorage.setItem(key, JSON.stringify(data)); // Update data in localStorage
            showData();
        }

        function showData() {
            // Add any additional logic you need to display data
        }