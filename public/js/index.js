const socket = io();

socket.on("connect", function () {
  console.log("Connected to server");
});

socket.on("newMessage", function (message) {
  const formattedTime = moment(message.createdAt).format("h:mm a");
  console.log("newMessage", message);
  const li = $("<li></li>");
  li.text(`${message.from} ${formattedTime}: ${message.text}`);

  $("#messages").append(li);
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
  const li = $("<li></li>");
  const a = $("<a target='_blank'>My current location</a>");

  li.text(`${message.from} ${formattedTime}: `);
  a.attr("href", message.url);
  li.append(a);
  $("#messages").append(li);
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
