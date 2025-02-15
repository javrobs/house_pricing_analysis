# Austin house pricing analysis (visualization fork)

## Authors (original project)
* **Marijose Cavazos** - **[My github](https://github.com/minmincg "GitHub for Marijose Cavazos")**
* **Paola Aleman** - **[My github](https://github.com/paoaleman19 "GitHub for Pao Aleman")**
* **Javier Robles** - **[My github](https://github.com/javrobs "GitHub for Javier Robles")** (me)
* **Cesar Cruz** - **[My github](https://github.com/CsarCruz "GitHub for Cesar Cruz")**



## Project overview:
The purpose of this project is to carry out an analysis of the real estate market behavior in Austin, Texas, from 2018 to 2021. Various variables that influence the determination of the sale price will be examined, such as the number of bathrooms, bedrooms, parking spaces, land area, and construction area, among others. This information will be used to predict, through linear regression and neural networks, whether the sale prices were in line with the market. ~~The same machine learning methods will be used to obtain a sale price based on users' input data of their house.~~  

_Added with fork: The code has been modified to be strictly a serverless app, to be able to host on github pages. As well as updated to display correctly on mobile._  

We will create a visualization using ~~Python Flask as back-end,~~ HTML/CSS and JavaScript as front-end.

## Finding Data
We obtained the data from Kaggle our data set were retrieved from:  
https://www.kaggle.com/code/threnjen/austin-housing-eda-nlp-models-visualizations/input  

The dataset contains information about the houses in the real estate market in Austin, Texas, in the latest years.
There are about 15000 listings from 2018-2021, with over 40 columns for each listing, including location.

## Data Cleanup and Analysis
### Exploration and clean up
The first step was to import the file "austin_housing.csv" to Jupyter Notebook and analyze it in order to be able to select the most relevant variables for the project.  
The dataset was filtered to 30 variables, and "numOfSchools" was created as a result of summing the different school levels. All this data was exported to the "austin_housing_reduced.csv" file, which contains these columns and their related information:
city,	streetAddress,	zipcode, latitude,	longitude,	propertyTaxRate,	garageSpaces,	hasCooling,	hasGarage,	hasHeating,	hasSpa,	hasView,	homeType,	yearBuilt,	latestPrice,	numPriceChanges,	numOfAccessibilityFeatures,	numOfAppliances,	numOfParkingFeatures,	numOfPatioAndPorchFeatures,	numOfSecurityFeatures,	numOfWaterfrontFeatures,	numOfWindowFeatures,	numOfCommunityFeatures,	lotSizeSqFt,	livingAreaSqFt,	avgSchoolRating,	numOfBathrooms,	numOfBedrooms,	numOfStories,	numOfSchools.  

Added with fork: The predicted prices (linear regression and NN) along with the selected characteristics were exported to a GeoJSON file for the Leaflet map to filter and read. Also shaped into a JSON file for Plotly plotting.


### Project Development
The Austin House Pricing Project utilized Flask to develop a web application. The primary objective of this project was to display a map using Leaflet.  

To enhance the functionality, machine learning techniques were employed. Both linear regression and neural networks were utilized to predict house prices ~~based on user input.~~  

~~The Flask application seamlessly integrated the machine learning models, enabling users to input specific parameters related to the house they were interested in. The models would then provide an estimated price based on the given inputs, utilizing the predictive capabilities of the trained models.~~  

Overall, the project combined web development, data visualization, and machine learning techniques to create an interactive platform that allowed users to explore and obtain estimated prices for houses in Austin, Texas.


## Visual references:
1. Leaflet showing information about the selected home.
<img width="448" alt="image" src="https://github.com/minmincg/house_pricing_analysis/assets/120423303/fb6a4b91-565e-49cd-a1ad-c7d555451d8b">


2. Map filtering.
<img width="448" alt="image" src="https://github.com/minmincg/house_pricing_analysis/assets/120423303/fd071903-bdd1-4415-94d9-e5233af04831">


3. Price prediction.
<img width="448" alt="image" src="https://github.com/minmincg/house_pricing_analysis/assets/120423303/09e1e40b-9149-4eda-b479-916b28862b49">

4. Graphs.
<img width="448" alt="image" src="https://github.com/minmincg/house_pricing_analysis/assets/120423303/67ad4d82-9e79-4d35-940a-bce6d59511f5">


## Tools
* Javascript
* HTML/CSS + Bootstrap
* Plotly
* Leaflet
* Matplotlib.pyplot
* Fetch calls
* ~~Flask (Not in fork)~~



## Conclusions
* The model that best fits our data set was the neural networks model based on the MAE (Mean Average Error), which had a lower value.
* The linear regression model doesn´t take into consideration relevant fields like zipcode and longitude/latitude.
* Categorized the predicted price values into good, bad and neutral by comparing it to the listed price.
* Offered different options for user to display visualizations comparing both models.  


## Acknowledgments
Austin Housing - EDA, NLP, Models, Visualizations. (2021). Retrived from https://www.kaggle.com/code/threnjen/austin-housing-eda-nlp-models-visualizations/input
