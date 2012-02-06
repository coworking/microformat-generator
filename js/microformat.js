$MicroFormat = (MicroFormat = function() {}).prototype = {};

Main = new MicroFormat();

$MicroFormat.run = function() {
    $('.content').jemplate('input.html');
    $('form[name="microformat"]').bind('submit', function(e) {
        e.preventDefault();
        $('.result').show();
        var data = {};
        data.space_name = $('input[name="space_name"]').val();
        data.latitude = $('input[name="latitude"]').val();
        data.longitude = $('input[name="longitude"]').val();
        var microformat = Jemplate.process('microformat.html', data)
            .replace(/&/g, '&amp;')
            .replace(/</g, '&lt;')
            .replace(/>/g, '&gt;');
        $('textarea').html(microformat);
    });
}
