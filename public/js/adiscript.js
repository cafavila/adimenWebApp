// Script de Funcionalidad de Prueba de tecnicas y trucos en Jquery, Javasript y otras tecnologias que mejoran la experiencia de usuario de nuestro sitio.
$(document).ready(function ()
{
    $('.pull-me').click(function ()
    {
        $('.panel').slideToggle('slow');
    });
});