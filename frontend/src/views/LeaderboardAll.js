import React from 'react';

import { asyncConnect } from '../utils/components';
import { loadUsers } from '../resources/user';
import Leaderboard from '../ui/Leaderboard';


export default asyncConnect(state => ({ users: state.user, currentUserId: state.auth.id, }), { load: loadUsers })(Leaderboard);
