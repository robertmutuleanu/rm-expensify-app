import selectExpensesTotal from '../../selectors/expensesTotal';
import expenses from '../fixtures/expenses';

test('should return 0 if no expenses', () => {
    const total = selectExpensesTotal([]);
    expect(total).toBe(0);
});

test('should add up a single expense', () => {
    const total = selectExpensesTotal([expenses[0]]);
    expect(total).toBe(expenses[0].amount);
});

test('should add up multiple expenses', () => {
    const expectedTotal = expenses.map((expense) => expense.amount).reduce((total, amount) => total + amount, 0);

    const total = selectExpensesTotal(expenses);
    expect(total).toBe(expectedTotal);
});