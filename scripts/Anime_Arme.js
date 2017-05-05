#pragma strict

function Anime(index : int)
{
	if (index == 1)
	{
		networkView.RPC("Sync_anim", RPCMode.All, 1);
	}
	if (index == 2)
	{
		networkView.RPC("Sync_anim", RPCMode.All, 2);
	}
}

@RPC

function Sync_anim(index : int)
{
	if (index == 1)
	{
		animation.Play("tir");
	}
	if (index == 2)
	{
		animation.Play("recharger");
	}
}
