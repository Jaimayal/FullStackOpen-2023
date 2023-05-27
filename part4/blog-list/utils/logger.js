function info(...message) {
    console.log(message);
}

function error(...message) {
    console.log(message)
}

module.exports = { info, error }