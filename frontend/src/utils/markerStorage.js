export async function setCoords(coords) {
    localStorage.setItem("Coords: ", coords)
}

export async function getCoords() {
    localStorage.getItem("Coords: ")
    console.log(localStorage.getItem("Coords: "))
}