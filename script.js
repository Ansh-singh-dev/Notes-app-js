const noteText = document.getElementById("noteText");
const addNoteBtn = document.getElementById("addNoteBtn");
const notesContainer = document.getElementById("notesContainer");

loadNotes();

addNoteBtn.addEventListener("click", () => {

    const note = noteText.value.trim();

    if (note === "") {
        return;
    }

    const noteElement = document.createElement("div");
    noteElement.classList.add("note");
    noteElement.textContent = note;

    const deleteBtn = document.createElement("button");
    deleteBtn.textContent = "✕";
    deleteBtn.classList.add("delete-btn");

    noteElement.appendChild(deleteBtn);
    notesContainer.appendChild(noteElement);

    noteText.value = "";

    deleteBtn.addEventListener("click", () => {
        noteElement.remove();
        saveNotes();
    });

    saveNotes();

});

function saveNotes() {

    const notes = [];

    document.querySelectorAll(".note").forEach(note => {
        notes.push(note.textContent.replace("✕","").trim());
    });

    localStorage.setItem("notes", JSON.stringify(notes));

}

function loadNotes() {

    const savedNotes = JSON.parse(localStorage.getItem("notes")) || [];

    savedNotes.forEach(note => {

        const noteElement = document.createElement("div");
        noteElement.classList.add("note");
        noteElement.textContent = note;

        const deleteBtn = document.createElement("button");
        deleteBtn.textContent = "✕";
        deleteBtn.classList.add("delete-btn");

        deleteBtn.addEventListener("click", () => {
            noteElement.remove();
            saveNotes();
        });

        noteElement.appendChild(deleteBtn);
        notesContainer.appendChild(noteElement);

    });

}