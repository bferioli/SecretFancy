var FancyForm = Backbone.View.extend({
	id: '#send-fancy',
	events: {
		'change input[name=delivery]': 'changeDelivery',
		'change #first_name': 'changeFirstName',
		'change #phone': 'changePhone',
		'change #email': 'changeEmail',
		'change #message': 'changeMessage',
		'submit #fancy-form': 'sendMessage'
	},
	changeDelivery: function(){
		var delivery = this.$el.find('input[name=delivery]:checked').val();
		this.phoneGroup.toggle();
		this.emailGroup.toggle();
		this.model.set({'delivery': delivery});
	},
	changeFirstName: function(){
		this.model.set({'first_name': this.firstName.val()});
	},
	changePhone: function(){
		var phone = "+1" + this.phone.val().replace(/\D/g,'');
		this.model.set({'phone': phone});
	},
	changeEmail: function(){
		this.model.set({'email': this.email.val()});
	},
	changeMessage: function(){
		this.model.set({'message': this.message.val()});
	},
	sendCallback: function() {
		var self = this;
		this.trigger('messageSent');
		this.$el.slideUp(function(){
			self.remove();
		});
	},
	sendMessage: function(e){
		e.preventDefault();
		var valid = this.validateForm();
		if (valid)
			this.model.save({}, {success: $.proxy(this.sendCallback, this)});
	},
	showError: function(err){
		this.errorMsg.text(err);
		this.errorMsg.show();
	},
	validateForm: function(){
		if (this.model.get('delivery') === 'text' && this.phone.val() === ''){
			this.showError('Please enter a phone number');
			return false;
		} else if (this.model.get('delivery') === 'email' && this.email.val() === '') {
			this.showError('Please enter a valid email address');
			return false;
		} else if (this.firstName.val() === '') {
			this.showError('Please enter a first name');
			return false;
		} else if (this.message.val() === '') {
			this.showError('Please enter a message');
			return false;
		} else {
			return true;
		}
	},
	initialize: function(){
		this.render();

		this.firstName = this.$el.find('#first_name');
		this.phone = this.$el.find('#phone');
		this.phoneGroup = this.$el.find('.phone-group');
		this.email = this.$el.find('#email');
		this.emailGroup = this.$el.find('.email-group');
		this.message = this.$el.find('#message');
		this.errorMsg = this.$el.find('.error');

		this.phone.mask("(999) 999-9999");
	},
	render: function(){
		var source = $('#FancyFormTemplate').html();
		var template = Handlebars.compile(source);
		this.$el.html(template(this.model.toJSON()));
		$('#content').append(this.$el);
	}
});