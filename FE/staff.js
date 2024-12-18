let tableData = []; // Array untuk menyimpan data tabel

// Fungsi untuk menampilkan form insert
function showInsertForm(editIndex = null) {
    const formContainer = document.getElementById("insertForm");
    formContainer.classList.remove("hidden");

    if (editIndex !== null) {
        const data = tableData[editIndex];
        document.getElementById("nama").value = data.nama;
        document.getElementById("nik").value = data.nik;
        document.getElementById("date").value = data.date;
        document.getElementById("posisi").value = data.posisi;
        document.getElementById("nomor").value = data.nomor;
        document.getElementById("kelamin").value = data.kelamin;
        document.getElementById("address").value = data.address;

        formContainer.setAttribute("data-edit-index", editIndex);
    } else {
        document.getElementById("dataForm").reset();
        formContainer.removeAttribute("data-edit-index");
    }
}

// Fungsi untuk menyembunyikan form
function hideInsertForm() {
    document.getElementById("insertForm").classList.add("hidden");
}

// Fungsi untuk menambahkan atau mengedit data
function insertData(event) {
    event.preventDefault();

    const nama = document.getElementById("nama").value;
    const nik = document.getElementById("nik").value;
    const date = document.getElementById("date").value;
    const posisi = document.getElementById("posisi").value;
    const nomor = document.getElementById("nomor").value;
    const kelamin = document.getElementById("kelamin").value;
    const address = document.getElementById("address").value;

    const formContainer = document.getElementById("insertForm");
    const editIndex = formContainer.getAttribute("data-edit-index");

    if (editIndex !== null) {
        tableData[editIndex] = { nama, nik, date, posisi, nomor, kelamin, address };
    } else {
        tableData.push({ nama, nik, date, posisi, nomor, kelamin, address });
    }

    updateTable();
    hideInsertForm();
}

// Fungsi untuk memperbarui tabel
function updateTable() {
    const tableBody = document.getElementById("tableBody");
    tableBody.innerHTML = "";

    tableData.forEach((data, index) => {
        const row = document.createElement("tr");
        row.innerHTML = `
            <td>${data.nama}</td>
            <td>${data.nik}</td>
            <td>${data.date}</td>
            <td>${data.posisi}</td>
            <td>${data.nomor}</td>
            <td>${data.kelamin}</td>
            <td>${data.address}</td>
            <td>
                <button onclick="showInsertForm(${index})">Edit</button>
                <button onclick="deleteRow(${index})">Delete</button>
            </td>
        `;
        tableBody.appendChild(row);
    });
}

// Fungsi untuk menghapus baris
function deleteRow(index) {
    tableData.splice(index, 1);
    updateTable();
}

// Fungsi untuk search data
function searchTable() {
    const input = document.getElementById("searchInput").value.toUpperCase();
    const rows = document.querySelectorAll("#dataTable tbody tr");

    rows.forEach((row) => {
        const nama = row.cells[0].innerText.toUpperCase();
        row.style.display = nama.includes(input) ? "" : "none";
    });
}

// Fungsi untuk redirect ke halaman logistik
function goToLogistik() {
    window.location.href = "logistik.html";
}

// Fungsi untuk logout
function logout() {
    window.location.href = "login.html";
}
