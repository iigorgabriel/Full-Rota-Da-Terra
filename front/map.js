function initMap() {
    var recife = { lat: -8.0476, lng: -34.8770 }; // Coordenadas de Recife, PE
    var map = new google.maps.Map(document.getElementById('map'), {
        zoom: 13,
        center: recife
    });

    var feiras = [
        {lat: -8.0525, lng: -34.9210, title: 'Feira Orgânica do Derby'},
        {lat: -8.0522, lng: -34.8996, title: 'Feira Orgânica do Espinheiro'},
        {lat: -8.0680, lng: -34.8864, title: 'Feira Orgânica de Boa Viagem'},
        {lat: -8.0315, lng: -34.9577, title: 'Feira Orgânica do Parnamirim'},
        {lat: -8.0412, lng: -34.8708, title: 'Feira Orgânica do Recife Antigo'}
    ];

    feiras.forEach(function(feira) {
        var marker = new google.maps.Marker({
            position: {lat: feira.lat, lng: feira.lng},
            map: map,
            title: feira.title
        });

        var infowindow = new google.maps.InfoWindow({
            content: feira.title
        });

        marker.addListener('click', function() {
            infowindow.open(map, marker);
        });
    });
}
