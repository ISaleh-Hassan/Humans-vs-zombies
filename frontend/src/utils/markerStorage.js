export async function setCoords(coords) {
    localStorage.setItem("Coords: ", coords)
}

export async function getCoords() {
    console.log(localStorage.getItem("Coords: "))
}
