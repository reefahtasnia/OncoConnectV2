// MongoDB Playground
// Use Ctrl+Space inside a snippet or a string literal to trigger completions.

// The current database to use.
use("OncoConnect");

db.Users.drop();

db.createCollection("Users", {
    validator: {
        $jsonSchema: {
            bsonType: "object",
            required: ["firstName", "lastName", "email", "passwordHash", "userType", "gender", "dateOfBirth", "phone"],
            properties: {
                firstName: {
                    bsonType: "string",
                    description: "User's first name"
                },
                lastName: {
                    bsonType: "string",
                    description: "User's last name"
                }, 
                email: {
                    bsonType: "string",
                    pattern: "^.+@.+$",
                    description: "Must be a valid email, required, unique."
                },
                password: {
                    bsonType: "string",
                    description: "User's password, required."
                },
                userType: {
                    bsonType: "string",
                    enum: ["patient", "doctor", "admin"],
                    description: "Defines the type of user., required."
                },
                gender: {
                    bsonType: "string",
                    enum: ["Male", "Female"],
                    description: "User's gender"
                },
                dateOfBirth: {
                    bsonType: "date",
                    description: "User's birth date"
                },
                phone: {
                    bsonType: "string",
                    description: "User's phone number, unique."
                },
                profilePicture: {
                    bsonType: "string",
                    description: "Profile picture URL."
                },
                address: {
                    bsonType: "object",
                    properties: {
                        houseno: { bsonType: "string" },
                        roadno: { bsonType: "string" },
                        city: { bsonType: "string" },
                        region: { bsonType: "string" },
                        country: { bsonType: "string" }
                    },
                    description: "User's address, optional."
                },
                treatmentStatus: {
                    bsonType: "string",
                    enum: ["ongoing", "completed", "diagnosed not treated"],
                    description: "Defines the treatment status of the user."
                },
                emergencyContact: {
                    bsonType: "object",
                    properties: {
                        name: { bsonType: "string" },
                        phone: { bsonType: "string" },
                        email: { bsonType: "string" }
                    },
                    description: "Emergency contact details"
                },
                aboutMe: {
                    bsonType: "string",
                    description: "User's bio"
                },
                createdAt: {
                    bsonType: "date",
                    description: "Auto-generated timestamp."
                },
                updatedAt: {
                    bsonType: "date",
                    description: "Auto-updated timestamp."
                }
            }
        }
    }
});

db.Users.insertOne({
    firstName: "John",
    lastName: "Doe",
    email: "johndoe@example.com",
    passwordHash: "hashed_password_here",
    userType: "patient",
    gender: "Male",
    dateOfBirth: new Date("1990-05-15"),
    phone: "+1234567890",
    profilePicture: "https://example.com/profile.jpg",
    address: {
        houseno: "123",
        roadno: "45A",
        city: "New York",
        region: "NY",
        country: "USA"
    },
    treatmentStatus: "ongoing",
    emergencyContact: {
        name: "Jane Doe",
        phone: "+9876543210",
        email: "janedoe@example.com"
    },
    aboutMe: "A passionate patient advocate.",
    createdAt: new Date(),
    updatedAt: new Date()
});

db.Users.find().pretty();
