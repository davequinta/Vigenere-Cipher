
var alpha_es = new Map();
var alpha_en = new Map();
var k=0,j=0;
for (var i = 97; i < 123; i++) {
        //console.log(String.fromCharCode(i));
        if (i==111) {alpha_es.set(String.fromCharCode(241),k++);} 
        alpha_es.set(String.fromCharCode(i),k++);
        alpha_en.set(String.fromCharCode(i),j++);
} 

function run() {
    var lang = document.getElementById("lang").value;
    var text = document.getElementById('text').value.toLowerCase();
    var key = document.getElementById('key').value.toLowerCase();
     if (text.length==0 || key.length==0) {
        alert("Error, tiene que llenar todos los campos");
        clr();
    }
    else{
        if (lang==26 && text.indexOf('ñ')!=-1) {
            alert("Error, el texto no esta en ingles");
            clr();
        }
        else{
            var radios = document.getElementsByName('optradio');
            var nkey =  mkey(text, key);
            for (var i = 0, length = radios.length; i < length; i++) {
                if (radios[i].checked) {
                    console.log(radios[i].value);
                    if(radios[i].value==0){
                        document.getElementById("result").value=encrypt(text,nkey,lang);
                    
                    }
                    else{
                        document.getElementById("result").value=desencrypt(text,nkey,lang);
                    }
                    break;
                }
            }
        }
    }
}
function encrypt(text, nkey,n){
        //Ecc Cifrado -> ci=(mi+ki) mod n; 
    var c=0;
    var emessage="";

    var alpha = (n==27) ? alpha_es : alpha_en;
    for (var i =0 ; i <text.length; i++) {
        if(!(text[i].charCodeAt() >=97 && text[i].charCodeAt() <=123) ){emessage+=text[i];  continue;}
        c=(alpha.get(text[i])+alpha.get(nkey[i])) % n;
        emessage+=([...alpha].find(([, v]) => v === c) || [])[0];
    }
    return emessage;
   
}

function desencrypt(text, nkey,n){
     
    /*Ecc Des -> di=(ci-ki) mod n ;  (Ci - Ki) >= 0 
                 di=(ci-ki+l) mod n ; (Ci - Ki) < 0    */

    var c=0,dis=0;
    var dmessage="";
    var alpha = (n==27) ? alpha_es : alpha_en;
    for (var i = 0; i < text.length; i++) {
        if(!(text[i].charCodeAt() >=97 && text[i].charCodeAt() <=123) ){dmessage+=text[i];  continue;}
        dis=alpha.get(text[i])-alpha.get(nkey[i]);
        if (dis>=0) {
            c=(dis % n);
        }
        else{
            c=(parseInt(dis)+parseInt(n))%n;
        }
        dmessage+=([...alpha].find(([, v]) => v === c) || [])[0];
        console.log("Letra "+dmessage);
    }
    return dmessage;
}
function mkey(text, key){
    var mkey="";
    var j=0;
    //var nk=key.replace(/[^\w\s]/gi, '');
        var nk=key.replace(/[^a-zA-Z0-9]/g,'');
        console.log(nk);
    for (var i = 0; i < text.length; i++) {
         if(text[i]==" "){
            mkey+=" ";
            continue;
        }
        if (j==nk.length) {j=0;}   
        mkey+=nk[j++];
        console.log("Key------->"+mkey);
    }
    return mkey;
}

function clr(){
    document.getElementById('text').value="";
    document.getElementById('key').value="";
    document.getElementById("result").value="";
}

function change(){
    document.getElementById('text').value=document.getElementById('result').value;
    document.getElementById("result").value="";

}
