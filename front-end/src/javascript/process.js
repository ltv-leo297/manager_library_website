var arrayItemInCart = [];
var totalPrice = 0;

$(document).ready(function() {
    //window.onload=getAllBook();
    var modal = document.getElementById("myModal2");
    var btn = document.getElementById("cart");
    var close = document.getElementsByClassName("close")[0];

    // var close_footer = document.getElementsByClassName("close-footer")[0];
    // var btnClose = document.getElementsByClassName("btn btn-secondary close-footer");
    // btnClose.onclick = function() {
    //     // modal.style.display = "none";
    //     modal.style.display = "block";
    //     //  modal.style.display = "none";
    // }
    // close.onclick = function() {
    //     modal.style.display = "none";
    // }
    // close_footer.onclick = function() {
    //     modal.style.display = "none";
    // }
    window.onclick = function(event) {
        if (event.target == modal) {
            modal.style.display = "none";
        }
    }
});

function closeDialog() {
    console.log("btn close is ...");
    var modal2 = document.getElementById("myModal2");
    var modal_content = document.getElementsByClassName("modal-content");
    console.log(modal2.style);
    modal_content.hide;
}

function openPay() {
    var arrayJSON = JSON.stringify(arrayItemInCart);
    sessionStorage.setItem('itemArray', arrayJSON);
    window.location.href = 'pay.html';
}



function sendInforAccountRegister() {

    const email_register = document.getElementById("regist_email").value;
    console.log(email_register);
    console.log("click button");
    $.ajax({
        url: 'http://localhost:8000/api/auth/register',
        type: 'post',
        datatype: 'json',
        data: {
            "email": email_register,
            "password": "123456",
            "name": "khanh",
        },
        success: function(result) {
            console.log(result);
            // alert(result.content.datas.email);
        }
    })

}
// category
function CategoryAdd() {

    const cate_name = document.getElementById("category_name").value;
    const cate_des = document.getElementById("description").value;

    console.log("click button");
    $.ajax({
        url: 'http://localhost:8000/api/category/AddCategory',
        type: 'post',
        datatype: 'json',
        data: {
            "categoryName": cate_name,
            "description": cate_des,
        },
        success: function(result) {
            window.location.reload();
            // alert(result.content.datas.email);
        }
    })
}

function deleteCategory(element) {

    var categoryIdNeedDelete = element.parentElement.parentElement.id;
    console.log(categoryIdNeedDelete);
    var option = confirm("Bạn có chắc chắn muốn xóa?");
    if (option == true) {
        $.ajax({
            url: 'http://localhost:8000/api/category/DeleteCategory',
            type: 'post',
            datatype: 'json',
            data: {
                "categoryId": categoryIdNeedDelete,
            },
            success: function(result) {
                console.log(result);
                element.parentElement.parentElement.remove();
                
            }
        })
    } else {}
}

function getAllCategory() {
    console.log("click button");
    var panel_include_row_category = document.getElementById("panel_include_row_category");
    $.ajax({
        url: 'http://localhost:8000/api/category/GetCategory',
        type: 'get',
        // datatype: 'json',
        // data: {
        //     "categoryName": cate_name,
        //     "description": cate_des,            
        // },
        success: function(result) {
            console.log(result);
            var arrayCategory = result.content.datas;

            arrayCategory.forEach((element) => {
                var rowAdminCategory = `
                <td>${element.categoryId}</td>
                <td>${element.categoryName}</td>
                <td>${element.description}</td>
                <td>
                    <input type="hidden" name="categoryId" value=${element.categoryId}>
                    <form action="admin_danhmuc_edit.html" method="GET">
                        <input type="hidden" name="categoryId" value=${element.categoryId}>
                        <input type="submit" class="btn btn-warning" style="padding:11px 32px" value="Sửa">
                    </form>
                     <a href="#" class="btn btn-danger" style="padding:11px 0px 10px 3px" onclick="deleteCategory(this)">
                    Delete
                </a>
                </td>
                `;
                divRowCategory = document.createElement('tr');
                divRowCategory.classList.add('text-center');
                divRowCategory.id = element.categoryId;
                divRowCategory.innerHTML = rowAdminCategory;
                panel_include_row_category.append(divRowCategory);
                console.log(divRowCategory);
            })
        }
    })
}

function updateCategory() {
    console.log("abc");
    var urlSearchParams = new URLSearchParams(window.location.search);
    var params = Object.fromEntries(urlSearchParams.entries());
    console.log("Category Id: " + params.categoryId);
    const cate_name = document.getElementById("category_name").value;
    console.log(document.getElementById("category_des"))
    const cate_des = document.getElementById("category_des").value;


    $.ajax({
        url: 'http://localhost:8000/api/category/UpdateCategory',
        type: 'post',
        datatype: 'json',
        data: {
            "categoryId": params.categoryId,
            "categoryName": cate_name,
            "description": cate_des,
        },
        success: function(result) {
            console.log(result);
        }
    })
    var form = document.getElementById('form_update_category');
    if (form.checkValidity()) {
        alert("Sửa Thành Công");
    }
    // var form = document.getElementById('form_update');
    // if (form.checkValidity()) {
    //     alert("Sửa Thành Công");
    // }
}


// Book
function getAllBook() {
    console.log("enter home");
    var panel_row_include_book = document.getElementById("panel_row_include_book");
    const urlImg = "../css/img/book/";
    $.ajax({
        url: 'http://localhost:8000/api/book/getAllBook',
        type: 'get',
        success: function(result) {
            console.log(result);
            var arrayBook = result.content.datas;
            arrayBook.forEach((element) => {
                var rowBookData = `
                <td class="text-center">${element.bookId}</td>
                <td class="text-center">${element.bookName}</td>
                <td class="text-center">${element.bookAuthor}</td>
                <td class="text-center">${element.bookCategory}</td>
                <td class="text-center">
                    <img src="../../css/img/book/${element.linkImageBook}" style = "height: 100px">
                </td>
                <td class="text-center">${element.money}</td>
                <td>${element.numberOfBook}</td>                
                <td class="text-center">
                        <form action="admin_sanpham_edit.html" method="GET">
                        <input type="hidden" name="bookId" value=${element.bookId}>
                        <input type="submit" class="btn btn-warning" style="padding:11px 32px" value="Sửa">
                        </form>
                        <input type="button" onclick=deleteBook(this) class="btn btn-danger" value="Xóa">
                </td>
                
                `;

                var BookData = document.createElement('tr');
                BookData.classList.add('text-center');
                BookData.id = element.bookId;
                BookData.innerHTML = rowBookData;
                panel_row_include_book.append(BookData);

                console.log(BookData);
            })
        }
    })
}

    //Load book index
function getBookWithCategory(categoryName,book_Id){
    console.log(categoryName);
    const containerBook=document.getElementById(book_Id);
    $.ajax({
        url: 'http://localhost:8000/api/book/findBook',
        type: 'post',
        datatype:'json',
        data:{
            "inforWantToFind":categoryName
        },
        success: function(result) {
            console.log(result);
            var arrayBook = result.content.datas;
            
            // var divContainAllRowBook=document.createElement('div');
            // divContainAllRowBook.classList.add("cartegory-right-content");
            // divContainAllRowBook.classList.add("row");

            var divContainAllRowBook=`<div class="cartegory-right-content row">`
            
            arrayBook.forEach((element) => {
                var rowBookData = `
                        
                        <div class="cartegory-right-content-item" id=${element.bookId}>
                        
                            
                            <img class="img-prd" src="../css/img/book/${element.linkImageBook}" alt="sach9" style="width:75px,height:75px">
                            <h1 class="content-product-h1">${element.bookName}</h1>
                            <p class="price">${element.money}<sup>đ</sup></p>
                            <form action="details.html" method="GET">
                            <input type="hidden" name="bookId" value=${element.bookId}>
                            <input type="submit" class="btn btn-warning" style="padding:11px 32px" value="Xem sách">
                            </form>
                            <button type="button" class="btn btn-cart" onclick="chooseBookAddToCart(this)">Thêm Vào Giỏ</button>
                        </div>
                        
                    
                `
                
                divContainAllRowBook=divContainAllRowBook.concat(" ",rowBookData," ");
            })
            divContainAllRowBook+="</div>";
            
                var BookData = document.createElement('div');
                
                // // BookData.id = element.bookId;
                BookData.innerHTML = divContainAllRowBook;
                containerBook.append(BookData);

        }
    })
}
function loadBookInIndexPage(){
    // const inforAccountAfterLogin = sessionStorage.getItem('inforAccountLogin');
    // if(inforAccountAfterLogin!=null){
    //     document.getElementById("login_regis_li").style.display="none";
    //     document.getElementById("userName_li").style.display="block";
    //     document.getElementById("username_login").innerHTML=inforAccountAfterLogin.name;
    // }
    
    getBookWithCategory("Thiếu nhi","book_thieunhi");
    getBookWithCategory("Kinh tế","book_kinhte");
    
    getBookWithCategory("Văn học","book_vanhoc");
}

function deleteBook(element) {

    var bookIdNeedDelete = element.parentElement.parentElement.id;
    console.log(bookIdNeedDelete);
    var option = confirm("Bạn có chắc chắn muốn xóa?");
    if (option == true) {
        $.ajax({
            url: 'http://localhost:8000/api/book/DeleteBook',
            type: 'post',
            datatype: 'json',
            data: {
                "bookId": bookIdNeedDelete,
            },
            success: function(result) {
                console.log(result);
                element.parentElement.parentElement.remove();
                // alert(result.content.datas.email);
            }
        })
    } else {}
}

function clickButtonEditBook() {
    var urlSearchParams = new URLSearchParams(window.location.search);
    var params = Object.fromEntries(urlSearchParams.entries());
    console.log("book id: " + params.bookId);

    const book_name = document.getElementById("bookname").value;
    const author_name = document.getElementById("authorname").value;
    const category = document.getElementById("category").value;
    var money = document.getElementById("money").value;;
    var quantity = document.getElementById("quantity").value;
    var page_number = document.getElementById("pagenumber").value;
    const book_img = document.getElementById("img-book").files[0].name;
    const urlImg = "../css/img/book" + book_img;
    const comp_publish = document.getElementById("publishingComp").value;
    const mass = document.getElementById("mass").value;
    const publishday = document.getElementById("publishday").value;
    const size = document.getElementById("size").value;
    const description = document.getElementById("description").value;

    $.ajax({
        url: 'http://localhost:8000/api/book/UpdateBook',
        type: 'post',
        datatype: 'json',
        data: {
            "bookId": params.bookId,
            "bookName": book_name,
            "bookAuthor": author_name,
            "bookCategory": category,
            "money": money,
            "numberOfBook": quantity,
            "linkImageBook": book_img,
            "publishingCompany": comp_publish,
            "numberOfPage": page_number,
            "mass": mass,
            "sizeOfBook": size,
            "dateOfPublishing": publishday,
            "description": description,
        },
        success: function(result) {
            console.log(result);
            // alert(result.content.datas.email);
        }
    })

}

function BookAdd() {
    console.log("abcxyz");
    const book_name = document.getElementById("bookname").value;
    const author_name = document.getElementById("authorname").value;
    const category = document.getElementById("category").value;

    var money = document.getElementById("money").value;;
    var quantity = document.getElementById("quantity").value;
    var page_number = document.getElementById("pagenumber").value;
    const book_img = document.getElementById("img-book").files[0].name;
    const urlImg = "../css/img/book" + book_img;


    const comp_publish = document.getElementById("publishingComp").value;
    const mass = document.getElementById("mass").value;
    const publishday = document.getElementById("publishday").value;
    console.log("publishday: " + publishday);
    const size = document.getElementById("size").value;
    const description = document.getElementById("description").value;



    $.ajax({
        url: 'http://localhost:8000/api/book/AddBook',
        type: 'post',
        datatype: 'json',

        data: {
            "bookName": book_name,
            "bookAuthor": author_name,
            "bookCategory": category,
            "money": money,
            "numberOfBook": quantity,
            "linkImageBook": book_img,
            "publishingCompany": comp_publish,
            "numberOfPage": page_number,
            "mass": mass,
            "sizeOfBook": size,
            "dateOfPublishing": publishday,
            "description": description,

        },
        success: function(result) {
            console.log(result);
            window.location.reload();
            // alert(result.content.datas.email);
        }
    })

}
// End book

function loadCartInfor() {

    arrayItemInCart = JSON.parse(sessionStorage.getItem('itemArray'));
    const panel_cart_items = document.getElementById("panel_cart_items");

    console.log("array length: " + arrayItemInCart.length);
    arrayItemInCart.forEach(element => {
        console.log(element.img);
        console.log(element.title);
        console.log(element.price);
        var cartRowContents = `
        
        <div class="col-sm-3 col-xs-3">
            <img class="img-responsive" src="${element.img}" />
        </div>
        <div class="col-sm-6 col-xs-6">
            <div class="col-xs-12">${element.title}</div>
            <div class="col-xs-12"><small>Số lượng: <span>${element.numberBookWantToBuy}</span></small></div>
        </div>
        <div class="col-sm-3 col-xs-3 text-right">
            <h6>${element.price}</h6>
        </div>
        `
        var cartRow = document.createElement('div');
        cartRow.id = element.id;
        cartRow.classList.add('form-group');
        cartRow.innerHTML = cartRowContents;
        panel_cart_items.append(cartRow);
    });
    updateTotalPrice();
}


function getAllOrder(){
    const contain_order_payment = document.getElementById("contain_order_payment");

    $.ajax({
        url: 'http://localhost:8000/api/order/doGetAllorder',
        type: 'get',
        success: function(result) {
            console.log(result);
            arrayOrder=result.content.datas;
            arrayOrder.forEach((element)=>{
                var cartRowContents = `
                <td class="text-center">1</td>
                <td class="text-center" style="color:#000;font-weight: 600;">${element.orderId}</td>
                <td class="text-center" style="color:#0095ff;font-weight:600;">${element.totalNumberOfBook}</td>
                <td class="text-center" style="color:#50ff24;font-weight:600;">${element.moneyofOrder}</td>
                <td class="text-center" style="color:#448b32;font-weight:600;">${element.dateofOrder}</td>
                <td class="text-center">
                    <form class="text-center" action="admin_donhang_detail_2.html" method="GET">
                        <input type="hidden" name="orderId" value=${element.orderId}>
                        <input type="submit" class="btn btn-warning" style="padding:15px 32px;" value="Đơn Hàng">
                    </form>
                    <form class="text-center" action="admin_donhang_detail_1.html" method="GET">
                        <input type="hidden" name="orderId" value=${element.orderId}>
                        <input type="submit" class="btn btn-danger" style="padding:15px 32px;" value="Khách Hàng">
                    </form>
                </td>
                `
                var cartRow = document.createElement('tr');
                cartRow.id = element.orderId;
                cartRow.innerHTML = cartRowContents;
                contain_order_payment.append(cartRow);
            })
            // window.location.reload();
            // alert(result.content.datas.email);
        }
    })
    
}

function getInforUserInOrder(){
    var urlSearchParams = new URLSearchParams(window.location.search);
    var params = Object.fromEntries(urlSearchParams.entries());
     $.ajax({
        url: 'http://localhost:8000/api/order/doGetInforOrder',
        type: 'post',
        datatype:'json',
        data:{
            "orderId":params.orderId
        },
        success: function(result) {
           document.getElementById("nameUser").innerHTML=result.content.datas.nameUser;
           document.getElementById("addressUser").innerHTML=result.content.datas.addressUser;
           document.getElementById("countryUser").innerHTML=result.content.datas.countryUser;
           document.getElementById("phoneNumberUser").innerHTML=result.content.datas.phoneNumberUser;
           document.getElementById("emailUser").innerHTML=result.content.datas.emailUser;
           

        }
    })
}

function getDetailOrder(){
    var urlSearchParams = new URLSearchParams(window.location.search);
    var params = Object.fromEntries(urlSearchParams.entries());
    console.log("order id: " + params.orderId);

    const contain_order_payment = document.getElementById("contain_order_details_payment");

    $.ajax({
        url: 'http://localhost:8000/api/order/doGetInforOrderDetails',
        type: 'post',
        datatype:'json',
        data:{
            "orderId":params.orderId
        },
        success: function(result) {
            console.log(result);
            arrayOrder=result.content.datas;
            arrayOrder.forEach((element)=>{
                var cartRowContents = `
                <td class="text-center" style="color:#000;font-weight: 600;">${element.orderId}</td>
                <td class="text-center" style="color:#0095ff;font-weight:600;">${element.bookId}</td>
                <td class="text-center" style="color:#50ff24;font-weight:600;">${element.numberOfBook}</td>
                <td class="text-center" style="color:#448b32;font-weight:600;">${element.moneyofOrderDetail}</td>
                `
                var cartRow = document.createElement('tr');
                cartRow.id = element.orderId;
                cartRow.innerHTML = cartRowContents;
                contain_order_payment.append(cartRow);
            })
            // window.location.reload();
            // alert(result.content.datas.email);
        }
    })

}

function paymentCart(){
    arrayItemInCart = JSON.parse(sessionStorage.getItem('itemArray'));

    const totalPrice = document.getElementById("total-price-cart").innerHTML;
    const nameUser = document.getElementById("nameUser").value;
    const addressUser = document.getElementById("addressUser").value;
    const countryUser = document.getElementById("countryUser").value;
    const nationalUser = document.getElementById("nationalUser").value;
    const phoneNumberUser = document.getElementById("phoneNumberUser").value;
    const emailUser = document.getElementById("emailUser").value;
    const descriptionOrder = document.getElementById("descriptionOrder").value;

    const nowDate = new Date();

    var totalNumberOfBookInCart=0;
    arrayItemInCart.forEach(element => {
        totalNumberOfBookInCart+=element.numberBookWantToBuy;
        element.price=parsePriceFromString(element.price);
    });

    console.log("totalbook: "+totalNumberOfBookInCart);
    console.log("totalPrice: "+parsePriceFromString(totalPrice));
    
    datePayment=nowDate.getDate().toString()+"/"+nowDate.getMonth().toString()+"/"+nowDate.getFullYear().toString();
    
    $.ajax({
        url: 'http://localhost:8000/api/order/doAddOrder',
        type: 'post',
        datatype: 'json',

        data: {
            "nameUser":nameUser,
            "addressUser":addressUser,
            "countryUser":countryUser,
            "nationalUser":nationalUser,
            "phoneNumberUser":phoneNumberUser,
            "emailUser":emailUser,
            "descriptionOrder":descriptionOrder,
            "arrayBookBought":arrayItemInCart,
            "moneyOfOrder":parsePriceFromString(totalPrice),
            "dateOfOrder":datePayment,
            "totalNumberOfBook":totalNumberOfBookInCart,

        },
        success: function(result) {
            console.log(result);
            // window.location.reload();
            // alert(result.content.datas.email);
        }
    })
}



function chooseBookAddToCart(element) {
    // chosse book and pass to array
    const item = document.getElementById(element.parentElement.id);
    var objectItem = {
        // key va value

        id: element.parentElement.id,
        img: item.getElementsByClassName("img-prd")[0].src,
        title: item.getElementsByClassName("content-product-h1")[0].innerText,
        price: item.getElementsByClassName("price")[0].innerText,
        numberBookWantToBuy: 1,
    }
    arrayItemInCart.push(objectItem);
    // handle price of all item
    totalPrice += parsePriceFromString(objectItem.price);
}

function showCart() {
    // create element (row) book in cart
    arrayItemInCart.forEach(element => {
        var cartItems = document.getElementsByClassName('cart-items')[0];
        var cartRowContents = `
      <div class="cart-item cart-column">
          <img class="cart-item-image" src="${element.img}" width="100" height="100">
          <span class="cart-item-title">${element.title}</span>
      </div>
      <span class="cart-price cart-column">${element.price}</span>
      <div class="cart-quantity cart-column">
          <input class="cart-quantity-input" type="number" value=${element.numberBookWantToBuy} onclick="updateNumberBook(this)">
          <button class="btn btn-danger" type="button" onclick="removeItem(this)">Xóa</button>
      </div>`
        var cartRow = document.createElement('div')
        cartRow.id = element.id;
        cartRow.classList.add('cart-row')
        cartRow.innerHTML = cartRowContents
        cartItems.append(cartRow)

        // show total price;
        showTotalPrice();


    });
}

function removeItem(element) {

    arrayItemInCart.forEach((item, index) => {
        if (item.id === element.parentElement.parentElement.id) {
            arrayItemInCart.splice(index, 1);
        }
    })
    element.parentElement.parentElement.remove();
    updateTotalPrice();
}

function deleteAllItemInCart() {
    console.log("start delete items");
    var cartItems = document.getElementsByClassName('cart-items')[0];
    cartItems.innerHTML = "";
}

function updateNumberBook(element) {


    arrayItemInCart.forEach(item => {
        if (item.id === element.parentElement.parentElement.id) {
            item.numberBookWantToBuy = parseFloat(element.value);
        }
    });
    if (element.value == 0) {
        removeItem(element);
    } else {
        updateTotalPrice();
    }
}

function updateTotalPrice() {
    totalPrice = 0;
    arrayItemInCart.forEach(item => {
        totalPrice += parsePriceFromString(item.price) * (item.numberBookWantToBuy);
    });
    showTotalPrice();
}

function parsePriceFromString(priceString) {
    var price_item = priceString.substring(0, priceString.length - 1);
    const parse_price_item = parseFloat(price_item);

    return parse_price_item
}

function showTotalPrice() {
    const spanToTalPrice = document.getElementById("total-price-cart");
    spanToTalPrice.innerHTML = totalPrice + ' VNĐ ';
}

// Vinh
// trang login.html
function doLoginOfAdminFunction() {

    const email = document.getElementById("username").value;
    const password = document.getElementById("password").value;

    $.ajax({
        url: 'http://localhost:8000/api/auth/login',
        type: 'post',
        datatype: 'json',
        data: {
            "email": email,
            "password": password
        },
        success: function(result) {
            console.log(result.content.datas.account);
            if (result.content.datas.account.role==0){
                console.log("test");
                newUrl="G:/Learning/LAPTRINHWEB/manager_library_website/front-end/src/pages/Admin_pages/admin.html";
                document.location.href = newUrl;
            }
        }
    })
}

// Cao Khoa
function getRoleForAccount() {
    console.log("enter home");
    $.ajax({
        url: 'http://localhost:8000/api/auth/getRoleForAccount',
        type: 'get',
        success: function(result) {
            console.log(result);
            var arrayRoleForUser = result.content.datas;
            arrayRoleForUser.forEach((element) => {
                var rowAdminAddUser = `${element.display_name}`;
                var valueRoleID = `${element.roleId}`
                divRowRoleForUser = document.createElement('option');
                divRowRoleForUser.value = valueRoleID;
                divRowRoleForUser.innerHTML = rowAdminAddUser;
                add_role.append(divRowRoleForUser);
            })
        }
    })
}

//Add Account
function sendInforAccount() {
    const user_name = document.getElementById("add_name").value;
    const user_email = document.getElementById("add_email").value;
    const user_password = document.getElementById("add_password1").value;
    var user_gender = document.querySelector('input[name="gender"]:checked').value;
    const user_dob = document.getElementById("add_dob").value;
    var select = document.getElementById('add_role');
    var user_role = select.options[select.selectedIndex].value;
    console.log("click button add user");
    $.ajax({
        url: 'http://localhost:8000/api/auth/addAccount',
        type: 'post',
        datatype: 'json',
        data: {
            "name": user_name,
            "email": user_email,
            "password": user_password,
            "gender": user_gender,
            "role": user_role,
            "dateOfBird": user_dob
        },
        success: function(result) {
            console.log(result);
        }
    })
    var form = document.getElementById('form_add');
    if (form.checkValidity()) {
        alert("Thêm Thành Công");
    }
}
//Get Account
function getAllAccount() {
    console.log("enter home");
    $.ajax({
        url: 'http://localhost:8000/api/auth/getAllAccount',
        type: 'get',
        success: function(result) {
            console.log(result);
            var arrayAllAccount = result.content.datas;
            arrayAllAccount.forEach((element) => {
                var rowAccount = `
                <th class="count"></th>
                <th class="text">${element.name}</th>
                <th class="text">${element.email}</th>
                <th class="change">
                        <form class="change1" action="admin_user_edit.html" method="GET">
                        <input type="hidden" name="accountId" value=${element.accountId}>
                        <input type="submit" class="btn btn-warning" style="padding:15px 32px;" value="Sửa">
                        </form>
                        <input type="button" id="delete" onclick=deleteAccount(this) class="btn btn-danger" value="Xóa">
                </th>`
                var valueID = `${element.accountId}`
                AccountData = document.createElement('tr');
                AccountData.id = valueID;
                AccountData.innerHTML = rowAccount;
                account_main.append(AccountData);
                console.log(AccountData);
            })
        }
    })
}
//Update Account
function updateAccount() {
    var urlSearchParams = new URLSearchParams(window.location.search);
    var params = Object.fromEntries(urlSearchParams.entries());
    console.log("Account Id: " + params.accountId);
    const user_name = document.getElementById("add_name").value;
    const user_email = document.getElementById("add_email").value;
    const user_password = document.getElementById("add_password1").value;

    const user_gender = document.querySelector('input[name="gender"]:checked');
    var gender_1;
    if (user_gender) {
        gender_1 = user_gender.value;
    }
    const select = document.getElementById('add_role');
    const user_role = select.options[select.selectedIndex];
    var role_1;
    if (user_role) {
        role_1 = user_role.value;
    }

    const user_dob = document.getElementById("add_dob").value

    console.log("click button add user");
    $.ajax({
        url: 'http://localhost:8000/api/auth/updateAccount',
        type: 'post',
        datatype: 'json',
        data: {
            "accountId": params.accountId,
            "email": user_email,
            "name": user_name,
            "password": user_password,
            "gender": gender_1,
            "dateOfBird": user_dob,
            "role": role_1
        },
        success: function(result) {
            console.log(result);
        }
    })
    var form = document.getElementById('form_update');
    if (form.checkValidity()) {
        alert("Sửa Thành Công");
    }
}

//Delete Account
function deleteAccount(element) {
    var AccountIdNeedDelete = element.parentElement.parentElement.id;
    console.log(AccountIdNeedDelete);
    var option = confirm("Bạn có chắc chắn muốn xóa?");
    if (option == true) {
        $.ajax({
            url: 'http://localhost:8000/api/auth/deleteAccount',
            type: 'post',
            datatype: 'json',
            data: {
                "accountId": AccountIdNeedDelete,
            },
            success: function(result) {
                console.log(result);
                element.parentElement.parentElement.remove();
            }
        })
    } else {}
}

// Login
function login() {
    const email = document.getElementById("login_form").value;
    const password = document.getElementById("password_form").value;

    $.ajax({
        url: 'http://localhost:8000/api/auth/login',
        type: 'post',
        datatype: 'json',
        data: {
            "email": email,
            "password": password
        },
        success: function(result) {
            console.log(result.content.datas.account);
            document.getElementById("login_regis_li").style.display="none";
            document.getElementById("userName_li").style.display="block";
            document.getElementById("username_login").innerHTML=result.content.datas.account.name.toUpperCase();
            sessionStorage.setItem('inforAccountLogin', result.content.datas.account);
            
            
            // console.log(result.content.datas.account);
            // if (result.content.datas.account.role==0){
            //     console.log("test");
            //     // newUrl="G:/Learning/LAPTRINHWEB/manager_library_website/front-end/src/pages/Admin_pages/admin.html";
            //     // document.location.href = newUrl;
            // }
        }
    })
}
function getInforUserAfterLogin(){
    
    // const inforAccountAfterLogin = sessionStorage.getItem('inforAccountLogin');
    // console.log(inforAccountAfterLogin);
    // document.getElementById("regist_name").value=inforAccountAfterLogin.name;
    // document.getElementById("regist_email").value=inforAccountAfterLogin.email;
    // document.getElementById("regist_date").value=inforAccountAfterLogin.dateOfBird;
    // document.getElementById("sex").value=inforAccountAfterLogin.gender;
}

// End Cao Khoa

// js details
function LoadDetailBook() {
    var urlSearchParams = new URLSearchParams(window.location.search);
    var params = Object.fromEntries(urlSearchParams.entries());
    console.log("Book Id: " + params.bookId);
    const urlImg = "../css/img/book/";

    $.ajax({
        url: 'http://localhost:8000/api/book/GetInforBook',
        type: 'post',
        datatype: 'json',
        data: {
            "bookId": params.bookId,
            // "bookId": params.bookId.
        },
        success: function(result) {
            console.log(result);
            const elementBook = result.content.datas;
            // const elementmoney= result.content.datas;

            const urlImg = "../css/img/book/" + elementBook.linkImageBook;
            document.getElementById('img_book').src = urlImg;

            document.getElementById('descriptionBook').innerHTML = elementBook.description;
            document.getElementById('price_details').innerHTML = elementBook.money;
            document.getElementById('book_name').innerHTML = elementBook.bookName;
            document.getElementById('book_title').innerHTML = elementBook.bookName;
            document.getElementById('author').innerHTML = elementBook.bookAuthor;
            document.getElementById('publish_company').innerHTML = elementBook.publishingCompany;
            // document.getElementById('descriptionBook2').innerHTML=elementBook.description;
            document.getElementById('author2').innerHTML = elementBook.bookAuthor;
            document.getElementById('publish_company2').innerHTML = elementBook.publishingCompany;
            document.getElementById('mass').innerHTML = elementBook.mass;
            document.getElementById('date').innerHTML = elementBook.dateOfPublishing;
            document.getElementById('size').innerHTML = elementBook.sizeOfBook;
            document.getElementById('numberpage').innerHTML = elementBook.numberOfPage;

        }
    })

}