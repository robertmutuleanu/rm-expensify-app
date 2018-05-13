export default (expenses) => {
    return expenses
        .map((expense) => expense.amount)
        .reduce((total, amount) => total + amount, 0);
};