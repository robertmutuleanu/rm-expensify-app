import moment from 'moment';
import filtersReducer from '../../reducers/filters';

test('should set default state', () => {
    const state = filtersReducer(undefined, { type: '@@INIT' });
    expect(state).toEqual({
        text: '',
        sortBy: 'date',
        startDate: moment().startOf('month'),
        endDate: moment().endOf('month')
    });
});

test('should set sortBy to amount', () => {
    const state = filtersReducer(undefined, { type: 'SORT_BY_AMOUNT' });
    expect(state.sortBy).toBe('amount');
});

test('should set sortBy to date', () => {
    const prevState = {
        text: '',
        sortBy: 'amount',
        startDate: undefined,
        endDate: undefined
    };
    const action = { type: 'SORT_BY_DATE' };
    const state = filtersReducer(prevState, action);
    expect(state.sortBy).toBe('date');
});

test('should set text filter', () => {
    const text = 'test text';
    const action = {
        type: 'SET_TEXT_FILTER',
        text
    };
    const state = filtersReducer(undefined, action);
    expect(state.text).toBe(text); 
});

test('should set start date filter', () => {
    const date = moment();
    const action = {
        type: 'SET_START_DATE',
        startDate: date
    };
    const state = filtersReducer(undefined, action);
    expect(state.startDate).toEqual(date);
});

test('should set end date filter', () => {
    const date = moment();
    const action = {
        type: 'SET_END_DATE',
        endDate: date
    };
    const state = filtersReducer(undefined, action);
    expect(state.endDate).toEqual(date);
});