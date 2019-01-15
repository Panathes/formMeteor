import peopleDB from '../../../imports/db/peopleDB';
import React, { Component } from 'react';
import { withTracker } from 'meteor/react-meteor-data';
import {Meteor} from 'meteor/meteor';

class List extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            mail: ''
        };
    }
    delete = (id, e) => {
        e.preventDefault();
        peopleDB.remove({
            _id: id
        })
    }
    render() {
        const { users } = this.props;
        console.debug(users);
        return (
            <ul>
                {users.map(user => (
                    <li key={user._id}>
                        <button>Editer</button>
                        <button onClick={(e) => this.delete(user._id, e)}>X</button>
                        {user.name} {user.mail}
                    </li>
                ))}
            </ul>
        );
    }
}
// const users = withTracker(() => {
//     let users = [];
//     const userHandle = Meteor.subscribe('peopleDB');
//     const loading = !userHandle.ready();
//     const data = peopleDB.find({});
//     const dataExists = !loading && data;
//     console.debug(data);

//     return '';
// })(List);

export default withTracker(() => {
    return {
        users: peopleDB.find().fetch()
    };
})(List);