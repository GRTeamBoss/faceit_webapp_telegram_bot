export default defineEventHandler(async (event) => {
  const runtimeConfig = useRuntimeConfig()
  const query = getQuery(event)
  const fetchInstance = async (path: string, params = {}) => {
      const paramsQuery = new URLSearchParams(params).toString()
      const res = await fetch(`https://open.faceit.com/data/v4${path}${paramsQuery ? `?${paramsQuery}` : ""}`, {
        headers: {
          "Authorization": `Bearer ${runtimeConfig.faceitToken}`
        }
      })
      return res.json()
    }
  const stats = await fetchInstance(`/players/${query.playerId}/games/cs2/stats`)
  return stats
})
