import React, { Component } from 'react'
import { sortBy, values } from 'lodash';
import PropTypes from 'prop-types'

import { loadFriends } from '../resources/friend';
import { asyncConnect } from '../utils/components';


class SelectFriends extends Component {
  getFriends = () => {
    const {currentUserId, } = this.props;
    let output = {
      mine: [],
      others: [],
    };
    sortBy(values(this.props.friends), 'name').forEach(friend => {
      if (Object.keys(friend.members).find(f => f === `${currentUserId}`)) {
        output.mine.push(friend);
      } else {
        output.others.push(friend);
      }
    });
    return output;
  }

  onChange = (evt) => {
    const { selectedIndex } = evt.target;
    this.props.onChange(evt.target.value, selectedIndex);
  };

  render() {
    const { value, } = this.props;

    const groups = this.getFriends();

    const optgroups = [<option value="all" key="all">Everybody</option>].concat(['mine', 'others'].map(label => {
      const options = groups[label].map(({ id, name, members, }) => {
        const count = Object.keys(members).length;
        return <option value={id} key={id}>{name} ({count} {count === 1 ? 'member' : 'members'})</option>
      });
      return <optgroup key={label} label={label}>{options}</optgroup>
    }));

    return (
     <select onChange={this.onChange} value={value}>{optgroups}</select>
    )
  }
}

export default asyncConnect((state, ownProps) => ({ currentUserId: state.auth.id, friends: state.friend, refresh: Object.keys(state.friend).length === 0 }), { load: loadFriends, })(SelectFriends);
