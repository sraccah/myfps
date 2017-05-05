#pragma strict

var adresse_ip : String;
var pseudo_joueur : String;
var port = 25565;
var nbr_joueurs = 16;
var chat : GameObject;

function Awake()
{
	DontDestroyOnLoad(gameObject);
}

function OnGUI()
{	
	if (Network.peerType == NetworkPeerType.Disconnected)
	{
		GUI.Label(Rect(5, 10, 200, 20),  "Adresse IP du serveur :");
		adresse_ip = GUI.TextField(Rect(150, 10, 100, 20), adresse_ip);
		GUI.Label(Rect(5, 40, 200, 20),  "Pseudo du joueur :");
		pseudo_joueur = GUI.TextField(Rect(150, 40, 100, 20), pseudo_joueur);
		
		if(GUI.Button(Rect(50, 80, 100, 25), "Se Connecter") && adresse_ip.Length != 0 && pseudo_joueur != "")
		{
			Network.Connect(adresse_ip, port);
		}
	
		if(GUI.Button(Rect(300, 80, 150, 25), "Creer un serveur") && pseudo_joueur != "")
		{
			Network.InitializeServer(nbr_joueurs, port, false);
		}
	}
}

function OnServerInitialized()
{
	print("Serveur Créé !");
	chat.SendMessage("Connecte", pseudo_joueur);
}

function OnFailedToConnect()
{
	print("Impossible de se connecter au serveur : " + adresse_ip + " :(");
}

function OnConnectedToServer()
{
	print("Connexion réussie au serveur : " + adresse_ip + " :)");
	chat.SendMessage("Connecte", pseudo_joueur);
}

function OnPlayerConnected()
{
	print("Player connected !");
}

function OnPlayerDisconnected(joueur : NetworkPlayer)
{
	Network.RemoveRPCs(joueur);
	Network.DestroyPlayerObjects(joueur);
}