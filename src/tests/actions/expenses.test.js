import configureStore from 'redux-mock-store';
import { startAddExpense, addExpense, editExpense, removeExpense } from '../../actions/expenses';
import expenses from '../fixtures/expenses';
import thunk from 'redux-thunk';
import database from '../../firebase/firebase';

const createMockStore = configureStore([thunk]);

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

test('should create add expense action', () => {
    const action = addExpense(expenses[0]);
    expect(action).toEqual({
        type: 'ADD_EXPENSE',
        expense: expenses[0]
    });
});

test('should add expense with provided values to db and store', (done) => {
    const store = createMockStore({});
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

            return database.ref(`expenses/${actions[0].expense.id}`).once('value');
        })
        .then((snapshot) => {
            expect(snapshot.val()).toEqual(expenseData);
            done();
        });
});

test('should add expense with default values to db and store', (done) => {
    const store = createMockStore({});
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

            return database.ref(`expenses/${actions[0].expense.id}`).once('value');
        })
        .then((snapshot) => {
            expect(snapshot.val()).toEqual(expenseDefaults);
            done();
        });
});

// test('should create add expense action with default values', () => {
//     const action = addExpense();
//     expect(action).toEqual({
//         type: 'ADD_EXPENSE',
//         expense: {
//             id: expect.any(String),
//             description: '',
//             note: '',
//             amount: 0,
//             createdAt: 0
//         }
//     });
// });