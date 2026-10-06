// This is an automatically generated file. Please do not change its contents manually!
const { createEntityProxy } = require('./../_')
// service
const TravelService = { name: 'TravelService' }
module.exports = TravelService
module.exports.TravelService = TravelService
// TravelRequests
module.exports.TravelRequest = createEntityProxy(['TravelService', 'TravelRequests'], { target: { is_singular: true } })
module.exports.TravelRequests = createEntityProxy(['TravelService', 'TravelRequests'], { target: { is_singular: false }})
// Destinations
module.exports.Destination = createEntityProxy(['TravelService', 'Destinations'], { target: { is_singular: true } })
module.exports.Destinations = createEntityProxy(['TravelService', 'Destinations'], { target: { is_singular: false }})
// Employees
module.exports.Employee = createEntityProxy(['TravelService', 'Employees'], { target: { is_singular: true } })
module.exports.Employees = createEntityProxy(['TravelService', 'Employees'], { target: { is_singular: false }})
// ApprovalLogs
module.exports.ApprovalLog = createEntityProxy(['TravelService', 'ApprovalLogs'], { target: { is_singular: true } })
module.exports.ApprovalLogs = createEntityProxy(['TravelService', 'ApprovalLogs'], { target: { is_singular: false }})
// events
// actions
// enums
