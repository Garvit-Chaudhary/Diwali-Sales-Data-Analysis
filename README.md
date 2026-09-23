# Diwali Sales Analysis & Prediction

An end-to-end data analysis and machine learning project exploring **11,251 Diwali sales records** to uncover customer purchasing patterns and predict purchase amounts using regression models.

The project combines **exploratory data analysis, feature engineering, model comparison, regression, and an interactive prediction interface** to turn raw transaction data into actionable customer insights.

## 🔎 Project Overview

The analysis explores how customer attributes such as **gender, age, marital status, state, occupation, product category, and number of orders** relate to purchasing behavior.

After exploring the data, multiple regression algorithms were evaluated using **5-fold cross-validation with Mean Absolute Error (MAE)**. The selected model was then used to predict customer purchase amounts.

### Project workflow

```text
Raw Sales Data
      ↓
Data Cleaning & Preprocessing
      ↓
Exploratory Data Analysis
      ↓
Feature Engineering
      ↓
Model Comparison
      ↓
Hyperparameter Tuning
      ↓
Random Forest Regression
      ↓
Purchase Amount Prediction
```

## 📊 Key Findings

The exploratory analysis revealed several notable patterns within the dataset:

* Women account for the majority of orders.
* The **26–35 age group** represents a prominent customer segment.
* **Uttar Pradesh, Maharashtra, and Karnataka** stand out among the states represented in the dataset.
* **IT, Healthcare, and Aviation** are prominent occupations within the identified high-spending segment.
* **Food, Clothing, and Electronics** are among the leading product categories.
* Customer demographics and purchasing attributes provide useful signals for estimating purchase amount.

> These findings describe patterns observed in this dataset and should not be interpreted as universal consumer behavior.

## 🤖 Machine Learning

The project treats **Purchase Amount** as the regression target.

### Input Features

* Gender
* Age
* Age Group
* Marital Status
* State
* Zone
* Occupation
* Orders
* Product Category

### Target

**Purchase Amount (₹)**

### Models Evaluated

Several regression approaches were compared using **5-fold cross-validation and MAE**:

* Ridge Regression
* Random Forest Regressor
* Gradient Boosting Regressor
* XGBoost
* LightGBM

The final model was selected based on cross-validation performance and subsequently tuned before being saved as:

```text
diwali_spend_model.pkl
```

## 🧠 Prediction Interface

The project also includes an interactive prediction interface where users can provide customer attributes and pass them through the trained regression pipeline.

```text
Customer Attributes
        ↓
Preprocessing Pipeline
        ↓
Trained Random Forest Model
        ↓
Predicted Purchase Amount (₹)
```

The interface uses the trained model to generate predictions rather than hard-coded results.

## 🛠️ Tech Stack

**Programming**

* Python

**Data Analysis**

* Pandas
* NumPy
* Matplotlib
* Seaborn

**Machine Learning**

* Scikit-learn
* Random Forest
* XGBoost
* LightGBM

**Model Persistence**

* Joblib / Pickle



## 🚀 Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/YOUR_USERNAME/YOUR_REPOSITORY.git
cd YOUR_REPOSITORY
```

### 2. Create a virtual environment

```bash
python -m venv venv
```

Activate it on Windows:

```bash
venv\Scripts\activate
```

### 3. Install dependencies

```bash
pip install -r requirements.txt
```

### 4. Run the project

```bash
# Add the actual command used by your application
python app.py
```

Then open the local URL shown in your terminal.


## 📌 Limitations

* The model is trained on a specific Diwali sales dataset and may not generalize to other datasets or shopping periods.
* The predictions represent estimates rather than guaranteed purchase amounts.
* Customer behavior can be influenced by factors that are not included in the available features.
* Dataset-level patterns should not automatically be interpreted as causal relationships.

## 🎯 What This Project Demonstrates

This project demonstrates an end-to-end machine learning workflow:

**Data Cleaning → EDA → Feature Engineering → Model Comparison → Cross-Validation → Hyperparameter Tuning → Model Persistence → Prediction**

It was built to explore not only **what the sales data contains**, but also how those patterns can be transformed into a practical predictive model.
