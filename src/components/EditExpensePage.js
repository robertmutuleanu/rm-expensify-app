import React from 'react';
import { connect } from 'react-redux';
import ExpenseForm from './ExpenseForm';
import { editExpense, startRemoveExpense } from '../actions/expenses';

export class EditExpensePage extends React.Component {
    onSubmit = (expense) => {
        this.props.editExpense(expense);
        this.props.history.push('/');
    };

    onRemove = () => {
        this.props.startRemoveExpense();
        this.props.history.push('/');
    };

    render() {
        return (
            <div>
                <h1>Edit Expense</h1>
                <ExpenseForm
                    expense={this.props.expense}
                    onSubmit={this.onSubmit}
                />
                <button onClick={this.onRemove}>
                    Remove
                </button>
            </div>
        );
    }
}

const mapStateToProps = (state, ownProps) => ({
    expense: state.expenses.find(({ id }) => id === ownProps.match.params.id)
});

const mapDispatchToProps = (dispatch, ownProps) => ({
    editExpense: (expense) => dispatch(editExpense(ownProps.match.params.id, expense)),
    startRemoveExpense: () => dispatch(startRemoveExpense({ id: ownProps.match.params.id }))
});

export default connect(mapStateToProps, mapDispatchToProps)(EditExpensePage);