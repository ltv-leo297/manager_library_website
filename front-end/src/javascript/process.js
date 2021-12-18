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
function openPay(){
        var arrayJSON = JSON.stringify(arrayItemInCart);
        sessionStorage.setItem('itemArray', arrayJSON);
        window.location.href = 'pay.html';  
}



function sendInforAccountRegister() {

    const email_register=document.getElementById("regist_email").value;
    
    console.log("click button");
    $.ajax({
        url: 'http://localhost:8000/api/auth/register',
        type: 'post',
        datatype: 'json',
        data: {
            "email": email_register,
            "password": "123456",
            "name":"khanh",
        },
        success: function(result) {
            console.log(result);
            alert(result.content.datas.email);
        }
    })

}

function CategoryAdd() {

    const cate_name=document.getElementById("category_name").value;
    const cate_des=document.getElementById("description").value;

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
            console.log(result);
            // alert(result.content.datas.email);
        }
    })

}


function LoadCategory(){
    console.log("click button");
    var panel_include_row_category=document.getElementById("panel_include_row_category");
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
            var arrayCategory=result.content.datas;
            
            arrayCategory.forEach((element)=>{
                var rowAdminCategory=`
                <td>${element.categoryId}</td>
                <td>${element.categoryName}</td>
                <td>${element.description}</td>
                <td>
                    <a href="./admin_danhmuc_edit.html" class="btn btn-warning">
                    
                    Edit
                    </a>
                    <a href="#" class="btn btn-danger" onclick="return confirm('Bạn có chắc chắn muốn xóa?')" class="btn btn-danger">
                    
                    Delete
                </a>
                </td>
                `;
                divRowCategory=document.createElement('tr');
                divRowCategory.classList.add('text-center');
                divRowCategory.innerHTML=rowAdminCategory;
                panel_include_row_category.append(divRowCategory);
            })
        }
    })
}

function getAllBook(){
    console.log("enter home");
    var panel_row_include_book=document.getElementById("panel_row_include_book");
    const urlImg="../css/img/book";
    $.ajax({
        url: 'http://localhost:8000/api/book/GetBook',
        type: 'get',
        success: function(result) {
            console.log(result);
            var arrayBook=result.content.datas;
            arrayBook.forEach((element)=>{
                var rowBookData=`
                <tr id=${element.bookId} class="text-center>
                <td class="text-center">${element.bookId}</td>
                <td class="text-center">${element.bookName}</td>
                <td class="text-center">${element.bookAuthor}</td>
                <td class="text-center">${element.bookCategory}</td>
                <td class="text-center">
                    <img src="${element.linkImageBook}">
                </td>
                <td class="text-center">${element.money}</td>
                <td>${element.numberOfBook}</td>                
                <td class="text-center">
                    
                        <input type="submit" class="btn btn-warning" style="padding:11px 32px" value="Sửa">
                    
                        <a href="#" onclick="return confirm('Bạn có chắc chắn muốn xóa?')" class="btn btn-danger">Xóa</a>
                    
                </td>
                </tr>
                `;

            // BookData=document.createElement('form');
            // BookData.name='myForm';
            // BookData.method='GET';
            // BookData.action='./admin_sanpham_edit.html';

           
            // BookData.submit();
            
            // BookData.innerHTML=rowBookData;
            // // BookData.submit();
            BookData='';
            BookData.innerHTML=rowBookData;
            panel_row_include_book.append(BookData);

            console.log(BookData);
            }
            
            )
            
        }
    })
}

function BookAdd() {
    console.log("abcxyz");
    var d= new Date();
    const book_name=document.getElementById("bookname").value;
    // const author_name=document.getElementById("authorname").value;
    // const category=document.getElementById("category").value;
    // const money=parseInt(document.getElementById("money").value);
    // const quantity=parseInt(document.getElementById("quantity").value);
    const book_img=document.getElementById("img-book").files[0].name;
    const urlImg="../css/img/book"+book_img;
    console.log(urlImg);
    // const comp_publish=document.getElementById("publishingComp").value;
    // const mass=document.getElementById("mass").value;
    // const page_number=parseInt(document.getElementById("pagenumber").value);
    const publishday=document.getElementById("publishday").innerHTML = d.getDate();
    // const size=document.getElementById("size").value;
    // const description=document.getElementById("description").value;

    var formData = new FormData();
    formData.append("bookName",book_name);
    formData.append("linkImageBook",book_img);
    var request = new XMLHttpRequest();
    request.open("POST","http://localhost:8000/api/book/AddBook");
    request.send(formData);
    
    // $.ajax({
    //     url: 'http://localhost:8000/api/book/AddBook',
    //     type: 'post',
    //     datatype: 'json',
        
    //     data: {
    //         "bookName": book_name,
    //         // "bookAuthor": author_name,
    //         // "bookCategory": category,
    //         // "money":money,
    //         // "numberOfBook":quantity,
    //        //"linkImageBook":book_img,
    //         // "publishingCompany":comp_publish,
    //         // "numberOfPage":page_number,
    //         // "mass":mass,
    //         // "sizeOfBook":size,
    //         "dateOfPublishing":publishday,
    //         // "description":description,
                       
    //     },
    //     success: function(result) {
    //         console.log(result);
    //         // alert(result.content.datas.email);
    //     }
    // })

}

function loadCartInfor(){
    
    arrayItemInCart = JSON.parse(sessionStorage.getItem('itemArray'));
    const panel_cart_items=document.getElementById("panel_cart_items");
    
    console.log("array length: " + arrayItemInCart.length);
    arrayItemInCart.forEach(element=>{
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