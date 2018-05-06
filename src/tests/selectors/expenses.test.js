import moment from 'moment'
import selectExpenses from '../../selectors/expenses';
import expenses from '../fixtures/expenses';

test('should filter by text', () => {
    const filters = {
        text: 'coffee',
        sortBy: 'date',
        startDate: undefined,
        endDate: undefined
    };
    const selectedExpenses = selectExpenses(expenses, filters);
    expect(selectedExpenses).toEqual([expenses[3], expenses[0]]);
});

test('should filter by start date', () => {
    const filters = {
        text: '',
        sortBy: 'date',
        startDate: moment(0),
        endDate: undefined
    };
    const selectedExpenses = selectExpenses(expenses, filters);
    expect(selectedExpenses).toEqual([expenses[3], expenses[2], expenses[0]]);
});

test('should filter by end date', () => {
    const filters = {
        text: '',
        sortBy: 'date',
        startDate: undefined,
        endDate: moment(0)
    };
    const selectedExpenses = selectExpenses(expenses, filters);
    expect(selectedExpenses).toEqual([expenses[0], expenses[1]]);
});

test('should sort by date', () => {
    const filters = {
        text: '',
        sortBy: 'date',
        startDate: undefined,
        endDate: undefined
    };
    const selectedExpenses = selectExpenses(expenses, filters);
    expect(selectedExpenses).toEqual([expenses[3], expenses[2], expenses[0], expenses[1]]);
});

test('should sort by amount', () => {
    const filters = {
        text: '',
        sortBy: 'amount',
        startDate: undefined,
        endDate: undefined
    };
    const selectedExpenses = selectExpenses(expenses, filters);
    expect(selectedExpenses).toEqual([expenses[1], expenses[2], expenses[3], expenses[0]]);
});