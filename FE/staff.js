let tableData = []; // Menyimpan data tabel

// Fungsi untuk menampilkan form insert/edit
function showInsertForm(editIndex = null) {
    const formContainer = document.getElementById("insertForm");
    formContainer.classList.remove("hidden");

    // Jika editIndex diberikan, isi form dengan data yang akan diedit
    if (editIndex !== null) {
        const data = tableData[editIndex];
        document.getElementById("nama").value = data.nama;
        document.getElementById("nik").value = data.nik;
        document.getElementById("date").value = data.date;
        document.getElementById("posisi").value = data.posisi;
        document.getElementById("nomor").value = data.nomor;
        document.getElementById("kelamin").value = data.kelamin;
        document.getElementById("address").value = data.address;

        // Simpan indeks edit di form
        formContainer.setAttribute("data-edit-index", editIndex);
    } else {
        // Bersihkan form jika menambah data baru
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

    const id = document.getElementById("nama").value;
    const name = document.getElementById("nik").value;
    const date = document.getElementById("date").value;
    const sales = document.getElementById("posisi").value;
    const qty = document.getElementById("nomor").value;
    const customer = document.getElementById("kelamin").value;
    const address = document.getElementById("address").value;

    const formContainer = document.getElementById("insertForm");
    const editIndex = formContainer.getAttribute("data-edit-index");

    if (editIndex !== null) {
        // Edit data yang ada
        tableData[editIndex] = { nama, nik, date, posisi, nomor, kelamin, address, status: "" };
    } else {
        // Tambah data baru
        tableData.push({ nama, nik, date, posisi, nomor, kelamin, address, status:  "" });
    }

    updateTable();
    hideInsertForm();
}

// Fungsi untuk memperbarui tabel
function updateTable() {
    const tableBody = document.getElementById("tableBody");
    tableBody.innerHTML = ""; // Kosongkan tabel

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
    <td>${data.status}</td>
    <td>
        <button class="btn" onclick="showInsertForm(${index})">Edit</button>
        <button class="btn" onclick="deleteRow(${index})">Delete</button>
    </td>
`;


        tableBody.appendChild(row);
    });
}

// Fungsi untuk menghapus baris
function deleteRow(index) {
    // Hapus data dari array tableData
    tableData.splice(index, 1);

    // Perbarui tabel setelah data dihapus
    updateTable();
}

// Fungsi untuk pindah ke halaman staff.html
function back() {
    window.location.href = 'logistik.html';
}

// Fungsi untuk logout (ganti URL logout sesuai kebutuhan)
function logout() {
    // Misalnya, Anda dapat mengarahkan ke halaman logout atau menghapus sesi
    window.location.href = 'login.html';  // Ganti dengan halaman logout Anda
}

function searchTable() {
    var input = document.getElementById("searchInput");
    var filter = input.value.toUpperCase();
    var table = document.getElementById("dataTable");
    var tr = table.getElementsByTagName("tr");
    
    // Mulai mencari dari baris kedua (setelah header)
    for (var i = 1; i < tr.length; i++) {
        var td = tr[i].getElementsByTagName("td")[0]; // Mengambil nama produk (kolom pertama)
        if (td) {
            var txtValue = td.textContent || td.innerText;
            // Cek jika nama produk mengandung teks yang dicari
            if (txtValue.toUpperCase().indexOf(filter) > -1) {
                tr[i].style.display = ""; // Menampilkan baris yang cocok
            } else {
                tr[i].style.display = "none"; // Menyembunyikan baris yang tidak cocok
            }
        }
    }
}


