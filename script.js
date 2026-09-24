const form = document.getElementById("feedbackForm");
const list = document.getElementById("feedbackList");
const emptyState = document.getElementById("emptyState");
const count = document.getElementById("feedbackCount");
const message = document.getElementById("message");
const clearBtn = document.getElementById("clearBtn");

let feedbacks = JSON.parse(localStorage.getItem("pulsepointFeedback") || "[]");

function initials(name) {
  return name.trim().split(/\s+/).slice(0, 2).map(x => x[0]).join("").toUpperCase();
}

function render() {
  list.innerHTML = "";
  count.textContent = feedbacks.length;
  emptyState.style.display = feedbacks.length ? "none" : "block";

  feedbacks.slice().reverse().forEach(item => {
    const card = document.createElement("article");
    card.className = "feedback-card";
    card.innerHTML = `
      <div class="feedback-top">
        <div class="student">
          <div class="avatar">${initials(item.name)}</div>
          <div>
            <div class="student-name">${escapeHtml(item.name)}</div>
            <div class="course">${escapeHtml(item.course)}</div>
          </div>
        </div>
        <div class="date">${escapeHtml(item.date)}</div>
      </div>
      <p class="feedback-text">“${escapeHtml(item.feedback)}”</p>
    `;
    list.appendChild(card);
  });
}

function escapeHtml(value) {
  const div = document.createElement("div");
  div.textContent = value;
  return div.innerHTML;
}

form.addEventListener("submit", (e) => {
  e.preventDefault();
  const name = document.getElementById("name").value.trim();
  const course = document.getElementById("course").value;
  const feedback = document.getElementById("feedback").value.trim();

  if (!name || !course || !feedback) return;

  feedbacks.push({
    name, course, feedback,
    date: new Date().toLocaleDateString("en-IN", { day: "2-digit", month: "short" })
  });

  localStorage.setItem("pulsepointFeedback", JSON.stringify(feedbacks));
  form.reset();
  message.textContent = "✓ Feedback submitted successfully!";
  message.style.color = "#16834f";
  render();

  setTimeout(() => message.textContent = "", 2500);
});

clearBtn.addEventListener("click", () => {
  feedbacks = [];
  localStorage.removeItem("pulsepointFeedback");
  render();
});

render();
