const pokemonCache = {};

const form = document.getElementById("search-form");
const input = document.getElementById("poke-input");
const pokemonView = document.getElementById("pokemon-view");
const spriteImg = document.getElementById("pokemon-sprite");
const cryAudio = document.getElementById("pokemon-cry");
const moveSelects = document.querySelectorAll(".move-select");
const addBtn = document.getElementById("add-to-team");
const teamDiv = document.getElementById("team");

let currentPokemon = null;
form.addEventListener("submit", async (e) => {
  e.preventDefault();
  const query = input.value.trim().toLowerCase();
  if (!query) return;

  try {
    const data = await getPokemon(query);
    currentPokemon = data;
    renderPokemon(data);
  } catch (err) {
    alert("Pokémon not found. Try a name or number between 1 and 151.");
    pokemonView.classList.add("hidden");
  }
});

async function getPokemon(idOrName) {
  if (pokemonCache[idOrName]) {
    return pokemonCache[idOrName];
  }

  const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${idOrName}`);
  if (!res.ok) {
    throw new Error("Not found");
  }
  const data = await res.json();
  pokemonCache[idOrName] = data;
  return data;
}

function renderPokemon(pokemon) {

  const spriteUrl =
    pokemon.sprites.other?.["official-artwork"]?.front_default ||
    pokemon.sprites.front_default;
  spriteImg.src = spriteUrl;
  spriteImg.alt = pokemon.name;

  let cryUrl =
    pokemon.cries?.latest ||
    pokemon.cries?.legacy ||
    `https://raw.githubusercontent.com/PokeAPI/cries/main/cries/pokemon/latest/${pokemon.id}.ogg`;
  cryAudio.src = cryUrl;

  const moveNames = pokemon.moves.map((m) => m.move.name).sort();

  moveSelects.forEach((select) => {
    select.innerHTML = "";
    const empty = document.createElement("option");
    empty.value = "";
    empty.textContent = "-- choose move --";
    select.appendChild(empty);

    moveNames.forEach((name) => {
      const opt = document.createElement("option");
      opt.value = name;
      opt.textContent = name;
      select.appendChild(opt);
    });

    select.selectedIndex = 0;
  });

  pokemonView.classList.remove("hidden");
}

addBtn.addEventListener("click", () => {
  if (!currentPokemon) return;

  const chosenMoves = Array.from(moveSelects).map((s) => s.value.trim());

  if (chosenMoves.some((m) => !m)) {
    alert("Please choose a move in all four slots.");
    return;
  }

  const uniqueMoves = new Set(chosenMoves);
  if (uniqueMoves.size !== 4) {
    alert("Each move must be unique. Please remove duplicates.");
    return;
  }

  addTeamMember(currentPokemon, chosenMoves);
});

function addTeamMember(pokemon, moves) {
  const member = document.createElement("div");
  member.className = "team-member";

  const img = document.createElement("img");
  img.src = spriteImg.src;
  img.alt = pokemon.name;
  img.width = 64;
  img.height = 64;
  img.style.imageRendering = "pixelated";

  const movesList = document.createElement("ul");
  moves.forEach((mv) => {
    const li = document.createElement("li");
    li.textContent = mv;
    movesList.appendChild(li);
  });

  const removeBtn = document.createElement("button");
  removeBtn.textContent = "Remove";
  removeBtn.addEventListener("click", () => {
    member.remove();
  });

  const rightSide = document.createElement("div");
  rightSide.appendChild(movesList);
  rightSide.appendChild(removeBtn);

  member.appendChild(img);
  member.appendChild(rightSide);
  teamDiv.appendChild(member);
}
