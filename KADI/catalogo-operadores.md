# Operator catalogue — all 166

Texera's own metadata, straight from `GET /api/resources/operator-metadata`.

**Use this to write evaluation queries.** For each operator, ask yourself how
someone would request it *without knowing its name*, and write that sentence.

**Do not open `operator-hints.json` while doing this.** It holds the phrasings
the index was built from; writing queries after reading them makes the
measurement worthless. See `metodo.md`.

Groups are ordered by how little we have tested them — the top ones need
queries most.

## Untested — write queries here first

### Sklearn Training  (26)

| Operator | Texera's description |
|---|---|
| Training: Adaptive Boosting | Sklearn Training: Adaptive Boosting Operator |
| Training: Bagging | Sklearn Training: Bagging Operator |
| Training: Bernoulli Naive Bayes | Sklearn Training: Bernoulli Naive Bayes Operator |
| Training: Complement Naive Bayes | Sklearn Training: Complement Naive Bayes Operator |
| Training: Decision Tree | Sklearn Training: Decision Tree Operator |
| Training: Dummy Classifier | Sklearn Training: Dummy Classifier Operator |
| Training: Extra Tree | Sklearn Training: Extra Tree Operator |
| Training: Extra Trees | Sklearn Training: Extra Trees Operator |
| Training: Gaussian Naive Bayes | Sklearn Training: Gaussian Naive Bayes Operator |
| Training: Gradient Boosting | Sklearn Training: Gradient Boosting Operator |
| Training: K-nearest Neighbors | Sklearn Training: K-nearest Neighbors Operator |
| Training: Linear Perceptron | Sklearn Training: Linear Perceptron Operator |
| Training: Linear Regression | Sklearn Training: Linear Regression Operator |
| Training: Linear Support Vector Machine | Sklearn Training: Linear Support Vector Machine Operator |
| Training: Logistic Regression | Sklearn Training: Logistic Regression Operator |
| Training: Logistic Regression Cross Validation | Sklearn Training: Logistic Regression Cross Validation Operator |
| Training: Multi-layer Perceptron | Sklearn Training: Multi-layer Perceptron Operator |
| Training: Multinomial Naive Bayes | Sklearn Training: Multinomial Naive Bayes Operator |
| Training: Nearest Centroid | Sklearn Training: Nearest Centroid Operator |
| Training: Passive Aggressive | Sklearn Training: Passive Aggressive Operator |
| Training: Probability Calibration | Sklearn Training: Probability Calibration Operator |
| Training: Random Forest | Sklearn Training: Random Forest Operator |
| Training: Ridge Regression | Sklearn Training: Ridge Regression Operator |
| Training: Ridge Regression Cross Validation | Sklearn Training: Ridge Regression Cross Validation Operator |
| Training: Stochastic Gradient Descent | Sklearn Training: Stochastic Gradient Descent Operator |
| Training: Support Vector Machine | Sklearn Training: Support Vector Machine Operator |

### Sklearn  (28)

| Operator | Texera's description |
|---|---|
| Adaptive Boosting | Sklearn Adaptive Boosting Operator |
| Bagging | Sklearn Bagging Operator |
| Bernoulli Naive Bayes | Sklearn Bernoulli Naive Bayes Operator |
| Complement Naive Bayes | Sklearn Complement Naive Bayes Operator |
| Decision Tree | Sklearn Decision Tree Operator |
| Dummy Classifier | Sklearn Dummy Classifier Operator |
| Extra Tree | Sklearn Extra Tree Operator |
| Extra Trees | Sklearn Extra Trees Operator |
| Gaussian Naive Bayes | Sklearn Gaussian Naive Bayes Operator |
| Gradient Boosting | Sklearn Gradient Boosting Operator |
| K-nearest Neighbors | Sklearn K-nearest Neighbors Operator |
| Linear Perceptron | Sklearn Linear Perceptron Operator |
| Linear Regression | Sklearn Linear Regression Operator |
| Linear Support Vector Machine | Sklearn Linear Support Vector Machine Operator |
| Logistic Regression | Sklearn Logistic Regression Operator |
| Logistic Regression Cross Validation | Sklearn Logistic Regression Cross Validation Operator |
| Multi-layer Perceptron | Sklearn Multi-layer Perceptron Operator |
| Multinomial Naive Bayes | Sklearn Multinomial Naive Bayes Operator |
| Nearest Centroid | Sklearn Nearest Centroid Operator |
| Passive Aggressive | Sklearn Passive Aggressive Operator |
| Probability Calibration | Sklearn Probability Calibration Operator |
| Random Forest | Sklearn Random Forest Operator |
| Ridge Regression | Sklearn Ridge Regression Operator |
| Ridge Regression Cross Validation | Sklearn Ridge Regression Cross Validation Operator |
| Sklearn Prediction | Sklearn Prediction Operator |
| Sklearn Testing | It will generate scorers for Sklearn model |
| Stochastic Gradient Descent | Sklearn Stochastic Gradient Descent Operator |
| Support Vector Machine | Sklearn Support Vector Machine Operator |

### Advanced Sklearn  (4)

| Operator | Texera's description |
|---|---|
| KNN Classifier | Sklearn KNN Classifier Operator |
| KNN Regressor | Sklearn KNN Regressor Operator |
| SVM Classifier | Sklearn SVM Classifier Operator |
| SVM Regressor | Sklearn SVM Regressor Operator |

### Basic  (16)

| Operator | Texera's description |
|---|---|
| Bar Chart | Visualize data in a Bar Chart |
| Bubble Chart | a 3D Scatter Plot; Bubbles are graphed using x and y labels, and their sizes determined by a z-value. |
| Dot Plot | Visualize data using a dot plot |
| Dumbbell Plot | Visualize data in a Dumbbell Plot. A dumbbell plot (also known as a lollipop chart) is typically used to compare two distinct values or time points for the same entity. |
| Figure Factory Table | Visualize data in a figure factory table |
| Filled Area Plot | Visualize data in a filled area plot |
| Gantt Chart | A Gantt chart is a type of bar chart that illustrates a project schedule. The chart lists the tasks to be performed on the vertical axis, and time intervals on the horizontal axis. The width of the horizontal bars in the graph shows the duration of each activity. |
| Hierarchy Chart | Visualize data in hierarchy |
| Icicle Chart | Visualize hierarchical data from root to leaves |
| Line Chart | View the result in line chart |
| Pie Chart | Visualize data in a Pie Chart |
| Range Slider | Visualize data in a Range Slider |
| Sankey Diagram | Visualize data using a Sankey diagram |
| Scatter Plot | View the result in a scatterplot |
| Tables Plot | Visualize data in a table chart. |
| Time Series Plot | Visualize trends and patterns over time. |

### Scientific  (14)

| Operator | Texera's description |
|---|---|
| Carpet Plot | Visualize data in a Carpet Plot |
| Contour Plot | Displays terrain or gradient variations in a Contour Plot |
| Dendrogram | Visualize data in a Dendrogram |
| Heatmap | Visualize data in a HeatMap Chart |
| Network Graph | Visualize data in a network graph |
| Parallel Coordinates Plot | Visualize multivariate data using parallel coordinate axes |
| Polar Chart | Displays data points in a polar scatter plot |
| Quiver Plot | Visualize vector data in a Quiver Plot |
| Radar Chart | Visualize data in a Radar Chart |
| Radar Plot | View the result in a radar plot. |
| Ternary Contour | Shows how a measured value changes across all mixtures of three components that sum to a constant |
| Ternary Plot | Points are graphed on a Ternary Plot using 3 specified data fields |
| Volcano Plot | Displays statistical significance versus effect size |
| Wind Rose Chart | Displays wind distribution using a polar bar chart |

### Statistical  (8)

| Operator | Texera's description |
|---|---|
| Box/Violin Plot | Visualize data using either a Box Plot or a Violin Plot. Box plots are drawn as a box with a vertical line down the middle which is mean value, and has horizontal lines attached to each side (known as “whiskers”). Violin plots provide more detail by showing a smoothed density curve on each side, and also include a box plot inside for comparison. |
| Continuous Error Bands | Visualize error or uncertainty along a continuous line |
| Empirical Cumulative Distribution Plot | Visualize the empirical cumulative distribution of a numeric column. |
| Histogram | Visualize data in a Histogram Chart |
| Histogram2D | Displays a bivariate histogram as a density heatmap |
| Scatter Matrix Chart | Visualize datasets in a Scatter Matrix |
| Strip Chart | Visualize distribution of data points as a strip plot |
| Tree Plot | Visualize hierarchical data as a top-down, interactive, auto-sizing tree |

### Hugging Face  (5)

| Operator | Texera's description |
|---|---|
| Hugging Face | Call a Hugging Face model via the Inference API |
| Hugging Face Iris Logistic Regression | Predict whether an iris is an Iris-setosa using a pre-trained logistic regression model |
| Hugging Face Sentiment Analysis | Analyzing Sentiments with a Twitter-Based Model from Hugging Face |
| Hugging Face Spam Detection | Spam Detection by SMS Spam Detection Model from Hugging Face |
| Hugging Face Text Summarization | Summarize the given text content with a mini2bert pre-trained model from Hugging Face |

### Financial  (5)

| Operator | Texera's description |
|---|---|
| Bullet Chart | Visualize data using a Bullet Chart that shows a primary quantitative bar and delta indicator.
Optional elements such as qualitative ranges (steps) and a performance threshold are displayed only when provided. |
| Candlestick Chart | Visualize data in a Candlestick Chart |
| Funnel Plot | Visualize data in a Funnel Plot |
| Gauge Chart | Visualize a single value with a radial gauge chart, showing progress towards a goal with optional steps, threshold, and delta. |
| Waterfall Chart | Visualize data as a waterfall chart |

### Media  (4)

| Operator | Texera's description |
|---|---|
| HTML Visualizer | Render the result of HTML content |
| Image Visualizer | visualize image content |
| URL Visualizer | Render the content of URL |
| Word Cloud | Generate word cloud for texts |

### Control Block  (4)

| Operator | Texera's description |
|---|---|
| If | If |
| Loop End | Close a loop body and decide whether to iterate again based on a condition; pairs with Loop Start. |
| Loop Start | Begin a loop that iterates over rows of the input table; pairs with Loop End. |
| Sleep | Sleep n seconds between each tuple |

### Database Connector  (3)

| Operator | Texera's description |
|---|---|
| AsterixDB Source | Read data from an AsterixDB instance |
| MySQL Source | Read data from a MySQL instance |
| PostgreSQL Source | Read data from a PostgreSQL instance |

### R  (2)

| Operator | Texera's description |
|---|---|
| 1-out R UDF | User-defined function operator in R script |
| R UDF | User-defined function operator in R script |

### Java  (1)

| Operator | Texera's description |
|---|---|
| Java UDF | User-defined function operator in Java script |

### Machine Learning General  (1)

| Operator | Texera's description |
|---|---|
| Machine Learning Scorer | Scorer for machine learning models |

### Advanced  (2)

| Operator | Texera's description |
|---|---|
| Choropleth Map | Visualize data using a Choropleth Map that uses shades of colors to show differences in properties or quantities between regions |
| Scatter3D Chart | Visualize data in a Scatter3D Plot |

### Visualization  (1)

| Operator | Texera's description |
|---|---|
| Nested Table | Visualize Data in a Depth Two Nested Table |

## Already covered

### Aggregate  (1)

| Operator | Texera's description |
|---|---|
| Aggregate | Calculate different types of aggregation values |

### Data Cleaning  (5)

| Operator | Texera's description |
|---|---|
| Distinct | Remove duplicate tuples |
| Filter | Performs a filter operation using OR between multiple predicates |
| Limit | Limit the number of output rows |
| Projection | Keeps or drops the column |
| Type Casting | Cast between types |

### Data Input  (8)

| Operator | Texera's description |
|---|---|
| Arrow File Scan | Scan data from an Arrow file |
| CSV File Scan | Scan data from a CSV file |
| CSVOld File Scan | Scan data from a CSVOld file |
| File Lister | Select a dataset version and output one filename tuple per file |
| File Scan | Scan data from a file |
| File Scan From Input | Scan data from file paths provided by input tuples |
| JSONL File Scan | Scan data from a JSONL file |
| Text Input | Source data from manually inputted text |

### External API  (4)

| Operator | Texera's description |
|---|---|
| Reddit Search | Search for recent posts with python-wrapped Reddit API, PRAW |
| Twitter Full Archive Search API | Retrieve data from Twitter Full Archive Search API |
| Twitter Search API | Retrieve data from Twitter Search API |
| URL Fetcher | Fetch the content of a single URL |

### Join  (3)

| Operator | Texera's description |
|---|---|
| Cartesian Product | Append fields together to get the cartesian product of two inputs |
| Hash Join | join two inputs |
| Interval Join | Join two inputs with left table join key in the range of [right table join key, right table join key + constant value] |

### Python  (5)

| Operator | Texera's description |
|---|---|
| 1-out Python UDF | User-defined function operator in Python script |
| 2-in Python UDF | User-defined function operator in Python script |
| Python Lambda Function | Modify or add a new column with more ease |
| Python Table Reducer | Reduce Table to Tuple |
| Python UDF | User-defined function operator in Python script |

### Search  (4)

| Operator | Texera's description |
|---|---|
| Dictionary matcher | Matches tuples if they appear in a given dictionary |
| Keyword Search | Search for keyword(s) in a string column |
| Regular Expression | Search a regular expression in a string column |
| Substring Search | Search for Substring(s) in a string column |

### Set  (4)

| Operator | Texera's description |
|---|---|
| Difference | find the set difference of two inputs |
| Intersect | Take the intersect of two inputs |
| SymmetricDifference | find the symmetric difference (the set of elements which are in either of the sets, but not in their intersection) of two inputs |
| Union | Unions the output rows from multiple input operators |

### Sort  (3)

| Operator | Texera's description |
|---|---|
| Sort | Sort based on the columns and sorting methods |
| Sort Partitions | Sort Partitions |
| Stable Merge Sort | Stable per-partition sort with multi-key ordering (incremental stack of sorted buckets) |

### Utilities  (5)

| Operator | Texera's description |
|---|---|
| Dummy | A dummy operator used as a placeholder. |
| Random K Sampling | random sampling with given percentage |
| Reservoir Sampling | Reservoir Sampling with k items being kept randomly |
| Split | Split data to two different ports |
| Unnest String | Unnest the string values in the column separated by a delimiter to multiple values |

