let data = [];
const showFormBtn = document.querySelector("#showFormBtn");
const overlay = document.querySelector(".overlay");
const form = document.querySelector(".form");

showFormBtn.addEventListener("click", () => {
  overlay.classList.add("showOverlay");
  form.style.bottom = "0%";
});

overlay.addEventListener("click", () => {
  hideForm();
});

// add new note
const textarea = document.querySelector("textarea");
const addNewNoteBtn = document.getElementById("addNoteBtn");

function generateId(len = 10) {
  const dataset = "abcdefghijklmnopqrstuvwxyz0123456789";
  let id = "";
  for (let i = 0; i < len; i++) {
    id += dataset[Math.floor(Math.random() * dataset.length)];
  }
  return id;
}

function hideForm() {
  overlay.classList.remove("showOverlay");
  form.style.bottom = "-100%";
}
function addNewNote(text) {
  if (text.trim() === "") {
    return null;
  }
  return {
    text: text,
    createdAt: new Date().toISOString(),
    status: "pending",
    id: generateId(),
  };
}

function addNotes(notes) {
  const allNotesSpan = document.querySelector(
    ".btn.btn-gray > span:first-child"
  );
  const doneSpan = document.querySelector(".btn.btn-green > span:first-child");
  const pendingSpan = document.querySelector(
    ".btn.btn-yellow > span:first-child"
  );

  allNotesSpan.textContent = notes.length;
  doneSpan.textContent = notes.filter((note) => note.status == "done").length;
  pendingSpan.textContent = notes.filter(
    (note) => note.status === "pending"
  ).length;
  const notesContainer = document.querySelector(".notes-container");
  notesContainer.innerHTML = "";
  notes.forEach((note) => {
    const noteHtml = `<div class="note ${
      note.status == "pending" ? "note-pending" : "note-done"
    }" id="${note.id}">
          <p>${note.text}</p>
          <button onclick="markDone(this)"></button>
          <span>${note.createdAt}</span>
        </div>`;
    notesContainer.innerHTML += noteHtml;
  });
}

function markDone(el) {
  const noteId = el.parentElement.id;
  console.log("id", noteId);
  data = data.map((note) => {
    if (note.id === noteId) {
      return { ...note, status: "done" };
    }
    return { ...note };
  });
  localStorage.setItem("notes", JSON.stringify(data));
  addNotes(data);
  console.log("after add Notes called");
}
addNewNoteBtn.addEventListener("click", () => {
  const text = textarea.value;
  const newNote = addNewNote(text);
  if (!newNote) return;
  data.push(newNote);
  localStorage.setItem("notes", JSON.stringify(data));
  addNotes(data);
  textarea.value = "";
  hideForm();
});

// search
const searchInput = document.querySelector(".search_input");
searchInput.addEventListener("input", () => {
  const text = searchInput.value;
  const searchedNotes = data.filter((note) => {
    const regex = new RegExp(text, "i");
    return regex.test(note.text);
  });
  addNotes(searchedNotes);
});
function restoreData() {
  data = JSON.parse(localStorage.getItem("notes"));
  addNotes(data);
}

restoreData();
