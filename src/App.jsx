import { useEffect, useRef } from 'react';
import './App.css';

function App() {
  const startBtnRef = useRef(null);
  const muteBtnRef = useRef(null);
  const amountInputRef = useRef(null);
  const recipeListRef = useRef(null);
  const todoViewRef = useRef(null);
  const audioRef = useRef(null);
  const signalRef = useRef(null);
  const containerRef = useRef(null);

  useEffect(() => {
    const audio = audioRef.current;
    const startBtn = startBtnRef.current;
    const muteBtn = muteBtnRef.current;
    const amountInput = amountInputRef.current;
    const recipeList = recipeListRef.current;
    const todoView = todoViewRef.current;
    const signal = signalRef.current;
    const container = containerRef.current;

    let baseAmount = 5;

    const baseRecipe = {
      "Vesi": 5,
      "Sokeri": [300, 350],
      "Fariinisokeri": [300, 350],
      "Sitruunat": 2,
      "Hiiva": "1/5 tl"
    };

    const updateRecipeUI = () => {
      const factor = amountInput.value / baseAmount;
      recipeList.innerHTML = "";

      const sugarMin = Math.round(baseRecipe["Sokeri"][0] * factor);
      const sugarMax = Math.round(baseRecipe["Sokeri"][1] * factor);
      const brownMin = Math.round(baseRecipe["Fariinisokeri"][0] * factor);
      const brownMax = Math.round(baseRecipe["Fariinisokeri"][1] * factor);
      const lemons = Math.ceil(baseRecipe["Sitruunat"] * factor);
      const hiiva = baseRecipe["Hiiva"];

      const items = [
        `Vettä: ${amountInput.value} litraa`,
        `Sokeria: ${sugarMin}–${sugarMax} g`,
        `Fariinisokeria: ${brownMin}–${brownMax} g`,
        `Sitruunoita: ${lemons} kpl`,
        `Hiivaa: ${hiiva}`
      ];

      for (let item of items) {
        const li = document.createElement("li");
        li.className = "list-group-item";
        li.textContent = item;
        recipeList.appendChild(li);
      }

      todoView.innerHTML = `
        <h5 class="mt-2">Ohje:</h5>
        <ol class="list-group list-group-numbered mt-3">
            <li class="list-group-item">Keitä ${amountInput.value} litraa vettä ja kaada sokerien (${sugarMin}–${sugarMax}g sokeria ja ${brownMin}–${brownMax}g fariinisokeria) päälle.</li>
            <li class="list-group-item">Sekoita kunnes sokeri sulaa.</li>
            <li class="list-group-item">Lisää ${lemons} sitruunan mehu ja viipaleet.</li>
            <li class="list-group-item">Jäähdytä kädenlämpöiseksi. (+38~)</li>
            <li class="list-group-item">Lisää hiiva (${hiiva}). (herneen kokoinen nokare)</li>
            <li class="list-group-item">Peitä ja anna käydä huoneenlämmössä 1 vrk.</li>
            <li class="list-group-item">Pullota, lisää 1tl sokeria ja muutama rusina per pullo. Säilytä viileässä 3–5 päivää.</li>
        </ol>
        <h5 class="mt-2">Pro tips:</h5>
        <ol class="list-group list-group-numbered mt-3">
            <li class="list-group-item">
                Sima on valmista, kun rusinat nousevat pintaan. Viileässä (jääkaapissa) valmistumisaika on noin viikko, huoneenlämmössä noin 3 päivää.
            </li>
            <li class="list-group-item">
                Halutessasi enemmän sitruunan makua: käytä luomusitruunoita ja pese ne huolellisesti. Kuori keltainen kuoriosa ja lisää kuumaan veteen sokereiden kanssa. Siivilöi sima ennen pullotusta.
            </li>
        </ol>
      `;
    };
    console.log(startBtn);
    console.log(muteBtn);
    if (startBtn) {
      startBtn.onclick = () => {
        console.log("Audio start");
        audio.play();
        startBtn.style.display = 'none';
        container.classList.remove('d-none');
        updateRecipeUI();
      };
    }

    if (amountInput) {
      amountInput.oninput = updateRecipeUI;
    }

    if (muteBtn) {
      muteBtn.onclick = () => {
        audio.volume = audio.volume === 0 ? 1 : 0;
      };
    }

    audio.onplay = () => {
      signal.classList.add('active');
    };

    audio.onpause = () => {
      signal.classList.remove('active');
    };
  }, []);

  return (
    <div className="signal" ref={signalRef}>
      <div className="scene">
        <div className="wrap">
          <div className="wall wall-right"></div>
          <div className="wall wall-left"></div>
          <div className="wall wall-top"></div>
          <div className="wall wall-bottom"></div>
          <div className="wall wall-back"></div>
        </div>
        <div className="wrap">
          <div className="wall wall-right"></div>
          <div className="wall wall-left"></div>
          <div className="wall wall-top"></div>
          <div className="wall wall-bottom"></div>
          <div className="wall wall-back"></div>
        </div>
      </div>
      <div className="position-absolute z-1 text-center">
        <div className="dancingcontainer">
          <audio src="./overdrive.mp3" preload="auto" ref={audioRef}></audio>
          <div className="dancingtext">
            <h3>Sima<br />EXTREME</h3>
          </div>
          <div className="startbtn">
            <button ref={startBtnRef} className="btn btn-primary btn-lg">Start Cooking?</button>
          </div>
        </div>

        <div className="container mt-4 d-none" ref={containerRef}>
          <ul className="nav nav-tabs" id="recipeTabs" role="tablist">
            <li className="nav-item" role="presentation">
              <button className="nav-link active" id="recipe-tab" data-bs-toggle="tab" data-bs-target="#recipe" type="button" role="tab">
                Resepti
              </button>
            </li>
            <li className="nav-item" role="presentation">
              <button className="nav-link" id="todo-tab" data-bs-toggle="tab" data-bs-target="#todo" type="button" role="tab">
                Ohje
              </button>
            </li>
          </ul>
          <div className="tab-content p-3 bg-light rounded-bottom border border-top-0">
            <div className="tab-pane fade show active" id="recipe" role="tabpanel">
              <div className="mb-3">
                <label htmlFor="amount" className="form-label">Haluttu määrä litroissa:</label>
                <input
                  type="number"
                  id="amount"
                  name="amount"
                  className="form-control w-25 mx-auto"
                  min="0"
                  defaultValue="5"
                  ref={amountInputRef}
                />
              </div>
              <ul ref={recipeListRef} className="list-group"></ul>
            </div>
            <div className="tab-pane fade" id="todo" role="tabpanel">
              <div ref={todoViewRef}></div>
            </div>
          </div>
          <button ref={muteBtnRef} className="btn btn-secondary mt-3">Mute</button>
        </div>
      </div>
    </div>
  );
}

export default App;
