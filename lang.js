	//List of node/part for the website : 
	var allTextXML = ['actuel','presentation','contactTexte','expTexte','skillTexte','researchTexte','teachingTexte'];

	//Contains item and traduction for menu/title (id, en, fr)
	var textMenuTitle= new Array();
	textMenuTitle.push(new text_traduction("homeMenu","Home","Accueil"));
	textMenuTitle.push(new text_traduction("contactme","Contact me","Contactez-moi"));
	textMenuTitle.push(new text_traduction("actual","News","Actualité"));
	textMenuTitle.push(new text_traduction("contactMenu","Contact","Contact"));
	textMenuTitle.push(new text_traduction("researchMenu","Research","Recherche"));
	textMenuTitle.push(new text_traduction("teachingMenu","Teaching","Enseignements"));
	textMenuTitle.push(new text_traduction("expMenu","Experiences & Education","Expériences & Formations"));
	textMenuTitle.push(new text_traduction("skillMenu","Skills & Interests","Compétences & Passions"));


	//Load the text from the XML document
	function chargeText(xmlhttp){
	var xmlDoc = xmlhttp.responseXML; 
		for(var text=0;text<allTextXML.length; text++){
			//Take the texte from the XML file
			var v1 = xmlDoc.getElementsByTagName(allTextXML[text])[0];
			var v2 = v1.getElementsByTagName(language)[0];
			var completeTextNode = xmlDoc.getElementsByTagName(allTextXML[text])[0].getElementsByTagName(language)[0];
			var completeText="";
			for(var t=0;t<completeTextNode.childNodes.length; t++){
				completeText+=completeTextNode.childNodes[t].textContent;
			}
			document.getElementsByName(allTextXML[text])[0].innerHTML = completeText;
		}
	}

	//Load the XML document for texte
	function changeText() {
		var xmlhttp = new XMLHttpRequest();
		xmlhttp.onreadystatechange = function() {
			if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
				chargeText(xmlhttp);
			}
		};
		xmlhttp.open("GET", "./texte.xml", true);
		xmlhttp.send();
		
		changeTextMenu(language);
	}


	//Object for traduction
	function text_traduction(nameTag,en,fr) {
		this.nameTag = nameTag;
		this.english = en;
		this.french = fr;
   	 }

	//Charge the text for menu and title
	function changeTextMenu(lang){
		var l=0;
			switch(lang){
				case "en":
				 l=1; break;
				case "fr":
				 l=2; break;
				}
		for(var i =0; i<textMenuTitle.length;i++){
		if(lang=="en")
			for(var j=0;j<document.getElementsByName(textMenuTitle[i].nameTag).length;j++)
				document.getElementsByName(textMenuTitle[i].nameTag)[j].innerHTML = 
					textMenuTitle[i].english;
		if(lang=="fr")
			for(var j=0;j<document.getElementsByName(textMenuTitle[i].nameTag).length;j++)
				document.getElementsByName(textMenuTitle[i].nameTag)[j].innerHTML = 
					textMenuTitle[i].french;

		}
	}
		
	//Menu to switch the language
	function langSwitch(lang){
		language = lang;
		
		if(lang=="en"){
			document.getElementById("en").setAttribute("disabled", true);
			document.getElementById("fr").removeAttribute("disabled");
		}else{
			document.getElementById("fr").setAttribute("disabled", true);
			document.getElementById("en").removeAttribute("disabled");
		}
		changeTextMenu(lang);
		changeText() ;
	}
