(function($) {
	'use strict';

	var deleteModal;

	function deleteModal_Show(e) {
		$('#deleteId').val($('#delete').data('deleteid'));
	}

	$(function() {
		$('#deleteTitle').text($('#detailsTitle').text());

		deleteModal = $('#deleteModal')[0];
		deleteModal.addEventListener('show.bs.modal', deleteModal_Show);
	});
})(jQuery);
