
# Sales Forecasting Website

This is a sales forecasting website built using Angular for the frontend and Flask for the backend. The purpose of this website is to provide users with insights and predictions regarding sales data.

## Features

- **User Authentication :** ecure user authentication system to allow only registered users access to the application. The default UserId is "random@random.com" and password is "12345678".
- **Data Visualization :** Charts and graphs to visualize sales data trends and patterns.
- **Sales Prediction:** Utilizes machine learning algorithms to forecast future sales based on historical data. The model used here is SARIMA.
- **Data Management :** Allows users to upload, manage, and manipulate sales data for analysis.
- **Export :** Capability to export generated reports and forecasts for further analysis or sharing.
## Tech Stack

**Client:** AngularJS \
**Server:** Flask \
**Machine Learning Model:** Python



## Installation

To run the Sales forecasting Website locally on your machine, follow these steps:

#### Prerequisites : 
- Node.js v14
- AngularJS v14
- Python v3.10
- Flask v2.2

#### Steps : 

1. Clone the repository:

```bash
git clone https://github.com/vdpshyam/sales_forcasting.git
```

2. Navigate to the frontend directory:

```bash
cd sales_prediction_frontend
```

3. Install the dependencies:

```bash
npm install
```

4. Start the development server:

```bash
npm start
```

5. Navigate to the backend directory:

```bash
cd ../sales_prediction_backend
```

6. Create a virtual environment: 

```bash
python -m venv env
```

7. Activate the virtual environment:

- Windows: 
```bash
.\env\Scripts\activate
```

- Linus/macOS: 
```bash
source env/bin/activate
```

8. Install backend dependencies:

```bash
pip install -r requirements.txt
```

10. Run the Flask serve:

```bash
flask run
```

Open your web browser and visit http://localhost:4200 to view the website.
  
## Usage

1. Upon accessing the website, Sign in using teh UserId "random@random.com" and password "12345678".
2. After authentication, users can upload sales data, and select the period for which they want to see the forecasting for.
3. Users can visualize sales data trends using charts.
4. The prediction feature allows users to forecast future sales based on historical data.
5. Export functionality enables users to download generated reports and forecasts.
## Contributing

Contributions are always welcome!

if you find any issues or have suggestions for improvements, feel free to open an issue or create a pull request.


## Contact

For any inquiries or feedback, you can reach out to me at vdpshyamofficial@gmail.com or connect with me on [LinkedIn](https://www.linkedin.com/in/v-d-p-shyam-9b6ba3162/).
## Support Me

If you like my work, support me by [buying me a coffee](https://www.buymeacoffee.com/vdpshyam) : )

