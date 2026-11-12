const matiereInput = document.querySelector('.Matiere-input');
const notesInput = document.querySelector('.notes-input');
const coiffecientInput = document.querySelector('.Coiffecient-input');
const Button = document.querySelector('.add-button');
const errorMessage = document.querySelector('.error-message');
const notesInfo = document.querySelector('.notes-info');
const resultContainer = document.querySelector('.result-container');
const nombreSpan = document.querySelector('.nombre');
const moyenneSpan = document.querySelector('.moyenne');
const mentionSpan = document.querySelector('.mention');

let matiereArray = [];

function noteEstValide() {
    const texte = notesInput.value.trim();
    return texte !== '' && Number(texte) >= 0 && Number(texte) <= 20;
}

Button.addEventListener('click', ()=> {
    if(matiereInput.value.trim() === '' || !noteEstValide()) {
        errorMessage.textContent = 'Matiere vide ou note invalide (0 a 20)';
        notesInput.style.border = noteEstValide() ? '' : 'solid 1px red';
        return;
    }

    errorMessage.textContent = '';
    notesInput.style.border = '';

    matiereArray.unshift({
        matiere : matiereInput.value.trim(),
        note : Number(notesInput.value),
        coiffecient: Number(coiffecientInput.value)
    })

    showNotesInfo();
    calculateAndPrint();

})

notesInput.addEventListener('input', ()=> {
    if(!noteEstValide()) {
        notesInput.style.border = 'solid 1px red';
    } else {
        notesInput.style.border = '';
    }
})

function showNotesInfo() {
    notesInfo.innerHTML = '';

    matiereArray.forEach((info, index) => {
        const element = document.createElement('div');
        element.classList.add(testNote(info.note));

        element.innerHTML = `
        <span>${info.matiere} : ${info.note}/20 (coef ${info.coiffecient})</span>
        <button class="supprimer" data-index=${index}>✕</button>
        `;
        notesInfo.appendChild(element);
    })
}

notesInfo.addEventListener('click', (e)=> {
    if(e.target.classList.contains('supprimer')) {
        const index = Number(e.target.getAttribute('data-index'));
        matiereArray.splice(index , 1);
        showNotesInfo();
    }
})

function testNote(note) {
    return note >= 10 ? 'reussi' : 'echoue';
}


function calculateAndPrint() {
    nombreSpan.textContent = matiereArray.length;

    if (matiereArray.length === 0) {
        moyenneSpan.textContent = '-';
        mentionSpan.textContent = '-';
        return;
    }

    let sumCoiffecient = 0;
    let sumNotes = 0;

    matiereArray.forEach(mat => {
        sumCoiffecient += mat.coiffecient;
        sumNotes += mat.note * mat.coiffecient;
    });

    const moyenne = sumNotes / sumCoiffecient;

    let mention;
    if (moyenne >= 16) {
        mention = 'Très bien';
    } else if (moyenne >= 14) {
        mention = 'Bien';
    } else if (moyenne >= 12) {
        mention = 'Assez bien';
    } else if (moyenne >= 10) {
        mention = 'Passable';
    } else {
        mention = 'Ajourné';
    }

    moyenneSpan.textContent = moyenne.toFixed(2) + ' / 20';
    mentionSpan.textContent = mention;
}
