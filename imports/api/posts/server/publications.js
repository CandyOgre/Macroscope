import { Meteor } from 'meteor/meteor';
import { Posts } from '../posts.js';

Meteor.publish('posts', function() {
	return Posts.find();
});