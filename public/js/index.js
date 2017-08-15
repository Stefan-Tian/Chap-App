const socket = io();

socket.on("connect", function () {
  console.log("Connected to server");
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
});

socket.on("disconnect", function () {
  console.log("Disconnected to server");
});

$("#messageForm").on("submit", function (event) {
  event.preventDefault();

  const messageBox = $("[name=message]");

  socket.emit("createMessage", {
    from: "User",
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
