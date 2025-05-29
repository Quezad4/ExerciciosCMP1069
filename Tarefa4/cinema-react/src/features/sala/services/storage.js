export function getSalas() {
    return JSON.parse(localStorage.getItem("salas")) || [];
}

export function getNomeSalas() {
    const listaSalas = getSalas();
    return listaSalas.map(sala => sala.nomeSala);
}

export function getTipoSalaServices(nomeSala) {
    const listaSalas = getSalas();
    const salaEncontrada = listaSalas.find(sala => sala.nomeSala === nomeSala);
    return salaEncontrada ? salaEncontrada.tipoSala : null;
}


export function adicionarSala(sala) {
    const salasSalvas = [...getSalas(), sala];
    atualizarSalas(salasSalvas)
    return salasSalvas;
}

export function excluirSalaServices(index) {
    let listaSalas = getSalas();
    listaSalas.splice(index, 1);
    atualizarSalas(listaSalas)
    return (listaSalas);
}

export function atualizarSalas(listaSalas) {
    localStorage.setItem("salas", JSON.stringify(listaSalas));
}

export function getSalaEditar(index) {
    let listaSalas = getSalas();
    return (listaSalas[index]);
}

export function alterarSalaEditado(sala, index) {
    let listaSalas = getSalas();
    listaSalas[index] = sala
    console.log(listaSalas)
    atualizarSalas(listaSalas);
    return (listaSalas)

}





