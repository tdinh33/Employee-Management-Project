// danh sách nhân viên 
var dsnv = [];

function renderDSNV() {
    var contentHTML = "";
    for (var i = 0; i < dsnv.length; i++) {
        var nv = dsnv[i];
        var trString =
            `<tr>
            <td>${nv.taiKhoan}</td>
            <td>${nv.hoTen}</td>
            <td>${nv.email}</td>
            <td>${nv.ngayLam}</td>
            <td>${nv.luongCoBan}</td>
            <td>${nv.chucVu}</td>
            <td>${nv.gioLamTrongThang}</td>
            <td>${nv.tinhTongLuong()}</td>
            <td>${nv.xepLoai()}</td>

            <td> 
                <button onclick="xoaNV('${nv.taiKhoan}')" class='btn btn-danger'>Delete</button>
                <button onclick="capNhatNV('${nv.taiKhoan}')" class='btn btn-danger'>Update</button>
            </td>
         </tr>`
        contentHTML = contentHTML + trString;
    }
    document.getElementById("tableDanhSach").innerHTML = contentHTML;
}


function themNV() {
    var taiKhoan = document.getElementById("tknv").value;
    var hoTen = document.getElementById("name").value;
    var matKhau = document.getElementById("password").value;
    var email = document.getElementById("email").value;
    var ngayLam = document.getElementById("datepicker").value;
    var luongCoBan = parseFloat(document.getElementById("luongCB").value);
    var chucVu = document.getElementById("chucvu").value;
    var gioLamTrongThang = parseFloat(document.getElementById("gioLam").value);

    // Validation
    var isValid = true;
    var errorMessages = [];
    

    // Validate Tài Khoản 
    if (!taiKhoan || !/^\d{4,6}$/.test(taiKhoan)) {
        isValid = false;
        errorMessages.push("Tài khoản phải là số từ 4-6 ký tự.");
    }
    

    // Validate Tên nhân viên 
    if (!hoTen || !/^[a-zA-Z\s]+$/.test(hoTen)) {
        isValid = false;
        errorMessages.push("Tên nhân viên không hợp lệ.");
    }
   
    // Validate Email
    if (!email || !/^\S+@\S+\.\S+$/.test(email)) {
        isValid = false;
        errorMessages.push("Email không hợp lệ.");
    }

    // Validate password
    if (!matKhau || !/^.{6,10}$/.test(matKhau) || !/\d/.test(matKhau) || !/[A-Z]/.test(matKhau) || !/[\W_]/.test(matKhau)) {
        isValid = false;
        errorMessages.push("Mật khẩu phải từ 6-10 ký tự và chứa ít nhất 1 số, 1 chữ in hoa, 1 ký tự đặt biệt.");
    }

    // Validate ngày làm
    if (!ngayLam) {
        isValid = false;
        errorMessages.push("Ngày làm không được để trống.");
    }

    // Validate lương CB
    if (isNaN(luongCoBan) || luongCoBan < 1000000 || luongCoBan > 2000000) {
        isValid = false;
        errorMessages.push("Lương cơ bản phải từ 1,000,000 - 20,000,000 VND.");
    }

    // Validate chức vụ 
    if (!chucVu || !["Sếp","Trưởng Phòng","Nhân Viên"].includes(chucVu)) {
        isValid = false;
        errorMessages.push("Chức vụ không hợp lệ.");
    }


    // Validate giờ làm
    if (isNaN(gioLamTrongThang) || gioLamTrongThang < 80 || gioLamTrongThang > 200) {
        isValid = false;
        errorMessages.push("Số giờ làm trong tháng phải từ 80 - 200 giờ.");
    }

    if (!isValid) {
        alert("Lỗi:\n" + errorMessages.join("\n"));
        return;
    }


    // tính tổng lương
    var nv = {
        taiKhoan: taiKhoan,
        hoTen: hoTen,
        email: email,
        matKhau: matKhau,
        ngayLam: ngayLam,
        luongCoBan: luongCoBan,
        chucVu: chucVu,
        gioLamTrongThang: gioLamTrongThang,
        tinhTongLuong: function () {
            if (this.chucVu === "Giám đốc"){
                return this.luongCoBan * 3;
            } else if (this.chucVu === "Trưởng Phòng") {
                return this.luongCoBan * 2;
            } else {
                return this.luongCoBan;
            }
        },
        xepLoai: function (){
            if (this.gioLamTrongThang >= 192) {
                return "Xuất sắc";
            } else if (this.gioLamTrongThang >= 176) {
                return "Giỏi";
            } else if (this.gioLamTrongThang >= 160) {
                return "Khá";
            } else {
                return "Trung bình";
            }
        }
    };

    dsnv.push(nv);
    renderDSNV();
}

function xoaNV(taiKhoan) {
    for (var i = 0; i < dsnv.length; i++) {
        if (dsnv[i].taiKhoan == taiKhoan) {
            dsnv.splice(i, 1);
        }
    }
    renderDSNV();
}

function capNhatNV(taiKhoan) {

}


function timNhanVienTheoLoai(loai) {
    var filteredNV = dsnv.filter(function (nv) {
        return nv.xepLoai() === loai;
    });
    renderDSNV (filteredNV);
}