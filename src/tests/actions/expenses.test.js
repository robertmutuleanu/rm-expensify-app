import { addExpense, editExpense, removeExpense } from '../../actions/expenses';

test('should create remove expense action', () => {
    const action = removeExpense({ id: 'testid' });
    expect(action).toEqual({
        type: 'REMOVE_EXPENSE',
        id: 'testid'
    });
});

test('should create edit expense action', () => {
    const action = editExpense('testid', { note: 'updated note' });
    expect(action).toEqual({
        type: 'EDIT_EXPENSE',
        id: 'testid',
        updates: {
            note: 'updated note'
        }
    });
});

test('should create add expense action with provided values', () => {
    const expense = {
        description: 'test description',
        note: 'test note',
        amount: 109500,
        createdAt: 1000
    };
    const action = addExpense(expense);
    expect(action).toEqual({
        type: 'ADD_EXPENSE',
        expense: {
            ...expense,
            id: expect.any(String)
        }
    });
});

test('should create add expense action with default values', () => {
    const action = addExpense();
    expect(action).toEqual({
        type: 'ADD_EXPENSE',
        expense: {
            id: expect.any(String),
            description: '',
            note: '',
            amount: 0,
            createdAt: 0
        }
    });
});