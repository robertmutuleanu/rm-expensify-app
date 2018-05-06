import moment from 'moment';

export default [
    {
        id: '1',
        description: 'Coffee',
        note: '',
        amount: 200,
        createdAt: 0
    },
    {
        id: '2',
        description: 'Rent',
        note: '',
        amount: 28800,
        createdAt: moment(0).subtract(4, 'days').valueOf()
    },
    {
        id: '3',
        description: 'Udemy course',
        note: '',
        amount: 1800,
        createdAt: moment(0).add(3, 'days').valueOf()
    },
    {
        id: '4',
        description: 'Ice Coffee',
        note: '',
        amount: 350,
        createdAt: moment(0).add(10, 'days').valueOf()
    }
];