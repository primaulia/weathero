const now_weather = async (_, { lat = 1.352083, long = 103.819836 }) => {
  console.log(`lat is ${lat}`)
  console.log(`long is ${long}`)

  const API_URL = `https://api.darksky.net/forecast/30d7debaeabdcdba68fce0dbd85769a2/${lat},${long}?units=si`
  const response = await fetch(API_URL)
  const { currently, timezone } = await response.json()

  console.log(`API now is ${API_URL}`);
  // console.log({
  //   ...currently,
  //   timezone
  // })

  return {
    ...currently,
    timezone
  }
}

module.exports = {
  now_weather
}
