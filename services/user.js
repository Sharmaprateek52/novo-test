/**
 * 
 * @param {*} model 
 * @param {*} coordinates 
 * @param {*} returnFields 
 * @param {*} sortBy 
 * @param {number} distance 
 * @returns {Promise<any>}
 */
const findByLocation = (model, coordinates, returnFields, sortBy, distance) => {
    return model.aggregate([
        {
            $geoNear: {
                near: { type: "Point", coordinates: coordinates },
                distanceField: "dist.calculated",
                maxDistance: parseInt(distance),
                distanceMultiplier: 0.001,
                includeLocs: "dist.location",
                spherical: true
            }
        },
        { $project: returnFields },
        { $sort: sortBy }
    ])
}
module.exports = findByLocation