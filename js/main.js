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