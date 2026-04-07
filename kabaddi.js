const kabImg = document.querySelector('.orange-circle img');

kabImg.addEventListener('mousemove', (e) => {
  const rect = kabImg.getBoundingClientRect();
  const x = e.clientX - rect.left;
  const y = e.clientY - rect.top;

  const centerX = rect.width / 2;
  const centerY = rect.height / 2;

  const rotateX = ((y - centerY) / centerY) * 10;
  const rotateY = ((x - centerX) / centerX) * 10;

  kabImg.style.transform = `rotateX(${-rotateX}deg) rotateY(${rotateY}deg) scale(1.05)`;
});

kabImg.addEventListener('mouseleave', () => {
  kabImg.style.transform = "rotateX(0deg) rotateY(0deg) scale(1)";
});


/* SEARCH WITH SUGGESTIONS */

const input = document.querySelector(".search-box input");


const suggestionBox = document.createElement("div");
suggestionBox.style.position = "absolute";
suggestionBox.style.top = "70px";
suggestionBox.style.left = "50%";
suggestionBox.style.transform = "translateX(-50%)";
suggestionBox.style.width = "420px";
suggestionBox.style.background = "#fff";
suggestionBox.style.color = "#000";
suggestionBox.style.borderRadius = "8px";
suggestionBox.style.boxShadow = "0 10px 30px rgba(0,0,0,0.3)";
suggestionBox.style.display = "none";
suggestionBox.style.zIndex = "9999";

document.body.appendChild(suggestionBox);

input.addEventListener("input", () => {
  const query = input.value.toLowerCase().trim();
  suggestionBox.innerHTML = "";
  suggestionBox.style.display = "none";

  if (query.length < 2) return;

  const links = document.querySelectorAll("a");
  let matches = [];

  links.forEach(link => {
    const text = link.innerText.toLowerCase();
    const href = link.getAttribute("href");

    if (text.includes(query) && href && !matches.find(m => m.href === href)) {
      matches.push({ text: link.innerText, href });
    }
  });

  if (matches.length === 0) {
    suggestionBox.innerHTML = `
      <div style="padding:12px;color:red;font-weight:600;">
        ❌ No results found
      </div>`;
    suggestionBox.style.display = "block";
    return;
  }

  matches.forEach(item => {
    const div = document.createElement("div");
    div.innerHTML = `🔗 ${item.text}`;
    div.style.padding = "12px";
    div.style.cursor = "pointer";
    div.style.borderBottom = "1px solid #eee";

    div.addEventListener("click", () => {
      window.location.href = item.href;
    });

    div.addEventListener("mouseenter", () => {
      div.style.background = "#f2f2f2";
    });

    div.addEventListener("mouseleave", () => {
      div.style.background = "#fff";
    });

    suggestionBox.appendChild(div);
  });

  suggestionBox.style.display = "block";
});

// Hide suggestions when clicking outside
document.addEventListener("click", (e) => {
  if (!suggestionBox.contains(e.target) && e.target !== input) {
    suggestionBox.style.display = "none";
  }
});
