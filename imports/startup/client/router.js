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
import '../../ui/pages/posts/admin_posts_list.js';
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

let filters = {
  /**
   * ensure user is logged in and 
   * email verified
   */
  authenticate() {
    let user;

    if (Meteor.loggingIn()) {
      console.log('[authenticate filter] loading')
      this.layout('layout')
      this.render('loading')

    } else {
      user = Meteor.user();

      if (!user) {
        console.log('[authenticate filter] signin')
        this.layout('layout')
        this.render('accessDenied')
        return;
      }

      if(!Roles.userIsInRole( Meteor.userId(), 'admins' )) {
        //TODO: I don`t like this console.logs
        console.log('[authenticate filter] not in \'admins\' role group')
        this.layout('layout')
        this.render('accessDenied')
        return;
      }

      console.log('[authenticate filter] done')
      this.layout('layout')

      this.next();
    }
  },
}

Router.route('/admin', {
  name: 'adminPostsList',
  before: filters.authenticate
  });

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