// data
const data = [];

const showFormBtn = document.querySelector("#showFormBtn");
const overlay = document.querySelector(".overlay");
const addNoteForm = document.querySelector(".form");

console.log(showFormBtn);

// show form
showFormBtn.addEventListener("click", () => {
  console.log("clicked");
  overlay.classList.add("showOverlay");
  addNoteForm.style.bottom = "0%";
});

// hide form

function hideForm() {
  overlay.classList.remove("showOverlay");
  addNoteForm.style.bottom = "-100%";
}
overlay.onclick = hideForm;

function addNote(text) {
  if (!text.trim()) return false;
  const newNote = {
    text: text,
    status: "pending",
    createdAt: new Date().toISOString(),
  };
  data.push(newNote);
  return true;
}

const addNoteBtn = document.querySelector("#addNoteBtn");
const textarea = document.querySelector("textarea");

addNoteBtn.addEventListener("click", () => {
  const text = textarea.value;
  const result = addNote(text);
  if (result) {
    afficherNotes(data);
    hideForm();
    textarea.value = "";
  }
});
const notesContainer = document.querySelector(".notes-container");
function afficherNotes(notes) {
  notesContainer.innerHTML = "";
  notes.forEach((note) => {
    const noteHtml = `<div class="note ${
      note.status === "pending" ? "note-pending" : "note-done"
    }">
          <p>${note.text}</p>
          <button></button>
          <span>${note.createdAt}</span>
        </div>`;
    notesContainer.innerHTML += noteHtml;
  });
}
