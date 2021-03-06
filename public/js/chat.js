const socket = io();

function scrollToBottom () {
  // Selectors
  const messages = $("#messages");
  const newMessage = messages.children("li:last-child");
  // Heights
  const clientHeight = messages.prop("clientHeight");
  const scrollTop = messages.prop("scrollTop");
  const scrollHeight = messages.prop("scrollHeight");
  const newMessageHeight = newMessage.innerHeight();
  const lastMessageHeight = newMessage.prev().innerHeight();

  if (clientHeight + scrollTop + newMessageHeight + lastMessageHeight >= scrollHeight) {
    messages.scrollTop(scrollHeight);
  }
}

socket.on("connect", function () {
  const params = jQuery.deparam(window.location.search);

  socket.emit("join", params, function (err) {
    if (err) {
      alert(err);
      window.location.href = "/";
    } else {
      console.log("No error");
    }
  });
});

socket.on("disconnect", function () {
  console.log("Disconnected to server");
});

socket.on("updateUserList", function (users) {
  const ol = $("<ol></ol>");

  users.forEach(function (user) {
    ol.append($("<li></li>").text(user));
  });

  $("#users").html(ol);
});

socket.on("newMessage", function (message) {
  const formattedTime = moment(message.createdAt).format("h:mm a");
  const template = $("#message-template").html();
  const html = Mustache.render(template, {
    text: message.text,
    from: message.from,
    createdAt: formattedTime
  });

  $("#messages").append(html);
  scrollToBottom();
});

$("#messageForm").on("submit", function (event) {
  event.preventDefault();

  const messageBox = $("[name=message]");

  socket.emit("createMessage", {
    text: messageBox.val()
  }, function () {
    messageBox.val("");
  });
});

socket.on("newLocationMessage", function (message) {
  const formattedTime = moment(message.createdAt).format("h:mm a");
  const template = $("#location-message-template").html();
  const html = Mustache.render(template, {
    from: message.from,
    url: message.url,
    createdAt: formattedTime
  });

  $(messages).append(html);
  scrollToBottom();
});

const locButton = $("#send-location");
locButton.on("click", function () {
  if (!navigator.geolocation) {
    return alert("Sorry, your browser does not support Geolocation.");
  }

  locButton.attr("disabled", "disabled").text("sending location...");

  navigator.geolocation.getCurrentPosition(function (position) {
    locButton.removeAttr("disabled").text("Send location");
    socket.emit("createLocationMessage", {
      latitude: position.coords.latitude,
      longitude: position.coords.longitude
    });
  }, function () {
    locButton.removeAttr("disabled").text("Send location");
    alert("Unable to fetch location.");
  });
});
