// Basic commands
use appdb

show dbs

db.createCollection("users")

// Insert commands
db.users.insertOne({ name: "John" })
db.users.insertOne({ name: "Sally", age: 19, address: { street: "987 North St" }, hobbies: ["Running"] })

db.users.insertMany([{ name: "Jill" }, { name: "Mike" }])
db.users.insertMany([{ name: "Kyle", age: 26, hobbies: ["Weight Lifting", "Bowling"], address: { street: "123 Main St", city: "New York City"} }, { name: "Billy", age: 41, hobbies: ["Swimming", "Bowling"], address: { street: "442 South St", city: "New York City"} }])

db.users.find()

// Basic query commands
db.users.find().limit(2)
db.users.find().sort({ name: 1 }).limit(2)
db.users.find().sort({ name: -1 }).limit(2)
db.users.find().sort({ age: -1, name: -1 }).limit(2)

db.users.find().skip(1).limit(2)

db.users.find({ name: "Kyle" })
db.users.find({ age: 26 })
db.users.find({ name: "Kyle" }, { name: 1, age: 1 })
db.users.find({ name: "Kyle" }, { name: 1, age: 1, _id: 0 })
db.users.find({ name: "Kyle" }, { age: 0 })

// Complex query commands
db.users.find({ name: { $eq: "Sally" } }) // ===
db.users.find({ name: { $ne: "Sally" } }) // !==

db.users.find({ age: { $gt: 13 } }) // age > 13
db.users.find({ age: { $gte: 41 } }) // age >= 41
db.users.find({ age: { $lt: 41 } }) // age < 41
db.users.find({ age: { $lte: 41 } }) // age <= 41
db.users.find({ age: { $gte: 20, $lte: 40 } }) // age >= 20 && age <= 40
db.users.find({ age: { $gte: 20, $lte: 40 }, name: "Kyle" })

db.users.find({ name: { $in: ["Kyle", "Sally"] } })
db.users.find({ name: { $nin: ["Kyle", "Sally"] } })

db.users.find({ age: { $exists: true } })
db.users.find({ age: { $exists: false } })

db.users.insertOne({ age: null, name: "Bill" })

db.users.find({ $and: [{ age: 26 }, { name: "Kyle" }] })
db.users.find({ $or: [{ age: { $lte: 20 } }, { name: "Kyle" }] })

db.users.find({ age: { $not: { $lte: 20 } } })

db.users.insertMany([{ name: "Tom", balance: 100, debt: 200 }, { name: "Kristin", balance: 20, debt: 0 }])

db.users.find({ $expr: { $gt: ["debt", "balance"]} })

db.users.find({ $expr: { $gt: ["$debt", "$balance"]} })

db.users.find({ "address.street": "123 Main St" })

db.users.countDocuments({ age: { $lte: 40 } }) // 2

// Update commands
db.users.updateOne({ age: 26 }, { $set: { age: 27 } })
db.users.updateOne({ name: "John" }, { $set: { name: "Karen" } })

db.users.findOne({ name: "Karen" })
db.users.updateOne({ name: "Sally" }, { $inc: { age: 1 } }) // 19 + 1 = 20

db.users.updateOne({ name: "Sally" }, { $rename: { name: "firstname" } })
db.users.findOne({ firstname: "Sally" })

db.users.updateOne({ name: "Sally" }, { $unset: { age: "" } }) 

db.users.updateOne({ name: "Sally" }, { $push: { hobbies: "Swimming" } }) 

db.users.updateOne({ name: "Sally" }, { $pull: { hobbies: "Running" } }) 

db.users.updateMany({ address: { $exists: true } }, { $unset: { address: "" } })

db.users.replaceOne({ age: 19 }, { name: "Sally" })

// Delete commands
db.users.deleteOne({ name: "John" })

db.users.deleteMany({ age: { $exists: true } })
