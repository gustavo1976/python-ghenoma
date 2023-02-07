function addCarreteras() {
    map.on('load', () => {
        //lectura geojson
        map.addSource('carreteras', {
            type: 'geojson',
            data: '/static/datos/TramosCarreteras.geojson'
        });
        map.addLayer({
            'id': 'carreteras-layer',
            'type': 'line',
            'source': 'carreteras',
            'layout': {
                'line-join': 'round',
                'line-cap': 'round'
            },
            'paint': {
                'line-color': '#333',
                //'line-width': 4
                'line-width': ['interpolate', ['linear'], ['zoom'], 5, 1, 10, 5, 12, 12]

            }
        });

        map.addSource('Todas-las-carreteras', {
            type: 'geojson',
// Use a URL for the value for the `data` property.
            data: '/static/datos/roads.geojson'
        });
        map.addLayer({
            'id': 'Todas-las-carreteras-layer',
            'type': 'line',
            'source': 'Todas-las-carreteras',
            'layout': {
                'line-join': 'round',
                'line-cap': 'round'
            },
            //"filter": ["==", "RTT_DESCRI","Secondary Route"],
            //"filter": ["==", "RTT_DESCRI","Primary Route"],
            //"filter": ["==", "RTT_DESCRI","Unknown"],
            'paint': {
                'line-color': ['match', ['get', 'RTT_DESCRI'], 'Primary Route', '#333', 'Secondary Route', '#888', 'Unknown', '#aaa', '#000'],
                'line-width': ['interpolate', ['linear'], ['zoom'], 5, 1, 10, 5, 12, 12]

            }
        });
        map.setLayoutProperty('Todas-las-carreteras-layer', 'visibility', 'none');
        map.setLayoutProperty('carreteras-layer', 'visibility', 'none');
    });




}
function addButtonCarreteras() {

    const botones = document.getElementById("botones");
    botones.innerHTML +="<div class=\"vc-toggle-container\"><span>Carreteras: <br></span>\n"+
                            "<div class=\"el-radio el-radio-green\">\n" +
                            "<span class=\"text2\"> &nbsp;&nbsp;&nbsp;Ninguna</span>\n" +
                            "<input type=\"radio\" name=\"radio1\" id=\"Ninguna\" value=\"Ninguna\" checked onclick=\"carreteras(this);\">\n" +
                            "<label class=\"el-radio-style\" For=\"Ninguna\"></label>\n" +
                            "<div class=\"leyenda\"><img src=\"./static/img/vacio.png\" width='24' height='24' alt=''> </div>\n"+
                            "</div>\n"+
                                "<div class=\"el-radio el-radio-green\">\n" +
                                "<span class=\"text2\"> &nbsp;&nbsp;&nbsp;Principales</span>\n" +
                                "<input type=\"radio\" name=\"radio1\" id=\"Principales\" value=\"Principales\" onclick=\"carreteras(this);\">\n" +
                                "<label class=\"el-radio-style\" For=\"Principales\"></label>\n" +
                                "<div class=\"leyenda\"><img src=\"./static/img/principales.png\" width='24' height='24' alt='carreteras principales'> </div>\n"+
                            "</div>\n"+
                            "<div class=\"el-radio el-radio-green\">\n" +
                                "<span class=\"text2\"> &nbsp;&nbsp;&nbsp;Todas</span>\n" +
                                "<input type=\"radio\" name=\"radio1\" id=\"Todas\" value=\"Todas\" onclick=\"carreteras(this);\">\n" +
                                "<label class=\"el-radio-style\" For=\"Todas\"></label>\n" +
                                "<div class=\"leyenda\"><img src=\"./static/img/todas.png\" width='24' height='24' alt='todas las carreteras'> </div>\n"+
                            "</div></div>";
    /*
    botones.innerHTML += "<div class=\"vc-toggle-container\">\n" +
        "   <div><span class=\"text\">Carreteras Principales</span><label class=\"vc-switch\">\n" +
        "        <input type=\"checkbox\" class=\"vc-switch-input\" id=\"carreteras\" onchange=\"carreteras();\" checked>\n" +
        "        <span class=\"vc-switch-label\" data-on=\"Si\" data-off=\"No\"></span>\n" +
        "        <span class=\"vc-handle\"></span>\n" +
        "    </label></div>\n" +
        "</div>";

    botones.innerHTML += "<div class=\"vc-toggle-container\">\n" +
        "   <div><span class=\"text\">Todas las Carreteras</span><label class=\"vc-switch\">\n" +
        "        <input type=\"checkbox\" class=\"vc-switch-input\" id=\"TodasCarreteras\" onchange=\"carreteras();\" checked>\n" +
        "        <span class=\"vc-switch-label\" data-on=\"Si\" data-off=\"No\"></span>\n" +
        "        <span class=\"vc-handle\"></span>\n" +
        "    </label></div>\n" +
        "</div>";
*/
}
function carreteras(myradio){
    if(myradio.value=="Ninguna"){
        map.setLayoutProperty('carreteras-layer','visibility', 'none');
        map.setLayoutProperty('Todas-las-carreteras-layer','visibility', 'none');
    }else{
        if(myradio.value=="Principales"){
            map.setLayoutProperty('carreteras-layer','visibility', 'visible');
            map.setLayoutProperty('Todas-las-carreteras-layer','visibility', 'none');
        }else{
            if(myradio.value=="Todas"){
                map.setLayoutProperty('carreteras-layer','visibility', 'none');
                map.setLayoutProperty('Todas-las-carreteras-layer','visibility', 'visible');
            }
        }
    }


}