Posts = new Mongo.Collection('posts');

// how it works ?
Posts.allow({
	insert: function(userId, doc) {
		// allow posting only if you are logged in
		return !! userId;
	}
});