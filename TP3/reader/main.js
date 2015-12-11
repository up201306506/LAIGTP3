//From https://github.com/EvanHahn/ScriptInclude
include=function(){function f(){var a=this.readyState;(!a||/ded|te/.test(a))&&(c--,!c&&e&&d())}var a=arguments,b=document,c=a.length,d=a[c-1],e=d.call;e&&c--;for(var g,h=0;c>h;h++)g=b.createElement("script"),g.src=arguments[h],g.async=!0,g.onload=g.onerror=g.onreadystatechange=f,(b.head||b.getElementsByTagName("head")[0]).appendChild(g)};
serialInclude=function(a){var b=console,c=serialInclude.l;if(a.length>0)c.splice(0,0,a);else b.log("Done!");if(c.length>0){if(c[0].length>1){var d=c[0].splice(0,1);b.log("Loading "+d+"...");include(d,function(){serialInclude([]);});}else{var e=c[0][0];c.splice(0,1);e.call();};}else b.log("Finished.");};serialInclude.l=new Array();

function getUrlVars() {
    var vars = {};
    var parts = window.location.href.replace(/[?&]+([^=&]+)=([^&]*)/gi,    
    function(m,key,value) {
      vars[decodeURIComponent(key)] = decodeURIComponent(value);
    });
    return vars;
}	 

serialInclude(['../lib/CGF.js',
					'primitives/TrianglePrimitive.js', 
					'primitives/SpherePrimitive.js', 
					'primitives/CylinderPrimitive.js' , 
					'primitives/SquarePrimitive.js',
					'animations/Animation.js',
					'animations/LinearAnimation.js',
					'animations/CircularAnimation.js',
					'primitives/Vehicle.js',
					'primitives/Plane.js',
					'primitives/Patch.js',
					'primitives/Terrain.js',
					'primitives/HexagonPrism.js',
					'primitives/CircleTop.js',
					'GameScene.js', 
					'MySceneGraph.js', 
					'primitives/Tabuleiro.js',
					'Interface.js',
					

main=function()
{
	// Standard application, scene 
    var app = new CGFapplication(document.body);
    var myScene = new GameScene();
	
	//Parse
	var filename1=getUrlVars()['file'] || "Vazio.lsx";
	var myGraph = new MySceneGraph(filename1, myScene, 'Teste1');
	var filename2=getUrlVars()['file'] || "Vazio2.lsx";
	var myGraph2 = new MySceneGraph(filename2, myScene, 'Teste2');
	var filename3=getUrlVars()['file'] || "Vazio3.lsx";
	var myGraph3 = new MySceneGraph(filename3, myScene, 'Teste3');

	//and interface setup
	var myInterface = new Interface();

    app.init();
    app.setScene(myScene);
    app.setInterface(myInterface);
    myInterface.setActiveCamera(myScene.camera);
	
	// start
    app.run();
}

]);