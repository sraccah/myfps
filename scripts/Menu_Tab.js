#pragma strict

public var tab : boolean;

function Start ()
{	
	tab = false;
	Screen.showCursor = false;
	Screen.lockCursor = true;

}

function Update ()
{
	if (Input.GetButtonDown("Scores"))
	{
		tab = !tab;
		if (tab)
		{
			Screen.showCursor = false;
			Screen.lockCursor = true;
		}
		else
		{
			Screen.showCursor = false;
			Screen.lockCursor = true;
		}
	}
	if (Input.GetButtonDown("Souris"))
	{
		if (!tab || tab)
		{
			Screen.showCursor = true;
			Screen.lockCursor = false;
		}
		else
		{
			Screen.showCursor = false;
			Screen.lockCursor = true;
		}
	}
}

function OnGUI()
{
	if (tab)
	{
		GUI.Box(Rect(Screen.width / 2 - 200, Screen.height / 2 - 150, 400, 300), "Scores");
	}
}