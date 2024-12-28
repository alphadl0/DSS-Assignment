document.addEventListener('DOMContentLoaded', () => {
    const map = L.map('map').setView([51.1657, 10.4515], 6); // Centered on Germany

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map);

    const locations = [
        { name: 'Wolfsburg', coords: [52.4227, 10.7865] },
        { name: 'Hanover', coords: [52.3759, 9.7320] },
        { name: 'Emden', coords: [53.3675, 7.2073] },
        { name: 'Baunatal (Kassel)', coords: [51.2513, 9.4075] },
        { name: 'Brunswick (Braunschweig)', coords: [52.2689, 10.5268] },
        { name: 'Zwickau', coords: [50.7189, 12.4939] },
        { name: 'Salzgitter', coords: [52.1521, 10.3608] },
        { name: 'Ingolstadt', coords: [48.7665, 11.4257] },
        { name: 'Mannheim', coords: [49.4875, 8.4660] },
        { name: 'Dresden', coords: [51.0504, 13.7373] }
    ];

    locations.forEach(location => {
        L.marker(location.coords).addTo(map)
            .bindPopup(`<b>${location.name}</b>`)
            .openPopup();
    });
});