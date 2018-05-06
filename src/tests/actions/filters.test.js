import moment from 'moment';
import {
    setTextFilter,
    sortByAmount,
    sortByDate,
    setStartDate,
    setEndDate
} from '../../actions/filters';

test('should setup set text filter action with provided value', () => {
    const text = 'test text';
    const action = setTextFilter(text);
    expect(action).toEqual({
        type: 'SET_TEXT_FILTER',
        text
    });
});

test('should setup set text filter action with default value', () => {
    const action = setTextFilter();
    expect(action).toEqual({
        type: 'SET_TEXT_FILTER',
        text: ''
    });
});

test('should setup sort by amount action', () => {
    expect(sortByAmount()).toEqual({ type: 'SORT_BY_AMOUNT' });
});

test('should setup sort by date action', () => {
    expect(sortByDate()).toEqual({ type: 'SORT_BY_DATE' });
});

test('should setup set start date action', () => {
    const date = moment(0);
    const action = setStartDate(date);
    expect(action).toEqual({
        type: 'SET_START_DATE',
        startDate: date
    });
});

test('should setup set end date action', () => {
    const date = moment(0);
    const action = setEndDate(date);
    expect(action).toEqual({
        type: 'SET_END_DATE',
        endDate: date
    });
});