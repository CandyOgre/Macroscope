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

    let ownerUsername = Meteor.users.findOne(this.userId).username;

    Posts.insert({
      title: title,
      url: url,
      owner: this.userId,
      ownerUsername: ownerUsername
    });

    //TODO: check for inserting, lazy pig!
    console.log(`Inserted with title: ${title}`);
  },

  // I doesn`t add validation for owner rights,
  // because in that case admin will be not able to delete posts
  // TODO: think about normal administrator system
  'posts.remove'(postId) {
  	new SimpleSchema({
  	  postId: {type: String}
  	}).validate({postId});

  	const post = Posts.findOne(postId);
  	Posts.remove(postId);
  },
});
