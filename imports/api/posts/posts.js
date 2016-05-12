import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { SimpleSchema } from 'meteor/aldeed:simple-schema';

export const Posts = new Mongo.Collection('posts');

Meteor.methods({
  'posts.remove'(postId) {
  	new SimpleSchema({
  	  postId: {type: String}
  	}).validate({postId});

  	const post = Posts.findOne(postId);
  	Posts.remove(postId);
  },
});

Posts.allow({
	insert: function(userId, doc) {
		// allow posting only if you are logged in
		return !! userId;
	}
});