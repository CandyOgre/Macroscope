import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { SimpleSchema } from 'meteor/aldeed:simple-schema';

export const Posts = new Mongo.Collection('posts');

Meteor.methods({
  'posts.insert'(url, title) {
    new SimpleSchema({
      url: {type: String},
      title: {type: String}
    }).validate({url, title});

    if(this.userId === undefined) {
      alert('Not logged in');
      return;
    }

    Posts.insert({
      title: title,
      url: url,
      owner: this.userId
    });

    //TODO: check for inserting, lazy pig!
    console.log(`Inserted with title: ${title}`);
  },

  'posts.remove'(postId) {
  	new SimpleSchema({
  	  postId: {type: String}
  	}).validate({postId});

  	const post = Posts.findOne(postId);
  	Posts.remove(postId);
  },
});
