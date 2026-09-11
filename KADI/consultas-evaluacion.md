# Operator catalogue — all 166 (with candidate queries)

Texera's own metadata, straight from `GET /api/resources/operator-metadata`.

**Candidate Query** = how someone would ask for this operator *without knowing its name*,
written from the operator name/intent only. These were written before opening
`operator-hints.json`, so they can be used as an independent query set for
evaluating semantic search vs. keyword search. See `metodo.md`.

Groups are ordered by how little we have tested them — the top ones need
queries most.

## Untested — write queries here first

### Sklearn Training  (26)

| Operator | Texera's description | Candidate Query |
|---|---|---|
| Training: Adaptive Boosting | Sklearn Training: Adaptive Boosting Operator | Train a boosted model that combines many weak learners |
| Training: Bagging | Sklearn Training: Bagging Operator | Train an ensemble model by averaging several bootstrapped models |
| Training: Bernoulli Naive Bayes | Sklearn Training: Bernoulli Naive Bayes Operator | Train a Naive Bayes model for binary features |
| Training: Complement Naive Bayes | Sklearn Training: Complement Naive Bayes Operator | Train a Naive Bayes classifier that handles imbalanced text classes well |
| Training: Decision Tree | Sklearn Training: Decision Tree Operator | Train a decision tree to classify my records |
| Training: Dummy Classifier | Sklearn Training: Dummy Classifier Operator | Create a baseline model to compare my real model against |
| Training: Extra Tree | Sklearn Training: Extra Tree Operator | Train a single extremely randomized tree |
| Training: Extra Trees | Sklearn Training: Extra Trees Operator | Train an ensemble of extremely randomized trees |
| Training: Gaussian Naive Bayes | Sklearn Training: Gaussian Naive Bayes Operator | Train a Naive Bayes model assuming normally distributed features |
| Training: Gradient Boosting | Sklearn Training: Gradient Boosting Operator | Train a gradient boosted trees model |
| Training: K-nearest Neighbors | Sklearn Training: K-nearest Neighbors Operator | Train a model that classifies based on nearby examples |
| Training: Linear Perceptron | Sklearn Training: Linear Perceptron Operator | Train a simple linear perceptron classifier |
| Training: Linear Regression | Sklearn Training: Linear Regression Operator | Train a model to predict a continuous number |
| Training: Linear Support Vector Machine | Sklearn Training: Linear Support Vector Machine Operator | Train a linear SVM classifier |
| Training: Logistic Regression | Sklearn Training: Logistic Regression Operator | Train a model to predict a yes/no outcome |
| Training: Logistic Regression Cross Validation | Sklearn Training: Logistic Regression Cross Validation Operator | Train a logistic regression model that automatically tunes regularization via cross-validation |
| Training: Multi-layer Perceptron | Sklearn Training: Multi-layer Perceptron Operator | Train a small neural network on my dataset |
| Training: Multinomial Naive Bayes | Sklearn Training: Multinomial Naive Bayes Operator | Train a Naive Bayes classifier for word counts or text data |
| Training: Nearest Centroid | Sklearn Training: Nearest Centroid Operator | Train a classifier based on the closest class average |
| Training: Passive Aggressive | Sklearn Training: Passive Aggressive Operator | Train an online model that updates aggressively on mistakes |
| Training: Probability Calibration | Sklearn Training: Probability Calibration Operator | Calibrate my classifier so its confidence scores reflect true probabilities |
| Training: Random Forest | Sklearn Training: Random Forest Operator | Train a random forest model on my dataset |
| Training: Ridge Regression | Sklearn Training: Ridge Regression Operator | Train a linear regression model with L2 regularization |
| Training: Ridge Regression Cross Validation | Sklearn Training: Ridge Regression Cross Validation Operator | Train a ridge regression model that auto-selects the best regularization strength |
| Training: Stochastic Gradient Descent | Sklearn Training: Stochastic Gradient Descent Operator | Train a model incrementally using gradient descent |
| Training: Support Vector Machine | Sklearn Training: Support Vector Machine Operator | Train an SVM classifier on my data |

### Sklearn  (28)

| Operator | Texera's description | Candidate Query |
|---|---|---|
| Adaptive Boosting | Sklearn Adaptive Boosting Operator | Use an AdaBoost model to classify new records |
| Bagging | Sklearn Bagging Operator | Apply a bagging ensemble to make predictions |
| Bernoulli Naive Bayes | Sklearn Bernoulli Naive Bayes Operator | Apply a Bernoulli Naive Bayes model to binary data |
| Complement Naive Bayes | Sklearn Complement Naive Bayes Operator | Apply a Naive Bayes model suited for imbalanced text |
| Decision Tree | Sklearn Decision Tree Operator | Apply a decision tree model to new records |
| Dummy Classifier | Sklearn Dummy Classifier Operator | Generate baseline predictions for comparison |
| Extra Tree | Sklearn Extra Tree Operator | Apply a single randomized tree for prediction |
| Extra Trees | Sklearn Extra Trees Operator | Apply an extremely randomized trees ensemble |
| Gaussian Naive Bayes | Sklearn Gaussian Naive Bayes Operator | Apply a Gaussian Naive Bayes model for prediction |
| Gradient Boosting | Sklearn Gradient Boosting Operator | Score new data with a gradient boosted model |
| K-nearest Neighbors | Sklearn K-nearest Neighbors Operator | Classify a record based on its nearest neighbors |
| Linear Perceptron | Sklearn Linear Perceptron Operator | Apply a linear perceptron model to classify data |
| Linear Regression | Sklearn Linear Regression Operator | Apply a linear regression model to predict values |
| Linear Support Vector Machine | Sklearn Linear Support Vector Machine Operator | Apply a linear SVM model to classify data |
| Logistic Regression | Sklearn Logistic Regression Operator | Apply a logistic regression model to predict probabilities |
| Logistic Regression Cross Validation | Sklearn Logistic Regression Cross Validation Operator | Apply a cross-validated logistic regression model |
| Multi-layer Perceptron | Sklearn Multi-layer Perceptron Operator | Apply a neural network model to my data |
| Multinomial Naive Bayes | Sklearn Multinomial Naive Bayes Operator | Apply a Naive Bayes text classifier |
| Nearest Centroid | Sklearn Nearest Centroid Operator | Classify data based on distance to class centroids |
| Passive Aggressive | Sklearn Passive Aggressive Operator | Apply an online passive-aggressive classifier |
| Probability Calibration | Sklearn Probability Calibration Operator | Adjust a model's output probabilities to be better calibrated |
| Random Forest | Sklearn Random Forest Operator | Apply a random forest model to classify new records |
| Ridge Regression | Sklearn Ridge Regression Operator | Apply a ridge regression model to predict values |
| Ridge Regression Cross Validation | Sklearn Ridge Regression Cross Validation Operator | Apply a cross-validated ridge regression model |
| Sklearn Prediction | Sklearn Prediction Operator | Generate predictions from an already trained model |
| Sklearn Testing | It will generate scorers for Sklearn model | Evaluate a trained model's accuracy and other metrics |
| Stochastic Gradient Descent | Sklearn Stochastic Gradient Descent Operator | Apply a model trained with stochastic gradient descent |
| Support Vector Machine | Sklearn Support Vector Machine Operator | Apply an SVM model to classify new records |

### Advanced Sklearn  (4)

| Operator | Texera's description | Candidate Query |
|---|---|---|
| KNN Classifier | Sklearn KNN Classifier Operator | Classify data points by their k nearest neighbors |
| KNN Regressor | Sklearn KNN Regressor Operator | Predict a numeric value from the average of nearby examples |
| SVM Classifier | Sklearn SVM Classifier Operator | Classify data using a support vector machine |
| SVM Regressor | Sklearn SVM Regressor Operator | Predict a continuous value using a support vector machine |

### Basic  (16)

| Operator | Texera's description | Candidate Query |
|---|---|---|
| Bar Chart | Visualize data in a Bar Chart | Show my data as a bar chart |
| Bubble Chart | a 3D Scatter Plot; Bubbles are graphed using x and y labels, and their sizes determined by a z-value. | Visualize three variables where the third controls bubble size |
| Dot Plot | Visualize data using a dot plot | Show data points along a single axis |
| Dumbbell Plot | Visualize data in a Dumbbell Plot. A dumbbell plot (also known as a lollipop chart) is typically used to compare two distinct values or time points for the same entity. | Compare two values per category with a connecting line |
| Figure Factory Table | Visualize data in a figure factory table | Display my results as a formatted table |
| Filled Area Plot | Visualize data in a filled area plot | Show cumulative values over time with a shaded area |
| Gantt Chart | A Gantt chart is a type of bar chart that illustrates a project schedule. The chart lists the tasks to be performed on the vertical axis, and time intervals on the horizontal axis. The width of the horizontal bars in the graph shows the duration of each activity. | Show a project timeline with task durations |
| Hierarchy Chart | Visualize data in hierarchy | Visualize a parent-child hierarchy in my data |
| Icicle Chart | Visualize hierarchical data from root to leaves | Show nested categories from root to leaves as stacked bars |
| Line Chart | View the result in line chart | Plot a trend over time |
| Pie Chart | Visualize data in a Pie Chart | Show proportions of categories as a pie chart |
| Range Slider | Visualize data in a Range Slider | Let me interactively filter a numeric range |
| Sankey Diagram | Visualize data using a Sankey diagram | Visualize how quantities flow between stages |
| Scatter Plot | View the result in a scatterplot | Plot two numeric variables against each other |
| Tables Plot | Visualize data in a table chart. | Display my results as a table visualization |
| Time Series Plot | Visualize trends and patterns over time. | Visualize how a metric changes over time |

### Scientific  (14)

| Operator | Texera's description | Candidate Query |
|---|---|---|
| Carpet Plot | Visualize data in a Carpet Plot | Show how a variable changes across two other variables |
| Contour Plot | Displays terrain or gradient variations in a Contour Plot | Show elevation or gradient variation as contour lines |
| Dendrogram | Visualize data in a Dendrogram | Show hierarchical clustering as a tree diagram |
| Heatmap | Visualize data in a HeatMap Chart | Visualize intensity of values using colors |
| Network Graph | Visualize data in a network graph | Visualize connections between entities as a graph |
| Parallel Coordinates Plot | Visualize multivariate data using parallel coordinate axes | Compare many variables at once with parallel axes |
| Polar Chart | Displays data points in a polar scatter plot | Plot data using angle and radius |
| Quiver Plot | Visualize vector data in a Quiver Plot | Visualize vector directions and magnitudes on a grid |
| Radar Chart | Visualize data in a Radar Chart | Compare multiple metrics for an item in a spider chart |
| Radar Plot | View the result in a radar plot. | Show multivariate data on a circular plot |
| Ternary Contour | Shows how a measured value changes across all mixtures of three components that sum to a constant | Show how a value changes across mixtures of three components |
| Ternary Plot | Points are graphed on a Ternary Plot using 3 specified data fields | Plot data with three proportions that sum to 100 percent |
| Volcano Plot | Displays statistical significance versus effect size | Visualize statistical significance versus effect size for many measurements |
| Wind Rose Chart | Displays wind distribution using a polar bar chart | Visualize wind speed and direction distribution |

### Statistical  (8)

| Operator | Texera's description | Candidate Query |
|---|---|---|
| Box/Violin Plot | Visualize data using either a Box Plot or a Violin Plot. Box plots are drawn as a box with a vertical line down the middle which is mean value, and has horizontal lines attached to each side (known as "whiskers"). Violin plots provide more detail by showing a smoothed density curve on each side, and also include a box plot inside for comparison. | Show the distribution and spread of a numeric variable across groups |
| Continuous Error Bands | Visualize error or uncertainty along a continuous line | Show a trend line with a shaded uncertainty range around it |
| Empirical Cumulative Distribution Plot | Visualize the empirical cumulative distribution of a numeric column. | Show what percentage of my data falls below each value |
| Histogram | Visualize data in a Histogram Chart | Show the frequency distribution of a numeric column |
| Histogram2D | Displays a bivariate histogram as a density heatmap | Show the density of two numeric variables together |
| Scatter Matrix Chart | Visualize datasets in a Scatter Matrix | Show pairwise relationships between all numeric columns |
| Strip Chart | Visualize distribution of data points as a strip plot | Show individual data points along a category axis |
| Tree Plot | Visualize hierarchical data as a top-down, interactive, auto-sizing tree | Show a hierarchical tree that I can expand and collapse |

### Hugging Face  (5)

| Operator | Texera's description | Candidate Query |
|---|---|---|
| Hugging Face | Call a Hugging Face model via the Inference API | Call a pretrained AI model hosted online to process my data |
| Hugging Face Iris Logistic Regression | Predict whether an iris is an Iris-setosa using a pre-trained logistic regression model | Predict the iris flower species from measurements using a pretrained model |
| Hugging Face Sentiment Analysis | Analyzing Sentiments with a Twitter-Based Model from Hugging Face | Determine whether social media posts are positive or negative |
| Hugging Face Spam Detection | Spam Detection by SMS Spam Detection Model from Hugging Face | Detect whether text messages are spam |
| Hugging Face Text Summarization | Summarize the given text content with a mini2bert pre-trained model from Hugging Face | Generate a short summary of a long text |

### Financial  (5)

| Operator | Texera's description | Candidate Query |
|---|---|---|
| Bullet Chart | Visualize data using a Bullet Chart that shows a primary quantitative bar and delta indicator. Optional elements such as qualitative ranges (steps) and a performance threshold are displayed only when provided. | Show progress toward a target with a compact bar indicator |
| Candlestick Chart | Visualize data in a Candlestick Chart | Visualize stock price open, high, low and close over time |
| Funnel Plot | Visualize data in a Funnel Plot | Visualize how a group of leads narrows down through stages |
| Gauge Chart | Visualize a single value with a radial gauge chart, showing progress towards a goal with optional steps, threshold, and delta. | Show a single value as a dial or speedometer |
| Waterfall Chart | Visualize data as a waterfall chart | Show how a starting value is affected by a sequence of increases and decreases |

### Media  (4)

| Operator | Texera's description | Candidate Query |
|---|---|---|
| HTML Visualizer | Render the result of HTML content | Preview a webpage or HTML content directly in the workflow |
| Image Visualizer | visualize image content | Display an image in the workflow output |
| URL Visualizer | Render the content of URL | Preview the content that a link points to |
| Word Cloud | Generate word cloud for texts | Show which words appear most often in a body of text |

### Control Block  (4)

| Operator | Texera's description | Candidate Query |
|---|---|---|
| If | If | Route data down different paths based on a condition |
| Loop End | Close a loop body and decide whether to iterate again based on a condition; pairs with Loop Start. | Mark where a repeating section of the workflow finishes |
| Loop Start | Begin a loop that iterates over rows of the input table; pairs with Loop End. | Repeat a set of steps for every row in my data |
| Sleep | Sleep n seconds between each tuple | Pause the workflow for a few seconds between records |

### Database Connector  (3)

| Operator | Texera's description | Candidate Query |
|---|---|---|
| AsterixDB Source | Read data from an AsterixDB instance | Pull data from an AsterixDB database |
| MySQL Source | Read data from a MySQL instance | Load data from a MySQL database |
| PostgreSQL Source | Read data from a PostgreSQL instance | Load data from a PostgreSQL database |

### R  (2)

| Operator | Texera's description | Candidate Query |
|---|---|---|
| 1-out R UDF | User-defined function operator in R script | Run a custom R script that produces one output |
| R UDF | User-defined function operator in R script | Write custom R code to process my data |

### Java  (1)

| Operator | Texera's description | Candidate Query |
|---|---|---|
| Java UDF | User-defined function operator in Java script | Write custom Java code to process my data |

### Machine Learning General  (1)

| Operator | Texera's description | Candidate Query |
|---|---|---|
| Machine Learning Scorer | Scorer for machine learning models | Measure how well my trained model is performing |

### Advanced  (2)

| Operator | Texera's description | Candidate Query |
|---|---|---|
| Choropleth Map | Visualize data using a Choropleth Map that uses shades of colors to show differences in properties or quantities between regions | Color a map by region based on a value like population or sales |
| Scatter3D Chart | Visualize data in a Scatter3D Plot | Plot three numeric variables in a 3D scatter plot |

### Visualization  (1)

| Operator | Texera's description | Candidate Query |
|---|---|---|
| Nested Table | Visualize Data in a Depth Two Nested Table | Show grouped data as an expandable table within a table |

## Already covered

### Aggregate  (1)

| Operator | Texera's description | Candidate Query |
|---|---|---|
| Aggregate | Calculate different types of aggregation values | Calculate the sum or average of a column grouped by category |

### Data Cleaning  (5)

| Operator | Texera's description | Candidate Query |
|---|---|---|
| Distinct | Remove duplicate tuples | Remove duplicate rows from my dataset |
| Filter | Performs a filter operation using OR between multiple predicates | Keep only rows that match certain conditions |
| Limit | Limit the number of output rows | Only show the first N rows of my results |
| Projection | Keeps or drops the column | Keep only certain columns and drop the rest |
| Type Casting | Cast between types | Convert a column from text to a number |

### Data Input  (8)

| Operator | Texera's description | Candidate Query |
|---|---|---|
| Arrow File Scan | Scan data from an Arrow file | Load data from an Arrow file |
| CSV File Scan | Scan data from a CSV file | Load data from a CSV file |
| CSVOld File Scan | Scan data from a CSVOld file | Load data from an older CSV format file |
| File Lister | Select a dataset version and output one filename tuple per file | Get a list of filenames from a folder of data |
| File Scan | Scan data from a file | Read data from a generic file |
| File Scan From Input | Scan data from file paths provided by input tuples | Read files whose paths come from another operator's output |
| JSONL File Scan | Scan data from a JSONL file | Load data from a JSON Lines file |
| Text Input | Source data from manually inputted text | Manually type in some text to use as data |

### External API  (4)

| Operator | Texera's description | Candidate Query |
|---|---|---|
| Reddit Search | Search for recent posts with python-wrapped Reddit API, PRAW | Search Reddit for recent posts on a topic |
| Twitter Full Archive Search API | Retrieve data from Twitter Full Archive Search API | Search the entire history of tweets on a topic |
| Twitter Search API | Retrieve data from Twitter Search API | Search recent tweets about a topic |
| URL Fetcher | Fetch the content of a single URL | Download the content from a single web link |

### Join  (3)

| Operator | Texera's description | Candidate Query |
|---|---|---|
| Cartesian Product | Append fields together to get the cartesian product of two inputs | Combine every row of one table with every row of another |
| Hash Join | join two inputs | Combine two tables based on a matching key |
| Interval Join | Join two inputs with left table join key in the range of [right table join key, right table join key + constant value] | Match rows from two tables where one value falls within a range of the other |

### Python  (5)

| Operator | Texera's description | Candidate Query |
|---|---|---|
| 1-out Python UDF | User-defined function operator in Python script | Write custom Python code that returns one output |
| 2-in Python UDF | User-defined function operator in Python script | Write custom Python code that takes two inputs |
| Python Lambda Function | Modify or add a new column with more ease | Quickly add or modify a column with a simple expression |
| Python Table Reducer | Reduce Table to Tuple | Reduce an entire table down to a single summary row |
| Python UDF | User-defined function operator in Python script | Write custom Python code to transform my data |

### Search  (4)

| Operator | Texera's description | Candidate Query |
|---|---|---|
| Dictionary matcher | Matches tuples if they appear in a given dictionary | Flag rows whose values appear in a predefined list |
| Keyword Search | Search for keyword(s) in a string column | Find rows that contain a specific word |
| Regular Expression | Search a regular expression in a string column | Find rows matching a text pattern |
| Substring Search | Search for Substring(s) in a string column | Find rows containing a specific piece of text |

### Set  (4)

| Operator | Texera's description | Candidate Query |
|---|---|---|
| Difference | find the set difference of two inputs | Find records that are in one dataset but not another |
| Intersect | Take the intersect of two inputs | Find records that appear in both datasets |
| SymmetricDifference | find the symmetric difference (the set of elements which are in either of the sets, but not in their intersection) of two inputs | Find records that are in either dataset but not both |
| Union | Unions the output rows from multiple input operators | Combine rows from multiple datasets into one |

### Sort  (3)

| Operator | Texera's description | Candidate Query |
|---|---|---|
| Sort | Sort based on the columns and sorting methods | Order my rows by a column's value |
| Sort Partitions | Sort Partitions | Sort each partition of data independently |
| Stable Merge Sort | Stable per-partition sort with multi-key ordering (incremental stack of sorted buckets) | Sort a very large dataset by multiple keys while preserving order of ties |

### Utilities  (5)

| Operator | Texera's description | Candidate Query |
|---|---|---|
| Dummy | A dummy operator used as a placeholder. | Add a placeholder step that does nothing, for testing the workflow |
| Random K Sampling | random sampling with given percentage | Randomly select a percentage of my rows |
| Reservoir Sampling | Reservoir Sampling with k items being kept randomly | Randomly select a fixed number of rows from a large stream |
| Split | Split data to two different ports | Send my data down two different paths |
| Unnest String | Unnest the string values in the column separated by a delimiter to multiple values | Split a delimited string into multiple rows |
