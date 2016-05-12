import { Template } from 'meteor/templating';
import { Posts } from '../../../api/posts/posts.js'

import './admin_posts_list.html';
import './admin_post_item.js';

Template.adminPostsList.helpers({
	posts: function() {
		return Posts.find();
	}
});