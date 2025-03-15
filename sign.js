
    document.addEventListener("DOMContentLoaded", function () {
        document.getElementById("registerForm").addEventListener("submit", registerUser);
        document.getElementById("loginForm").addEventListener("submit", loginUser);
    });
    
    function showLogin() {
        document.getElementById("registerForm").style.display = "none";
        document.getElementById("loginForm").style.display = "block";
    }
    
    function showRegister() {
        document.getElementById("loginForm").style.display = "none";
        document.getElementById("registerForm").style.display = "block";
    }
    
    function registerUser(event) {
        event.preventDefault();
        let name = document.getElementById("regName").value.trim();
        let email = document.getElementById("regEmail").value.trim();
        let password = document.getElementById("regPassword").value.trim();
    
        if (!name || !email || !password) {
            alert("All fields are required!");
            return;
        }
        if (!validateEmail(email)) {
            alert("Enter a valid email address!");
            return;
        }
        if (password.length < 6) {
            alert("Password must be at least 6 characters long!");
            return;
        }
        
        alert("Registration Successful!");
        document.getElementById("registerForm").reset(); // Clear fields
        showLogin();
    }
    
    function loginUser(event) {
        event.preventDefault();
        let email = document.getElementById("loginEmail").value.trim();
        let password = document.getElementById("loginPassword").value.trim();
    
        if (!email || !password) {
            alert("All fields are required!");
            return;
        }
        if (!validateEmail(email)) {
            alert("Enter a valid email address!");
            return;
        }
        
        alert("Login Successful!");
        document.getElementById("loginForm").reset(); // Clear fields
    }
    
    function validateEmail(email) {
        let re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email);
    }
    
