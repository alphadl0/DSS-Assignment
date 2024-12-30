document.addEventListener('DOMContentLoaded', () => {
    const map = L.map('map').setView([51.1657, 10.4515], 6); // Centered on Germany

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map);

    // Define a red marker icon
    const redIcon = L.icon({
        iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-red.png', // Correct URL for red marker
        iconSize: [25, 41], // Size of the icon
        iconAnchor: [12, 41], // Anchor point of the icon
        popupAnchor: [1, -34], // Point from which the popup opens relative to the iconAnchor
        shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
        shadowSize: [41, 41] // Size of the shadow
    });

    // Define a blue marker icon
    const blueIcon = L.icon({
        iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-blue.png', // Correct URL for blue marker
        iconSize: [25, 41], // Size of the icon
        iconAnchor: [12, 41], // Anchor point of the icon
        popupAnchor: [1, -34], // Point from which the popup opens relative to the iconAnchor
        shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
        shadowSize: [41, 41] // Size of the shadow
    });

    const locations = [
        { name: 'Wolfsburg', coords: [52.4227, 10.7865], isRed: true },
        { name: 'Hanover', coords: [52.3759, 9.7320], isRed: true },
        { name: 'Emden', coords: [53.3675, 7.2073], isRed: true },
        { name: 'Baunatal (Kassel)', coords: [51.2513, 9.4075], isRed: false },
        { name: 'Brunswick (Braunschweig)', coords: [52.2689, 10.5268], isRed: false },
        { name: 'Zwickau', coords: [50.7189, 12.4939], isRed: true },
        { name: 'Salzgitter', coords: [52.1521, 10.3608], isRed: false },
        { name: 'Ingolstadt', coords: [48.7665, 11.4257], isRed: false },
        { name: 'Mannheim', coords: [49.4875, 8.4660], isRed: false },
        { name: 'Dresden', coords: [51.0504, 13.7373], isRed: true }
    ];

    locations.forEach(location => {
        const markerIcon = location.isRed ? redIcon : blueIcon;
        L.marker(location.coords, { icon: markerIcon }).addTo(map)
            .bindPopup(location.name);
    });
});