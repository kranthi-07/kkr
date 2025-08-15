const username = localStorage.getItem("username");
if (!username) {
    alert("Please login first");
    window.location.href = "login.html";
}

document.getElementById("profileForm").addEventListener("submit", async (e) => {
    e.preventDefault();
    const data = {
        username,
        mobile: document.getElementById("mobile").value,
        address: document.getElementById("address").value
    };
    const res = await fetch("/update-profile", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data)
    });
    const result = await res.json();
    alert(result.message);
});