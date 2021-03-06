(function () {
	"use strict";

	var DoubleDelete = function(element) {
		this.$element = $(element);
		this.$icon = this.$element.children('.icon');
		this.$message = this.$element.children('.message');

		this.init();
	}

	var proto = DoubleDelete.prototype;

	proto.init = function () {
		var self = this;

		this.$icon.on('mouseenter', function() {
			self.toggleMessage();
		});

		this.$icon.on('mouseleave', function() {
			if (self.$element.hasClass('finished')){
				self.toggleMessage();
			} else {
				self.toggleMessage();
				self.$message.html('Delete');
				self.$element.removeClass('check double-check').addClass('default');
			}
		});

		this.$icon.on('click', function() {
			self.doubleCheck();
		});
	},

	proto.toggleMessage = function() {
		this.$element.toggleClass('show');
	},

	proto.doubleCheck = function() {
		var self = this;

		if (this.$element.hasClass('default')) {
			self.$message.html('Are you sure?');
			self.$element.removeClass('default').addClass('check');
		}
		else if (this.$element.hasClass('check')) {
			self.$message.html('Deleted');
			self.$element.removeClass('check').addClass('double-check finished');
			self.$icon.removeClass('foundicon-trash').addClass('foundicon-checkmark');
		}
	}

	window.DoubleDelete = DoubleDelete;
})();


$(document).ready( function(){
	$('.double-delete').each(function(){
		new DoubleDelete(this);
	});
});
