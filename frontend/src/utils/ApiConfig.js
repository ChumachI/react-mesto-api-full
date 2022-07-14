
const ApiConfig = {
    commonUrlPart: 'https://api.mesto.ilya.chumak.nomoredomains.xyz',
    headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + localStorage.getItem("jwt"),
      }
}
export { ApiConfig }
