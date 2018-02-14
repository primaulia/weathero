const now_weather = async (parent, { lat = 1.352083, long = 103.819836 }, ctx, info) => {
  const API_URL = `https://api.darksky.net/forecast/30d7debaeabdcdba68fce0dbd85769a2/${lat},${long}`
  const response = await fetch(API_URL)
  const { currently } = await response.json()

  return currently
}

module.exports = {
  now_weather
};
