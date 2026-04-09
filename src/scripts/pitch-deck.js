/* Pitch Deck Logic */

const rubrosIcons = {
    almacen: 'bi-shop',
    ferreteria: 'bi-tools',
    peluqueria: 'bi-scissors',
    kiosco: 'bi-basket'
};

const pitchData = {
    almacen: {
        name: "Almacén",
        dolor: "El cuadernito de precios desactualizado y el stock que se pierde constantemente.",
        recomendado: {
            nombre: "Sistema de Gestión",
            alta: "$160.000",
            mes: "$18.000",
            argumento: "Cuesta menos que lo que perdés en 3 docenas de empanadas por mes."
        },
        ticket: "$178.000",
        upsells: [
            {
                nombre: "Catálogo WhatsApp Business",
                alta: "$85.000",
                mes: "$12.000",
                razon: "Permite recibir pedidos automáticos sin que el cliente tenga que ir al local."
            }
        ]
    },
    ferreteria: {
        name: "Ferretería",
        dolor: "Catálogo infinito, los precios cambian a diario y los clientes llaman para preguntar lo mismo.",
        recomendado: {
            nombre: "Catálogo Interactivo",
            alta: "$185.000",
            mes: "$12.000",
            argumento: "Libera el 60% de tu tiempo en llamadas para que te enfoques en vender."
        },
        ticket: "$197.000",
        upsells: [
            {
                nombre: "Sistema de Control de Stock",
                alta: "$60.000",
                mes: "$18.000",
                razon: "Ideal para cuando el catálogo ya funciona y necesitan orden interno."
            },
            {
                nombre: "Posicionamiento Web",
                alta: "$150.000",
                mes: "$12.000",
                razon: "Para que aparezcan primero cuando alguien busca 'ferretería zona sur'."
            }
        ]
    },
    peluqueria: {
        name: "Peluquería / Estética",
        dolor: "El teléfono no deja de sonar mientras trabajás y los turnos se pisan o se olvidan.",
        recomendado: {
            nombre: "Web Presencial + Turnos",
            alta: "$150.000",
            mes: "$12.000",
            argumento: "Recuperás la inversión con solo 3 turnos que antes perdías por no atender el chat."
        },
        ticket: "$162.000",
        upsells: [
            {
                nombre: "E-commerce de Productos",
                alta: "$285.000",
                mes: "$22.000",
                razon: "Para vender cremas/insumos sin necesidad de que el cliente pase por el local."
            }
        ]
    },
    kiosco: {
        name: "Kiosco / Drugstore",
        dolor: "Pedidos de delivery desorganizados y clientes que no conocen todas tus ofertas semanales.",
        recomendado: {
            nombre: "Mini-Tienda Online",
            alta: "$185.000",
            mes: "$12.000",
            argumento: "Es más barato que contratar un empleado para responder el WhatsApp."
        },
        ticket: "$197.000",
        upsells: []
    }
};

export function initPitchDeck() {
    const homeView = document.getElementById('pdHomeView');
    const detailView = document.getElementById('pdDetailView');
    const btnBack = document.getElementById('pdBtnBack');

    if (!homeView || !detailView) return;

    // Delegate click for rubro cards
    homeView.addEventListener('click', (e) => {
        const card = e.target.closest('.rubro-card');
        if (card) {
            const rubroKey = card.dataset.rubro;
            showDetail(rubroKey);
        }
    });

    btnBack?.addEventListener('click', () => {
        goHome();
    });

    function showDetail(rubroKey) {
        const info = pitchData[rubroKey];
        if (!info) return;

        // Content update
        const rubroTitle = document.getElementById('pdRubroTitle');
        if (rubroTitle) rubroTitle.innerHTML = `<i class="bi ${rubrosIcons[rubroKey]} text-primary"></i> ${info.name}`;
        
        document.getElementById('pdDolorText').textContent = info.dolor;
        document.getElementById('pdRecProducto').textContent = info.recomendado.nombre;
        document.getElementById('pdRecAlta').textContent = info.recomendado.alta;
        document.getElementById('pdRecMes').textContent = info.recomendado.mes;
        document.getElementById('pdRecArgumento').textContent = info.recomendado.argumento;
        document.getElementById('pdTicketAmount').textContent = info.ticket;

        const upsellsList = document.getElementById('pdUpsellsList');
        upsellsList.innerHTML = '';
        
        if (info.upsells.length > 0) {
            info.upsells.forEach(up => {
                const div = document.createElement('div');
                div.className = 'upsell-item fade-in';
                div.innerHTML = `
                    <i class="bi bi-plus-circle-fill"></i>
                    <div>
                        <p class="fw-bold mb-1">${up.nombre}</p>
                        <p class="small text-muted mb-1">Costo: ${up.alta} + ${up.mes}/mes</p>
                        <p class="small fst-italic mb-0 text-secondary">${up.razon}</p>
                    </div>
                `;
                upsellsList.appendChild(div);
            });
            document.getElementById('pdUpSection').classList.remove('hidden');
        } else {
            document.getElementById('pdUpSection').classList.add('hidden');
        }

        // View switch
        homeView.classList.add('hidden');
        detailView.classList.remove('hidden');
        detailView.classList.add('fade-in');
        btnBack?.classList.remove('hidden');
        
        // Scroll to top of modal container
        const modalContainer = homeView.closest('.modal-container');
        if (modalContainer) modalContainer.scrollTop = 0;
    }

    function goHome() {
        detailView.classList.add('hidden');
        homeView.classList.remove('hidden');
        homeView.classList.add('fade-in');
        btnBack?.classList.add('hidden');
    }

    // Reset view when modal closes
    const pitchModal = document.getElementById('pitchDeckModal');
    if (pitchModal) {
        const observer = new MutationObserver((mutations) => {
            mutations.forEach((mutation) => {
                if (mutation.attributeName === 'class' && !pitchModal.classList.contains('is-open')) {
                    goHome();
                }
            });
        });
        observer.observe(pitchModal, { attributes: true });
    }
}
