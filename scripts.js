const btnNuevoJuego = document.querySelector("#btnNuevoJuego"),
divCartas = document.getElementsByClassName("cartas");
btnPedirCartas=document.querySelector("#btnPedirCartas"),
btnDetener=document.querySelector("#btnDetener")
puntosHTML=document.querySelectorAll('small'),
jugadoresCartas=document.querySelectorAll(".cartas")
tituloHTML=document.querySelector("#titulo")
let baraja=[],
jugadoresPuntos=[],
turno=0;

const tipos=["C","D","H","S"],
    especiales=["A","J","Q","K"];

const init=(cantidadJugadores=3)=>{
    jugadoresPuntos=[];
    turno=0;
    baraja=crearBaraja();
    turnoActual();
    for(let i=0;i<cantidadJugadores;i++)jugadoresPuntos.push(0);

    for(let jugadorPuntos in jugadoresPuntos){

    puntosHTML[jugadorPuntos].textContent=0;
    jugadoresCartas[jugadorPuntos].textContent="";
    enableButtons();
}
}

const crearBaraja=()=>
{
    

    baraja=[]
    for (let tipo of tipos)
    {
        for(let i=2;i<=10;i++)
        {
            baraja.push(i+tipo)
            
        }

        /* agregar cartas especial al deck
         for(let j=0;j<=3;j++){
            baraja.push(especiales[j]+tipo)
        } */

        for(let especial of especiales) baraja.push(especial+tipo)
    }
    return _.shuffle(baraja)
    
}

const obtenerCarta=()=>{
    
    if(baraja.length<=0) throw "No hay cartas en la baraja"
    return baraja.pop()
}

const acumularPuntos=({carta, turno})=>{
    
   jugadoresPuntos[turno]+=obtenerValorDeCarta(carta);
   puntosHTML[turno].textContent=jugadoresPuntos[turno];
   return jugadoresPuntos[turno];
      
    
};

const obtenerValorDeCarta=(carta)=>{
    const valor= carta.substring(0,carta.length-1);

    return !isNaN(valor)?valor*1: valor==='A'?11:10
 
}

const crearCarta=({carta,turno})=>{
    const imagen=document.createElement('img');
    imagen.src=`assets/${carta}.png`
    imagen.classList.add("carta");
    jugadoresCartas[turno].append(imagen);

}
const turnoComputadora=(PuntosMinimos,posicionJugador)=>{
    let computadoraPuntos=0
    disableButtons();
    do {
        const carta=obtenerCarta()
        computadoraPuntos=acumularPuntos({carta,turno:jugadoresPuntos.length-1})
        crearCarta({carta,turno:jugadoresPuntos.length-1})
    } while (computadoraPuntos<PuntosMinimos&&PuntosMinimos<=21);
    determinarGanador(PuntosMinimos,posicionJugador,computadoraPuntos)

}

const limpiarClase=()=>{
   
    
    for(var i = 0; i < divCartas.length; i++){
    divCartas[i].className = "cartas";}
}

const turnoActual=()=>{
if(turno==0)
{
    limpiarClase();
    divCartas[0].className = "cartas turno";
    tituloHTML.textContent="- Jugador 1"
}
if(turno==1)
{
    limpiarClase();
    divCartas[1].className = "cartas turno";
    tituloHTML.textContent="- Jugador 2"
}
if(turno==2)
{
    limpiarClase();
    divCartas[2].className = "cartas turno";
    tituloHTML.textContent="- Turno de la Computadora"
}

}

const determinarGanador=(jugadorPuntos,posicionJugador,computadoraPuntos)=>
{
    setTimeout(()=>{
        if(jugadorPuntos>21){
            alert('Computadora Gana!')
            return
        }
        if(computadoraPuntos>21){
            alert(`Jugador ${posicionJugador+1} Gana!`)
            return
        }
        if(jugadorPuntos==computadoraPuntos){
            alert('Ninguno Gana :s')
            return
        }
        if(jugadorPuntos==computadoraPuntos){
            alert(`Jugador ${posicionJugador+1} Gana!`)
            return
        }
        alert('Computadora Gana!')
    },400)
};

const enableButtons = () => {
    btnPedirCartas.disabled = false;
    btnDetener.disabled = false;
  };

const disableButtons = () => {
    btnPedirCartas.disabled = true;
    btnDetener.disabled = true;
  };
  
  



//Aumenta el de 1 en 1 el contador de la variable "turno", el ultimo jugador es la computadora
const SiguienteTurno=()=>
{
    turno+=1;
    turnoActual();
    //Se compara los puntos de los jugadores que tengan una cantidad menor o igual a 21, el jugador con el puntaje mas alto es el mejor "contrincante" vs la computadora
    let BetterPlayer=Math.max(...jugadoresPuntos.filter(puntos => puntos <= 21));
    //Una vez hallado el mayor puntaje, se busca a que jugador le pertenece esos puntos
    let PositionBetterPlayer=jugadoresPuntos.findIndex(posicion => posicion == BetterPlayer)
    if(turno==jugadoresPuntos.length-1)
    turnoComputadora(BetterPlayer,PositionBetterPlayer);

}

btnNuevoJuego.addEventListener('click',()=>{
    init();

})

btnPedirCartas.addEventListener('click',()=>{
    const carta=obtenerCarta()
   const jugadorPuntos = acumularPuntos({carta,turno})
   crearCarta({carta,turno});

   if(jugadorPuntos>21)
   SiguienteTurno();

})


btnDetener.addEventListener('click',()=>{

    SiguienteTurno();
})


