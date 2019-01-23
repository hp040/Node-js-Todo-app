$(document).ready(function(){
        
    $('form').on('submit',function(){      
       var task_todo=$("form input").val();
       var send={task:task_todo};
       
       $.ajax({type:'POST',
           url:'/create',
           data:send,
           success: function(resp){
               location.reload();
           }
       });
       return false;
    });

    $('li').on('click',function(){
        var data=encodeURI(encodeURIComponent($(this).text()));

        
        $.ajax({type:'DELETE',
            url:'/del/'+data,
            success:function(resp){
                location.reload();
            }
        })
    });
    
});

