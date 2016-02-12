Template.postSubmit.events({
	'submit form': function(e) {
		// when browser can go ahead and try to submit the form ??? 
		e.preventDefault();

		var post = {
          url: $(e.target).find('[name=url]').val(),
          title: $(e.target).find('[name=title]').val()
		};

		// what for ? for Router.go for creating Url maybe ?
		post._id = Posts.insert(post);
		Router.go('postPage', post);
	}
});