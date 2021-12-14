var arrayItemInCart = [];
var totalPrice = 0;
$(document).ready(function() {
   // window.onload=getAllBook();

    $('#the-loai-4').hover(
        function() {
            // $(this).css("background-color", "yellow");
            $('#the-loai-4 div').show();
            // $('.dropdown-menu-book-li div').css({"float":"left","min-width":"990","min-height":"990"})
        },
        function() {
            //$(this).css("background-color", "pink");
            $('#the-loai-4 div').hide();
        }
    )
    $('#the-loai-5').hover(
        function() {
            // $(this).css("background-color", "yellow");
            $('#the-loai-5 div').show();
            // $('.dropdown-menu-book-li div').css({"float":"left","min-width":"990","min-height":"990"})
        },
        function() {
            //$(this).css("background-color", "pink");
            $('#the-loai-5 div').hide();
        }
    )

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
    close.onclick = function() {
        modal.style.display = "none";
    }
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

function getAllBook(){
    console.log("enter home");
    $.ajax({
        url: 'http://localhost:8000/api/auth/getAllBook',
        type: 'get',
        success: function(result) {
            console.log(result);
        }
    })
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