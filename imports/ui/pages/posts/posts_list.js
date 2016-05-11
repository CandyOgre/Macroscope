import { Template } from 'meteor/templating';
import { Posts } from '../../../api/posts/posts.js'

import './posts_list.html';
import './post_item.js';

Template.postsList.helpers({
	posts: function() {
		return Posts.find();
	}
});