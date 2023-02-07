function addGaseoductos() {
    map.on('load', () => {
        //lectura geojson
        map.addSource('gaseoductos', {
            type: 'geojson',
// Use a URL for the value for the `data` property.
            data: '/static/datos/gaseoductos.geojson'
        });
        map.addLayer({
            'id': 'gaseoductos-layer',
            'type': 'line',
            'source': 'gaseoductos',
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

function addButtonGaseoductos() {

    // Insert before existing child:
    const botones = document.getElementById("botones");
    //botones.appendChild(btn);
    botones.innerHTML += "<div class=\"vc-toggle-container\">\n" +
        "   <div><span class=\"text\">Gaseoductos</span> <label class=\"vc-switch\">\n" +
        "        <input type=\"checkbox\" class=\"vc-switch-input\" id=\"ferrocaril\" onchange=\"gaseoductos();\" checked>\n" +
        "        <span class=\"vc-switch-label\" data-on=\"Si\" data-off=\"No\"></span>\n" +
        "        <span class=\"vc-handle\"></span>\n" +
                "        </label>\n" +
        "       <div class=\"leyenda\"><img src=\"./static/img/gas.png\" width='24' height='24' alt='gas'> </div></div>\n"+

        "</div>";

}
function gaseoductos(){
    var isChecked = document.getElementById('gaseoductos').checked;
    if(isChecked){
        map.setLayoutProperty('gaseoductos-layer','visibility', 'visible');
    }else{
        map.setLayoutProperty('gaseoductos-layer','visibility', 'none');
    }

}