console.log('pruebandings');

async function getData2(id){
    
  try {
      let response = await fetch("https://swapi.dev/api/people/1");

      if(!response.ok){
          if(response.status ===404){
              alert("Personaje no encontrado");
              console.error("Personaje no encontrado", response.status);
              throw new Error("Recurso no encontrado");
          }
          else{
              console.error("Error HTTP", response.status);
              throw new Error("Erro al obtener personaje");
          }
      }

      const data = await response.json();
      console.log(data.name);
      
  } catch (error) {
      console.log(error);
  }
}

//getData2()

async function* request(start,finish){
  let i =start;
  let url = "https://swapi.dev/api/people/"

  while(i<=finish){
      let resp = await fetch(url+i);
      let json = await resp.json();
      yield json;
      i++;

  }
}

let myRequestPrincipales = request(1,5);
let myRequestSecundarios = request(6,10);
let myRequestSignificativos = request(11,15);


async function getP(){
  const data = await myRequestPrincipales.next();
  const result =data.value;
  injectCard(result,"cardPRows","personajes-principales");
}

async function getSec(){
  const data = await myRequestSecundarios.next();
  const result =data.value;
  injectCard(result,"cardSecRows","personajes-secundarios");
}

async function getSig(){
  const data = await myRequestSignificativos.next();
  const result =data.value;
  injectCard(result,"cardSigRows","personajes-significativos");
}


function injectCard(character, cardId,color){
  const {name, height,mass} = character;
  const cardRow = document.getElementById(`${cardId}`);
  let card = `
    <div class="col-12 col-md-6 col-lg-4">
      <div class="single-timeline-content d-flex wow fadeInLeft" data-wow-delay="0.5s" style="visibility: visible; animation-delay: 0.5s; animation-name: fadeInLeft;">
          <div class="timeline-icon ${color}"></div>
          <div class="timeline-text">
              <h6>${name}</h6>
              <p>Estatura: ${height} cm. Peso: ${mass} kg.</p>
          </div>
      </div>
    </div>
  `
  cardRow.insertAdjacentHTML('beforeend', card)
}


const tartejaPrincipales = document.getElementById("tarjeta-principales");
const tartejaSignmificativos = document.getElementById("tarjeta-signmificativos");
const tartejaSecundarios = document.getElementById("tarjeta-secundarios");

tartejaPrincipales.addEventListener('mouseenter',()=>{
  getP()
})

tartejaSecundarios.addEventListener('mouseenter',()=>{
  getSec()
})

tartejaSignmificativos.addEventListener('mouseenter',()=>{
  getSig()
})