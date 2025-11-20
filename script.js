const lista_pokemones= [];
const contenedor = document.getElementById("contenedor_favoritos")
document.getElementById("guardar_pokemon").addEventListener("click", function(event){
    event.preventDefault();
    
    if(!pokemon_actual){
        alert("No se ha escogido pokemon")
        return;
    }

    let favoritos = JSON.parse(localStorage.getItem("favoritos")) || [];

    let estaFavoritos = false;
    for (let i = 0; i < favoritos.length; i++) {
        if (favoritos[i].name === pokemon_actual.name) {
            estaFavoritos = true;
            break
        }
    }
    
    if (estaFavoritos){
        alert("Este pokemon ya estaba en favoritos")
        return;
    }
    favoritos.push(pokemon_actual);
    localStorage.setItem("favoritos", JSON.stringify(favoritos));

    actualizarFAvoritos();
});

    


