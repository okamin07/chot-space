 $(function(){
  function appendUser(user){
    var html = `
    <div class="chat-group-user clearfix">
      <p class="chat-group-user__name"> ${user.name}</p>
      <div class="user-search-add chat-group-user__btn chat-group-user__btn--add" data-user-id="${user.id}" data-user-name="${user.name}">追加</div>
    </div>
    `
    $("#user-search-result").append(html)
  }
  function noUser(){
    var html = `
    <div class="chat-group-user clearfix">
      <p class="chat-group-user__name">ユーザーが見つかりません</p>
    </div>
    `
    $("#user-search-result").append(html)
  }
  $(".chat-group-form__search").on("keyup",function(){
    var input =  $("#user-search-field").val();

    $.ajax({
      type: "GET",    //HTTPメソッド
      url: "/users",       //users_controllerの、indexアクションにリクエストの送信先を設定する
      dataType: 'json',
      data: {keyword: input},   //テキストフィールドに入力された文字を設定する
    })
    .done(function(users) {
      $('#user-search-result').empty();
      if(input == 0){
        $('#user-search-result').empty();
      }
      else if(users.length!==0){
        users.forEach(function(user){
          appendUser(user);
        })
      }
      else{
        noUser();
      }
    })
    .fail(function() {
      alert("ユーザー検索に失敗しました");
    });
   })

   $(document).on("click",".chat-group-user__btn--add",function(){
     var name = $(this).data("user-name")
     var id = $(this).data("user-id")
    function addUser(name,id){
      var html =`
        <div class="chat-group-user clearfix">
          <p class="chat-group-user__name"> ${name}</p>
          <input name="group[user_ids][]" type="hidden" value="${id}" />
          <div class="chat-group-user__btn--remove chat-group-user__btn">削除</div>
        </div>
       `
       $("#chat-group-users").append(html)
    } 
     $(this).parent().remove();
      addUser(name,id)
   })
   $(document).on("click",".chat-group-user__btn--remove",function(){ 
    $(this).parent().remove();
  })
 })


