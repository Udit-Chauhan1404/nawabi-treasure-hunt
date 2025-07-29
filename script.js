const clues = [
  {
    clue: "A flame-born heir once walked away,\nNot from defeat, but dharma’s way.\nIn the city of seven kos, where vanvaas began,\nSeek the home of the returning man.",
    answer: "Ayodhya",
    dareHint: "Return to the temple path near the banyan tree and chant 'Ram Naam Satya Hai' aloud."
  },
  {
    clue: "They stitched for the army, not for the king,\nIn chimneys and tannery, rebellion did spring.\nWhere soot and sweat sparked a soldier’s cry,\nAnd wheels of industry silently fly.",
    answer: "Kanpur",
    dareHint: "Find the chimney ruins behind the canteen. Perform the 'sepoy call' to proceed."
  },
  {
    clue: "A wound of love, still white with pain,\nGuarded by minarets in silent refrain.\nIn a city once ruled by Persian prose,\nFind the tomb where eternity froze.",
    answer: "Agra",
    dareHint: "Sketch the dome’s shadow from the courtyard. Only then the path shall open."
  },
  {
    clue: "The fuse was lit not in the crown,\nBut where boots marched a smaller town.\nA cartridge bit, a spark did fly —\nFrom this city, empires began to die.",
    answer: "Meerut",
    dareHint: "Enact the bite of rebellion in the garden of musk trees."
  },
  {
    clue: "The river laps at burning feet,\nWhile monks and corpses silently meet.\nWhere boats and bells in twilight float,\nSeek the flame that never goes out.",
    answer: "Varanasi",
    dareHint: "Visit the pyre stones beside the well. Whisper to the eternal flame."
  },
  {
    clue: "Not born of kings or saints or lore,\nBut steel and screen behind every door.\nWhere towers rise in ordered lines,\nAnd Yamuna hears the hum of signs.",
    answer: "Noida",
    dareHint: "Scan the digital rune inside Tech Square. The sigil awakens with a beep."
  },
  {
    clue: "Not the blade, but the word cut deep,\nAnd manners like velvet refused to sleep.\nIn marble halls where 'pehle aap' ruled,\nAnd wars were fought with poems cooled.",
    answer: "Lucknow",
    dareHint: "Recite a couplet in the echo chamber of etiquette near the archway."
  }
];

let step = 0;

function registerTeam() {
  const name = document.getElementById('teamName').value.trim();
  const id = document.getElementById('leaderId').value.trim().toUpperCase();
  const checkbox = document.getElementById('instructionCheck');
  const regPattern = /^\d{2}[A-Z]{3}\d{4}$/;

  if (!name || !id) {
    alert("Please enter both Team Name and Registration Number.");
    return;
  }

  if (!regPattern.test(id)) {
    alert("Please enter a valid Registration Number (Format: 23ABC1234).");
    return;
  }

  if (!checkbox.checked) {
    alert("Please confirm that you have read the instructions.");
    return;
  }

  localStorage.setItem('teamName', name);
  localStorage.setItem('leaderId', id);
  localStorage.setItem('progress', '0');

  document.getElementById('registerBox').classList.add('hidden');
  document.getElementById('gameBox').classList.remove('hidden');

  updateTeamInfo(name, id);
  step = 0;
  showClue();
}

function updateTeamInfo(name, id) {
  const teamInfo = document.getElementById('teamInfo');
  teamInfo.innerHTML = `<strong>Team:</strong> ${name}<br/><strong>Leader ID:</strong> ${id}`;
}

function showClue() {
  if (step >= clues.length) {
    document.getElementById('gameBox').classList.add('hidden');
    document.getElementById('completeBox').classList.remove('hidden');
    return;
  }

  document.getElementById('clueText').textContent = clues[step].clue;
  document.getElementById('answerInput').value = '';
  document.getElementById('feedback').innerHTML = '';
  document.getElementById('dareHint').classList.add('hidden');
  document.getElementById('congratsBox').style.display = "none";
  document.getElementById('answerSection').classList.remove('hidden');
}

function submitAnswer() {
  const input = document.getElementById('answerInput').value.trim().toLowerCase();
  if (input === clues[step].answer.toLowerCase()) {
    document.getElementById('feedback').innerHTML = '';
    document.getElementById('dareHint').classList.add('hidden');
    document.getElementById('answerInput').value = '';
    showCongratulationMessage();
  } else {
    document.getElementById('feedback').innerHTML = `
      <p style='color: red;'>Incorrect Sigil!</p>
      <button onclick='retry()'>Retry</button>
      <button onclick='showDare()'>Seek the Dare</button>
    `;
  }
}

function retry() {
  document.getElementById('feedback').innerHTML = '';
  document.getElementById('dareHint').classList.add('hidden');
}

function showDare() {
  const hint = clues[step].dareHint;
  document.getElementById('answerInput').value = '';
  document.getElementById('dareHint').textContent = hint;
  document.getElementById('dareHint').classList.remove('hidden');
}

function showCongratulationMessage() {
  const box = document.getElementById('congratsBox');
  const isLastClue = step === clues.length - 1;
  const nextBtnLabel = isLastClue ? "Finish Hunt" : "Proceed to Next Clue";

  box.innerHTML = `
    <p>✅ Correct! You've uncovered Sigil ${step + 1}.</p>
    <p>🖊️ Go to the volunteer to get your scroll signed.</p>
    <button id="nextClueBtn" onclick="nextClue()">${nextBtnLabel}</button>
  `;
  box.style.display = 'block';
  document.getElementById('answerSection').classList.add('hidden');
}

function nextClue() {
  step++;
  localStorage.setItem('progress', step);
  showClue();
}

function resetProgress() {
  localStorage.clear();
  location.reload();
}