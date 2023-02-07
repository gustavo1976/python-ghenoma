function addFerrocaril() {
    map.on('load', () => {
        //lectura geojson
        map.addSource('ferrocaril', {
            type: 'geojson',
// Use a URL for the value for the `data` property.
            data: '/static/datos/ferrocariles.geojson'
        });
        map.addLayer({
            'id': 'ferrocaril-layer',
            'type': 'line',
            'source': 'ferrocaril',
            'layout': {
                'line-join': 'round',
                'line-cap': 'round'
            },
            'paint': {
                'line-color': '#b33',
                //'line-width': 4
                'line-width': ['interpolate', ['linear'], ['zoom'], 5, 0.5, 10, 3.5, 12, 9]

            }
        });
    });
}

function addButtonFerrocaril() {

    // Insert before existing child:
    const botones = document.getElementById("botones");
    //botones.appendChild(btn);
    botones.innerHTML += "<div class=\"vc-toggle-container\">\n" +
        "   <div><span class=\"text\">Ferrocaril</span> <label class=\"vc-switch\">\n" +
        "        <input type=\"checkbox\" class=\"vc-switch-input\" id=\"ferrocaril\" onchange=\"ferrocaril();\" checked>\n" +
        "        <span class=\"vc-switch-label\" data-on=\"Si\" data-off=\"No\"></span>\n" +
        "        <span class=\"vc-handle\"></span>\n" +
        "        </label>\n" +
        "       <div class=\"leyenda\"><img src=\"./static/img/ferrocaril.png\" width='24' height='24' alt='ferrocaril'> </div></div>\n"+
        "</div>";

}
function ferrocaril(){
    var isChecked = document.getElementById('ferrocaril').checked;
    if(isChecked){
        map.setLayoutProperty('ferrocaril-layer','visibility', 'visible');
    }else{
        map.setLayoutProperty('ferrocaril-layer','visibility', 'none');
    }

}