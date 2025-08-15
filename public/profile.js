const userId = localStorage.getItem("userId");
if (!userId) {
  window.location.href = "login.html";
}

async function loadProfile() {
  const res = await fetch(`https://dab-g8gy.onrender.com/profile/${userId}`);
  const data = await res.json();

  if (res.ok) {
    document.getElementById("profile").innerHTML = `
      <p><strong>Name:</strong> ${data.name}</p>
      <p><strong>Mobile:</strong> ${data.mobile}</p>
      <p><strong>Address:</strong> ${data.address}</p>
    `;
    document.getElementById("editName").value = data.name;
    document.getElementById("editMobile").value = data.mobile;
    document.getElementById("editAddress").value = data.address;
  } else {
    alert(data.message);
  }
}

document.getElementById("editProfileForm").addEventListener("submit", async function (e) {
  e.preventDefault();

  const updatedData = {
    name: document.getElementById("editName").value,
    password: document.getElementById("editPassword").value,
    mobile: document.getElementById("editMobile").value,
    address: document.getElementById("editAddress").value
  };

  const res = await fetch(`https://dab-g8gy.onrender.com/profile/${userId}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(updatedData)
  });

  const data = await res.json();
  if (res.ok) {
    alert("Profile updated!");
    loadProfile();
  } else {
    alert(data.message);
  }
});

function logout() {
  localStorage.removeItem("userId");
  window.location.href = "login.html";
}

loadProfile();