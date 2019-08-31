// Dom7
var $$ = Dom7;

// Instância principal do Framework7
var app  = new Framework7({
  root: '#app', // App root element
  id: 'com.meuacademico.imjpedro', // App bundle ID
  toast: {
    closeTimeout: 3000,
    closeButton: true,
  },
  dialog:{
    buttonOk: 'OK',
    buttonCancel: 'Cancelar'
  },
  name: 'MeuAcadêmico', // App name
  theme: 'md'
});

// Criar as atividades
var homeView = app.views.create('#view-home', {
  url: '/'
});

// Ação ao clicar no botão de Add disciplina
$$('#my-login-screen .login-button').on('click', function () {
  app.loginScreen.close('#my-login-screen');
  var toast = app.toast.create({text:'Dados salvos com sucesso.', closeTimeout:3000});
  toast.open();
});

function agradecer(){
  app.dialog.alert('<p>Obrigado Raiane, por ter me incentivado a continuar a desenvolver o algoritmo de calcular notas (e ter me incentivado a estudar Cálculo também kkkk)</p><p>Obrigado Daniela, Juan, Ary, Viviane e todos os outros que me incentivam sempre a estudar, me animam, enfim, fazem o que fazem comigo kkkkk Obrigado mesmo! ^-^</p><p>Obrigado também ao pessoal do Status Mobile (principalmente ao Ericks e ao Pedro Lemos), pelo incentivo ao estudo de programação. (e pela zueira também :v)</p>','Obrigado!');
}

function contato(){
  app.dialog.alert('Quer me falar alguma coisa? Encontrou algum bug no aplicativo? Me fale então!<p>E-mail: joaopedro@gmx.com<br>WhatsApp: (88) 98818-0440<br>Twitter / Github: @12h01</p>','Fale comigo!');
}

// Diálogo de alterar nota
function dialogo_alterar_nota(name,n,npa){
  name = name.replace(/,/g, '.');
  var disc_atual = document.getElementById('pp-tt').innerHTML;
  var gavetas = localStorage.getItem('notas');
  var gaveta = gavetas.split('lllvr');
  var colunas = gaveta[indice].split('suindr');
  colunas[n] = name;
  var novascolunas = '';
  var x = 0;
  while (x<colunas.length){
    novascolunas += colunas[x]+'suindr';
    x++;
  }
  novascolunas = novascolunas.slice(0, -6); // "12345.0"
  gaveta[indice] = novascolunas;
  novascolunas = '';
  x = 0;
  while (x<gaveta.length){
    novascolunas += gaveta[x] + 'lllvr';
    x++;
  }
  novascolunas = novascolunas.slice(0, -5); // "12345.0"
  localStorage.setItem('notas',novascolunas);
  switch(n){
    case 1:
      document.getElementById('n1p1').innerHTML = name;
      break;
    case 2:
      document.getElementById('n1p2').innerHTML = name;
      break;
    case 3:
      document.getElementById('n2p1').innerHTML = name;
      break;
    case 4:
      document.getElementById('n2p2').innerHTML = name;
      break;
  }
  var c1 = parseFloat(document.getElementById('n1p1').innerHTML);
  var c2 = parseFloat(document.getElementById('n1p2').innerHTML);
  var c3 = parseFloat(document.getElementById('n2p1').innerHTML);
  var c4 = parseFloat(document.getElementById('n2p2').innerHTML);
  var pn1 = (c1+c2)/2;
  var pn2 = (c3+c4)/2;
  var pmp = parseFloat(2*pn1+3*pn2)/5;
  if (pmp<3) document.getElementById('extramsg').innerHTML = 'Com uma média parcial de '+parseFloat(pmp).toFixed(1)+', você está reprovado.';
  else if (pmp<7) document.getElementById('extramsg').innerHTML = 'Com essa nota, você está na AVF. E vai precisar tirar um '+parseFloat(10 - pmp).toFixed(2)+' para ser aprovado';
  else document.getElementById('extramsg').innerHTML = 'Você foi <span style=\'color:green;\'>Aprovado</span> com média parcial de '+parseFloat(pmp).toFixed(1);
  document.getElementById('n1').innerHTML = parseFloat(pn1).toFixed(1);
  document.getElementById('n2').innerHTML = parseFloat(pn2).toFixed(1);
  document.getElementById('mp').innerHTML = parseFloat(pmp).toFixed(1);
  app.dialog.alert('Nota alterada! Sua nota na ' +npa + ' é '+ name+'.');
}

// Alterar nota
function alterar(n){
  switch(n){
    case 1:
      var npa = '1ª prova da N1';
      break;
    case 2:
      var npa = '2ª prova da N1';
      break;
    case 3:
      var npa = '1ª prova da N2';
      break;
    case 4:
      var npa = '2ª prova da N2';
      break;
  }
  app.dialog.prompt('Informe a sua nota na '+npa,'Alterar nota', function (name) {
    if ((parseFloat(name)<=10)&&(parseFloat(name)>=0)) dialogo_alterar_nota(name,n,npa);
    else {var toast = app.toast.create({text:'Erro: A nota precisa ser um número entre 0 e 10.', closeTimeout:3000});
    toast.open();}
  });
}

function livenota(caso){
  switch(caso){
    case 2:
      var live_n1 = document.getElementById("liven1").value;
      var live_n2 = document.getElementById("liven2").value;
      var live_mp = (2*parseFloat(live_n1) + 3*parseFloat(live_n2))/5;      
      if (live_mp<3) var stac = "<b style='color:red;'>reprovado</b>.";
      else if (live_mp<7){var porcausade = 7 - live_mp; var live_avf = 10 - live_mp; var stac = "na AVF... (foi pra AVF por causa de "+parseFloat(porcausade).toFixed(2)+" pontos)</p><p style='text-align:center;'>E precisa tirar um <b>"+parseFloat(live_avf).toFixed(2)+"</b> na AVF para passar.</p>"}
      else var stac = "<b  style='color:green;'>aprovado!</b> Parabéns!";
      document.getElementById("msglive").innerHTML = "Com um "+live_n1+" na N1, e um "+live_n2+" na N2, sua média parcial é <b>"+parseFloat(live_mp).toFixed(2)+"</b>. Ou seja, você está "+stac;
      break;
    default:
      var live_n1 = document.getElementById("liven1").value;
      var live_n2 = (35 - (2*parseFloat(live_n1)))/3;
      document.getElementById("liven2").value = parseFloat(live_n2).toFixed(2);
      document.getElementById("msglive").innerHTML = "Para fechar com média 7.0, você precisa de um "+parseFloat(live_n2).toFixed(2)+" na N2.";
      break;
  }
}

var indice = 0;

// Rotina Disciplinas
function rotinaDisciplinas(){
  document.getElementById("dscp").innerHTML = '';
  if(localStorage.getItem("disc") == null){
    var toast = app.toast.create({text:'Ainda não há nenhuma disciplina cadastrada.', closeTimeout:3000});
    toast.open();
  } else {
    var disc = localStorage.getItem("disc");
    var qtd = disc.split("lulalivre");
    
    var cont = 1;
    while (cont<qtd.length){
      var node = document.createElement("LI");
      var textnode = document.createTextNode(qtd[cont]);
      node.appendChild(textnode);
      var att = document.createAttribute("class");
      att.value="list popup-open";
      var att2 = document.createAttribute("data-popup");
      att2.value = "#popup-dscp";
      node.setAttributeNode(att);
      node.setAttributeNode(att2);
      document.getElementById("dscp").appendChild(node);
      cont++;
    };
  }   
}

var ul = document.getElementById('dscp');
ul.onclick = function(event) {
    app.loginScreen.close('#my-login-screen');
    var target = event.target;
    document.getElementById('pp-tt').innerHTML = event.target.innerHTML;
    var disc = localStorage.getItem("disc");
    var qtd = disc.split("lulalivre");
    var cont = 1;
    while (cont<qtd.length){
      if (qtd[cont] == event.target.innerHTML) indice = cont;
      cont++; 
    }
    
    var gavetas = localStorage.getItem('notas');
    var gaveta = gavetas.split('lllvr');
    var colunas = gaveta[indice].split('suindr');

    document.getElementById('n1p1').innerHTML = parseFloat(colunas[1]).toFixed(1);
    document.getElementById('n1p2').innerHTML = parseFloat(colunas[2]).toFixed(1);
    document.getElementById('n2p1').innerHTML = parseFloat(colunas[3]).toFixed(1);
    document.getElementById('n2p2').innerHTML = parseFloat(colunas[4]).toFixed(1);
    
    var pn1 = parseFloat(parseFloat(colunas[1]) + parseFloat(colunas[2]))/2;
    var pn2 = parseFloat(parseFloat(colunas[3]) + parseFloat(colunas[4]))/2;
    var pmp = parseFloat(2*pn1+3*pn2)/5;
    
    if (pmp<3) document.getElementById('extramsg').innerHTML = 'Com uma média parcial de '+parseFloat(pmp).toFixed(1)+', você está reprovado.';
    else if (pmp<7) document.getElementById('extramsg').innerHTML = 'Com essa nota, você está na AVF. E vai precisar tirar um '+parseFloat(10 - pmp).toFixed(2)+' na AVF para ser aprovado';
    else document.getElementById('extramsg').innerHTML = 'Você foi <span style=\'color:green;\'>Aprovado</span> com média parcial de '+parseFloat(pmp).toFixed(1);
    
    document.getElementById('n1').innerHTML = parseFloat(pn1).toFixed(1);
    document.getElementById('n2').innerHTML = parseFloat(pn2).toFixed(1);
    document.getElementById('mp').innerHTML = parseFloat(pmp).toFixed(1);    
};  

function reset(){
  localStorage.setItem("disc",'');  
  localStorage.setItem("notas",'');  
}

function add_disc(){
  var disc = document.getElementById("disc_nome").value;
  var salvas = localStorage.getItem("disc");
  if (localStorage.getItem("disc") == null) salvas = '';
  localStorage.setItem("disc",salvas+"lulalivre"+disc);
  var salvas2 = localStorage.getItem('notas');
  if (localStorage.getItem("notas") == null) salvas2 = '';
  localStorage.setItem("notas",salvas2+'lllvr'+disc+'suindr7.0suindr7.0suindr7.0suindr7.0');
  rotinaDisciplinas();
}

