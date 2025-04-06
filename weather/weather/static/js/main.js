document.getElementById("inputGroupSelect01").addEventListener("change", function (e) {
  const selectedValue = e.target.value;
  const selectedText = e.target.options[e.target.options.selectedIndex].text;

  fetch("/", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "X-CSRFToken": getCookie("csrftoken"),
    },
    body: JSON.stringify({
      selectedItem: selectedValue,
      selectedText: selectedText,
    }),
  })
    .then((response) => response.json())
    .then((data) => {
      document.getElementById("temperature").textContent = data.temperature;
      document.getElementById("description").textContent = data.description;
    });
});

function getCookie(name) {
  let cookieValue = null;
  if (document.cookie && document.cookie !== "") {
    const cookies = document.cookie.split(";");
    for (let cookie of cookies) {
      cookie = cookie.trim();
      if (cookie.startsWith(name + "=")) {
        cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
        break;
      }
    }
  }
  return cookieValue;
}
