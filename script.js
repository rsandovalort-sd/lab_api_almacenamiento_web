let pokemonActual = null;

function searchPokemon() {
    // 1. Obtener nombre del input
    const nombre = document.getElementById("btnRequest").value.toLowerCase();
    const url = `https://pokeapi.co/api/v2/pokemon/${nombre}`;

    // 2. Hacer la petición a la API
    fetch(url)
        .then(response => response.json())
        .then(data => {
            // 3. Guardar en la variable global
            pokemonActual = {
                nombre: data.name,
                imagen: data.sprites.front_default
            };

            // 4. Mostrar resultado en pantalla
            const resultDiv = document.getElementById("result");
            resultDiv.innerHTML = `
                <h3>${pokemonActual.nombre}</h3>
                <img src="${pokemonActual.imagen}" alt="${pokemonActual.nombre}">
            `;
        })
        .catch(err => {
            alert("Pokémon no encontrado");
        });
};

document.getElementById("btnSearch").addEventListener("click", searchPokemon);

const lista_pokemones= [];
const contenedor = document.getElementById("contenedor_favoritos")
document.getElementById("guardar_pokemon").addEventListener("click", function(event){
    event.preventDefault();
    
    if(!pokemonActual){
        alert("No se ha escogido pokemon")
        return;
    }

    let favoritos = JSON.parse(localStorage.getItem("favoritos")) || [];

    let estaFavoritos = false;
    for (let i = 0; i < favoritos.length; i++) {
        if (favoritos[i].nombre === pokemonActual.nombre) {
            estaFavoritos = true;
            break
        }
    }
    
    if (estaFavoritos){
        alert("Este pokemon ya estaba en favoritos")
        return;
    }
    favoritos.push(pokemonActual);
    localStorage.setItem("favoritos", JSON.stringify(favoritos));

});

    



