const hotels = [
  {
    name: "AS Marina Blue",
    location: "Lisboa Centro",
    rating: 4.9,
    price: 218,
    trip: "Trabalho",
    description:
      "Quartos silenciosos, lounge executivo e acesso rapido aos principais bairros da cidade.",
    amenities: ["Pequeno-almoco", "Wi-Fi rapido", "Cowork"],
    image:
      "https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?auto=format&fit=crop&w=900&q=85",
  },
  {
    name: "AS Atlantic Suites",
    location: "Cascais",
    rating: 4.8,
    price: 296,
    trip: "Lazer",
    description:
      "Suites com varanda, vista para o mar e experiencias gastronomicas selecionadas.",
    amenities: ["Vista mar", "Piscina", "Spa"],
    image:
      "https://images.unsplash.com/photo-1582719508461-905c673771fd?auto=format&fit=crop&w=900&q=85",
  },
  {
    name: "AS Urban Garden",
    location: "Porto Baixa",
    rating: 4.7,
    price: 184,
    trip: "Todos",
    description:
      "Design contemporaneo, restaurante autoral e mobilidade facil para explorar a cidade.",
    amenities: ["Restaurante", "Pet friendly", "Metro perto"],
    image:
      "https://images.unsplash.com/photo-1445019980597-93fa8acb246c?auto=format&fit=crop&w=900&q=85",
  },
];

const hotelGrid = document.querySelector("#hotelGrid");
const priceRange = document.querySelector("#priceRange");
const priceValue = document.querySelector("#priceValue");
const sortHotels = document.querySelector("#sortHotels");
const tripButtons = document.querySelectorAll("[data-trip]");
const bookingForm = document.querySelector("#bookingForm");
const destination = document.querySelector("#destination");
const checkin = document.querySelector("#checkin");
const checkout = document.querySelector("#checkout");
const toast = document.querySelector("#toast");

let selectedTrip = "Todos";

function formatCurrency(value) {
  return new Intl.NumberFormat("pt-PT", {
    style: "currency",
    currency: "EUR",
    maximumFractionDigits: 0,
  }).format(value);
}

function setDefaultDates() {
  const start = new Date();
  start.setDate(start.getDate() + 7);

  const end = new Date(start);
  end.setDate(end.getDate() + 3);

  checkin.valueAsDate = start;
  checkout.valueAsDate = end;
}

function createHotelCard(hotel) {
  const article = document.createElement("article");
  article.className = "hotel-card";
  article.innerHTML = `
    <div class="hotel-photo" style="background-image: url('${hotel.image}')"></div>
    <div class="hotel-info">
      <div class="hotel-meta">
        <span class="rating"><i data-lucide="star"></i>${hotel.rating}</span>
        <span>${hotel.location}</span>
        <span>${hotel.trip}</span>
      </div>
      <h3>${hotel.name}</h3>
      <p>${hotel.description}</p>
      <div class="amenities">
        ${hotel.amenities.map((item) => `<span>${item}</span>`).join("")}
      </div>
    </div>
    <div class="hotel-booking">
      <div class="hotel-price">
        <strong>${formatCurrency(hotel.price)}</strong>
        <span>por noite</span>
      </div>
      <button class="primary-button" type="button" data-hotel="${hotel.name}">
        Reservar
      </button>
    </div>
  `;

  return article;
}

function renderHotels() {
  const maxPrice = Number(priceRange.value);
  const sortedHotels = [...hotels].sort((a, b) => {
    if (sortHotels.value === "price") return a.price - b.price;
    if (sortHotels.value === "rating") return b.rating - a.rating;
    return b.rating - a.rating || a.price - b.price;
  });

  const visibleHotels = sortedHotels.filter((hotel) => {
    const matchesPrice = hotel.price <= maxPrice;
    const matchesTrip =
      selectedTrip === "Todos" || hotel.trip === selectedTrip || hotel.trip === "Todos";
    return matchesPrice && matchesTrip;
  });

  hotelGrid.innerHTML = "";
  visibleHotels.forEach((hotel) => hotelGrid.appendChild(createHotelCard(hotel)));

  if (!visibleHotels.length) {
    hotelGrid.innerHTML = `
      <div class="hotel-card">
        <div class="hotel-info">
          <h3>Nenhum hotel encontrado</h3>
          <p>Ajuste o limite de preco ou o tipo de viagem para ver mais opcoes.</p>
        </div>
      </div>
    `;
  }

  refreshIcons();
}

function refreshIcons() {
  if (window.lucide) {
    lucide.createIcons();
  }
}

function showToast(message) {
  toast.textContent = message;
  toast.classList.add("show");
  window.setTimeout(() => toast.classList.remove("show"), 2600);
}

priceRange.addEventListener("input", () => {
  priceValue.textContent = `ate ${formatCurrency(Number(priceRange.value))}`;
  renderHotels();
});

sortHotels.addEventListener("change", renderHotels);

tripButtons.forEach((button) => {
  button.addEventListener("click", () => {
    tripButtons.forEach((item) => item.classList.remove("active"));
    button.classList.add("active");
    selectedTrip = button.dataset.trip;
    renderHotels();
  });
});

hotelGrid.addEventListener("click", (event) => {
  const button = event.target.closest("[data-hotel]");
  if (!button) return;
  showToast(`${button.dataset.hotel} selecionado para reserva`);
});

bookingForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const place = destination.value.trim() || "o destino escolhido";
  showToast(`Busca atualizada para ${place}`);
});

setDefaultDates();
priceValue.textContent = `ate ${formatCurrency(Number(priceRange.value))}`;
renderHotels();
refreshIcons();
