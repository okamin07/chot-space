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
  let reloadMessages = function (){
    let last_message_id = $(".message:last").data("message-id")
    $.ajax({
      url:"api/messages",
      type: 'get',
      dataType: 'json',
      data: {id: last_message_id}
    })
    .done(function(messages) {
      console.log('success');
      console.log(messages)
      if (messages.length !== 0) {
        //追加するHTMLの入れ物を作る
        let insertHTML = '';
        //配列messagesの中身一つ一つを取り出し、HTMLに変換したものを入れ物に足し合わせる
        $.each(messages, function(i, message) {
          insertHTML += buildHTML(message)
        });
        //メッセージが入ったHTMLに、入れ物ごと追加
        $(".messages").append(insertHTML);
        $(".messages").animate({ scrollTop: $(".messages")[0].scrollHeight});
      }
    })
    .fail(function() {
      alert('error');
    })
  }
  setInterval(reloadMessages, 7000);
})