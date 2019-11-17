$(function() {
  function buildHTML(message){
    image = ( message.image ) ? `<img class= "lower-message__image" src=${message.image} >` : "";
    var html = `<div class="content" data-message-id="${message.id}"> 
                  <div class="main-content-message">
                    <div class="main-content-message__user">
                      ${message.user_name} 
                    </div>
                    <div class="main-content-message__data">
                      ${message.data}
                    </div>
                 </div>
                 <div class="under-content-message">
                    <div class="main-content-message__text">
                      <p class="lower-message__content">
                        ${message.content}
                      </p>                     
                    </div>
                    ${image}
                 </div>
                </div>`
  return html;
  }

  $('#new_message').on('submit', function(e){
    e.preventDefault();
    var formData = new FormData(this); 
    var url = $(this).attr('action')  
    $.ajax({
      url: url,
      type: "POST",
      data: formData,
      dataType: 'json',
      processData: false,
      contentType: false
    }) 
    .done(function(data){      
      var html = buildHTML(data);
      $('.contents').append(html)
      $('.new_message')[0].reset();
      $('.contents').animate({scrollTop: $('.contents')[0].scrollHeight}, 'fast');
    })
    .fail(function() {
      alert('error');
    }) 
    .always(function(data){
      $('.form__submit').prop('disabled', false);
    })
  }) 
 
  var reloadMessages = function() {
    if (window.location.href.match(/\/groups\/\d+\/messages/)){
     var last_message_id = $('.content:last').data("message-id")
     console.log(last_message_id)
     $.ajax({
       url: 'api/messages',
       type: 'get',
       dataType: 'json',
       data: {last_id: last_message_id}       
      })
      .done(function(messages) {           
        var insertHTML = '';
        messages.forEach(function(message){              
          insertHTML = buildHTML(message);       
          $('.contents').append(insertHTML)
          $('.contents').animate({ scrollTop: $('.contents')[0].scrollHeight }, 'fast')
        })
      })
      .fail(function() {
        alert('error');
      });
    };   
  }
  setInterval(reloadMessages, 5000);
});
  