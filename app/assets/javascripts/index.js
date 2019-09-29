
$(function(){

  var seach_list = $("#user-search-result");
  var member_list = $("#member_search_result");

  function appendUser(user){ 
    var html = `<div class="chat-group-user clearfix">
                  <p class="chat-group-user__name">${user.name}</p>
                  <a class="user-search-add chat-group-user__btn chat-group-user__btn--add" data-user-id="${user.id}" data-user-nickname="${user.name}">追加</a>
                </div>`;
    seach_list.append(html);           
    }
  
  
  
  function appendMenbers(user_name, user_id){
  var html = `<div class='chat-group-user'>
                <input name='group[user_ids][]' type='hidden' value='${user_id}'>
                <p class='chat-group-user__name'>${user_name}</p>
                <div class='user-search-remove chat-group-user__btn chat-group-user__btn--remove js-remove-btn'>削除</div>
              </div>`;
  member_list.append(html);
  }  

  function appendErrMsgToHTML(user) {
    var html = `<div class='chat-group-user clearfix'>${ user }
                </div>`
    seach_list.append(html);            
  } 

  $("#user-search-field").on("keyup", function() {
    var input = $("#user-search-field").val();   

    $.ajax({
      type: "Get",
      url: "/users",
      data: { keyword: input },
      dataType: "json"
    })

    .done(function(users) {
      $("#user-search-result").empty();
      if (users.length !== 0) {
         users.forEach(function(user){
         appendUser(user);
        })
      }
      else {
        appendErrMsgToHTML("一致するユーザーはいません");
      }
    })
    .fail(function(){
      alert("検索に失敗しました");
    })
  });

  $(function(){
  $(document).on("click",".user-search-add", function(){
      var user_name = $(this).attr('data-user-nickname');
      var user_id = $(this).attr('data-user-id');
      $(this).parent().remove();
      appendMenbers(user_name, user_id)
    });

  $(document).on("click",".user-search-remove", function(){
    console.log(document)
    $(this).parent().remove();
    
    });
  });
});