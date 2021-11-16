$(document).ready(function() {
    $('#the-loai-4').hover(
        function(){
            // $(this).css("background-color", "yellow");
            $('#the-loai-4 div').show();
           // $('.dropdown-menu-book-li div').css({"float":"left","min-width":"990","min-height":"990"})
        }, function(){
            //$(this).css("background-color", "pink");
            $('#the-loai-4 div').hide();
        }
    )
    $('#the-loai-5').hover(
        function(){
           // $(this).css("background-color", "yellow");
            $('#the-loai-5 div').show();
           // $('.dropdown-menu-book-li div').css({"float":"left","min-width":"990","min-height":"990"})
        }, function(){
            //$(this).css("background-color", "pink");
            $('#the-loai-5 div').hide();
        }
    )
});

function sendInforAccount(){
    console.log("click button");
    $.ajax({url:'http://localhost:8000/api/auth/register',
            type:'post',
            datatype:'json',
            data:{
                "email":"khangoccut@gmail.com",
                "password":"123456",
            },
            success:function (result){
                console.log(result);
            }}
            )

}
