function addTendidos() {
    map.on('load', () => {
        //lectura geojson
        map.addSource('tendidos', {
            type: 'geojson',
// Use a URL for the value for the `data` property.
            data: '/static/datos/Tendidos.geojson'
        });
        map.addLayer({
            'id': 'tendidos-layer',
            'type': 'line',
            'source': 'tendidos',
            'layout': {
                'line-join': 'round',
                'line-cap': 'round'
            },
            'paint': {
                'line-color': '#3b3',
                //'line-width': 4
                'line-width': ['interpolate', ['linear'], ['zoom'], 5, 0.5, 10, 3.5, 12, 9]

            }
        });
        map.setLayoutProperty('tendidos-layer','visibility', 'none');
    });
}

function addButtonTendidos() {

    // Insert before existing child:
    const botones = document.getElementById("botones");
    //botones.appendChild(btn);
    botones.innerHTML += "<div class=\"vc-toggle-container\">\n" +
        "   <div><span class=\"text\">Tendidos</span> <label class=\"vc-switch\">\n" +
        "        <input type=\"checkbox\" class=\"vc-switch-input\" id=\"tendidos\" onchange=\"tendidos();\">\n" +
        "        <span class=\"vc-switch-label\" data-on=\"Si\" data-off=\"No\"></span>\n" +
        "        <span class=\"vc-handle\"></span>\n" +
        "        </label>\n" +
        "       <div class=\"leyenda\"><img src=\"./static/img/tendidos.png\" width='24' height='24' alt='tendidos'> </div></div>\n"+
        "</div>";

}
function tendidos(){
    var isChecked = document.getElementById('tendidos').checked;
    if(isChecked){
        map.setLayoutProperty('tendidos-layer','visibility', 'visible');
    }else{
        map.setLayoutProperty('tendidos-layer','visibility', 'none');
    }

}