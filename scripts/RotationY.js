#pragma strict

var sensibilite = 10;

function Update ()
{
	if (Time.timeScale == 1)
	{
		transform.Rotate(0, Input.GetAxisRaw("SourisX") * sensibilite, 0);
	}
}