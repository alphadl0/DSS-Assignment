import pandas as pd
import numpy as np
from sqlalchemy import create_engine
from sklearn.linear_model import LinearRegression
from sklearn.metrics import mean_squared_error
from dotenv import load_dotenv
import os
from flask import Flask, jsonify

# Load environment variables
load_dotenv()

# Connect to the MySQL database using SQLAlchemy
engine = create_engine(
    f"mysql+mysqlconnector://{os.getenv('DB_USER')}:{os.getenv('DB_PASSWORD')}@{os.getenv('DB_HOST')}/{os.getenv('DB_NAME')}"
)

# Fetch data from the factory table for years 2019 to 2023
query = """
SELECT factory_name, year, annual_cost, annual_production
FROM factory
"""
df = pd.read_sql(query, engine)

# Preprocess data
factories = df['factory_name'].unique()
results = []

for factory in factories:
    factory_data = df[df['factory_name'] == factory]
    
    # Ensure data is complete for each factory
    if len(factory_data) == 5:  # 5 years of data (2019-2023)
        X = factory_data[['year']]  # Filter X to match y
        y_cost = factory_data['annual_cost']
        y_production = factory_data['annual_production']

        # Train linear regression models
        model_cost = LinearRegression()
        model_production = LinearRegression()
        model_cost.fit(X, y_cost)
        model_production.fit(X, y_production)

        # Predict for the years 2024 and 2025
        prediction_years = np.array([[2024], [2025]])
        predicted_costs = model_cost.predict(prediction_years)
        predicted_productions = model_production.predict(prediction_years)

        results.append({
            'factory': factory,
            'predicted_cost_2024': predicted_costs[0],
            'predicted_production_2024': predicted_productions[0],
            'predicted_cost_2025': predicted_costs[1],
            'predicted_production_2025': predicted_productions[1],
        })

# Suggest closure of 1 or 2 factories based on highest predicted cost and lowest predicted production for 2025
results.sort(key=lambda x: (x['predicted_cost_2025'], -x['predicted_production_2025']), reverse=True)
factories_to_close = results[:2]

print("Suggested factories to close:")
for factory in factories_to_close:
    print(f"Factory: {factory['factory']}")
    print(f"  Predicted Cost (2025): {factory['predicted_cost_2025']}")
    print(f"  Predicted Production (2025): {factory['predicted_production_2025']}")

# Optional: Print full predictions for all factories
print("\nFull Predictions:")
for result in results:
    print(f"Factory: {result['factory']}")
    print(f"  Predicted Costs: 2024={result['predicted_cost_2024']}, 2025={result['predicted_cost_2025']}")
    print(f"  Predicted Productions: 2024={result['predicted_production_2024']}, 2025={result['predicted_production_2025']}")

# Cleanup: Close the database connection
engine.dispose()

app = Flask(__name__)

@app.route('/getPredictions', methods=['GET'])
def get_predictions():
    prediction_years = np.array([[2024], [2025]])
    predicted_costs = model_cost.predict(prediction_years)
    predicted_productions = model_production.predict(prediction_years)

    results = []
    for factory in factories:
        results.append({
            'factory': factory,
            'predicted_cost_2024': predicted_costs[0],
            'predicted_production_2024': predicted_productions[0],
            'predicted_cost_2025': predicted_costs[1],
            'predicted_production_2025': predicted_productions[1],
        })

    results.sort(key=lambda x: (x['predicted_cost_2025'], -x['predicted_production_2025']), reverse=True)
    return jsonify(results)

if __name__ == '__main__':
    app.run(debug=True)
