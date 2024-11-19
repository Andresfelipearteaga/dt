import pandas as pd
import numpy as np
from sklearn.model_selection import train_test_split
from sklearn.linear_model import LinearRegression
from sklearn.ensemble import RandomForestRegressor
from sklearn.neural_network import MLPRegressor
from sklearn.metrics import mean_squared_error, r2_score

class ModelDT:
    def __init__(self, csv_file, target_column):
        self.df = self.load_dataset(csv_file)
        self.target_column = target_column
        self.models = self.train_models()

    def load_dataset(self, csv_file):
        """Cargar el dataset desde un archivo CSV."""
        df = pd.read_csv(csv_file, sep=';')
        return df

    def train_models(self):
        """Entrenar los modelos y devolver un diccionario con los modelos entrenados."""
        # Separar X (características) e y (target)
        X = self.df.drop(columns=[self.target_column])
        y = self.df[self.target_column]
        
        # Dividir los datos en entrenamiento y prueba
        X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

        # Inicializar modelos
        models = {
            'Linear Regression': LinearRegression(),
            'Random Forest Regressor': RandomForestRegressor(n_estimators=100, random_state=42),
            'Neural Network (MLP)': MLPRegressor(hidden_layer_sizes=(50, 50), max_iter=1000, random_state=42)
        }

        trained_models = {}

        for name, model in models.items():
            model.fit(X_train, y_train)  
            y_pred = model.predict(X_test)  

            mse = mean_squared_error(y_test, y_pred)
            r2 = r2_score(y_test, y_pred)

            trained_models[name] = model
            print(f"{name}: MSE = {mse:.4f}, R2 = {r2:.4f}")

        return trained_models
    
    def predict(self, input_data):
        """Predecir el valor de la columna objetivo dado un array de entrada."""
        input_df = pd.DataFrame([input_data], columns=self.df.drop(columns=[self.target_column]).columns)
        
        print(f"\nPredicción para columna objetivo: {self.target_column}")
        for name, model in self.models.items():
            pred = model.predict(input_df)
            best_pred = round(float(pred), 2)  # Convierte np.float64 a float y redondea a 2 decimales

            print(f"{name} predice {self.target_column}: {pred[0]:.4f}")
            return {'pred': best_pred, 'model': name}


