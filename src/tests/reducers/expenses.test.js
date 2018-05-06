import expensesReducer from '../../reducers/expenses';
import expenses from '../fixtures/expenses';

test('should set default state', () => {
    const state = expensesReducer(undefined, { type: '@@INIT' });
    expect(state).toEqual([]);
});

test('should remove expense when found', () => {
    const action = {
        type: 'REMOVE_EXPENSE',
        id: expenses[0].id
    };
    const state = expensesReducer(expenses, action);
    expect(state).toEqual([expenses[1], expenses[2], expenses[3]]);
});

test('should not remove expense when not found', () => {
    const action = {
        type: 'REMOVE_EXPENSE',
        id: '-1'
    };
    const state = expensesReducer(expenses, action);
    expect(state).toEqual(expenses);
});

test('should add expense', () => {
    const expense = {
        id: '101',
        description: 'Laptop',
        note: '',
        amount: 200000,
        createdAt: 1500
    };
    const action = {
        type: 'ADD_EXPENSE',
        expense
    };
    const state = expensesReducer(expenses, action);
    expect(state).toEqual([...expenses, expense]);
});

test('should edit expense when found', () => {
    const amount = 350;
    const action = {
        type: 'EDIT_EXPENSE',
        id: expenses[0].id,
        updates: { amount }
    };
    const state = expensesReducer(expenses, action);
    expect(state[0].amount).toBe(amount);
});

test('should not edit expense when not found', () => {
    const amount = 350;
    const action = {
        type: 'EDIT_EXPENSE',
        id: '-1',
        updates: { amount }
    };
    const state = expensesReducer(expenses, action);
    expect(state).toEqual(expenses);
});
