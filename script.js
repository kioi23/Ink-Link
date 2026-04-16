// Select elements
const searchBtn = document.getElementById("searchBtn");
const results = document.getElementById("results");

// Mock data (temporary before API)
const artists = [
  {
    name: "Ink Master",
    style: "minimal",
    location: "Nairobi",
    rating: 4.5
  },
  {
    name: "Tribal King",
    style: "tribal",
    location: "Mombasa",
    rating: 4.0
  }
];

// Render function
function displayArtists(data) {
  results.innerHTML = ""; // clear previous results

  data.forEach(artist => {
    const card = document.createElement("div");
    card.className = "bg-gray-800 p-4 rounded";

    card.innerHTML = `
      <h3 class="text-lg font-bold">${artist.name}</h3>
      <p>${artist.style}</p>
      <p>${artist.location}</p>
      <p>⭐ ${artist.rating}</p>
    `;

    results.appendChild(card);
  });
}

// Event listener
searchBtn.addEventListener("click", () => {
  displayArtists(artists);
});



searchBtn.addEventListener("click", () => {
  const searchValue = document.getElementById("searchInput").value.toLowerCase();
  const styleValue = document.getElementById("styleFilter").value;

  const filtered = artists.filter(artist => {
    return (
      artist.name.toLowerCase().includes(searchValue) &&
      (styleValue === "" || artist.style === styleValue)
    );
  });

  displayArtists(filtered);
});

async function fetchArtists() {
  try {
    const response = await fetch("https://api.yelp.com/v3/businesses/search?term=tattoo&location=Nairobi", {
      headers: {
        Authorization: "Bearer YOUR_API_KEY"
      }
    });

    const data = await response.json();

    return data.businesses;
  } catch (error) {
    console.error("Error fetching data:", error);
  }
}


async function fetchImages() {
  const res = await fetch("https://api.unsplash.com/search/photos?query=tattoo&client_id=YOUR_KEY");
  const data = await res.json();

  displayImages(data.results);
}


function saveImage(url) {
  let saved = JSON.parse(localStorage.getItem("saved")) || [];
  saved.push(url);
  localStorage.setItem("saved", JSON.stringify(saved));
}

function analyzeReviews(reviews) {
  let summary = {
    clean: 0,
    professional: 0
  };

  reviews.forEach(r => {
    if (r.text.includes("clean")) summary.clean++;
    if (r.text.includes("professional")) summary.professional++;
  });

  return summary;
}

document.getElementById("bookingForm").addEventListener("submit", (e) => {
  e.preventDefault();
  alert("Booking request sent!");
});

<script
  src="https://maps.googleapis.com/maps/api/js?key=YOUR_API_KEY&callback=initMap"
  async defer>
</script>