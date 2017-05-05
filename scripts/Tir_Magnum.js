#pragma strict

var balles = 6;
var balles_restantes = 24;
var degat = 25;
var son_tir : AudioClip;
var sparkls : Transform;
var impact : Transform;
private var peut_tirer = true;

var joueur : GameObject;

function OnGUI()
{
	GUI.Label(Rect(Screen.width - 100, Screen.height - 50, 100, 25), balles + " / " + balles_restantes);
}

function Update()
{
	if (Time.timeScale == 1)
	{
		if(Input.GetButtonDown("Tirer") && peut_tirer && balles > 0)
		{
			Tire();
		}
		if(Input.GetButtonDown("Tirer") && peut_tirer && balles == 0 && balles_restantes > 0)
		{
			Recharge();
		}
		if(Input.GetButtonDown("Recharger") && balles_restantes > 0)
		{
			Recharge();
			balles = 6;
		}
	}
}

function Tire()
{
	peut_tirer = false;
	SendMessageUpwards("Anime", 1);
	balles--;
	
	var hit : RaycastHit;
	
	if (Physics.Raycast(transform.position, transform.TransformDirection(Vector3(Random.Range(-0.02, 0.02), Random.Range(-0.02, 0.02), 1)), hit, 100))
	{
		if (hit.collider)
		{
			var object = Instantiate(sparkls, hit.point, Quaternion.identity);
			object.transform.rotation = Quaternion.FromToRotation(Vector3.up, hit.normal);
			Network.Instantiate(sparkls, object.transform.position, object.transform.rotation, 0);
			Network.Instantiate(impact, hit.point, object.transform.rotation, 0);
			Destroy(object.gameObject);
			if (hit.collider.tag != joueur.gameObject.tag)
			{
				hit.collider.SendMessage("Degat", degat, SendMessageOptions.DontRequireReceiver);
			}
		}
	}
	
	networkView.RPC("Sync_son", RPCMode.All);
	
	yield WaitForSeconds(0.2);
	peut_tirer = true;
}

function Recharge()
{
	peut_tirer = false;
	balles_restantes -= 6;
	balles += 6;
	SendMessageUpwards("Anime", 2);
	
	yield WaitForSeconds(2);
	peut_tirer = true;
}

@RPC
function Sync_son()
{
	audio.PlayOneShot(son_tir);
}