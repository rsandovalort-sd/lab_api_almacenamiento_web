let pokemonActual = null;

document.getElementById("btnSearch").addEventListener("click",function searchPokemon() {
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
});

document.getElementById("btnSave").addEventListener("click", function(event){
    event.preventDefault();
    
    if(!pokemonActual){
        alert("No se ha escogido pokemon")
        return;
    }

    let contenido_favoritos = localStorage.getItem("favoritos")

    if (contenido_favoritos){
        favoritos = JSON.parse(contenido_favoritos)
    }else{
        favoritos = []
    }

    let estaFavoritos = false;
    let i = 0;
    while (i < favoritos.length) {
        if (favoritos[i].nombre === pokemonActual.nombre) {
            estaFavoritos = true;
            break
        }
        i++;
    }
    
    if (estaFavoritos){
        alert("Este pokemon ya estaba en favoritos")
        return;
    }
    favoritos.push(pokemonActual);
    localStorage.setItem("favoritos", JSON.stringify(favoritos));

    updateFavoritesList();

});

function updateFavoritesList() 
{
    let favoritos = JSON.parse(localStorage.getItem("favoritos")) || [];
    const favoritoDiv = document.getElementById("favorite");
    favoritoDiv.innerHTML = "";

    for (let i = 0; i < favoritos.length; i++) 
    {
        const pokemonDiv = document.createElement("div");
        pokemonDiv.innerHTML = `
            <h3>${favoritos[i].nombre}</h3>
            <img src="${favoritos[i].imagen}" alt="${favoritos[i].nombre}">
        `;
        
        favoritoDiv.appendChild(pokemonDiv);
    }
}

updateFavoritesList();

document.getElementById("btnDelete").addEventListener("click",function deleteFavorites() {
    localStorage.removeItem("favoritos");

    document.getElementById("favorite").innerHTML = "";

    document.getElementById("result").innerHTML = "";

    document.getElementById("btnRequest").value = "";

    alert("Pokemones Favoritos eliminados");
});
