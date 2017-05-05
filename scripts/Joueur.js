#pragma strict
@script RequireComponent(CharacterController)

var vitesse_deplacement = 10;
var direction_deplacement : Vector3 = Vector3.zero;
var saut = 5;
var gravite = 20;
var vie = 100;
var score : GameObject;
var equipe : String;

var joueur : CharacterController;
joueur = GetComponent(CharacterController);

function Start()
{
	if (networkView.isMine == false)
	{
		gameObject.GetComponent(Joueur).enabled = false;
		gameObject.GetComponent(RotationY).enabled = false;
		gameObject.GetComponentInChildren(Camera).enabled = false;
		gameObject.GetComponentInChildren(GUILayer).enabled = false;
		gameObject.GetComponentInChildren(AudioListener).enabled = false;
		gameObject.GetComponentInChildren(RotationX).enabled = false;
		gameObject.GetComponentInChildren(Tir_Magnum).enabled = false;
		
		networkView.RPC("DemandeCouleur", RPCMode.All);
		
		name = "Autre Joueur";
	}
	else
	{
		score = GameObject.Find("Score");
		equipe = score.GetComponent(Score).equipe;
		
		networkView.RPC("SyncCouleur", RPCMode.All, equipe);
		name = "Moi";
	}
}

@RPC
function DemandeCouleur()
{
	if (networkView.isMine)
	{
		networkView.RPC("SyncCouleur", RPCMode.All, equipe);
	}
}

function Update () {
	
	direction_deplacement.z = Input.GetAxisRaw("Vertical");
	direction_deplacement.x = Input.GetAxisRaw("Horizontal");
	
	direction_deplacement = transform.TransformDirection(direction_deplacement);
	
	if (Input.GetButtonDown("Sauter") && joueur.isGrounded)
	{
		direction_deplacement.y = saut; 
	}
	if (joueur.isGrounded == false)
	{
		direction_deplacement.y -= gravite * Time.deltaTime;
	}
	
	joueur.Move(direction_deplacement * Time.deltaTime * vitesse_deplacement);
}

function OnGUI()
{
	GUI.Label(Rect(Screen.width - 100, Screen.height - 25, 100, 25), "Vie : " + vie);
}

function Degat(degat : int)
{
	networkView.RPC("RetireVie", RPCMode.All, degat);
}

@RPC
function RetireVie(degat : int)
{
	if (networkView.isMine)
	{
		vie -= degat;
		if (vie <= 0)
		{
			Network.Destroy(gameObject);
		}
	}
}

@RPC
function SyncCouleur(couleur : String)
{
	if(couleur == "BLEUE")
	{
		renderer.material.color = Color.blue;
		gameObject.tag = "equipe_bleu";
	}
	if (couleur == "ROUGE")
	{
		renderer.material.color = Color.red;
		gameObject.tag = "equipe_rouge";
	}
}