import { Template } from 'meteor/templating';
import { Router } from 'meteor/iron:router';
import { Posts } from '../../../api/posts/posts.js';

import './post_submit.html';

Template.postSubmit.events({
	'submit form': function(e) {
		e.preventDefault();

		let url = $(e.target).find('[name=url]').val();
		let title = $(e.target).find('[name=title]').val();

		Meteor.call('posts.insert', url, title);

		Router.go('postsList');
	}
});