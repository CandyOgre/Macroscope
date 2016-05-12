import { Mongo } from 'meteor/mongo';

export const Posts = new Mongo.Collection('posts');

Meteor.methods({
  'posts.remove'(postId) {
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