import matplotlib
matplotlib.use('Agg')
from flask import Flask, jsonify, make_response, request, abort,send_file,send_from_directory
import pandas as pd
import os 
import sklearn
import statsmodels.api as sm
import itertools
import pickle
from flask_cors import CORS, cross_origin
import numpy as np
import matplotlib.pyplot as plt
from sklearn.metrics import mean_absolute_percentage_error,mean_squared_error

# model = pickle.load(open("finalized_model.sav", "rb"))
app = Flask(__name__)

current_working_directory = os.getcwd()

app.config['CORS_HEADERS'] = 'Content-Type'
app.config['UPLOAD_FOLDER'] = current_working_directory + "\Results"
cors = CORS(app)

users = [
  {'userId':'random@random.com',
  'password':'12345678'}
]

@app.route("/")
def hello():
  return "Hello"

@app.route("/login-auth",methods=['POST'])
def loginAuth():
  if request.method == 'POST':
    body = request.get_json()
    enteredUserId = body['enteredUserId']
    enteredUserPassword = body['enteredUserPassword']
    for user in users:
      if((user['userId'] == enteredUserId) and (user['password'] == enteredUserPassword)):
        return {'status':True}
      else:
        return {'status':False}
    
@app.route("/ml-prediction", methods=['POST', 'OPTIONS'])
@cross_origin()
def get_prediction():
    if request.method == 'POST':
        duration = 1
        uploaded_df = request.files['file']
        duration = int(request.form.get('duration'))
        # df = pd.read_csv(uploaded_df)
        df = pd.read_csv(uploaded_df,encoding= 'unicode_escape',parse_dates=['Order Date'])
        cols = ['Order Date','Sales']
        dfColumns = list(df.columns)
        for col in dfColumns:
          if col not in cols:
            df.drop(col, axis=1, inplace=True)
        df = df.sort_values('Order Date')
        df = df.groupby('Order Date')['Sales'].sum().reset_index()
        df = df.set_index('Order Date')
        y = df['Sales'].resample('MS').mean()
        y.to_csv('Results\salesTrainData.csv')

        decomposition = sm.tsa.seasonal_decompose(y, model='additive')
        decomposition.trend.to_csv('Results/trend.csv')
        decomposition.seasonal.to_csv('Results/seasonal.csv')
        decomposition.resid.to_csv('Results/resid.csv')

        # feature_list = pd.read_csv("feature_list.csv")
        # feature_list = pd.Index(list(feature_list["0"]))
        # df = df[feature_list]
        # types = pd.read_csv("data_types.csv")
        # for i in range(len(types)):
          # df[types.iloc[i,0]] = df[types.iloc[i,0]].astype(types.iloc[i,1])
        
        p = d = q = range(0, 2)
        pdq = list(itertools.product(p, d, q))
        seasonal_pdq = [(x[0], x[1], x[2], 12) for x in list(itertools.product(p, d, q))]
        
        aicMin = 999999
        aicMinP,aicMiD,aicMinQ = 0,0,0
        aicMinSO1,aicMiSO2,aicMinSO3 = 0,0,0

        for param in pdq:
          for param_seasonal in seasonal_pdq:
            try:
                mod = sm.tsa.statespace.SARIMAX(y,order=param,seasonal_order=param_seasonal,enforce_stationarity=False,enforce_invertibility=False)
                results = mod.fit()
                resAIC = results.aic
                if(resAIC < aicMin):
                  aicMin = resAIC
                  aicMinP,aicMiD,aicMinQ = param[0],param[1],param[2]
                  aicMinSO1,aicMiSO2,aicMinSO3 = param_seasonal[0],param_seasonal[1],param_seasonal[2]
            except:
                  continue

        mod = sm.tsa.statespace.SARIMAX(y,order=(aicMinP, aicMiD, aicMinQ),seasonal_order=(aicMinSO1, aicMiSO2, aicMinSO3, 12),enforce_invertibility=False)
        model = mod.fit()

        pred= model.get_prediction(start=pd.to_datetime('2017-01-01'), dynamic=False)
        pred_ci = pred.conf_int()

        oneStepAheadPred = pd.DataFrame(pred_ci)
        oneStepAheadPred.to_csv('Results\oneStepAheadPred.csv')


        #Graph1
        ax = y['2014':].plot(label='observed')
        pred.predicted_mean.plot(ax=ax, label='One-step ahead Forecast', alpha=.7, figsize=(14, 7))
        ax.fill_between(pred_ci.index,pred_ci.iloc[:, 0],pred_ci.iloc[:, 1], color='k', alpha=.2)
        ax.set_xlabel('Date')
        ax.set_ylabel('Sales')
        plt.savefig("Results\FurniturePredictionTestGraph.png",transparent=True)
        plt.clf()

        #Graph2
        pred_uc = model.get_forecast(steps=1 + duration)
        pred_ci = pred_uc.conf_int()
        ax = y.plot(label='observed', figsize=(14, 7))
        pred_uc.predicted_mean.plot(ax=ax, label='Forecast')
        ax.fill_between(pred_ci.index,pred_ci.iloc[:, 0],pred_ci.iloc[:, 1], color='k', alpha=.25)
        ax.set_xlabel('Date')
        ax.set_ylabel('Sales')
        plt.savefig("Results\FurniturePredictionGraph.png",transparent=True)
        plt.clf()

        #Predicted Results CSV
        res = pd.DataFrame(pred_ci) 
        res.columns = ["lower","upper"]
        res.to_csv('Results\FurniturePredictionResults.csv')

        #Evaluation Metrics
        y_forecasted = pred.predicted_mean
        y_truth = y['2017-01-01':]
        mse = round(mean_squared_error(y_truth,y_forecasted),2)
        rmse = round(mean_squared_error(y_truth,y_forecasted,squared=False),2)     
        mape = round(mean_absolute_percentage_error(y_truth, y_forecasted),2)

        return jsonify({
          'restult':'Prediction Done',
          'mse':mse,
          'rmse':rmse,
          'mape':mape
        })

@app.route("/get-pred-test", methods=['GET'])
def get_pred_test():
  return send_from_directory(app.config["UPLOAD_FOLDER"], path='FurniturePredictionTestGraph.png', as_attachment=True)

@app.route("/get-pred", methods=['GET'])
def get_pred():
  return send_from_directory(app.config["UPLOAD_FOLDER"], path='FurniturePredictionGraph.png', as_attachment=True)

@app.route('/get-pred-CSV')
def plot_csv():
    return send_file(
        'FurniturePredictionResults.csv',
        mimetype='text/csv',
        download_name='FurniturePredictionResults.csv',
        as_attachment=True
    )

if __name__ == "__main__":
  app.run()