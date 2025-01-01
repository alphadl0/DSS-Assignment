from flask import Flask, render_template, request, jsonify
import matplotlib.pyplot as plt
import io
import base64
import numpy as np

app = Flask(__name__)

# Data for the factories
data = {
    "Wolfsburg": [
        {"year": 2023, "production": 950000, "cost": 2050000000},
        {"year": 2022, "production": 940000, "cost": 2000000000},
    ],
    "Zwickau": [
        {"year": 2023, "production": 325000, "cost": 740000000},
        {"year": 2022, "production": 330000, "cost": 720000000},
    ],
    "Emden": [
        {"year": 2023, "production": 200000, "cost": 640000000},
        {"year": 2022, "production": 205000, "cost": 620000000},
    ],
    "Hanover": [
        {"year": 2023, "production": 175000, "cost": 540000000},
        {"year": 2022, "production": 185000, "cost": 520000000},
    ],
    "Dresden": [
        {"year": 2023, "production": 35000, "cost": 160000000},
        {"year": 2022, "production": 36000, "cost": 155000000},
    ],
}

# Function to generate a chart
def create_chart(cost_data, production_data):
    fig, (ax1, ax2) = plt.subplots(1, 2, figsize=(15, 6))

    # Cost Savings Chart
    ax1.plot([d["year"] for d in cost_data], [d["savings"] for d in cost_data], color='teal', marker='o', label="Cost Savings")
    ax1.set_title('Cost Savings ($)')
    ax1.set_xlabel('Year')
    ax1.set_ylabel('Savings ($)')
    ax1.grid(True)

    # Production Trends Chart
    ax2.plot([d["year"] for d in production_data], [d["production"] for d in production_data], color='red', marker='o', label="Production")
    ax2.set_title('Production (Units)')
    ax2.set_xlabel('Year')
    ax2.set_ylabel('Units')
    ax2.grid(True)

    # Save the figure to a byte array and encode to base64
    img_stream = io.BytesIO()
    plt.savefig(img_stream, format='png')
    img_stream.seek(0)
    img_base64 = base64.b64encode(img_stream.getvalue()).decode('utf-8')
    plt.close(fig)
    
    return img_base64

@app.route('/', methods=['GET', 'POST'])
def index():
    if request.method == 'POST':
        selected_factories = request.form.getlist('factories')
        start_year = int(request.form['startYear'])
        
        total_savings = 0
        remaining_production = 0
        cost_data = []
        production_data = []

        # Calculate savings and production for selected factories
        for year in range(start_year, 2027):
            year_savings = 0
            year_production = 0
            for factory, stats in data.items():
                if factory not in selected_factories:
                    stat = next((s for s in stats if s["year"] == 2023), None)
                    if stat:
                        year_savings += stat["cost"]
                        year_production += stat["production"]

            cost_data.append({"year": year, "savings": year_savings})
            production_data.append({"year": year, "production": year_production})
            total_savings += year_savings
            remaining_production += year_production

        chart_img = create_chart(cost_data, production_data)
        summary = f"By closing the selected factories, you can save a total of ${total_savings:,.0f} and maintain a production of {remaining_production:,.0f} units by 2026."

        return render_template('index.html', chart_img=chart_img, summary=summary, cost_data=cost_data, production_data=production_data)

    return render_template('index.html', chart_img=None, summary=None)

if __name__ == '__main__':
    app.run(debug=True)
