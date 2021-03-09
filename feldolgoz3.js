$(function(){
   
    $("#beolvas").on("click",beolvas);
    $("#kuld").on("click",adatKuld);   
    $("article").delegate(".torol","click",adatTorol);
    $("article").delegate(".szerkestes","click",adatModosit);
    $(".megse").on("click", adatMegse );
    $(".modosit").on("click", adatMegse );
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

function adatModosit(){
    console.log("Modosít");
    $(".szerkesztes").removeClass("elrejt");
    var index =$(this).attr("id");
    console.log(index);
        $("#id2").val();
        $("#nev2").val();
        $("#tel2").val();
        $("#kep2").val();
}

function adatMegse(){
     $(".szerkesztes").addClass("elrejt");
    }
    
    function adatModosit(){
            var editszemely = {
        ID : $("#id2").val(),
        nev : $("#nev2").val(),
        tel : $("#tel2").val(),
        kep : $("#kep2").val()
    };

    $.ajax({
        type: "PUT",
        url: "modosít.php",
        data: editSzemely,
        success: function(){
           
            beolvas();
        },
        error:function(){
            alert("Hiba az adatok módositásakor!");
        }
    });
    }
function kiir(){
    $("article").empty();
    for (var i = 0; i < telefonkonyvem.length; i++) {
        
        var szemely = telefonykonyvem[i];
        
       var elem = "<div > <h2>" + szemely.nev + "</2> <p class='tel'>" +szemely.tel + "</p> <p class='link'>" + szemely.kep + "</p> <button id=" + szemely.ID + "class='torol'>Töröl</button>\n\<button id=" + i + " class='szerkeszt'>Szerkeszt</button><hr> </div>";

        $("article").append(elem);
    }
}

function adatTorol(){
    console.log("Meghívtam a töröl metódust!");
    var ID = $(this).attr("id");
    console.log(ID);
    var aktElem = $(this).closest("div");
    $.ajax({
        type: "DELETE",
        url: "torles.php?ID=" + ID,
        success: function(){
            console.log("Megtörtént a törlés");
            aktElem.remove();
        },
        error:function(){
            alert("Hiba az adatok törlésekor!");
        }
    });
}


