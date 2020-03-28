import React from 'react';
import renderer from 'react-test-renderer';
import Users from '../components/Users';

test('User password reset page should load', () => {
    const component = renderer.create(
        <Users/>
    );
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
});
