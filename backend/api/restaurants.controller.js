import RestaurantsDAO from "../dao/restaurantsDAO.js"
import { mockRestaurants, mockCuisines } from "../mock-data.js"

export default class RestaurantsController {
  static async apiGetRestaurants(req, res, next) {
    const restaurantsPerPage = req.query.restaurantsPerPage ? parseInt(req.query.restaurantsPerPage, 10) : 20
    const page = req.query.page ? parseInt(req.query.page, 10) : 0

    let filters = {}
    if (req.query.cuisine) {
      filters.cuisine = req.query.cuisine
    } else if (req.query.zipcode) {
      filters.zipcode = req.query.zipcode
    } else if (req.query.name) {
      filters.name = req.query.name
    }

    try {
      const { restaurantsList, totalNumRestaurants } = await RestaurantsDAO.getRestaurants({
        filters,
        page,
        restaurantsPerPage,
      })

      let response = {
        restaurants: restaurantsList,
        page: page,
        filters: filters,
        entries_per_page: restaurantsPerPage,
        total_results: totalNumRestaurants,
      }
      res.json(response)
    } catch (error) {
      console.log("🔄 Database unavailable, using mock data")

      // Filter mock data based on query
      let filteredRestaurants = mockRestaurants

      if (filters.cuisine) {
        filteredRestaurants = mockRestaurants.filter(r => r.cuisine === filters.cuisine)
      } else if (filters.zipcode) {
        filteredRestaurants = mockRestaurants.filter(r => r.address.zipcode === filters.zipcode)
      } else if (filters.name) {
        filteredRestaurants = mockRestaurants.filter(r =>
          r.name.toLowerCase().includes(filters.name.toLowerCase())
        )
      }

      let response = {
        restaurants: filteredRestaurants,
        page: page,
        filters: filters,
        entries_per_page: restaurantsPerPage,
        total_results: filteredRestaurants.length,
        mock_data: true
      }
      res.json(response)
    }
  }
  static async apiGetRestaurantById(req, res, next) {
    try {
      let id = req.params.id || {}
      let restaurant = await RestaurantsDAO.getRestaurantByID(id)
      if (!restaurant) {
        res.status(404).json({ error: "Not found" })
        return
      }
      res.json(restaurant)
    } catch (e) {
      console.log(`api, ${e}`)
      res.status(500).json({ error: e })
    }
  }

  static async apiGetRestaurantCuisines(req, res, next) {
    try {
      let cuisines = await RestaurantsDAO.getCuisines()
      res.json(cuisines)
    } catch (e) {
      console.log("🔄 Database unavailable, using mock cuisines")
      res.json(mockCuisines)
    }
  }
}