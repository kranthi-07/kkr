document.getElementById("loginForm").addEventListener("submit", async function (e) {
  e.preventDefault();

  const credentials = {
    name: document.getElementById("name").value,
    password: document.getElementById("password").value
  };

  const res = await fetch("https://dab-g8gy.onrender.com/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(credentials)
  });

  const data = await res.json();
  if (res.ok) {
    localStorage.setItem("userId", data._id);
    window.location.href = "profile.html";
  } else {
    alert(data.message);
  }
});