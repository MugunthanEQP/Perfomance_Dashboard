# Performance Dashboard

The **Performance Dashboard** provides an executive-level overview of performance test reports. It tracks key metrics and trends during performance test runs, offering real-time data visualizations, error reporting, and aggregated results for effective system performance analysis.

## Features

### Key Metrics
- **Average Throughput**: Measures the average number of requests processed per unit of time.
- **Average Response Time**: Displays the average time taken to process requests.
- **90th Percentile Response Time**: Shows the response time under which 90% of requests are completed.
- **Error Rate**: Indicates the percentage of failed requests relative to total requests.
- **Virtual Users**: Displays the number of virtual users simulated during the test.

### Data Overview
- **Top 5 Slowest Responses**: Displays the five slowest response times during the test run.
- **Top 5 Errors**: Shows the most frequent errors encountered during the test.
- **Total Errors Count**: Displays the total number of errors encountered during the test.
- **All Aggregated Data**: Provides a comprehensive view of all test metrics for in-depth analysis.

### Graphical Representations
- **Timeline Graphs**: Visual representation of performance metrics (e.g., throughput, response times) over time.
- **Z-Score Results**: Shows the statistical significance of performance variations (Z-scores).
- **Average Response Time Graph**: Displays the average response time over the duration of the test.
- **Appdex Value**: Measures the user satisfaction based on response time thresholds.

## Overview

This dashboard serves as an executive report summarizing key performance metrics and trends. It visualizes the health of the system under test and helps identify areas for optimization or further investigation.

## Installation and Setup

### Prerequisites
Ensure the following tools are installed:
- **Node.js** (version 14.x or higher)
- **npm** (Node Package Manager)

### Steps to Install

1. **Clone the repository** (if not done already):
   ```bash
   git clone https://github.com/MugunthanEQP/Perfomance_Dashboard.git
   ```
2. **Install dependencies:** Navigate to the project directory and install all required packages:
    ```bash
    npm install
    ```
3. **Resolve issues with dependencies (if any):** If you encounter issues during installation, try forcing a reinstallation with the following command:
    ```bash
    npm install -f
    ```
4. **Check the package.json file:** Verify that the dependencies and scripts defined in the package.json file are correctly configured.
### Running the Dashboard
After successfully installing the dependencies:
1.  **Start the application:** Run the following command to start the dashboard:
    ```bash
    npm start
    ```
    The development server will start, and the dashboard will be accessible at http://localhost:3000 in your browser.

### Authentication

The dashboard includes an authentication mechanism to integrate with Azure DevOps (ADO). The authentication logic is already implemented but commented out. To enable ADO authentication:
1.  Uncomment the relevant sections in the code.
2.  Configure the integration with Azure DevOps to ensure only authorized users can access the dashboard.

### Technical Stack
1.  **Frontend:** Built with React.js for a dynamic and interactive user interface.
2.  **Backend:** Data is fetched and stored from Azure DevOps Blobs.
3.  **CI/CD:** The pipeline allows you to add new builds and map them to the dashboard. However, there are currently issues with the pipeline configuration that need to be resolved before full functionality is available.

### Known Issues

1.  Pipeline Issues: There are issues preventing new builds from being properly mapped to the dashboard. The pipeline configuration needs to be fixed for full functionality.
2.  Authentication Setup: The ADO authentication mechanism is present but commented out. To use it, uncomment and configure the appropriate sections in the codebase.

### Hosting

Now the application is hosted in AWS AmplifyAPP in AWS EQP Account. You can access that through [bbokta](https://bboard.okta.com/)
