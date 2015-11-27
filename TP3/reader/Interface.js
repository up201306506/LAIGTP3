
function Interface() {
	CGFinterface.call(this);
};

Interface.prototype = Object.create(CGFinterface.prototype);
Interface.prototype.constructor = Interface;

Interface.prototype.init = function(application) {
	
	CGFinterface.prototype.init.call(this, application);
	this.gui = new dat.GUI();
	
	
	this.gui.add(this.scene, 'Lights_On');	
	
	//var group=this.gui.addFolder("Ambients");
	//group.open();
	this.gui.add(this.scene, 'Ambient', this.scene.Ambientchoice);
}

