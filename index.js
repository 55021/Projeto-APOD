$(".apodbtn").click(function(date) {
    setApod();
});

$(".new-date").click(function() {
    location.reload();
});

function setApod() {    
    var date = $("#apod-date").val();
    console.log(date);
    var link = `https://api.nasa.gov/planetary/apod?api_key=j3gAcBzYdK0oGQdLD6Eaj9SF9Dq6NTIplK9ybvZi&date=${date}`;

    $.ajax({url: link,
        success: function(apod){
            $('.input').addClass('invisible');
            $('.new-date').removeClass('invisible');
            $('.description').removeClass('invisible');
            $('.description').text(apod.explanation);
            $('.identification').removeClass('invisible');
            $('.copyright').text(apod.copyright);
            $('.copyright').removeClass('invisible');
            $('.pic').attr('src', apod.url);
            $('.pic').removeClass('invisible');
            
            var oTitulo = apod.title;
            var oTipo = apod.media_type;

            function getTitle() {
                if (oTitulo.includes(':') == true && oTipo === "image") {
                var titleSubtitle = oTitulo.split(': ');
                $('.title').text(titleSubtitle[0]);
                $('.subtitle').text(titleSubtitle[1]);
                $('.subtitle').removeClass('invisible');
            } else {
                $('.title').text(oTitulo);
                $('.subtitle').addClass('invisible');
            }}
            getTitle();
            
            if (apod.media_type === "video") {
                $('.vid').attr('src', apod.url);
                $('.vid').removeClass('invisible');
            } else if (apod.media_type === "image") {
                $('.img').attr('src', apod.url);
                $('.img').removeClass('invisible');
            }
        }, error: function() {
            $('.input-title').text("Date not avaliable. Please choose a date after June 20th, 1995.");
        }
    })
}