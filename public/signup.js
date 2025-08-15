document.getElementById("signupForm").addEventListener("submit", async (e) => {
    e.preventDefault();
    const data = {
        username: document.getElementById("username").value,
        password: document.getElementById("password").value,
        mobile: document.getElementById("mobile").value,
        address: document.getElementById("address").value
    };
    const res = await fetch("/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data)
    });
    const result = await res.json();
    alert(result.message);
});