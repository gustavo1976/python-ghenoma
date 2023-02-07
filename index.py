import json

from flask import Flask, render_template, request

app = Flask(__name__)


@app.route('/')
def home():  # put application's code here
    return render_template('home.html')

@app.route('/acercade')
def about():
    return render_template('acercade.html')

@app.route('/calcular')
def calcular():
    print ('calculando')
    return 'Click'
    #return render_template('resultados.html', data=[{'nombre':'uno','consumo':123},{'nombre':'dos','consumo':12334}])


@app.route('/calcular2', methods=["POST"])
def calcular2():
    #print (request.form['datos'])
    datos= json.loads(request.form["datos"])
    for dato in datos:
        print (dato)
    response = {"status":200, "nombre":"gustavo", "apellidos": "hdez"}
    #return json.dumps(response) para mandarlo como texto
    return response
    #return 'resultados'

if __name__ == '__main__':
    app.run(debug=True)
