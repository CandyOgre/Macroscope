import { Accounts } from 'meteor/accounts-base';
import { Roles } from 'meteor/alanning:roles';

import { Posts } from '../../api/posts/posts.js';

// Database seed
if(Posts.find().count() == 0) {
  Posts.insert({
  	title: 'Introducing Telescope',
    url: 'http://sachagreif.com/introducing-telescope'
  });

  Posts.insert({
  	title: 'Meteor',
    url: 'http://meteor.com'
  });

  Posts.insert({
  	title: 'The Meteor Book',
    url: 'http://themeteorbook.com'
  });
}

// On startup create user with administrator privileges
if(Meteor.users.find().count() === 0) {
  let userId = 
  Accounts.createUser({
    // Is it save to store in here? 
    // Or there are some better way exist?
    username: 'admin',
    password : 'admin',
    profile  : {
      //publicly visible fields like firstname goes here
    }
  });

  Roles.addUsersToRoles( userId, [ 'admins' ] );
}