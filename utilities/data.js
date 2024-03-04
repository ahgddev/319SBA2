// import {  } from "mongoose"

//Load up the database with basic information
let dogs = [{
    name: "Rover",
    breed: "Golden Retriever",
    type: "dog",
    age: 2,
    pen_number: 1,
    medication: ["none"],
    allergies: ["none"],
    pen_mate: ["Nari"],
    health_notes: {
        supplements: ["none"],
        is_sick: false,
        progress: "not sick"
    },
    last_updated: new Date()
},{
    name: "Nari",
    breed: "Pug",
    type: "dog",
    age: 1,
    pen_number: 1,
    medication: ["none"],
    allergies: ["Soy"],
    pen_mate: ["Rover"],
    health_notes: {
        supplements: ["none"],
        is_sick: false,
        progress: "not sick"
    },
    last_updated: new Date()
},{
    name: "Mello",
    breed: "Black Labrador",
    type: "dog",
    age: 1.5,
    pen_number: 2,
    medication: ["none"],
    allergies: ["none"],
    pen_mate: ["Belli"],
    health_notes: {
        supplements: ["none"],
        is_sick: true,
        diagnosis: "broken leg",
        progress: "healing",
        details: ["broke leg after falling"]
    },
    last_updated: new Date()
},{
    name: "Belli",
    breed: "Shiba",
    type: "dog",
    age: 1,
    pen_number: 2,
    medication: ["none"],
    allergies: ["Soy, Lamb"],
    pen_mate: ["Mello"],
    health_notes: {
        supplements: ["none"],
        is_sick: false,
        progress: "not sick"
    },
    last_updated: new Date()
},{
    name: "Galleria",
    breed: "Scottish Terrier",
    type: "dog",
    age: 10,
    pen_number: 3,
    medication: ["Advil, Tylenol"],
    allergies: ["none"],
    pen_mate: ["Megan"],
    health_notes: {
        supplements: ["none"],
        is_sick: false,
        progress: "not sick"
    },
    last_updated: new Date()
},{
    name: "Megan",
    breed: "Husky",
    type: "dog",
    age: 9,
    pen_number: 3,
    medication: ["none"],
    allergies: ["none"],
    pen_mate: ["Galleria"],
    health_notes: {
        supplements: ["none"],
        is_sick: false,
        progress: "not sick"
    },
    last_updated: new Date()
}]

let cats = [{
    name: "Lico Lico",
    breed: "Calico",
    type: "cat",
    age: 2.5,
    pen_number: 4,
    medication: ["none"],
    allergies: ["none"],
    pen_mate: ["Lily"],
    health_notes: {
        supplements: ["none"],
        is_sick: false,
        progress: "not sick"
    },
    last_updated: new Date()
},{
    name: "Lily",
    breed: "Calico",
    type: "cat",
    age: 2,
    pen_number: 4,
    medication: ["Dewormer"],
    allergies: ["Soy"],
    pen_mate: ["Lico Lico"],
    health_notes: {
        supplements: ["none"],
        is_sick: false,
        progress: "not sick"
    },
    last_updated: new Date()
},{
    name: "Gari-Gari",
    breed: "Scottish Fold",
    type: "cat",
    age: 1,
    pen_number: 5,
    medication: ["none"],
    allergies: ["none"],
    pen_mate: ["Baxter"],
    health_notes: {
        supplements: ["none"],
        is_sick: true,
        diagnosis: "fleas/ticks",
        progress: "healing",
        details: ["Fleas spotted. Treating with anti-flea medication and shampoo."]
    },
    last_updated: new Date()
    
},{
    name: "Baxter",
    breed: "Tabby",
    type: "cat",
    age: 1.3,
    pen_number: 5,
    medication: ["Dewormer, anti-tick medication, anti-flea medication"],
    allergies: ["none"],
    pen_mate: ["Gari-Gari"],
    health_notes: {
        supplements: ["none"],
        is_sick: true,
        diagnosis: "fleas/ticks",
        progress: "healing",
        details: ["Fleas spotted. Treating with anti-flea medication and shampoo."]
    },
    last_updated: new Date()
},{
    name: "Meg",
    breed: "Domestic Shorthair",
    type: "cat",
    age: 5,
    pen_number: 6,
    medication: ["none"],
    allergies: ["none"],
    pen_mate: ["May May"],
    health_notes: {
        supplements: ["none"],
        is_sick: false,
        progress: "not sick"
    },
    last_updated: new Date()
},{
    name: "May May",
    breed: "Calico",
    type: "cat",
    age: 7,
    pen_number: 6,
    medication: ["none"],
    allergies: ["none"],
    pen_mate: ["Meg"],
    health_notes: {
        supplements: ["none"],
        is_sick: true,
        diagnosis: "skin irritation",
        progress: "investigating",
        details: ["Excessive scratching of hind legs"]
    },
    last_updated: new Date()
}]

let others = [{
    name: "Toober",
    breed: "standard",
    type: "ferret",
    age: 2,
    pen_number: 15,
    medication: ["none"],
    allergies: ["none"],
    health_notes: {
        supplements: ["none"],
        is_sick: false,
        progress: "not sick"
    },
    last_updated: new Date()
}, {
    name: "Chatty",
    breed: "tropical",
    type: "parrot",
    age: 27,
    pen_number: 16,
    medication: ["Advil","Tylenol"],
    allergies: ["Soy"],
    health_notes: {
        supplements: ["none"],
        is_sick: false,
        progress: "not sick"
    },
    last_updated: new Date()
},{
    name: "Hoppy",
    breed: "lop",
    type: "rabbit",
    age: 4,
    pen_number: 17,
    medication: ["none"],
    allergies: ["none"],
    health_notes: {
        supplements: ["none"],
        is_sick: true,
        diagnosis: "stomach bug",
        progress: "investigating",
        details: ["vomitted food twice today"]
    },
    last_updated: new Date()
},{
    name: "Mocco",
    breed: "goldfish",
    type: "fish",
    age: .4,
    pen_number: 18,
    medication: ["none"],
    allergies: ["none"],
    health_notes: {
        supplements: ["B12"],
        is_sick: false,
        progress: "not sick"
    },
    last_updated: new Date()
},{
    name: "Mi-Mi",
    breed: "sy",
    type: "owl",
    age: 6,
    pen_number: 19,
    medication: ["none"],
    allergies: ["Carrots","Beans","Lettuce","Leafy Greens"],
    health_notes: {
        supplements: ["raw meat", "bone meal"],
        is_sick: false,
        progress: "not sick"
    },
    last_updated: new Date()
}]

module.exports = {dogs, cats, others};