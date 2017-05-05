#pragma strict

private var light_source : Light;
var sound_turn_on : AudioClip;
var sound_turn_off : AudioClip;
 
function Start()
{
	light_source = GetComponent(Light);
}
 
function Update()
{
	if (Input.GetButtonDown("Torche"))
	{
		ToggleFlashLight();
	}
}
 
function ToggleFlashLight()
{
	light_source.enabled = !light_source.enabled;
 
	//Audio
	if (light_source.enabled)
	{
		audio.PlayOneShot(sound_turn_on);
	}
	else
	{
		audio.PlayOneShot(sound_turn_off);
	}
}
 
@script RequireComponent(AudioSource)