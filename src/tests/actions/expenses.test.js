import configureStore from 'redux-mock-store';

import expenses from '../fixtures/expenses';
import thunk from 'redux-thunk';
import database from '../../firebase/firebase';
import {
    startSetExpenses,
    setExpenses,
    startAddExpense,
    addExpense,
    editExpense,
    startEditExpense,
    removeExpense,
    startRemoveExpense
} from '../../actions/expenses';

const uid = 'testuid';
const defaultAuthState = { auth: { uid } };
const createMockStore = configureStore([thunk]);

beforeEach((done) => {
    const expensesData = {};
    expenses.forEach(({ id, description, note, amount, createdAt }) => {
        expensesData[id] = { description, note, amount, createdAt };
    });
    database.ref(`users/${uid}/expenses`).set(expensesData)
        .then(() => done());
});

test('should create set expenses action', () => {
    const action = setExpenses(expenses);
    expect(action).toEqual({
        type: 'SET_EXPENSES',
        expenses
    });
});

test('should fetch expenses from db and add to store', (done) => {
    const store = createMockStore(defaultAuthState);
    store.dispatch(startSetExpenses())
        .then(() => {
            const actions = store.getActions();
            expect(actions[0]).toEqual({
                type: 'SET_EXPENSES',
                expenses
            });
            done();
        });
});

test('should create remove expense action', () => {
    const action = removeExpense({ id: 'testid' });
    expect(action).toEqual({
        type: 'REMOVE_EXPENSE',
        id: 'testid'
    });
});

test('should remove expense from db and store', (done) => {
    const store = createMockStore(defaultAuthState);
    const id = expenses[0].id;

    store.dispatch(startRemoveExpense({ id }))
        .then(() => {
            const actions = store.getActions();
            expect(actions[0]).toEqual({
                type: 'REMOVE_EXPENSE',
                id
            });

            return database.ref(`users/${uid}/expenses/${id}`).once('value');
        })
        .then((snapshot) => {
            expect(snapshot.val()).toBe(null);
            done();
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

test('should edit expense from db and store', (done) => {
    const store = createMockStore(defaultAuthState);
    const id = expenses[0].id;
    const updates = {
        note: 'updated note'
    };

    store.dispatch(startEditExpense(id, updates))
        .then(() => {
            const actions = store.getActions();
            expect(actions[0]).toEqual({
                type: 'EDIT_EXPENSE',
                id,
                updates
            });

            return database.ref(`users/${uid}/expenses/${id}`).once('value');
        })
        .then((snapshot) => {
            expect(snapshot.val().note).toBe(updates.note);
            done();
        });
});

test('should create add expense action', () => {
    const action = addExpense(expenses[0]);
    expect(action).toEqual({
        type: 'ADD_EXPENSE',
        expense: expenses[0]
    });
});

test('should add expense with provided values to db and store', (done) => {
    const store = createMockStore(defaultAuthState);
    const expenseData = {
        description: 'Mouse',
        amount: 3000,
        note: '',
        createdAt: 1000
    };

    store.dispatch(startAddExpense(expenseData))
        .then(() => {
            const actions = store.getActions();
            expect(actions[0]).toEqual({
                type: 'ADD_EXPENSE',
                expense: {
                    id: expect.any(String),
                    ...expenseData
                }
            });

            return database.ref(`users/${uid}/expenses/${actions[0].expense.id}`).once('value');
        })
        .then((snapshot) => {
            expect(snapshot.val()).toEqual(expenseData);
            done();
        });
});

test('should add expense with default values to db and store', (done) => {
    const store = createMockStore(defaultAuthState);
    const expenseDefaults = {
        description: '',
        note: '',
        amount: 0,
        createdAt: 0
    };

    store.dispatch(startAddExpense({}))
        .then(() => {
            const actions = store.getActions();
            expect(actions[0]).toEqual({
                type: 'ADD_EXPENSE',
                expense: {
                    id: expect.any(String),
                    ...expenseDefaults
                }
            });

            return database.ref(`users/${uid}/expenses/${actions[0].expense.id}`).once('value');
        })
        .then((snapshot) => {
            expect(snapshot.val()).toEqual(expenseDefaults);
            done();
        });
});