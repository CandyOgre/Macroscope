// This defines all the collections, publications and methods
// that the application provides as an API to the client.

import { Meteor } from 'meteor/meteor';
import { Posts } from '../../api/posts/posts.js';

Meteor.publish('posts', function() {
	return Posts.find();
});
