function addLayer(imagen,nombre_imagen,nombre_source, nombre_capa, nombre_json){
    map.loadImage(
        imagen,
        (error, image) => {
            if (error) throw error;

// Add the image to the map style.
            map.addImage(nombre_imagen, image);

            //lectura geojson
            map.addSource(nombre_source, {
                type: 'geojson',
// Use a URL for the value for the `data` property.
                data: nombre_json
            });

            map.addLayer({
                'id': nombre_capa,
                //'type': 'circle',
                'type': 'symbol',
                'source': nombre_source,
                'layout': {
                    'icon-image': nombre_imagen, // reference the image
                    //'icon-size': 0.50
                    //zoom 7 tamaño 0.5, zoom 10 tamaño 1.5
                    'icon-size': ['interpolate', ['linear'], ['zoom'], 5, 0.4, 10, 1, 14, 1.4]
                },
                /* 'paint': {
            'circle-radius': 4,
            'circle-stroke-width': 2,
            'circle-color': 'red',
            'circle-stroke-color': 'white'
        }*/
            });
        });

    // Create a popup, but don't add it to the map yet.
    const popup = new mapboxgl.Popup({
        closeButton: false,
        closeOnClick: false
    });
    map.on('mouseenter', 'places', () => {
        map.getCanvas().style.cursor = 'pointer';
    });
    map.on('click', nombre_capa, (e) => {
// Change the cursor style as a UI indicator.
        //map.getCanvas().style.cursor = 'pointer';

// Copy coordinates array.
        const coordinates = e.features[0].geometry.coordinates.slice();
        let description="";
        if (e.features[0].properties.Name!=null)
            description +="<b>"+e.features[0].properties.Name+"</b><br/>";
        if (e.features[0].properties.Description!=null)
            description +=e.features[0].properties.Description+"<br/>";
        if (e.features[0].properties.Consumo!=null)
            description +="<i>Consumo (Ton/año):</i>"+e.features[0].properties.Consumo+"<br/>";
        if(e.features[0].properties.PotenciaInstaladaMW != null)
            description +="<i>Potencia Instalada (MW):</i>"+e.features[0].properties.PotenciaInstaladaMW+"<br/>";

// Ensure that if the map is zoomed out such that multiple
// copies of the feature are visible, the popup appears
// over the copy being pointed to.
        while (Math.abs(e.lngLat.lng - coordinates[0]) > 180) {
            coordinates[0] += e.lngLat.lng > coordinates[0] ? 360 : -360;
        }

// Populate the popup and set its coordinates
// based on the feature found.
        popup.setLngLat(coordinates).setHTML(description).addTo(map);
    });

    map.on('mouseleave', nombre_capa, () => {
        map.getCanvas().style.cursor = '';
        popup.remove();
    });
}
function addButtons(text, Id, nombre_capa,nombre_foto) {
    /*var btn = document.createElement('button');
    btn.innerText = "Ver Aeropuertos";
    btn.onclick = function () {
        mostrar();
    };*/

    // Insert before existing child:
    const botones = document.getElementById("botones");
    //botones.appendChild(btn);
    botones.innerHTML += "<div class=\"vc-toggle-container\">\n" +
        "   <div><span class=\"text\">"+text+"</span> <label class=\"vc-switch\">\n" +
        "        <input type=\"checkbox\" class=\"vc-switch-input\" id=\""+Id+"\" onchange=\"cambioEstado('"+Id+"','"+nombre_capa+"');\" checked>\n" +
        "        <span class=\"vc-switch-label\" data-on=\"Si\" data-off=\"No\"></span>\n" +
        "        <span class=\"vc-handle\"></span>\n" +
        "    </label>\n" +
        "    <div class=\"leyenda\"><img src=\""+nombre_foto+"\" width='24' height='24' alt='"+text+"'> </div></div>\n"
        "</div>";

}
    function cambioEstado(Id, nombre_capa){
        var isChecked = document.getElementById(Id).checked;
        if(isChecked){
            map.setLayoutProperty(nombre_capa,'visibility', 'visible');
        }else{
            map.setLayoutProperty(nombre_capa,'visibility', 'none');
        }

    }
