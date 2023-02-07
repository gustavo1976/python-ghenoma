function addAgua() {
    map.on('load', () => {
        //lectura geojson
        map.addSource('rios', {
            type: 'geojson',
// Use a URL for the value for the `data` property.
            data: '/static/datos/water_rivers.geojson'
        });
        map.addLayer({
            'id': 'rios-layer',
            'type': 'line',
            'source': 'rios',
            'layout': {
                'line-join': 'round',
                'line-cap': 'round'
            },
            //"filter": ["!=", "nombre", ""],
            'paint': {
                'line-color': '#33a',
                //'line-width': 4
                'line-width': ['interpolate', ['linear'], ['zoom'], 5, 0.5, 10, 4, 12, 9]

            }
        });
        ///masas de agua
        map.addSource('masas', {
            type: 'geojson',
// Use a URL for the value for the `data` property.
            data: '/static/datos/water_areas.geojson'
        });
        map.addLayer({
            'id': 'masas-layer',
            'type': 'line',
            'source': 'masas',
            'layout': {
                'line-join': 'round',
                'line-cap': 'round'
            },
            //"filter": ["!=", "nombre", ""],
            'paint': {
                'line-color': '#33a',
                //'line-width': 4
                'line-width': ['interpolate', ['linear'], ['zoom'], 5, 0.5, 10, 4, 12, 9]

            }
        });
        map.setLayoutProperty('rios-layer','visibility', 'none');
        map.setLayoutProperty('masas-layer','visibility', 'none');
    });
}

function addButtonAgua() {

    // Insert before existing child:
    const botones = document.getElementById("botones");

    botones.innerHTML += "<div class=\"vc-toggle-container\">\n" +
        "   <div><span class=\"text\">Rios</span><label class=\"vc-switch\">\n" +
        "        <input type=\"checkbox\" class=\"vc-switch-input\" id=\"rios\" onchange=\"agua();\" >\n" +
        "        <span class=\"vc-switch-label\" data-on=\"Si\" data-off=\"No\"></span>\n" +
        "        <span class=\"vc-handle\"></span>\n" +
        "        </label>\n" +
        "       <div class=\"leyenda\"><img src=\"./static/img/rios.png\" width='24' height='24' alt='rios'> </div></div>\n"+
        "</div>";

    botones.innerHTML += "<div class=\"vc-toggle-container\">\n" +
        "   <div><span class=\"text\">Pantanos</span><label class=\"vc-switch\">\n" +
        "        <input type=\"checkbox\" class=\"vc-switch-input\" id=\"masas\" onchange=\"agua();\" >\n" +
        "        <span class=\"vc-switch-label\" data-on=\"Si\" data-off=\"No\"></span>\n" +
        "        <span class=\"vc-handle\"></span>\n" +
        "        </label>\n" +
        "       <div class=\"leyenda\"><img src=\"./static/img/masa.png\" width='24' height='24' alt='pantanos'> </div></div>\n"+        "</div>";

}
function agua(){
    var isChecked = document.getElementById('rios').checked;
    if(isChecked){
        map.setLayoutProperty('rios-layer','visibility', 'visible');
    }else{
        map.setLayoutProperty('rios-layer','visibility', 'none');
    }

    var isChecked = document.getElementById('masas').checked;
    if(isChecked){
        map.setLayoutProperty('masas-layer','visibility', 'visible');
    }else{
        map.setLayoutProperty('masas-layer','visibility', 'none');
    }

}