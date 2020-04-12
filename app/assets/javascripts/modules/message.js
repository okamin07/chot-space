$(function(){
  function buildHTML(message){
    var presenceImage = message.image? `<img src=${message.image} ></img>`:``
    var html = 
    `<div class="message" data-message-id=${message.id}>
      <div class="message__top">
        <div class="user">
        ${message.user_name}
        </div>
        <div class="time">
        ${message.created_at}
        </div>
      </div>
      <div class="message__bottom">
        <dix class="text">
          <p class="lower-message__content">
          ${message.content}
          </p>
        </div>
      </div>
        ${presenceImage}
    </div>`
    return html;
  }
  $("#new_message").on('submit',function(e){
    e.preventDefault()
    var formData = new FormData(this);
    var url = $("form").attr('action');
    $.ajax({
      url: url,  //同期通信でいう『パス』
      type: 'POST',  //同期通信でいう『HTTPメソッド』
      data:formData,  
      dataType: 'json',
      processData: false,
      contentType: false
    })
    .done(function(data){
      var html = buildHTML(data);
      $(".messages").append(html);
      $('.messages').animate({ scrollTop: $('.messages')[0].scrollHeight});
      $(".new_message")[0].reset();
      $(".submit").removeAttr("disabled");
    })
    .fail(function() {
      alert("メッセージ送信に失敗しました");
    });
  })
})