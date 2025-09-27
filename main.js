let data = [];

const showFormBtn = document.querySelector("#showFormBtn");
const overlay = document.querySelector(".overlay");
const form = document.querySelector(".form");
const addNoteBtn = document.querySelector("#addNoteBtn");
const textarea = document.querySelector("textarea");
const notesContainer = document.querySelector(".notes-container");

function showForm() {
  overlay.classList.add("showOverlay");
  form.style.bottom = "0%";
}

function hideForm() {
  overlay.classList.remove("showOverlay");
  form.style.bottom = "-100%";
  textarea.value = "";
}

function markDone(btn) {
  const id = btn.parentElement.id;
  data = data.map((note) => {
    if (note.id === id) {
      return { ...note, status: "done" };
    }
    return { ...note };
  });
  showNotes(data);
}

function showNotes(notes) {
  const allNotesSpan = document.querySelector(".btn.btn-gray > span");
  const doneSpan = document.querySelector(".btn.btn-green > span");
  const pendingSpan = document.querySelector(".btn.btn-yellow > span");
  allNotesSpan.textContent = notes.length;
  doneSpan.textContent = notes.filter((n) => n.status === "done").length;
  pendingSpan.textContent = notes.filter((n) => n.status === "pending").length;
  notesContainer.innerHTML = "";
  notes.forEach((note) => {
    const noteHTML = `<div class="note ${
      note.status === "pending" ? "note-pending" : "note-done"
    }" id="${note.id}">
          <p>${note.text}</p>
          <button onclick="markDone(this)"></button>
          <span>${note.createdAt}</span>
        </div>`;
    notesContainer.innerHTML += noteHTML;
  });
}
function generateId(len = 0) {
  const possibleChars = "abcdefghijklmnopqrstuvwxyz0123456789";
  let id = "";
  for (let i = 0; i < len; i++) {
    id += possibleChars[Math.floor(Math.random() * possibleChars.length)];
  }
  return id;
}

function createNewNote(text) {
  if (text.trim() === "") return null;
  return {
    text: text,
    status: "pending",
    createdAt: new Date().toISOString(),
    id: generateId(),
  };
}

showFormBtn.addEventListener("click", showForm);

overlay.addEventListener("click", hideForm);

addNoteBtn.addEventListener("click", () => {
  const text = textarea.value;
  const newNote = createNewNote(text);
  if (!newNote) return;
  data.push(newNote);
  showNotes(data);
  hideForm();
});
