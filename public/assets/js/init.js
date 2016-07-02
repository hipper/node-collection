$(document).ready(function() {

    /**
     * Get Items on load
     */
    $.get('/items', appendNewItem);


    /**
     * Form submit
     */
    $('form').on('submit', function(event) {
        event.preventDefault();

        var form = $(this);
        var formData = form.serialize();

        $('.alert').hide();

        $.ajax({
            type: 'POST', url: '/items', data: formData
        })
        .done(function(item) {
            appendNewItem([item]);
            form.trigger('reset');
        })
        .fail(function() {
            $('.alert').show();
        });
    });


    /**
     * Item delete
     */
    $('.item-list').on('click', 'a[data-item]', function(event) {
        event.preventDefault();
        
        if (!confirm('Are you sure ?')) {
            return false;
        }

        var target = $(event.currentTarget);

        $.ajax({
            type: 'DELETE',
            url: '/items/' + target.data('item')
        }).done(function() {
            target.parents('li').remove();
        });
    });

    function appendNewItem(items) {
        var list = [];
        var content, item;

        for (var i in items) {
          item = items[i];
          content = '<a href="/items/' + item + '">' + item + '</a>' +
            ' <a href="#" data-item="' + item + '">'+
            '<img src="assets/img/delete.png" width="15px"></a>';
          list.push($('<li>', { html: content }));
        }

        $('.item-list').append(list);
    }
});