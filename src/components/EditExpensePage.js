import React from 'react';
import { connect } from 'react-redux';
import ExpenseForm from './ExpenseForm';
import { startEditExpense, startRemoveExpense } from '../actions/expenses';

export class EditExpensePage extends React.Component {
    onSubmit = (expense) => {
        this.props.startEditExpense(expense);
        this.props.history.push('/');
    };

    onRemove = () => {
        this.props.startRemoveExpense();
        this.props.history.push('/');
    };

    render() {
        return (
            <div>
                <div className="page-header">
                    <div className="container">
                        <h1 className="page-header__title">Edit Expense</h1>
                    </div>
                </div>
                <div className="container">
                    <ExpenseForm
                        expense={this.props.expense}
                        onSubmit={this.onSubmit}
                    />
                    <button className="button button--secondary" onClick={this.onRemove}>Remove</button>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state, ownProps) => ({
    expense: state.expenses.find(({ id }) => id === ownProps.match.params.id)
});

const mapDispatchToProps = (dispatch, ownProps) => ({
    startEditExpense: (expense) => dispatch(startEditExpense(ownProps.match.params.id, expense)),
    startRemoveExpense: () => dispatch(startRemoveExpense({ id: ownProps.match.params.id }))
});

export default connect(mapStateToProps, mapDispatchToProps)(EditExpensePage);