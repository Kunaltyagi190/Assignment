# Assignment

# Loan Management System

## Overview

The Loan Management System is a simple web application designed to handle basic loan management functions for a bank. This system allows users to:
- Lend money to customers.
- Make payments towards loans.
- View loan transaction ledgers.
- Get an overview of all loans and their statuses.

The application is built using HTML, CSS, and JavaScript, and it utilizes the browser's local storage for data persistence.

## Features

1. **Lend Money**: Allows the bank to provide loans to customers with no restrictions on the amount or number of loans. Calculates the total amount to be paid and the monthly EMI (Equated Monthly Installment).

2. **Make Payment**: Customers can make payments towards their loans either as monthly EMIs or as lump sum amounts. Lump sum payments reduce the total loan amount and can decrease the number of remaining EMIs.

3. **View Ledger**: Allows customers to view all transactions associated with a specific loan ID. Displays balance amount, monthly EMI, and number of EMIs left.

4. **Account Overview**: Lists all loans taken by customers, showing details such as loan amount, total amount, EMI amount, total interest, amount paid to date, and the number of EMIs left.

## Getting Started

To get started with this project, follow these steps:

1. **Clone the Repository**

    ```sh
    git clone <repository-url>
    cd <repository-directory>
    ```

2. **Open the Project**

    Open the `index.html` file in your web browser. This file provides the main user interface of the application.

## File Structure

- `index.html`: Contains the main HTML structure for the application.
- `styles.css`: Provides styling for the HTML elements to create an attractive and user-friendly interface.
- `scripts.js`: Contains JavaScript code that handles loan calculations, data persistence, and form submissions.

## Usage

1. **Lend Money**
    - Enter the customer ID, loan amount, loan period (in years), and interest rate.
    - Click "Calculate" to see the total amount to be paid and the monthly EMI.

2. **Make Payment**
    - Enter the loan ID and payment amount.
    - Click "Make Payment" to update the loan balance and view the amount paid.

3. **View Ledger**
    - Enter the loan ID.
    - Click "View Ledger" to see all transactions related to the loan.

4. **Account Overview**
    - Click "View All Loans" to see a summary of all loans with details.

## Development

- **Local Storage**: This application uses the browser's local storage to store loan data persistently. This ensures that the data is retained across page reloads.

- **Form Validation**: Basic validation is included to ensure that user inputs are valid and meaningful.

## Contribution

Feel free to fork the repository and contribute to the project. For major changes or enhancements, please open an issue or submit a pull request.


## Contact

For questions or support, please contact [kunaltyagi.van@gmail.com].

---

Enjoy using the Loan Management System! 🚀

