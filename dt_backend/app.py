from flask import Flask, request, jsonify
from flask_cors import CORS
from dt_model import ModelDT
from Csv_to_dict import extract_data_from_csv

app = Flask(__name__)
CORS(app)
# Cargar y entrenar modelos

@app.route('/')
def index():
    return ('Corriendo')

@app.route('/predict', methods=['POST', 'GET'])
def predict():
    csv_file = 'DatasetDt.csv'
    data = request.json
    print('data', data)
    target_column = 'grades'
    predictor = ModelDT(csv_file, target_column)

    age = data.get('age')
    gender = data.get('gender')
    attendance = data.get('attendance')
    submitted = data.get('submitted')
    studyHours = data.get('studyHours')
    studyHoursOnline = data.get('studyHoursOnline')

    input_data = [age, gender, attendance, submitted, studyHours, studyHoursOnline] 

    # Predecir el valor de la columna objetivo
    result = predictor.predict(input_data)
    return jsonify({'result': result})

@app.route('/Dataset', methods=['POST', 'GET'])
def csv():
    # Llamada a la función con el archivo CSV
    csv_file = 'DatasetDT.csv'  # Cambia esto por la ruta de tu archivo CSV
    data_dict = extract_data_from_csv(csv_file)

    # Mostrar el resultado
    print(data_dict)

    return jsonify({'csv_data': data_dict})

@app.route('/DatasetTrends', methods=['POST', 'GET'])
def csvTrends():
    # Llamada a la función con el archivo CSV
    csv_file = 'DatasetDT.csv'  # Cambia esto por la ruta de tu archivo CSV
    data_dict = extract_data_from_csv(csv_file)

    # Mostrar el resultado
    print(data_dict)

    return jsonify({'csv_data': data_dict})

if __name__ == '__main__':
    app.run(debug=True)
