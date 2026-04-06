/* ============================================================
   FIT TRAINING CENTER — main.js
   Navigation · Scroll Effects · Animations · Interactions
   ============================================================ */

document.addEventListener("DOMContentLoaded", () => {
  // ── Scroll Progress Bar ──────────────────────────────────
  const progressBar = document.querySelector(".progress-bar");

  if (progressBar) {
    window.addEventListener(
      "scroll",
      () => {
        const scrollTop = window.scrollY;
        const docHeight =
          document.documentElement.scrollHeight - window.innerHeight;
        const scrollPct = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
        progressBar.style.width = scrollPct + "%";
      },
      { passive: true }
    );
  }

  // ── Navbar Scroll Effect ─────────────────────────────────
  const navbar = document.querySelector(".navbar");

  if (navbar) {
    const onScroll = () => {
      if (window.scrollY > 50) {
        navbar.classList.add("scrolled");
      } else {
        navbar.classList.remove("scrolled");
      }
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
  }

  // ── Active Nav Link ──────────────────────────────────────
  const currentPage = window.location.pathname.split("/").pop() || "index.html";
  const navLinks = document.querySelectorAll(".nav-links a, .nav-mobile a");

  navLinks.forEach((link) => {
    const href = link.getAttribute("href");
    if (href === currentPage || (currentPage === "" && href === "index.html")) {
      link.classList.add("active");
    }
  });

  // ── Hamburger Menu ───────────────────────────────────────
  const hamburger = document.querySelector(".nav-hamburger");
  const mobileMenu = document.querySelector(".nav-mobile");

  if (hamburger && mobileMenu) {
    hamburger.addEventListener("click", () => {
      const isOpen = hamburger.classList.toggle("open");
      mobileMenu.classList.toggle("open", isOpen);
      document.body.style.overflow = isOpen ? "hidden" : "";
    });

    mobileMenu.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", () => {
        hamburger.classList.remove("open");
        mobileMenu.classList.remove("open");
        document.body.style.overflow = "";
      });
    });

    mobileMenu.addEventListener("click", (e) => {
      if (e.target === mobileMenu) {
        hamburger.classList.remove("open");
        mobileMenu.classList.remove("open");
        document.body.style.overflow = "";
      }
    });
  }

  // ── Reveal on Scroll (Intersection Observer) ─────────────
  const revealEls = document.querySelectorAll(
    ".reveal, .reveal-left, .reveal-right"
  );

  if (revealEls.length > 0) {
    const revealObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const siblings = Array.from(entry.target.parentElement.children);
            const index = siblings.indexOf(entry.target);
            entry.target.style.transitionDelay = `${index * 0.1}s`;
            entry.target.classList.add("visible");
            revealObserver.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.12,
        rootMargin: "0px 0px -60px 0px",
      }
    );

    revealEls.forEach((el) => revealObserver.observe(el));
  }

  // ── Counter Animation ────────────────────────────────────
  const counters = document.querySelectorAll("[data-count]");

  if (counters.length > 0) {
    const countObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            animateCounter(entry.target);
            countObserver.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.5 }
    );

    counters.forEach((el) => countObserver.observe(el));
  }

  function animateCounter(el) {
    const target = parseInt(el.getAttribute("data-count"), 10);
    const duration = 2000;
    const step = 16;
    const steps = duration / step;
    const increment = target / steps;
    let current = 0;

    const timer = setInterval(() => {
      current += increment;
      if (current >= target) {
        el.textContent = target.toLocaleString();
        clearInterval(timer);
      } else {
        el.textContent = Math.floor(current).toLocaleString();
      }
    }, step);
  }

  // ── Parallax Effect (Hero Images) ────────────────────────
  const parallaxEls = document.querySelectorAll("[data-parallax]");

  if (parallaxEls.length > 0) {
    window.addEventListener(
      "scroll",
      () => {
        const scrollY = window.scrollY;
        parallaxEls.forEach((el) => {
          const speed = parseFloat(el.getAttribute("data-parallax")) || 0.4;
          el.style.transform = `translateY(${scrollY * speed}px)`;
        });
      },
      { passive: true }
    );
  }

  // ── Smooth Anchor Scroll ─────────────────────────────────
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", (e) => {
      const target = document.querySelector(anchor.getAttribute("href"));
      if (target) {
        e.preventDefault();
        const navH =
          parseInt(
            getComputedStyle(document.documentElement).getPropertyValue(
              "--nav-height"
            )
          ) || 80;
        const top = target.getBoundingClientRect().top + window.scrollY - navH;
        window.scrollTo({ top, behavior: "smooth" });
      }
    });
  });

  // ── Cursor Glow (Desktop only) ───────────────────────────
  if (window.matchMedia("(pointer: fine)").matches) {
    const glow = document.createElement("div");
    glow.className = "cursor-glow";
    glow.style.cssText = `
        position: fixed;
        width: 300px;
        height: 300px;
        border-radius: 50%;
        background: radial-gradient(circle, rgba(174,254,2,0.04) 0%, transparent 70%);
        pointer-events: none;
        z-index: 0;
        transform: translate(-50%, -50%);
        transition: opacity 0.3s ease;
        top: 0; left: 0;
      `;
    document.body.appendChild(glow);

    window.addEventListener(
      "mousemove",
      (e) => {
        glow.style.left = e.clientX + "px";
        glow.style.top = e.clientY + "px";
      },
      { passive: true }
    );
  }

  // ── Image Lazy Loading ───────────────────────────────────
  const lazyImgs = document.querySelectorAll("img[data-src]");

  if (lazyImgs.length > 0) {
    const imgObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const img = entry.target;
            img.src = img.getAttribute("data-src");
            img.removeAttribute("data-src");
            img.classList.add("loaded");
            imgObserver.unobserve(img);
          }
        });
      },
      { rootMargin: "200px" }
    );

    lazyImgs.forEach((img) => imgObserver.observe(img));
  }

  // ── Tab Component ────────────────────────────────────────
  const tabBtns = document.querySelectorAll("[data-tab-btn]");

  if (tabBtns.length > 0) {
    tabBtns.forEach((btn) => {
      btn.addEventListener("click", () => {
        const group = btn.getAttribute("data-tab-btn");
        const target = btn.getAttribute("data-tab-target");

        document
          .querySelectorAll(`[data-tab-btn="${group}"]`)
          .forEach((b) => b.classList.remove("active"));
        document
          .querySelectorAll(`[data-tab-content="${group}"]`)
          .forEach((c) => c.classList.remove("active"));

        btn.classList.add("active");
        const content = document.querySelector(
          `[data-tab-content="${group}"][data-tab-id="${target}"]`
        );
        if (content) content.classList.add("active");
      });
    });
  }

  // ── FAQ Accordion ────────────────────────────────────────
  const faqItems = document.querySelectorAll(".faq-item");

  if (faqItems.length > 0) {
    faqItems.forEach((item) => {
      const question = item.querySelector(".faq-question");
      const answer = item.querySelector(".faq-answer");

      if (question && answer) {
        question.addEventListener("click", () => {
          const isOpen = item.classList.contains("open");

          faqItems.forEach((i) => {
            i.classList.remove("open");
            const a = i.querySelector(".faq-answer");
            if (a) a.style.maxHeight = "0";
          });

          if (!isOpen) {
            item.classList.add("open");
            answer.style.maxHeight = answer.scrollHeight + "px";
          }
        });

        answer.style.maxHeight = "0";
        answer.style.overflow = "hidden";
        answer.style.transition = "max-height 0.4s cubic-bezier(0.4,0,0.2,1)";
      }
    });
  }

  // ── Course Filter ────────────────────────────────────────
  const filterBtns = document.querySelectorAll(".filter-btn");
  const courseCards = document.querySelectorAll(".course-card");

  if (filterBtns.length > 0) {
    filterBtns.forEach((btn) => {
      btn.addEventListener("click", () => {
        filterBtns.forEach((b) => b.classList.remove("active"));
        btn.classList.add("active");
        const filter = btn.getAttribute("data-filter");
        courseCards.forEach((card) => {
          card.style.display =
            filter === "all" || card.getAttribute("data-category") === filter
              ? "block"
              : "none";
        });
      });
    });
  }

  // ── Billing Toggle ───────────────────────────────────────
  const toggle = document.getElementById("billingToggle");
  const labelMonthly = document.getElementById("labelMonthly");
  const labelAnnual = document.getElementById("labelAnnual");
  const amounts = document.querySelectorAll(".pricing-amount");
  const notes = {
    basic: document.getElementById("noteBasic"),
    pro: document.getElementById("notePro"),
    elite: document.getElementById("noteElite"),
  };
  const annualSavings = { basic: 72, pro: 144, elite: 240 };

  if (toggle) {
    toggle.addEventListener("change", () => {
      const isAnnual = toggle.checked;
      labelMonthly.classList.toggle("active", !isAnnual);
      labelAnnual.classList.toggle("active", isAnnual);
      amounts.forEach((el) => {
        el.textContent = isAnnual
          ? el.getAttribute("data-annual")
          : el.getAttribute("data-monthly");
      });
      const keys = ["basic", "pro", "elite"];
      keys.forEach((key) => {
        if (notes[key]) {
          notes[key].innerHTML = isAnnual
            ? `<span>Du sparst € ${annualSavings[key]} im Jahr</span>`
            : "&nbsp;";
        }
      });
    });
  }

  // ── Contact Form ─────────────────────────────────────────
  const contactForm = document.getElementById("contactForm");
  const formSuccess = document.getElementById("formSuccess");
  const topicBtns = document.querySelectorAll(".topic-btn");
  const formTopic = document.getElementById("formTopic");

  if (topicBtns.length > 0) {
    topicBtns.forEach((btn) => {
      btn.addEventListener("click", () => {
        topicBtns.forEach((b) => b.classList.remove("active"));
        btn.classList.add("active");
        if (formTopic) formTopic.value = btn.getAttribute("data-topic");
      });
    });
  }

  if (contactForm && formSuccess) {
    contactForm.addEventListener("submit", (e) => {
      e.preventDefault();
      contactForm.style.display = "none";
      formSuccess.classList.add("visible");
    });
  }

  // ── Booking Flow ─────────────────────────────────────────
  const bookingMain = document.getElementById("bookingMain");
  if (!bookingMain) return;

  // State
  const booking = { course: null, date: null, time: null, trainer: null };

  // Step elements
  const steps = document.querySelectorAll(".booking-step");
  const progSteps = document.querySelectorAll(".progress-step");

  function goToStep(n) {
    steps.forEach((s, i) => s.classList.toggle("active", i === n - 1));
    progSteps.forEach((s, i) => {
      s.classList.remove("active", "completed");
      if (i === n - 1) s.classList.add("active");
      if (i < n - 1) s.classList.add("completed");
    });
    window.scrollTo({ top: bookingMain.offsetTop - 120, behavior: "smooth" });
  }

  // Summary update
  function updateSummary() {
    const sc = document.getElementById("summCourse");
    const sd = document.getElementById("summDate");
    const st = document.getElementById("summTime");
    const sr = document.getElementById("summTrainer");

    if (sc) {
      sc.textContent = booking.course || "Noch nicht gewählt";
      sc.className = "summary-item-value" + (booking.course ? "" : " empty");
    }
    if (sd) {
      sd.textContent = booking.date || "Noch nicht gewählt";
      sd.className = "summary-item-value" + (booking.date ? "" : " empty");
    }
    if (st) {
      st.textContent = booking.time || "Noch nicht gewählt";
      st.className = "summary-item-value" + (booking.time ? "" : " empty");
    }
    if (sr) {
      sr.textContent = booking.trainer || "Noch nicht gewählt";
      sr.className = "summary-item-value" + (booking.trainer ? "" : " empty");
    }
  }

  // ── STEP 1: Course Selection ──────────────────────────────
  const courseCards2 = document.querySelectorAll(".course-select-card");
  const nextStep1 = document.getElementById("nextStep1");

  courseCards2.forEach((card) => {
    card.addEventListener("click", () => {
      courseCards2.forEach((c) => c.classList.remove("selected"));
      card.classList.add("selected");
      booking.course = card.getAttribute("data-course");
      updateSummary();
      if (nextStep1) nextStep1.disabled = false;
    });
  });

  if (nextStep1) {
    nextStep1.addEventListener("click", () => goToStep(2));
  }

  // ── STEP 2: Calendar ─────────────────────────────────────
  let currentDate = new Date();
  let calYear = currentDate.getFullYear();
  let calMonth = currentDate.getMonth();

  const monthNames = [
    "Januar",
    "Februar",
    "März",
    "April",
    "Mai",
    "Juni",
    "Juli",
    "August",
    "September",
    "Oktober",
    "November",
    "Dezember",
  ];

  function renderCalendar() {
    const label = document.getElementById("calMonthLabel");
    const datesEl = document.getElementById("calDates");
    if (!label || !datesEl) return;

    label.textContent = `${monthNames[calMonth]} ${calYear}`;
    datesEl.innerHTML = "";

    const firstDay = new Date(calYear, calMonth, 1).getDay();
    const adjusted = firstDay === 0 ? 6 : firstDay - 1;
    const daysInMonth = new Date(calYear, calMonth + 1, 0).getDate();
    const today = new Date();

    for (let i = 0; i < adjusted; i++) {
      const empty = document.createElement("div");
      empty.className = "cal-day empty";
      datesEl.appendChild(empty);
    }

    for (let d = 1; d <= daysInMonth; d++) {
      const btn = document.createElement("div");
      const date = new Date(calYear, calMonth, d);
      btn.className = "cal-day";
      btn.textContent = d;

      if (
        date < new Date(today.getFullYear(), today.getMonth(), today.getDate())
      ) {
        btn.classList.add("disabled");
      } else {
        btn.classList.add("available");
        if (date.toDateString() === today.toDateString())
          btn.classList.add("today");

        const dateStr = `${d}. ${monthNames[calMonth]} ${calYear}`;
        if (booking.date === dateStr) btn.classList.add("selected");

        btn.addEventListener("click", () => {
          document
            .querySelectorAll(".cal-day")
            .forEach((c) => c.classList.remove("selected"));
          btn.classList.add("selected");
          booking.date = dateStr;
          updateSummary();
          checkStep2();
        });
      }
      datesEl.appendChild(btn);
    }
  }

  const calPrev = document.getElementById("calPrev");
  const calNext = document.getElementById("calNext");
  if (calPrev)
    calPrev.addEventListener("click", () => {
      calMonth--;
      if (calMonth < 0) {
        calMonth = 11;
        calYear--;
      }
      renderCalendar();
    });
  if (calNext)
    calNext.addEventListener("click", () => {
      calMonth++;
      if (calMonth > 11) {
        calMonth = 0;
        calYear++;
      }
      renderCalendar();
    });
  renderCalendar();

  // Time Slots
  const timeslotEls = document.querySelectorAll(".timeslot:not(.full)");
  timeslotEls.forEach((slot) => {
    slot.addEventListener("click", () => {
      timeslotEls.forEach((s) => s.classList.remove("selected"));
      slot.classList.add("selected");
      booking.time = slot.getAttribute("data-time") + " Uhr";
      updateSummary();
      checkStep2();
    });
  });

  // Trainer
  const trainerOptions = document.querySelectorAll(".trainer-option");
  trainerOptions.forEach((opt) => {
    opt.addEventListener("click", () => {
      trainerOptions.forEach((o) => o.classList.remove("selected"));
      opt.classList.add("selected");
      booking.trainer = opt.getAttribute("data-trainer");
      updateSummary();
      checkStep2();
    });
  });

  const nextStep2 = document.getElementById("nextStep2");
  const backStep2 = document.getElementById("backStep2");

  function checkStep2() {
    if (nextStep2)
      nextStep2.disabled = !(booking.date && booking.time && booking.trainer);
  }

  if (nextStep2) nextStep2.addEventListener("click", () => goToStep(3));
  if (backStep2) backStep2.addEventListener("click", () => goToStep(1));

  // ── STEP 3: Form & Submit ─────────────────────────────────
  const backStep3 = document.getElementById("backStep3");
  const submitBooking = document.getElementById("submitBooking");
  const bookingForm = document.getElementById("bookingForm");
  const confirmation = document.getElementById("bookingConfirmation");
  const confirmDets = document.getElementById("confirmDetails");

  if (backStep3) backStep3.addEventListener("click", () => goToStep(2));

  if (submitBooking && bookingForm && confirmation) {
    submitBooking.addEventListener("click", () => {
      const firstName = document.getElementById("bFirstName");
      const email = document.getElementById("bEmail");
      const privacy = document.getElementById("bPrivacy");

      if (!firstName?.value || !email?.value || !privacy?.checked) {
        [firstName, email].forEach((f) => {
          if (f && !f.value) f.style.borderColor = "var(--clr-red)";
        });
        if (privacy && !privacy.checked) {
          privacy.style.outline = "2px solid var(--clr-red)";
        }
        return;
      }

      // Build confirmation rows
      if (confirmDets) {
        confirmDets.innerHTML = `
            <div class="conf-row"><span class="conf-label">Kurs</span><span class="conf-value">${booking.course}</span></div>
            <div class="conf-row"><span class="conf-label">Datum</span><span class="conf-value">${booking.date}</span></div>
            <div class="conf-row"><span class="conf-label">Uhrzeit</span><span class="conf-value">${booking.time}</span></div>
            <div class="conf-row"><span class="conf-label">Trainer</span><span class="conf-value">${booking.trainer}</span></div>
            <div class="conf-row"><span class="conf-label">Name</span><span class="conf-value">${firstName.value}</span></div>
          `;
      }

      bookingMain.querySelector(".booking-layout").style.display = "none";
      bookingMain.querySelector(".booking-progress")?.remove();
      confirmation.classList.add("visible");
      window.scrollTo({ top: bookingMain.offsetTop - 80, behavior: "smooth" });
    });
  }
});
