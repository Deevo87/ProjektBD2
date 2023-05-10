const MongoClient = require('mongodb').MongoClient;
const uri = "mongodb://admin:admin@localhost:27017";

console.log("Attempting to connect to MongoDB");

(async () => {
    let client;
    try {
        client = await MongoClient.connect(uri, {useNewUrlParser: true, useUnifiedTopology: true});

        console.log("Connected to MongoDB");

        const db = client.db("db_project");
        console.log("Creating collections...");

        // Clients collection
        await db.createCollection("Clients", {
            validator: {
                $jsonSchema: {
                    bsonType: "object",
                    required: [
                        "userId",
                        "firstName",
                        "lastName",
                        "datOfBirth",
                        "email",
                        "phone",
                        "address",
                        "registerDate",
                    ],
                    properties: {
                        userId: { bsonType: "int" },
                        firstName: { bsonType: "string" },
                        lastName: { bsonType: "string" },
                        datOfBirth: { bsonType: "date" },
                        email: { bsonType: "string" },
                        phone: { bsonType: "string" },
                        address: { bsonType: "string" },
                        registerDate: { bsonType: "date" },
                        reservations: {
                            bsonType: "array",
                            items: {
                                bsonType: "object",
                                required: [
                                    "reservationId",
                                    "reservationStatus",
                                    "peopleCount",
                                    "startDate",
                                    "endDate",
                                    "games",
                                    "tables"
                                ],
                                properties: {
                                    reservationId: { bsonType: "int" },
                                    reservationStatus: { bsonType: "string" },
                                    peopleCount: { bsonType: "int" },
                                    startDate: { bsonType: "date" },
                                    endDate: { bsonType: "date" },
                                    games: {
                                        bsonType: "array",
                                        items: {
                                            bsonType: "object",
                                            required: [
                                                "gameId",
                                                "gameType",
                                                "capacity",
                                                "pricePerHour",
                                                "tables"
                                            ],
                                            properties: {
                                                gameId: { bsonType: "int" },
                                                gameType: { bsonType: "string" },
                                                capacity: { bsonType: "int" },
                                                pricePerHour: { bsonType: "string" },
                                                tables: {
                                                    bsonType: "array",
                                                    items: {
                                                        bsonType: "object",
                                                        required: [
                                                            "tableId",
                                                            "capacity"
                                                        ],
                                                        properties: {
                                                            tableId: { bsonType: "int" },
                                                            capacity: { bsonType: "int" },
                                                        }
                                                    }
                                                }
                                            }
                                        }
                                    },
                                    orders: {
                                        bsonType: "array",
                                        items: {
                                            bsonType: "object",
                                            required: [
                                                "orderId",
                                                "dishes",
                                                "orderDate",
                                                "finalPrice"
                                            ],
                                            properties: {
                                                orderId: { bsonType: "int" },
                                                dishes: {
                                                    bsonType: "array",
                                                    items: { bsonType: "int" }
                                                },
                                                orderDate: { bsonType: "date" },
                                                finalPrice: { bsonType: "string" },
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            }
        });

        // Employees collection
        await db.createCollection("Employees", {
            validator: {
                $jsonSchema: {
                    bsonType: "object",
                    required: [
                        "employeeId",
                        "employeeType",
                        "firstName",
                        "lastName",
                        "datOfBirth",
                        "email",
                        "phone",
                        "registerDate",
                    ],
                    properties: {
                        employeeId: {bsonType: "int"},
                        employeeType: {bsonType: "string"},
                        firstName: {bsonType: "string"},
                        lastName: {bsonType: "string"},
                        datOfBirth: {bsonType: "date"},
                        email: {bsonType: "string"},
                        phone: {bsonType: "string"},
                        registerDate: {bsonType: "date"},
                    },
                },
            },
        });



        // Games collection
        await db.createCollection("Games", {
            validator: {
                $jsonSchema: {
                    bsonType: "object",
                    required: ["gameId", "gameType", "capacity", "pricePerHour"],
                    properties: {
                        gameId: {bsonType: "int"},
                        gameType: {bsonType: "string"},
                        capacity: {bsonType: "int"},
                        pricePerHour: {bsonType: "string"},
                        tables: {
                            bsonType: "array",
                            items: {
                                bsonType: "object",
                                required: [
                                    "tableId",
                                    "capacity"
                                ],
                                properties: {
                                    tableId: { bsonType: "int" },
                                    capacity: { bsonType: "int" },
                                }
                            }
                        }
                    },
                },
            },
        });


        // Menu collection
        await db.createCollection("Menu", {
            validator: {
                $jsonSchema: {
                    bsonType: "object",
                    required: ["dishId", "dishType", "description", "dishPrice"],
                    properties: {
                        dishId: {bsonType: "int"},
                        dishType: {bsonType: "string"},
                        description: {bsonType: "string"},
                        dishPrice: {bsonType: "string"},
                    },
                },
            },
        });

        console.log("Collections created!");
    } catch (err) {
        console.error('An error occurred connecting to MongoDB: ', err);
    } finally {
        if (client) {
            await client.close();
            console.log("Connection to MongoDB closed");
        }
    }
})();
