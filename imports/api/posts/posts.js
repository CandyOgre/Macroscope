import { Mongo } from 'meteor/mongo';

export const Posts = new Mongo.Collection('posts');

Posts.allow({
	insert: function(userId, doc) {
		// allow posting only if you are logged in
		return !! userId;
	}
});