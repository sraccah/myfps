#pragma strict

public var pause : boolean;

function Start ()
{	
	pause = false;
	Screen.showCursor = false;
	Screen.lockCursor = true;

}

function Update ()
{
	if (Input.GetButtonDown("Echap"))
	{
		pause = !pause;
		if (pause)
		{
			Time.timeScale = 0;
			Screen.showCursor = true;
			Screen.lockCursor = false;
		}
		else
		{
			Time.timeScale = 1;
			Screen.showCursor = false;
			Screen.lockCursor = true;
		}
	}
}

function OnGUI()
{
	if (pause)
	{
		GUI.Box(Rect(Screen.width / 2 - 100, Screen.height / 2 - 150, 200, 300), "Pause");
		
		if (GUI.Button(Rect(Screen.width / 2 - 90, Screen.height / 2 - 80, 180, 40), "Menu Principal"))
		{	
			Application.LoadLevel("Menu");
		}
		if (GUI.Button(Rect(Screen.width / 2 - 90, Screen.height / 2 - 20, 180, 40), "Options"))
		{
			Debug.Log("Looking for the Option Menu !");
		}
		if (GUI.Button(Rect(Screen.width / 2 - 90, Screen.height / 2 + 40, 180, 40), "Quitter"))
		{
			Application.Quit();
		}
	}
}