const dialTone = document.getElementById("dialTone");
const DIAL_NUMBER = "074-015-4920-7";
const DIAL_LINKS = [
  { label: "Pinterest", url: "https://pin.it/2UWnl0KZH" },
  { label: "Github", url: "https://github.com/theycantseemeyall" },
  { label: "Link for 4", url: "https://yoursite.com" },
  { label: "Link for 0", url: "https://yoursite.com" },
  { label: "Link for 1", url: "https://yoursite.com" },
  { label: "Link for 5", url: "https://yoursite.com" },
  { label: "Link for 4", url: "https://yoursite.com" },
  { label: "Link for 9", url: "https://yoursite.com" },
  { label: "Link for 2", url: "https://yoursite.com" },
  { label: "Link for 0", url: "https://yoursite.com" },
  { label: "Link for 7", url: "https://yoursite.com" },
];

document.addEventListener("DOMContentLoaded", () => {

  /* SCROLLING FILES / CARDS */
  const cards = document.querySelectorAll(".card");
  const section = document.querySelector(".scroll-section");
  const filesTitle = document.querySelector(".files-title");

  if (section && cards.length) {
    window.addEventListener("scroll", () => {
      const scrollTop = window.scrollY;
      const sectionTop = section.offsetTop;
      const sectionHeight = section.offsetHeight;
      let progress = (scrollTop - sectionTop) / (sectionHeight - window.innerHeight);
      progress = Math.min(Math.max(progress, 0), 1);
      const activeIndex = Math.floor(progress * cards.length);

      cards.forEach((card, i) => {
        if (i === activeIndex) {
          card.style.opacity = "1";
          card.style.transform = "translate(-50%, -50%) scale(1)";
          card.style.zIndex = 3;
        } else if (i < activeIndex) {
          card.style.opacity = "0.35";
          card.style.transform = "translate(calc(-50% - 120px), -50%) scale(0.9)";
          card.style.zIndex = 1;
        } else {
          card.style.opacity = "0.35";
          card.style.transform = "translate(calc(-50% + 120px), -50%) scale(0.9)";
          card.style.zIndex = 1;
        }
      });

      if (filesTitle) {
        filesTitle.style.opacity = progress > 0.05 ? "0" : "1";
        filesTitle.style.transform = progress > 0.05 ? "translateY(-20px)" : "translateY(0)";
      }
    });
  }

  /* HERO LIQUID BLOBS */
  (function () {
    const CFG = {
      color1: '#7A1F2B',
      color2: '#5D0413',
      count: 6,
      speed: 1.1,
      size: 1.4,
      opacity: 0.55,
    };

    const wrap = document.getElementById('blobs');
    if (!wrap) return;

    const hero = document.querySelector('.hero');
    const W = () => hero.offsetWidth;
    const H = () => hero.offsetHeight;

    const s = document.createElement('style');
    s.textContent = `
      @keyframes lava-move {
        0%,100% { transform: translate(0,0) scale(1); }
        33%      { transform: translate(var(--tx), var(--ty)) scale(1.12); }
        66%      { transform: translate(var(--tx2),var(--ty2)) scale(0.9); }
      }
    `;
    document.head.appendChild(s);

    function makeBlob() {
      const el = document.createElement('div');
      const r = (Math.random() * 0.12 + 0.06) * Math.min(W(), H()) * CFG.size;
      const dur = (Math.random() * 8 + 12) / CFG.speed;
      Object.assign(el.style, {
        position: 'absolute',
        width: r * 2 + 'px',
        height: r * 2 + 'px',
        borderRadius: '50%',
        opacity: CFG.opacity,
        background: `radial-gradient(circle at 35% 35%, ${CFG.color1}, ${CFG.color2})`,
        left: Math.random() * (W() - r * 2) + 'px',
        top: Math.random() * (H() - r * 2) + 'px',
        animation: `lava-move ${dur}s ease-in-out infinite`,
        animationDelay: (Math.random() * -dur) + 's',
      });
      el.style.setProperty('--tx', ((Math.random() - 0.5) * W() * 0.6) + 'px');
      el.style.setProperty('--ty', ((Math.random() - 0.5) * H() * 0.6) + 'px');
      el.style.setProperty('--tx2', ((Math.random() - 0.5) * W() * 0.5) + 'px');
      el.style.setProperty('--ty2', ((Math.random() - 0.5) * H() * 0.5) + 'px');
      return el;
    }

    for (let i = 0; i < CFG.count; i++) wrap.appendChild(makeBlob());
  })();

  /* DOUBLE CLICK TO KILL */
  const container = document.querySelector(".character-container");
  if (container) {
    container.addEventListener("dblclick", () => {
      container.classList.add("dead");
    });
  }

  /* TIMELINE */
  const moments = document.querySelectorAll(".moment");
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) entry.target.classList.add("active");
      });
    },
    { threshold: 0.3 }
  );
  moments.forEach((moment) => observer.observe(moment));


  /* ROTARY PHONE — scroll lights up digits */
  const RPH = {};

  const RAW_DIGITS = DIAL_NUMBER.replace(/-/g, "").split("").map(Number);

  // track which digit index was last lit so we only fire the popup once per digit
  RPH.lastLitIndex = -1;
  RPH.activePopup = null;

 RPH.showPopup = function(linkObj) {
  if (RPH.activePopup) {
    RPH.activePopup.remove();
    RPH.activePopup = null;
  }

  var el = document.createElement("div");
  el.style.cssText = `
  position: fixed;
  right: 120px;
  top: 50%;
  transform: translateY(-50%) translateX(10px);
  background: rgba(255,255,255,0.05);
  color: #fff;
  padding: 12px 24px;
  border-radius: 999px;
  border: 1px solid rgba(255,255,255,0.25);
  font-family: Courier, monospace;
  font-size: 14px;
  letter-spacing: 0.04em;
  opacity: 0;
  transition: opacity 0.15s ease, transform 0.15s ease;
  z-index: 9999;
  cursor: pointer;
  white-space: nowrap;
  backdrop-filter: blur(8px);
`;
  el.textContent = "→ " + linkObj.label;
  el.addEventListener("click", () => window.open(linkObj.url, "_blank"));
  document.body.appendChild(el);

  requestAnimationFrame(() => {
    requestAnimationFrame(() => {
      el.style.opacity = "1";
      el.style.transform = "translateY(-50%) translateX(10px)";
    });
  });

var timer = setTimeout(() => {
  el.style.opacity = "0";
  el.style.transform = "translateY(-50%) translateX(10px)";
  setTimeout(() => { if (el.parentNode) el.remove(); }, 150);  // was 300
  if (RPH.activePopup === el) RPH.activePopup = null;
}, 2500);

el.addEventListener("mouseleave", () => {
  timer = setTimeout(() => {
    el.style.opacity = "0";
    el.style.transform = "translateY(-50%) translateX(10px)";
    setTimeout(() => { if (el.parentNode) el.remove(); }, 150);  // was 300
    if (RPH.activePopup === el) RPH.activePopup = null;
  }, 800);
});

  RPH.activePopup = el;
};

  RPH.pen = {
    clear: function() { RPH.ctx.clearRect(0, 0, RPH.W, RPH.H); },
    circle: function(x, y, r) {
      RPH.ctx.beginPath();
      RPH.ctx.arc(x, y, r, 0, Math.PI * 2, true);
      RPH.ctx.fill();
    }
  };

  RPH.phone = {
    oBeta: Math.PI * 4 / 9, dBeta: Math.PI / 7, rBeta: Math.PI / 24,
    r0: 0.24,
    r2: 0.16,
    r1: 0.20,
    r3: 0.03,

    drawCable: function() {
  const cx = RPH.W / 2;
  const bodyBottom = RPH.H * 0.15 + RPH.H * 0.70;  // bottom of body
  const cableX = cx - RPH.W * 0.08;  // slightly left of centre

  RPH.ctx.strokeStyle = "#1a0606";
  RPH.ctx.lineWidth = RPH.minWH / 60;
  RPH.ctx.lineCap = "round";
  RPH.ctx.lineJoin = "round";

  // Coiled cable hanging from bottom of phone
  const coils = 10;
  const coilWidth = RPH.minWH * 0.06;
  const coilHeight = RPH.minWH * 0.04;
  const startY = bodyBottom + RPH.minWH * 0.02;

  RPH.ctx.beginPath();
  RPH.ctx.moveTo(cableX, startY);

  for (let i = 0; i < coils; i++) {
    const y1 = startY + i * coilHeight;
    const y2 = y1 + coilHeight;
    const side = i % 2 === 0 ? 1 : -1;
    RPH.ctx.bezierCurveTo(
      cableX + coilWidth * side, y1,
      cableX + coilWidth * side, y2,
      cableX, y2
    );
  }

  RPH.ctx.stroke();
},

    // how many digits are currently lit (driven by scroll)
    litCount: 0,

    drawRing: function() {
      var xc = this.centroid.x, yc = this.centroid.y;
      RPH.ctx.fillStyle = "rgb(95,4,19)";
      RPH.pen.circle(RPH.W * xc, RPH.H * yc, RPH.minWH * this.r0);
      RPH.ctx.fillStyle = "rgb(240,245,240)";
      RPH.pen.circle(RPH.W * xc, RPH.H * yc, RPH.minWH * this.r2);
    },

    drawLine: function() {
      var angle = this.oBeta + 10 * this.dBeta + this.rBeta,
          xc = this.centroid.x, yc = this.centroid.y;
      RPH.ctx.strokeStyle = "rgb(240,245,240)";
      RPH.ctx.beginPath();
      RPH.ctx.moveTo(RPH.W * xc + this.r0 * RPH.minWH * Math.cos(angle), RPH.H * yc + this.r0 * RPH.minWH * Math.sin(angle));
      RPH.ctx.lineTo(RPH.W * xc + this.r1 * RPH.minWH * Math.cos(angle), RPH.H * yc + this.r1 * RPH.minWH * Math.sin(angle));
      RPH.ctx.lineWidth = RPH.minWH / 150;
      RPH.ctx.stroke();
    },

    drawNumber: function() {
      // build the display string: lit digits in bright colour, unlit ones dim
      var xStart = RPH.W * this.text.x;
      var y = RPH.H * this.text.y;
      var fontSize = Math.round(RPH.minWH / 18);
      RPH.ctx.font = "bold " + fontSize + "px Courier";
      RPH.ctx.textAlign = "center";

      // measure total width so we can centre manually character by character
      var chars = DIAL_NUMBER.split("");
      var totalWidth = RPH.ctx.measureText(DIAL_NUMBER).width;
      var x = xStart - totalWidth / 2;
      var digitsSeen = 0;

      chars.forEach(function(ch) {
        if (ch === "-") {
          RPH.ctx.fillStyle = "rgba(68,68,68,0.3)";
          RPH.ctx.textAlign = "left";
          RPH.ctx.fillText(ch, x, y);
          x += RPH.ctx.measureText(ch).width;
        } else {
          var isLit = digitsSeen < RPH.phone.litCount;
          var isNext = digitsSeen === RPH.phone.litCount;
          RPH.ctx.fillStyle = isLit
            ? "rgb(255, 255, 255)"       // lit — teal highlight
            : isNext
              ? "rgba(68,68,68,0.5)"   // next up — slightly brighter
              : "rgba(68,68,68,0.2)";  // not yet
          RPH.ctx.textAlign = "left";
          RPH.ctx.fillText(ch, x, y);
          x += RPH.ctx.measureText(ch).width;
          digitsSeen++;
        }
      });

      RPH.ctx.textAlign = "center";
    },

    drawDigits: function() {
      RPH.ctx.font = RPH.minWH / 18 + "px Courier";
      for (var i = 0; i < 10; i += 1) {
        // light up the hole that matches the next digit to be dialled
        var nextDigit = RAW_DIGITS[Math.min(RPH.phone.litCount, RAW_DIGITS.length - 1)];
        RPH.ctx.fillStyle = (i === nextDigit) ? "rgb(183, 158, 116)" : "rgb(240,245,240)";
        var angle = this.oBeta + this.dBeta * i;
        RPH.pen.circle(
          RPH.W * this.centroid.x + RPH.minWH * this.r1 * Math.cos(angle),
          RPH.H * this.centroid.y + RPH.minWH * this.r1 * Math.sin(angle),
          RPH.minWH * this.r3
        );
        RPH.ctx.fillStyle = "#444444";
        RPH.ctx.fillText(
          i,
          RPH.W * this.centroid.x + RPH.minWH * this.r1 * Math.cos(angle),
          RPH.H * this.centroid.y + RPH.minWH * this.r1 * Math.sin(angle)
        );
      }
    },

drawReceiver: function() {
  const cx = RPH.W / 2;
  const y = RPH.H * 0.15;          // was 0.15
  const w = RPH.W * 0.45;        // was 0.40 — wider handset
  const h = RPH.H * 0.20;        // was 0.11 — chunkier bar
  const earRadius = h * 0.85;    // was 0.85 — bigger balls

  // Handset bar
  RPH.ctx.strokeStyle = "#381212";
  RPH.ctx.lineWidth = h * 0.5;
  RPH.ctx.lineCap = "round";
  RPH.ctx.beginPath();
  RPH.ctx.moveTo(cx - w / 2, y);
  RPH.ctx.quadraticCurveTo(cx, y - 70, cx + w / 2, y);   // was -55 — higher arch
  RPH.ctx.stroke();

  // Left ball (earpiece)
  RPH.ctx.fillStyle = "#2c0e0e";
  RPH.pen.circle(cx - w / 2, y, earRadius);
  RPH.ctx.fillStyle = "#4a1a1a";
  RPH.pen.circle(cx - w / 2, y, earRadius * 0.55);
  RPH.ctx.fillStyle = "#1a0808";
  RPH.pen.circle(cx - w / 2, y, earRadius * 0.25);

  // Right ball (mouthpiece)
  RPH.ctx.fillStyle = "#2c0e0e";
  RPH.pen.circle(cx + w / 2, y, earRadius);
  RPH.ctx.fillStyle = "#4a1a1a";
  RPH.pen.circle(cx + w / 2, y, earRadius * 0.55);
  RPH.ctx.fillStyle = "#1a0808";
  RPH.pen.circle(cx + w / 2, y, earRadius * 0.25);
},

centroid: { x: 0.5, y: 0.50 },   // was 0.62
text: { x: 0.5, y: 0.22 },       // was 0.34

drawBody: function() {
  const cx = RPH.W / 2;
  const wTop = RPH.W * 0.28;      // narrower top
  const wBottom = RPH.W * 0.48;   // less wide bottom — less boxy
  const h = RPH.H * 0.60;         // shorter overall
  const y = RPH.H * 0.15;          // was 0.17
  const r = 50;                    // much rounder corners

  const leftTop = cx - wTop / 2;
  const rightTop = cx + wTop / 2;
  const leftBottom = cx - wBottom / 2;
  const rightBottom = cx + wBottom / 2;

  RPH.ctx.fillStyle = "#2c0e0e";
  RPH.ctx.beginPath();

  RPH.ctx.moveTo(leftTop + r, y);

  // Top edge arches upward
  RPH.ctx.bezierCurveTo(
    cx - wTop * 0.15, y - 45,
    cx + wTop * 0.15, y - 45,
    rightTop - r, y
  );

  // Top-right — large radius so corner melts away
  RPH.ctx.quadraticCurveTo(rightTop, y, rightTop, y + r);

  // Right side curves gently outward rather than straight diagonal
  RPH.ctx.bezierCurveTo(
    rightTop + 10, y + h * 0.4,
    rightBottom + 10, y + h * 0.6,
    rightBottom, y + h - r
  );

  // Bottom-right
  RPH.ctx.quadraticCurveTo(rightBottom, y + h, rightBottom - r, y + h);

  // Bottom edge — slight inward bow
  RPH.ctx.bezierCurveTo(
    cx + wBottom * 0.2, y + h + 8,
    cx - wBottom * 0.2, y + h + 8,
    leftBottom + r, y + h
  );

  // Bottom-left
  RPH.ctx.quadraticCurveTo(leftBottom, y + h, leftBottom, y + h - r);

  // Left side mirrors right
  RPH.ctx.bezierCurveTo(
    leftBottom - 10, y + h * 0.6,
    leftTop - 10, y + h * 0.4,
    leftTop, y + r
  );

  // Top-left
  RPH.ctx.quadraticCurveTo(leftTop, y, leftTop + r, y);

  RPH.ctx.closePath();
  RPH.ctx.fill();
},

  };
RPH.draw = function() {
  RPH.pen.clear();
  RPH.phone.drawBody();
  RPH.phone.drawReceiver();
  RPH.phone.drawCable();   // add this line
  RPH.ctx.textAlign = "center";
  RPH.ctx.textBaseline = "middle";
  RPH.phone.drawRing();
  RPH.phone.drawLine();
  RPH.phone.drawNumber();
  RPH.phone.drawDigits();
};

window.addEventListener("scroll", function() {
    var phoneSection = document.querySelector(".phone-scroll-section");
    if (!phoneSection) return;

    var sectionTop = phoneSection.offsetTop;
    var sectionHeight = phoneSection.offsetHeight;
    var progress = (window.scrollY - sectionTop) / (sectionHeight - window.innerHeight);
    progress = Math.min(Math.max(progress, 0), 1);

    var newLitCount = Math.floor(progress * (RAW_DIGITS.length + 1));
    newLitCount = Math.min(newLitCount, RAW_DIGITS.length);

    if (newLitCount > RPH.lastLitIndex + 1) {
      for (var i = RPH.lastLitIndex + 1; i < newLitCount; i++) {
        if (DIAL_LINKS[i]) RPH.showPopup(DIAL_LINKS[i]);
         if (dialTone) {
    dialTone.currentTime = 0;
    dialTone.play();
  }

  if (DIAL_LINKS[i]) {
    RPH.showPopup(DIAL_LINKS[i]);
  }
      }
    }

    RPH.phone.litCount = newLitCount;
    RPH.lastLitIndex = newLitCount - 1;
  });

  RPH.resizeCanvas = function() {
    if (!RPH.canvas) return;
    RPH.canvas.width = window.innerWidth;
    RPH.canvas.height = window.innerHeight;
    RPH.W = RPH.canvas.width;
    RPH.H = RPH.canvas.height;
    RPH.minWH = Math.min(RPH.W, RPH.H);
  };

 RPH.init = function() {
    RPH.canvas = document.getElementById("retrophone");
    if (!RPH.canvas) return;
    RPH.ctx = RPH.canvas.getContext("2d");
    RPH.resizeCanvas();
    setInterval(RPH.draw, 10);
  };

  RPH.init();
  window.addEventListener('resize', RPH.resizeCanvas, false);

  /* LOOT BOX SYSTEM (CLEAN VERSION) */

const box = document.querySelector(".loot-box");
const items = document.querySelectorAll(".loot-item");
const clickPrompt = document.getElementById("clickPrompt");

if (box) {
  let opened = false;

  box.addEventListener("dblclick", () => {
    if (opened) return;
    opened = true;

    if (clickPrompt) clickPrompt.classList.add("hidden");

    const caption = document.querySelector(".loot-box-caption");
    if (caption) caption.classList.add("hidden");

    const radius = 170;               // distance from box
    const startAngle = Math.PI * 0.85;
    const endAngle = Math.PI * 2.15;

    const total = items.length;

    items.forEach((item, i) => {
      const t = total === 1 ? 0.5 : i / (total - 1);
      const angle = startAngle + t * (endAngle - startAngle);

      const x = Math.cos(angle) * radius;
      const y = Math.sin(angle) * radius - 30; // lift upward

      item.style.transition = "opacity 0.5s ease, transform 0.5s ease";

      setTimeout(() => {
        item.style.opacity = "1";
        item.style.transform =
          `translate(-50%, -50%) translate(${x}px, ${y}px)`;

        // enable float animation AFTER landing
        setTimeout(() => {
          item.classList.add("loot-hover");
          item.style.setProperty("--hover-x", `${x}px`);
          item.style.setProperty("--hover-y", `${y}px`);
        }, 500);

      }, i * 120);
    });
  });
}

const slider = document.getElementById("timelineSlider");

window.addEventListener("scroll", () => {

  const section = document.querySelector(".timeline-scroll-section");
  const rect = section.getBoundingClientRect();

  const scrollProgress =
    Math.min(Math.max(-rect.top / (rect.height - window.innerHeight), 0), 1);

  const maxScroll = slider.scrollWidth - window.innerWidth;

  slider.style.transform = `translateX(${-maxScroll * scrollProgress}px)`;
});


document.querySelectorAll(".loot-tooltip").forEach(item => {
  const text = item.querySelector("span").textContent;

  item.addEventListener("mouseenter", () => {
    portraitText.textContent = text;
  });

  item.addEventListener("mouseleave", () => {
    portraitText.textContent =
      "Hover over an item to see details here.";
  });
});

const portraitImage = document.getElementById("portraitImage");
const portraitTitle = document.getElementById("portraitTitle");
const portraitText = document.getElementById("portraitText");

document.querySelectorAll(".loot-tooltip").forEach(item => {
  const img = item.querySelector("img");
  const span = item.querySelector("span");

  item.addEventListener("mouseenter", () => {
    portraitImage.src = img.src;
    portraitTitle.textContent =
      span.dataset.title || span.textContent;

    portraitText.textContent =
      span.dataset.text || span.textContent;
  });
});

document.querySelectorAll(".loot-item").forEach(item => {
  item.addEventListener("mouseenter", () => {
    portraitImage.src = item.src;

    const text =
      item.parentElement.querySelector("span").textContent;

    portraitTitle.textContent = text.split("•")[0];
    portraitText.textContent = text;
  });
});


const skinContainer = document.getElementById("skin_container");

if (skinContainer) {
  skinContainer.addEventListener("mouseenter", () => {
    portraitImage.src = "Portfolio Picture.jpg"; // your image

    portraitTitle.textContent = "Akosua";

    portraitText.textContent =
      "Developer, designer and maker. I enjoy web development, 3D design, electronics, game development and creating projects that combine technology and creativity.";
  });

  skinContainer.addEventListener("mouseleave", () => {
    portraitImage.src = "Portfolio Picture.jpg";

    portraitTitle.textContent = "My Experience";

    portraitText.textContent =
      "Hover over an item to see details.";
  });
}

});
// end DOMContentLoaded