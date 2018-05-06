import React from 'react';
import { shallow } from 'enzyme';
import { ExpenseListFilters } from '../../components/ExpenseListFilters';
import { filters, altFilters } from '../fixtures/filters';
import moment from 'moment';

let setTextFilter, sortByDate, sortByAmount, setStartDate, setEndDate, wrapper;

beforeEach(() => {
    setTextFilter = jest.fn();
    sortByDate = jest.fn();
    sortByAmount = jest.fn();
    setStartDate = jest.fn();
    setEndDate = jest.fn();
    wrapper = shallow(
        <ExpenseListFilters
            filters={filters}
            setTextFilter={setTextFilter}
            sortByDate={sortByDate}
            sortByAmount={sortByAmount}
            setStartDate={setStartDate}
            setEndDate={setEndDate}
        />
    );
});

test('should render ExpenseListFilters', () => {
    expect(wrapper).toMatchSnapshot();
});

test('should render ExpenseListFilters with alt filters', () => {
    wrapper.setProps({
        filters: altFilters
    });
    expect(wrapper).toMatchSnapshot();
});

test('should handle text change', () => {
    const value = 'test text';
    wrapper.find('input').simulate('change', {
        target: { value }
    });

    expect(setTextFilter).toHaveBeenLastCalledWith(value);
});

test('should sort by date', () => {
    wrapper.setProps({
        filters: altFilters
    });

    wrapper.find('select').simulate('change', {
        target: { value: 'date' }
    });

    expect(sortByDate).toHaveBeenCalled();
});

test('should sort by amount', () => {
    wrapper.find('select').simulate('change', {
        target: { value: 'amount' }
    });

    expect(sortByAmount).toHaveBeenCalled();
});

test('should handle date changes', () => {
    const startDate = moment(0).add(4, 'years');
    const endDate = moment(0).add(8, 'years');
    wrapper.find('DateRangePicker').prop('onDatesChange')({ startDate, endDate });
    expect(setStartDate).toHaveBeenLastCalledWith(startDate);
    expect(setEndDate).toHaveBeenLastCalledWith(endDate);
});

test('should set calendarFocused on change', () => {
    const focused = 'startDate';
    wrapper.find('DateRangePicker').prop('onFocusChange')(focused);
    expect(wrapper.state('calendarFocused')).toBe(focused);
});
