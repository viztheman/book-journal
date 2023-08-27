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

	function card(journal) {
		return `
			<div class="card book-card mt-3 me-2" style="width: 18rem;">
				<div class="card-body">
					<div class="card-title d-flex justify-content-between">
						<div>
							<h5>
								<a class="title" href="/details/${journal._id}">
									${journal.title}
								</a>
							</h5>
							<small>${journal.author}</small>
						</div>
						<h5>
							${journal.rating} &starf;
						</h5>
					</div>
					<p class="card-text mt-4">${journal.notes}</p>
				</div>
			</div>
		`;
	}

	async function search_OnKeyUp() {
		const response = await fetch('/', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({
				text: $('#search').val()
			})
		});

		const data = await response.json();
		const $cards = $('<div class="cards d-flex flex-wrap justify-content-center"></div>');

		for (const journal of data)
			$cards.append($(card(journal)));

		$('.cards').replaceWith($cards);
	}

	$(function() {
		$('#search').on('keyup', function() {
			debounce.call(this, 250, search_OnKeyUp);
		});
	});
})(jQuery);
