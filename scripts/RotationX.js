#pragma strict

var sensibilite = 5;
var rotationX = 0;

function Update ()
{
	if (Time.timeScale == 1)
	{
		rotationX += Input.GetAxisRaw("SourisY") * sensibilite;
		rotationX = Mathf.Clamp(rotationX, -40, 50);

		transform.localEulerAngles = Vector3(rotationX, 0, 0);
	}
}