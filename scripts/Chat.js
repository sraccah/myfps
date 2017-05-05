#pragma strict

var ligne_chat = new String[4];
var texte_chat : String;
var pseudo : String;
var texte_nom : String;
var welcome : String;

texte_chat = "";
pseudo = "";
texte_nom = "";
welcome = "";

function OnGUI()
{
	if (Network.peerType == NetworkPeerType.Client || Network.peerType == NetworkPeerType.Server)
	{
		texte_chat = GUI.TextField(Rect(0, Screen.height -20, 200, 20), texte_chat);

		// CHAT ------------------------------------------------->

		GUI.Label(Rect(0, Screen.height -100, 400, 20), ligne_chat[3]);
		GUI.Label(Rect(0, Screen.height -80, 400, 20), ligne_chat[2]);
		GUI.Label(Rect(0, Screen.height -60, 400, 20), ligne_chat[1]);
		GUI.Label(Rect(0, Screen.height -40, 400, 20), ligne_chat[0]);

		// FIN DE CHAT ------------------------------------------>

		if (GUI.Button(Rect(200, Screen.height -20, 100, 20), "Envoyer") && texte_chat.Length != 0)
		{
			texte_nom = pseudo + " : " + texte_chat;
			networkView.RPC("RafraichirChat", RPCMode.All, texte_nom);
			texte_chat = "";
		}
	}
}

function Connecte(nom : String)
{
	pseudo = nom;
	nom += " s'est connecté au serveur !";
	networkView.RPC("RafraichirChat", RPCMode.All, nom);
}

function Equipe(color : String)
{
	var texte_equipe = pseudo + " a rejoind l'équipe : " + color;
	networkView.RPC("RafraichirChat", RPCMode.All, texte_equipe);
}

@RPC
function RafraichirChat(texte : String)
{
	ligne_chat[3] = ligne_chat[2];
	ligne_chat[2] = ligne_chat[1];
	ligne_chat[1] = ligne_chat[0];
	ligne_chat[0] = texte;
}