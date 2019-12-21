$(function(){

  function buildHTML(message){
    if (message.image) {
      var html = `<div class="message" data-message-id=${message.id}>
                    <div class="upper-message">
                      <div class="upper-message__user-name">
                      ${message.user_name}
                      </div>
                      <div class="upper-message__date">
                      ${message.created_at}
                    </div>
                  </div>
                <div class="lower-message">
                  <p class="lower-message__content">
                  ${message.content}
                  </p>
                </div>
                <img src=${message.image}>
                </div>`
      return html;
    } else {
      var html = `<div class="message" data-message-id=${message.id}>
                    <div class="upper-message">
                      <div class="upper-message__user-name">
                      ${message.user_name}
                      </div>
                      <div class="upper-message__date">
                      ${message.created_at}
                    </div>
                  </div>
                <div class="lower-message">
                  <p class="lower-message__content">
                  ${message.content}
                  </p>
                  
                </div>
                </div>`
    }
    return html;
  };

  $('#new_message').on('submit', function(e){
    e.preventDefault()
    var formData = new FormData(this);
    var url = $(this). attr('action');
    $.ajax({
      url: url,
      type: 'POST',
      data: formData,  
      dataType: 'json',
      processData: false,
      contentType: false
    })
    .done(function (message){
      var html = buildHTML(message);
      $('.ChatMain').append(html);
      $('.ChatMain').animate({ scrollTop: $('.ChatMain')[0].scrollHeight});
      $('form')[0].reset();
    })
    .fail(function() {
      alert("メッセージ送信に失敗しました");
    })
    .always(function(message){
      $('.TextForm__Main__Button__Design').prop('disabled', false);
    });
  });

  function scroll() {
    $('.ChatMain').animate({ scrollTop: $('.ChatMain')[0].scrollHeight});
  }

  var reloadMessages = function() {
    last_message_id = $('.message:last').data("message-id");
    $.ajax({
      url: 'api/messages#index {:format=>"json"}',
      type: 'get',
      dataType: 'json',
      data: {id: last_message_id}
    })
    .done(function(messages) {
      var insertHTML = '';
      $.each(messages, function(i, message) {
        insertHTML += buildHTML(message)
      });
        $('.ChatMain').append(insertHTML);
    })
  }
  setInterval(reloadMessages, 2000);
});