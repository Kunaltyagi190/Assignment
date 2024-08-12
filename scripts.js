// Store loans in local storage
const getLoans = () => JSON.parse(localStorage.getItem('loans')) || [];
const saveLoans = (loans) => localStorage.setItem('loans', JSON.stringify(loans));

// Handle lending money
document.getElementById('lend-form').addEventListener('submit', function(event) {
    event.preventDefault();
    
    const customerId = document.getElementById('customer-id').value;
    const loanAmount = parseFloat(document.getElementById('loan-amount').value);
    const loanPeriod = parseInt(document.getElementById('loan-period').value, 10);
    const interestRate = parseFloat(document.getElementById('interest-rate').value);
    
    if (isNaN(loanAmount) || isNaN(loanPeriod) || isNaN(interestRate) || loanAmount <= 0 || loanPeriod <= 0 || interestRate <= 0) {
        alert('Please enter valid values for all fields.');
        return;
    }

    const principal = loanAmount;
    const rate = interestRate / 100 / 12;
    const numberOfPayments = loanPeriod * 12;
    const totalAmount = principal * Math.pow(1 + rate, numberOfPayments);
    const emi = totalAmount / numberOfPayments;

    const loanId = `${customerId}-${Date.now()}`;
    const newLoan = {
        id: loanId,
        customerId,
        principal,
        rate,
        numberOfPayments,
        totalAmount,
        emi,
        payments: [],
        amountPaid: 0,
    };

    const loans = getLoans();
    loans.push(newLoan);
    saveLoans(loans);

    const resultsDiv = document.getElementById('lend-results');
    resultsDiv.innerHTML = `
        <p><strong>Loan ID:</strong> ${loanId}</p>
        <p><strong>Customer ID:</strong> ${customerId}</p>
        <p><strong>Loan Amount:</strong> $${principal.toFixed(2)}</p>
        <p><strong>Total Amount to be Paid:</strong> $${totalAmount.toFixed(2)}</p>
        <p><strong>Monthly EMI:</strong> $${emi.toFixed(2)}</p>
    `;
});

// Handle making payments
document.getElementById('payment-form').addEventListener('submit', function(event) {
    event.preventDefault();

    const loanId = document.getElementById('payment-loan-id').value;
    const paymentAmount = parseFloat(document.getElementById('payment-amount').value);

    if (isNaN(paymentAmount) || paymentAmount <= 0) {
        alert('Please enter a valid payment amount.');
        return;
    }

    const loans = getLoans();
    const loan = loans.find(l => l.id === loanId);

    if (!loan) {
        alert('Loan ID not found.');
        return;
    }

    loan.amountPaid += paymentAmount;
    if (loan.amountPaid >= loan.totalAmount) {
        loan.amountPaid = loan.totalAmount;
        alert('Loan fully paid!');
    }

    loan.payments.push(paymentAmount);
    saveLoans(loans);

    const paymentResultsDiv = document.getElementById('payment-results');
    paymentResultsDiv.innerHTML = `
        <p><strong>Loan ID:</strong> ${loanId}</p>
        <p><strong>Amount Paid:</strong> $${paymentAmount.toFixed(2)}</p>
        <p><strong>Total Amount Paid:</strong> $${loan.amountPaid.toFixed(2)}</p>
    `;
});

// Handle viewing the ledger
document.getElementById('ledger-form').addEventListener('submit', function(event) {
    event.preventDefault();

    const loanId = document.getElementById('ledger-loan-id').value;
    const loans = getLoans();
    const loan = loans.find(l => l.id === loanId);

    if (!loan) {
        alert('Loan ID not found.');
        return;
    }

    const numberOfEmisLeft = Math.max(0, loan.numberOfPayments - loan.payments.length);

    const ledgerDiv = document.getElementById('ledger-results');
    ledgerDiv.innerHTML = `
        <p><strong>Loan ID:</strong> ${loanId}</p>
        <p><strong>Customer ID:</strong> ${loan.customerId}</p>
        <p><strong>Principal:</strong> $${loan.principal.toFixed(2)}</p>
        <p><strong>Total Amount:</strong> $${loan.totalAmount.toFixed(2)}</p>
        <p><strong>Monthly EMI:</strong> $${loan.emi.toFixed(2)}</p>
        <p><strong>Total Amount Paid:</strong> $${loan.amountPaid.toFixed(2)}</p>
        <p><strong>Number of EMIs Left:</strong> ${numberOfEmisLeft}</p>
        <p><strong>Payments:</strong> ${loan.payments.map(p => `$${p.toFixed(2)}`).join(', ')}</p>
    `;
});

// Handle account overview
document.getElementById('overview-button').addEventListener('click', function() {
    const loans = getLoans();
    if (loans.length === 0) {
        document.getElementById('overview-results').innerHTML = '<p>No loans found.</p>';
        return;
    }

    const overviewDiv = document.getElementById('overview-results');
    overviewDiv.innerHTML = loans.map(loan => {
        const numberOfEmisLeft = Math.max(0, loan.numberOfPayments - loan.payments.length);
        return `
            <div>
                <p><strong>Loan ID:</strong> ${loan.id}</p>
                <p><strong>Customer ID:</strong> ${loan.customerId}</p>
                <p><strong>Loan Amount:</strong> $${loan.principal.toFixed(2)}</p>
                <p><strong>Total Amount:</strong> $${loan.totalAmount.toFixed(2)}</p>
                <p><strong>Monthly EMI:</strong> $${loan.emi.toFixed(2)}</p>
                <p><strong>Total Amount Paid:</strong> $${loan.amountPaid.toFixed(2)}</p>
                <p><strong>Number of EMIs Left:</strong> ${numberOfEmisLeft}</p>
            </div>
            <hr>
        `;
    }).join('');
});
