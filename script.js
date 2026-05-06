let currentSelectedDesign = null;

const legoIdeas = {
    gamer: {
        title: "Aesthetic Gamer Room",
        images: [
            "images/gamer1.jpeg",
            "images/gamer2.jpeg",
            "images/gamer3.jpeg"
        ],
        descriptions: [
            "A custom LEGO gamer room with RGB lights, dual monitors, a gaming chair, and colorful wall decorations.",
            "A cozy LEGO gaming setup with a computer desk, headphones, console, and neon-style details.",
            "A modern LEGO gamer room designed with shelves, posters, LED lights, and a stylish gaming corner."
        ],
        theme: "Gaming / Digital Lifestyle",
        colors: "Black, Purple, Blue",
        story: "A young gamer creates their dream room where creativity, games, and technology come together.",
        price: "$69.99"
    },

    cyberpunk: {
        title: "Cyberpunk Future City",
        images: [
            "images/cyberpunk1.jpeg",
            "images/cyberpunk2.jpeg",
            "images/cyberpunk3.jpeg"
        ],
        descriptions: [
            "A futuristic LEGO cyberpunk city with neon signs, flying vehicles, tall buildings, and glowing streets.",
            "A dark LEGO future city filled with high-tech towers, robots, and colorful cyberpunk lighting.",
            "A LEGO cyberpunk street scene with futuristic shops, hologram signs, and modern city details."
        ],
        theme: "Futuristic City",
        colors: "Black, Neon Pink, Cyan",
        story: "In a high-tech future city, builders create their own digital world full of adventure and imagination.",
        price: "$129.99"
    },

    studio: {
        title: "Dream Artist Studio",
        images: [
            "images/studio1.jpeg",
            "images/studio2.jpeg",
            "images/studio3.jpeg"
        ],
        descriptions: [
            "A colorful LEGO artist studio with paintings, brushes, a desk, shelves, and creative decorations.",
            "A cozy LEGO art room where an artist designs new ideas with colorful bricks and tools.",
            "A modern LEGO creative studio with a canvas, art supplies, plants, and bright natural light."
        ],
        theme: "Art / Creativity",
        colors: "White, Yellow, Pink",
        story: "An artist builds a creative studio where every brick becomes a new idea.",
        price: "$59.99"
    },

    castle: {
        title: "Fantasy Wizard Castle",
        images: [
            "images/castle1.jpeg",
            "images/castle2.jpeg",
            "images/castle3.jpeg"
        ],
        descriptions: [
            "A magical LEGO wizard castle with tall towers, glowing windows, bridges, and fantasy details.",
            "A mysterious LEGO castle filled with magic rooms, potions, flags, and hidden stories.",
            "A fantasy LEGO castle designed with purple roofs, stone walls, and wizard-themed decorations."
        ],
        theme: "Fantasy Adventure",
        colors: "Purple, Gray, Gold",
        story: "Inside the wizard castle, every builder discovers a magical world made from imagination.",
        price: "$119.99"
    },

    space: {
        title: "Space Explorer Base",
        images: [
            "images/space1.jpeg",
            "images/space2.jpeg",
            "images/space3.jpeg"
        ],
        descriptions: [
            "A LEGO space explorer base with rockets, astronauts, satellite dishes, and moon surface details.",
            "A futuristic LEGO space station built for exploration, science, and interplanetary missions.",
            "A colorful LEGO moon base with research rooms, vehicles, landing pads, and space equipment."
        ],
        theme: "Space Exploration",
        colors: "White, Blue, Orange",
        story: "A team of explorers builds a space base to discover new planets and create new adventures.",
        price: "$99.99"
    }
};

const remainingIndexes = {};

function resetIndexes(ideaKey) {
    remainingIndexes[ideaKey] = [];

    for (let i = 0; i < legoIdeas[ideaKey].images.length; i++) {
        remainingIndexes[ideaKey].push(i);
    }
}

function getUniqueRandomIndex(ideaKey) {
    if (!remainingIndexes[ideaKey] || remainingIndexes[ideaKey].length === 0) {
        resetIndexes(ideaKey);
    }

    const randomPosition = Math.floor(Math.random() * remainingIndexes[ideaKey].length);
    const selectedIndex = remainingIndexes[ideaKey][randomPosition];

    remainingIndexes[ideaKey].splice(randomPosition, 1);

    return selectedIndex;
}

function generatePreview() {
    const selectedIdea = document.getElementById("ideaSelect").value;

    if (selectedIdea === "") {
        alert("Please select a LEGO idea first.");
        return;
    }

    const idea = legoIdeas[selectedIdea];

    if (!idea) {
        alert("This LEGO idea is not defined in script.js.");
        return;
    }

    const selectedIndex = getUniqueRandomIndex(selectedIdea);

    document.getElementById("resultTitle").textContent = idea.title;
    document.getElementById("description").textContent = idea.descriptions[selectedIndex];
    document.getElementById("theme").textContent = idea.theme;
    document.getElementById("colors").textContent = idea.colors;
    document.getElementById("story").textContent = idea.story;
    document.getElementById("variation").textContent =
        "Variation " + (selectedIndex + 1) + " of " + idea.images.length;

    const image = document.getElementById("previewImage");
    const placeholder = document.getElementById("placeholderText");

    image.src = idea.images[selectedIndex];
    image.style.display = "block";
    placeholder.style.display = "none";

    image.onerror = function () {
        image.style.display = "none";
        placeholder.style.display = "block";
        placeholder.textContent =
            "Image not found. Add " + idea.images[selectedIndex] + " to your images folder.";
    };

    currentSelectedDesign = {
        title: idea.title,
        theme: idea.theme,
        colors: idea.colors,
        price: idea.price,
        description: idea.descriptions[selectedIndex],
        image: idea.images[selectedIndex],
        variation: "Variation " + (selectedIndex + 1) + " of " + idea.images.length
    };

    document.getElementById("orderButton").style.display = "block";
}

function goToOrderPage() {
    if (!currentSelectedDesign) {
        alert("Please generate a LEGO preview first.");
        return;
    }

    localStorage.setItem("customLegoOrder", JSON.stringify(currentSelectedDesign));
    window.location.href = "order.html";
}