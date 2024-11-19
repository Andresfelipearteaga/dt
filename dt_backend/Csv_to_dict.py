import pandas as pd

def extract_data_from_csv(file_path):
    # Leer el CSV usando pandas
    df = pd.read_csv(file_path, delimiter=';')
    print(df.head())
    # Inicializar una lista para almacenar los registros en el formato deseado
    records = []

    # Iterar sobre cada fila en el DataFrame
    for index, row in df.iterrows():
        record = {
            'age': row['age'],
            'gender': row['gender'],
            'attendance': row['attendance'],
            'submitted': row['a-ssignments_submitted'],
            'hours': row['hours_spent_extracurricular'],
            'hours_online': row['hours_spent_online_resources'],
            'grades': row['grades']
        }
        records.append(record)

    # Retornar la lista de registros
    return records

