document.addEventListener("DOMContentLoaded", function() {
    // Fade-in animasyonu
    const fadeElements = document.querySelectorAll(".fade-in");
    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add("visible");
            }
        });
    }, { threshold: 0.2 });
    fadeElements.forEach(element => {
        observer.observe(element);
    });


    // Tema ve menü işlevselliği
    const toggleInput = document.getElementById("theme-toggle");
    const menuToggle = document.getElementById("menu-toggle");
    const navbar = document.getElementById("navbar");
    const icon = menuToggle.querySelector("i");
    
    // Tema tercihini yükle
    if (localStorage.getItem("theme") === "dark") {
        document.body.classList.add("dark-mode");
        if (toggleInput) toggleInput.checked = true;
    }

    toggleInput?.addEventListener("change", function () {
        document.body.classList.toggle("dark-mode");
        if (document.body.classList.contains("dark-mode")) {
            localStorage.setItem("theme", "dark");
        } else {
            localStorage.setItem("theme", "light");
        }
    });


    // Menü açma/kapama ve ikon değiştirme
    menuToggle.addEventListener("click", function(e) {
        e.stopPropagation();
        navbar.classList.toggle("show");
        document.body.classList.toggle("menu-open");

        // İkonu değiştir
        if (navbar.classList.contains("show")) {
            icon.classList.remove("fa-bars");
            icon.classList.add("fa-times");
        } else {
            icon.classList.remove("fa-times");
            icon.classList.add("fa-bars");
        }
    });

    // Menü açıkken dışarı tıklanınca kapat
    document.addEventListener('click', function (e) {
        if (navbar.classList.contains('show')) {
            if (!navbar.contains(e.target) && e.target !== menuToggle) {
                navbar.classList.remove('show');
                document.body.classList.remove('menu-open');

                // Menü kapanınca ikonu eski haline getir
                icon.classList.remove("fa-times");
                icon.classList.add("fa-bars");
            }
        }
    });

    // Menüde bir linke tıklanınca menüyü kapat ve ikon sıfırla
    navbar.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', function () {
            navbar.classList.remove('show');
            document.body.classList.remove('menu-open');

            icon.classList.remove("fa-times");
            icon.classList.add("fa-bars");
        });
    });


    

    // Menü açıldığında animasyonu tetikle
    if (navbar.classList.contains("show")) {
        navbar.querySelectorAll('li').forEach((li, i) => {
            li.style.opacity = "0";
            li.style.transform = "translateY(-20px)";
            li.style.animation = "none";
            // animasyonu tetiklemek için küçük bir timeout
            setTimeout(() => {
                li.style.animation = `fadeInMenu 0.7s ease-out forwards`;
                li.style.animationDelay = `${0.1 + i * 0.1}s`;
            }, 10);
        });
    } else {
        navbar.querySelectorAll('li').forEach((li) => {
            li.style.opacity = "";
            li.style.transform = "";
            li.style.animation = "";
            li.style.animationDelay = "";
        });
    }

document.querySelectorAll(".faq-question").forEach(button => {
    button.addEventListener("click", () => {
        const answer = button.nextElementSibling;
        answer.classList.toggle("open");
        button.classList.toggle("active");
    });
});
});

