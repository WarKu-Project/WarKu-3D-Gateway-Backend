//Convert to second
let minute = (min) => {
  return 60000 * min
}
let second = (sec) => {
  return 1000 * sec
}

module.exports = {
  minute : minute,
  second : second
}
