document.getElementById("signupForm").addEventListener("submit", async function (e) {
  e.preventDefault();

  const userData = {
    name: document.getElementById("name").value,
    password: document.getElementById("password").value,
    mobile: document.getElementById("mobile").value,
    address: document.getElementById("address").value
  };

  const res = await fetch("https://dab-g8gy.onrender.com/signup", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(userData)
  });

  const data = await res.json();
  if (res.ok) {
    localStorage.setItem("userId", data._id);
    window.location.href = "profile.html";
  } else {
    alert(data.message);
  }
});