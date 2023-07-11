import { dbContext } from "../db/DbContext.js"
import { BadRequest, Forbidden } from "../utils/Errors.js"

class HousesService {
    async getHouses() {
        const houses = await dbContext.Houses.find()

        return houses
    }

    async getHouseById(houseId) {
        const house = await dbContext.Houses.findById(houseId)

        if (!house) {
            throw new BadRequest(`${houseId} is an invalid ID or does not exist.`)
        }

        return house
    }

    async createHouse(houseData) {
        const house = await dbContext.Houses.create(houseData)

        return house
    }

    async updateHouse(houseId, houseData, userId) {
        const originalHouse = await this.getHouseById(houseId)

        if (originalHouse.creatorId.toString() != userId) {
            throw new Forbidden(`This item does NOT match its user's ID.`)
        }

        originalHouse.bedrooms = houseData.bedrooms || originalHouse.bedrooms

        originalHouse.bathrooms = houseData.bathrooms || originalHouse.bathrooms

        originalHouse.year = houseData.year || originalHouse.year

        originalHouse.price = houseData.price || originalHouse.price

        originalHouse.imgUrl = houseData.imgUrl || originalHouse.imgUrl

        originalHouse.description = houseData.description || originalHouse.description

        await originalHouse.save()

        return originalHouse
    }

    async removeHouse(houseId, userId) {
        const houseToDelete = await this.getHouseById(houseId)

        if (houseToDelete.creatorId != userId) {
            throw new Forbidden(`This item does NOT match its user's ID.`)
        }

        await houseToDelete.remove()
    }
}

export const housesService = new HousesService