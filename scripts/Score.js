#pragma strict

var joueur : Transform;
var equipe : String;
var est_mort = true;
var chat : GameObject;
var spawn_rouge : GameObject[];
var spawn_bleu : GameObject[];

function OnGUI()
{
	if (Network.peerType == NetworkPeerType.Client || Network.peerType == NetworkPeerType.Server)
	{
		if (equipe == "")
		{
			GUI.Box(Rect(Screen.width / 2 - 125, Screen.height / 2 - 50, 250, 75), "Choisissez votre équipe");
		
			if (GUI.Button(Rect(Screen.width / 2 - 100, Screen.height / 2 - 15, 75, 30), "ROUGE"))
			{
				equipe = "ROUGE";
				chat.SendMessage("Equipe", equipe);
			}
			if (GUI.Button(Rect(Screen.width / 2 + 25, Screen.height / 2 - 15, 75, 30), "BLEU"))
			{
				equipe = "BLEUE";
				chat.SendMessage("Equipe", equipe);
			}
		}
	}
	
	if (equipe != "" && est_mort)
	{
		if (GUI.Button(Rect(Screen.width / 2 - 50, Screen.height / 2 - 15, 100, 75), "Apparaître"))
		{
			var aleatoire = Random.Range(0, 7);
			if (equipe == "ROUGE")
			{
				Network.Instantiate(joueur, spawn_rouge[aleatoire].transform.position, spawn_rouge[aleatoire].transform.rotation, 0);
			}
			if (equipe == "BLEUE")
			{
				Network.Instantiate(joueur, spawn_bleu[aleatoire].transform.position, spawn_bleu[aleatoire].transform.rotation, 0);
			}
			est_mort = false;
		}
	}
}