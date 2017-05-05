#pragma strict

var delai = 2;

function Start ()
{
	yield WaitForSeconds(delai);
	Destroy(gameObject);
}