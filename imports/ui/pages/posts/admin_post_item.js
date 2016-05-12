import { Template } from 'meteor/templating';

import './admin_post_item.html';

Template.adminPostItem.helpers({
	domain() {
		let a = document.createElement('a');
		a.href = this.url;
		return a.hostname;
	},
	
	owner() {
		//TODO: admin has all rights
		return true; 
	}
});

Template.adminPostItem.events({
	'click #removeBtn'() {
		Meteor.call('posts.remove', this._id);
	},
});