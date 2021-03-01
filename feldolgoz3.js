$(function(){
   
    $("#beolvas").on("click",beolvas);
    $("#kuld").on("click",adatKuld);   
    
});
var telefonkonyvem = [];

function adatKuld(){
    var szemely = {
        nev : $("#nev").val(),
        tel : $("#tel").val(),
        kep : $("#kep").val()
    };

    $.ajax({
        type: "POST",
        url: "beir.php",
        data: szemely,
        success: function(ujSzemely){
            telefonkonyvem.push(JSON.parse(ujSzemely));
            console.log(telefonkonyvem);
            kiir();
        },
        error:function(){
            alert("Hiba az adatok mentésekor!");
        }
    });
}
function beolvas(){
    $.ajax({
       type:"GET",
       url: "feldolgoz.php",
       success: function(result){
             console.log(result);
            telefonkonyvem = JSON.parse(result);
            console.log(telefonkonyvem);
            kiir();
       },
       error:function(){
           alert("hiba szöveg valami")
       }
    });
}
function kiir(){
    $("article").empty();
    for (var i = 0; i < telefonkonyvem.length; i++) {
        var nev = telefonkonyvem[i].nev;
        var tel = telefonkonyvem[i].tel;
        var kep = telefonkonyvem[i].kep;
        console.log(nev);
        var elem = "<div> <h2>"+ nev +"</h2><p>"+ tel +"</p><p>"+ kep +"</p><button>Töröl</button></div>";

        $("article").append(elem);
    }
}

//function adaTorol(){
//    console.log("Meghívtam a torol metodust");
//}