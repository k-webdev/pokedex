/* ============================================== onload AREA ONLY !!!!! ================================================= */

function init() {
    definePokeOverView();
    loadForCoding(); //remove or comment out after coding
}

/* ======================================================================================================================== */


/* =================================== for coding only!!!! comment out after coding ======================================= */

async function loadForCoding() {
    let url = `https://pokeapi.co/api/v2/pokemon/1`;
    let response = await fetch(url);
    let responseAsJson = await response.json();
    console.log(responseAsJson);
}

/* ========================================================================================================================= */

/* ============================================== load Pokedex initialization =============================================== */



/* =========================================================================================================================== */

/* ============================================== Single Pokemon AREA ONLY !!!!! ================================================= */
let currentPokemonSingle = 1;
let baseExperience; //int
let height; //int
let sprites; //string
let weight; //int
let pokeName; //string
let statsNames = []; //strings
let moves = []; //string
let baseStats = []; //int
let types = []; //string
let metricHeight;//for about function calc to metric
let metricWeight;//for about function calc to metric

async function loadAllDatasSinglePokemon(numberFromOverview) {//ist nur provisorisch die nummer darf nicht mit 0 anfangen!!!
    let url = `https://pokeapi.co/api/v2/pokemon/${numberFromOverview}`;
    let response = await fetch(url);
    let responseAsJson = await response.json();
    pokeName = responseAsJson['name'];
    baseExperience = responseAsJson['base_experience'];//success
    height = responseAsJson['height'];//success
    sprites = responseAsJson['sprites']['other']['official-artwork']['front_default'];//success
    weight = responseAsJson['weight'];//success
    for (let i = 0; i < responseAsJson['moves'].length; i++) {
        const move = responseAsJson['moves'][i]['move']['name'];
        moves.push(move);
    }
    for (let i = 0; i < responseAsJson['stats'].length; i++) {
        const baseStat = responseAsJson['stats'][i]['base_stat'];
        baseStats.push(baseStat);
    }
    for (let i = 0; i < responseAsJson['types'].length; i++) {
        const type = responseAsJson['types'][i]['type']['name'];
        types.push(type);
    }
    for (let i = 0; i < responseAsJson['stats'].length; i++) {
        const statName = responseAsJson['stats'][i]['stat']['name'];
        statsNames.push(statName);
    }
}

function deleteArrays() {
    moves = [];
    baseStats = [];
    types = [];
}

function fillDetailCard() {
    document.getElementById('detail-card-top-pokename').innerHTML = pokeName.replace(/^.{1}/g, pokeName[0].toUpperCase());
    document.getElementById('poke-image-detail').src = sprites;
    document.getElementById('detail-card-top-add-types').innerHTML = '';
    for (let i = 0; i < types.length; i++) {
        document.getElementById('detail-card-top-add-types').innerHTML += `
        
        <div class="detail-card-top-add-types-design">${types[i].replace(/^.{1}/g, types[i][0].toUpperCase())}</div>

        `;
    }
}

function addElemntsToDetailCardAbout() {
    document.getElementById('poke-Details').innerHTML = '';
    document.getElementById('poke-Details').innerHTML += `
    
    <div id="background-type-color" class="background-detail-card-child">

                <div class="detail-card-top">
                    <div class="detail-card-top-controls"><div onclick="backToOverview()" class="detail-card-top-arrow"><img src="./img/arow-left.png"></div><div class="d-none"><img src="./img/heart.png"></div></div>
                    <div class="detail-card-top-headline"><h2 id="detail-card-top-pokename"></h2></div>
                    <div class="detail-card-top-types" id="detail-card-top-add-types"></div>
                    <div class="detail-card-top-pokeimage-container"><img class="detail-card-top-pokeimage" id="poke-image-detail" src=""></div>
                </div>
                <div class="details-card-bottom-master">
                    <div class="details-card-bottom-controls-sort"><div onclick="loadAbout()" class="details-card-bottom-controls-style">About</div><div onclick="loadMoves()" class="details-card-bottom-controls-style">Moves</div><div onclick="loadStats()" class="details-card-bottom-controls-style">Stats</div></div>
                    <div class="details-card-bottom-content-sort" id="details-card-bottom-content-add">

                    </div>
                </div>

            </div>

    `;
}

function addElemntsToDetailCardMoves() {
    document.getElementById('details-card-bottom-content-add').innerHTML = '';
    document.getElementById('details-card-bottom-content-add').innerHTML = '<div class="moves-design-sort" id="moves-id-sort"></div>';
    for (let i = 0; i < moves.length; i++) {
        document.getElementById('moves-id-sort').innerHTML += `
        
        <div class="moves-design">${moves[i].replace(/^.{1}/g, moves[i][0].toUpperCase())}</div>

        `;
    }
}

function backToOverview() {
    addAndRemoveClasses();
    deleteArrays();
}

function loadAbout() {
    loadAboutBody();
    calcWeightAndHeight();
    loadAboutContent();
}

function loadMoves() {
    addElemntsToDetailCardMoves();
}

function loadAboutBody() {
    document.getElementById('details-card-bottom-content-add').innerHTML = '';
    document.getElementById('details-card-bottom-content-add').innerHTML = `
    
    <div class="sort-detail-card-about-master">
        <div class="detail-card-about-sort"><div class="detail-card-about-head">Name:</div><div class="detail-card-about-content" id="details-card-bottom-content-about-name"></div></div>
        <div class="detail-card-about-sort"><div class="detail-card-about-head">Height:</div><div class="detail-card-about-content" id="details-card-bottom-content-about-height"></div></div>
        <div class="detail-card-about-sort"><div class="detail-card-about-head">Weight:</div><div class="detail-card-about-content" id="details-card-bottom-content-about-weight"></div></div>
        <div class="detail-card-about-sort"><div class="detail-card-about-head">Types:</div><div class="detail-card-about-content" id="details-card-bottom-content-about-types"></div></div>
    </div>

    `;
}

function calcWeightAndHeight() {
    metricHeight = height / 3.281;
    metricWeight = weight / 2.205;

}

function loadAboutContent() {
    document.getElementById('details-card-bottom-content-about-name').innerHTML = pokeName.replace(/^.{1}/g, pokeName[0].toUpperCase());
    document.getElementById('details-card-bottom-content-about-height').innerHTML = metricHeight.toFixed(2) + ' m';
    document.getElementById('details-card-bottom-content-about-weight').innerHTML = metricWeight.toFixed(2) + ' kg';
    for (let i = 0; i < types.length; i++) {
        document.getElementById('details-card-bottom-content-about-types').innerHTML += ' ( ' + types[i].replace(/^.{1}/g, types[i][0].toUpperCase()) + ' ) ';
    }
}

function loadStats() {
    loadStatContent();
    loadVisualStats();
}

function loadStatContent() {
    document.getElementById('details-card-bottom-content-add').innerHTML = '';
    document.getElementById('details-card-bottom-content-add').innerHTML = '<div id="stats-sort-container" class="stats-sort-container"></div>';
    document.getElementById('stats-sort-container').innerHTML = '';
    for (let i = 0; i < baseStats.length; i++) {
        document.getElementById('stats-sort-container').innerHTML += `<div class="stats-content-container-mother"> <div class="stats-content-container-child1">${statsNames[i]}: ${baseStats[i]}</div><div class="stats-content-container-child2"> <div id="stat-bar-width-${i}" class="stats-content-container-child2-sub"></div> </div> </div>`;
    }
}

function loadVisualStats() {
    setTimeout(500);
    for (let i = 0; i < baseStats.length; i++) {
        document.getElementById(`stat-bar-width-${i}`).style.width = baseStats[i] + `%`;
    }

}

function backgroundColorChoserForDetails() {

    if (types[0] == 'fire') {
        return document.getElementById('background-type-color').style.backgroundColor = '#d04026';
    }
    if (types[0] == 'grass') {
        return document.getElementById('background-type-color').style.backgroundColor = '#5bac34';
    }
    if (types[0] == 'water') {
        return document.getElementById('background-type-color').style.backgroundColor = '#1c7ee1';
    }
    if (types[0] == 'bug') {
        return document.getElementById('background-type-color').style.backgroundColor = '#93a211';
    }
    if (types[0] == 'flying') {
        return document.getElementById('background-type-color').style.backgroundColor = '#7589de';
    }
    if (types[0] == 'poison') {
        return document.getElementById('background-type-color').style.backgroundColor = '#8f397f';
    }
    if (types[0] == 'normal') {
        return document.getElementById('background-type-color').style.backgroundColor = '#93856b';
    }
    if (types[0] == 'ground') {
        return document.getElementById('background-type-color').style.backgroundColor = '#b28f2b';
    }
    if (types[0] == 'fairy') {
        return document.getElementById('background-type-color').style.backgroundColor = '#d17dd2';
    }
    if (types[0] == 'fighting') {
        return document.getElementById('background-type-color').style.backgroundColor = '#883a24';
    }
    if (types[0] == 'psychic') {
        return document.getElementById('background-type-color').style.backgroundColor = '#cd3d70';
    }
    if (types[0] == 'electric') {
        return document.getElementById('background-type-color').style.backgroundColor = '#e3a914';
    }
    if (types[0] == 'steel') {
        return document.getElementById('background-type-color').style.backgroundColor = '#8886ab';
    }
    if (types[0] == 'rock') {
        return document.getElementById('background-type-color').style.backgroundColor = '#a18631';
    }
    if (types[0] == 'ghost') {
        return document.getElementById('background-type-color').style.backgroundColor = '#3d3d95';
    }
    else {
        return;
    }

}

/* ================================================================================================================================= */

/* ================================= mixed area for connecting single area and overview area ======================================= */

let openCloseDetailsIndex = 0;

function openCloseDetails(index) {
    loadAllDatasSinglePokemon(index);
    addAndRemoveClasses();
    addElemntsToDetailCardAbout();
    setTimeout(backgroundColorChoserForDetails, 500);
    setTimeout(fillDetailCard, 500);
    setTimeout(loadAbout, 500);
}

function addAndRemoveClasses() {
    if (openCloseDetailsIndex == 0) {
        //open detail card
        openCloseDetailsIndex++;
        document.getElementById('body-container').classList.add('body-container-details');
        document.getElementById('body-container').classList.remove('body-container');
        document.getElementById('poke-overview').classList.remove('overview-content-container');
        document.getElementById('poke-overview').classList.add('d-none');
        document.getElementById('poke-Details').classList.remove('d-none');
        document.getElementById('poke-Details').classList.add('background-Detail-card');
        return;
    } else {
        // close detail card
        openCloseDetailsIndex = 0;
        document.getElementById('body-container').classList.remove('body-container-details');
        document.getElementById('body-container').classList.add('body-container');
        document.getElementById('poke-overview').classList.add('overview-content-container');
        document.getElementById('poke-overview').classList.remove('d-none');
        document.getElementById('poke-Details').classList.add('d-none');
        document.getElementById('poke-Details').classList.remove('background-Detail-card');
        return;
    }



}

/* ================================================================================================================================= */

/* ============================================== Overview Pokemon AREA ONLY !!!!! ================================================= */
let currentPokemonOverView = 1;
let pokeNames = [];
let pokeImages = [];
let pokeNumbers = [];
let pokeTypesOverview = [];

async function definePokeOverView() {
    for (let i = 1; i < 152; i++) {
        currentPokemonOverView = i;
        await loadOverView();
    }
}

async function loadOverView() {
    let url = `https://pokeapi.co/api/v2/pokemon/${currentPokemonOverView}`;
    let response = await fetch(url);
    let responseAsJson = await response.json();
    pokeNames.push(responseAsJson['name']);
    pokeImages.push(responseAsJson['sprites']['other']['official-artwork']['front_default']);
    pokeNumbers.push(responseAsJson['order']);
    pokeTypesOverview.push(responseAsJson['types'][0]['type']['name']);
    if (pokeImages.length == 151) {
        loadingSuccessed();
        loadOverviewCards();
    } else {
        waitOnLoad(); 
    }
}

function loadOverviewCards() {
    document.getElementById('poke-overview').innerHTML = '';

    for (let i = 0; i < pokeNames.length; i++) {
        const pokeName = pokeNames[i];
        const pokeImage = pokeImages[i];

        document.getElementById('poke-overview').innerHTML += `
        
            <div onclick="openCloseDetails(${i + 1})" id="background-color-chose-overview${i}" class="overview-card">
                <div class="overview-card-name">${pokeName.replace(/^.{1}/g, pokeName[0].toUpperCase())}</div>
                <div class="overview-card-image"><img class="overview-image" src="${pokeImage}"></div>
            </div>

        `;
        backgroundColorChoserForOverview(i);
    }
}

function backgroundColorChoserForOverview(index) {

    if (pokeTypesOverview[index] == 'fire') {
        return document.getElementById(`background-color-chose-overview${index}`).style.backgroundColor = '#d04026';
    }
    if (pokeTypesOverview[index] == 'grass') {
        return document.getElementById(`background-color-chose-overview${index}`).style.backgroundColor = '#5bac34';
    }
    if (pokeTypesOverview[index] == 'water') {
        return document.getElementById(`background-color-chose-overview${index}`).style.backgroundColor = '#1c7ee1';
    }
    if (pokeTypesOverview[index] == 'bug') {
        return document.getElementById(`background-color-chose-overview${index}`).style.backgroundColor = '#93a211';
    }
    if (pokeTypesOverview[index] == 'flying') {
        return document.getElementById(`background-color-chose-overview${index}`).style.backgroundColor = '#7589de';
    }
    if (pokeTypesOverview[index] == 'poison') {
        return document.getElementById(`background-color-chose-overview${index}`).style.backgroundColor = '#8f397f';
    }
    if (pokeTypesOverview[index] == 'normal') {
        return document.getElementById(`background-color-chose-overview${index}`).style.backgroundColor = '#93856b';
    }
    if (pokeTypesOverview[index] == 'ground') {
        return document.getElementById(`background-color-chose-overview${index}`).style.backgroundColor = '#b28f2b';
    }
    if (pokeTypesOverview[index] == 'fairy') {
        return document.getElementById(`background-color-chose-overview${index}`).style.backgroundColor = '#d17dd2';
    }
    if (pokeTypesOverview[index] == 'fighting') {
        return document.getElementById(`background-color-chose-overview${index}`).style.backgroundColor = '#883a24';
    }
    if (pokeTypesOverview[index] == 'psychic') {
        return document.getElementById(`background-color-chose-overview${index}`).style.backgroundColor = '#cd3d70';
    }
    if (pokeTypesOverview[index] == 'electric') {
        return document.getElementById(`background-color-chose-overview${index}`).style.backgroundColor = '#e3a914';
    }
    if (pokeTypesOverview[index] == 'steel') {
        return document.getElementById(`background-color-chose-overview${index}`).style.backgroundColor = '#8886ab';
    }
    if (pokeTypesOverview[index] == 'rock') {
        return document.getElementById(`background-color-chose-overview${index}`).style.backgroundColor = '#a18631';
    }
    if (pokeTypesOverview[index] == 'ghost') {
        return document.getElementById(`background-color-chose-overview${index}`).style.backgroundColor = '#3d3d95';
    }
    if (pokeTypesOverview[index] == 'dragon') {
        return document.getElementById(`background-color-chose-overview${index}`).style.backgroundColor = '#583acc';
    }
    if (pokeTypesOverview[index] == 'ice') {
        return document.getElementById(`background-color-chose-overview${index}`).style.backgroundColor = '#2eaecf';
    }
    else {
        return;
    }
}

function waitOnLoad() {
    document.getElementById('body-container').classList.remove('body-container');
    document.getElementById('body-container').classList.add('body-container-onload');
    document.getElementById('pokedex-is-loading').classList.remove('d-none');
    document.getElementById('pokedex-is-loading').classList.add('pokedex-is-loading-headline');
    document.getElementById('poke-overview').classList.remove('overview-content-container');
    document.getElementById('poke-overview').classList.add('loader');
}

function loadingSuccessed(){
    document.getElementById('body-container').classList.add('body-container');
    document.getElementById('body-container').classList.remove('body-container-onload');
    document.getElementById('pokedex-is-loading').classList.add('d-none');
    document.getElementById('pokedex-is-loading').classList.remove('pokedex-is-loading-headline');
    document.getElementById('poke-overview').classList.add('overview-content-container');
    document.getElementById('poke-overview').classList.remove('loader');
}

/* ================================================================================================================================= */