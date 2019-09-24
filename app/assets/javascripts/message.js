$(function(){
  function buildHTML(message){
    console.log(message)
    image = ( message.image ) ? `<img class= "lower-message__image" src=${message.image} >` : "";
    var html = `<div class="content">
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
    console.log(url)
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
      console.log(html)
      $('.contents').append(html)
      $('#message_content.form__message').val('')
      $('.contents').animate({scrollTop: $('.contents')[0].scrollHeight}, 'fast');
    })
    .fail(function() {
      alert('error');
    }) 
    .always(function(data){
      $('.form__submit').prop('disabled', false);
    })
  })
});

