#pragma strict
 
var reticule = true;
 
var reticule_color = Color.white;
 
var width : float = 3;
var height : float = 35;
 
class spreading{
    var spread = 20.0;
    var max_spread = 60.0;
    var min_spread = 20.0;
    var spread_ps = 30.0;
    var decrease_ps = 25.0;
}
 
var spread : spreading;
 
private var tex : Texture2D;
 
private var line_style : GUIStyle;
 
function Awake (){
    tex = Texture2D(1,1);
 
    SetColor(tex, reticule_color);
 
    line_style = GUIStyle();
    line_style.normal.background = tex;
}
 
function Update (){
    if(Input.GetButton("Tirer")){
        spread.spread += spread.spread_ps * Time.deltaTime;
        Fire();
    }else{
        spread.spread -= spread.decrease_ps * Time.deltaTime;     
    }
 
    spread.spread = Mathf.Clamp(spread.spread, spread.min_spread, spread.max_spread);  
}
 
function OnGUI (){
    var point_centre = Vector2(Screen.width / 2, Screen.height / 2);
 
    if(reticule){
        GUI.Box(Rect(point_centre.x - width / 2, point_centre.y - (height + spread.spread), width, height), "", line_style);
        GUI.Box(Rect(point_centre.x - width / 2, point_centre.y + spread.spread, width, height), "", line_style);
        GUI.Box(Rect(point_centre.x + spread.spread, (point_centre.y - width / 2), height , width), "", line_style);
        GUI.Box(Rect(point_centre.x - (height + spread.spread), (point_centre.y - width / 2), height , width), "", line_style);
    }   
}
 
function Fire(){
//
}

function SetColor(myTexture : Texture2D, myColor : Color){
    for (var y : int = 0; y < myTexture.height; ++y){
        for (var x : int = 0; x < myTexture.width; ++x){
            myTexture.SetPixel(x, y, myColor);
        }
    }
 
    myTexture.Apply();
}