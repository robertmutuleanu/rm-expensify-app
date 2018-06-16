import authReducer from '../../reducers/auth';

test('should set default state', () => {
    const state = authReducer(undefined, { type: '@@INIT' });
    expect(state).toEqual({});
});

test('should add user uid when login', () => {
    const action = {
        type: 'LOGIN',
        uid: 'testuid'
    };
    const state = authReducer({}, action);
    expect(state).toEqual({
        uid: action.uid
    });
});

test('should remove user uid when logout', () => {
    const previousState = {
        uid: 'prevuid'
    };
    const state = authReducer(previousState, { type: 'LOGOUT' });
    expect(state).toEqual({});
});