import { Meteor } from 'meteor/meteor';
import { Router } from 'meteor/iron:router';
import { Posts } from '../../api/posts/posts.js';

// Import to load these templates
import '../../ui/layouts/layout.html';
import '../../ui/components/header.html';
import '../../ui/components/loading.html';
import '../../ui/components/access_denied.html';
import '../../ui/pages/not_found.html';

import '../../ui/stylesheets/style.css';

import '../../ui/pages/posts/posts_list.js';
import '../../ui/pages/posts/post_page.js';
import '../../ui/pages/posts/post_submit.js';

Router.configure({
	layoutTemplate: 'layout',
	loadingTemplate: 'loading',
	notFoundTemplate: 'notFound',
	waitOn() { return Meteor.subscribe('posts'); }
});

Router.route('/', { name: 'postsList' } );

Router.route('/posts/:_id', {
  name: 'postPage',
  data() { return Posts.findOne(this.params._id); } 
});

Router.route('/submit', { name: 'postSubmit' } );

let requireLogin = function() {
  if(! Meteor.user()) {
  	if(Meteor.loggingIn()) {
  		this.render(this.loadingTemplate);
  	} else {
  	  this.render('accessDenied');	
  	}
  } else {
  	this.next();
  }
};

Router.onBeforeAction('dataNotFound', { only: 'postPage' });
Router.onBeforeAction(requireLogin, { only: 'postSubmit' });