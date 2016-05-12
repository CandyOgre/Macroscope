import { Template } from 'meteor/templating';

import './post_item.html';

Template.postItem.helpers({
	domain() {
		let a = document.createElement('a');
		a.href = this.url;
		return a.hostname;
	},
	
	owner() {
		return Meteor.userId() === this.owner; 
	}
});

Template.postItem.events({
	'click #removeBtn'() {
		Meteor.call('posts.remove', this._id);
	},
});