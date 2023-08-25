(function($) {
	'use strict';

	var timer;

	function debounce(delayMs, callback) {
		const self = this;
		if (timer) clearTimeout(timer);

		timer = setTimeout(function() {
			timer = null;
			callback.call(self);
		}, delayMs);
	}

	function search_OnKeyUp() {
		const val = $(this).val().toLowerCase();
		const $cards = $('.card');

		if (!val) {
			$cards.removeClass('d-none');
			return;
		}

		$cards.each(function() {
			const $this = $(this);
			const title = $this.find('#title').text().toLowerCase();
			const author = $this.find('#author').text().toLowerCase();

			if (title.indexOf(val) >= 0 || author.indexOf(val) >= 0)
				$this.removeClass('d-none');
			else
				$this.addClass('d-none');
		});
	}

	$(function() {
		$('#search').on('keyup', function() {
			debounce.call(this, 250, search_OnKeyUp);
		});
	});
})(jQuery);
