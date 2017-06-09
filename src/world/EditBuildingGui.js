import Structure from './Structure';

export default class EditBuildingGui extends PIXI.Container {

  constructor(world) {
    super();

    this.world = world;
    this.building = null;

    if(Structure.LEVELING_ENABLED) {

      this.background = new PIXI.Graphics();
      this.background.drawRect();
      this.background.beginFill(0xCCCCCC);
  		this.background.drawRect(-80, 10, 160, 100);
      this.background.drawPolygon([new PIXI.Point(0, 0), new PIXI.Point(5, 10), new PIXI.Point(-5, 10)]);
      this.background.endFill();
      this.addChild(this.background);

      this.textLevel = new PIXI.Text("Level 0");
      this.textLevel.y = 8 + 0;
      this.textLevel.anchor.x = 0.5;
      this.addChild(this.textLevel);

      this.textDowngrade = new PIXI.Text("Downgrade");
      this.textDowngrade.anchor.x = 0.5;
      this.textDowngrade.y = 8 + 32;
      this.textDowngrade.interactive = true;
      this.textDowngrade.click = () => {
        this.building.downgrade();
        if(this.building.level > 0) {
          this.setBuilding(this.building);
        } else {
          this.setBuilding(null);
        }
      };
      this.addChild(this.textDowngrade);

      this.textUpgrade = new PIXI.Text("Upgrade");
      this.textUpgrade.anchor.x = 0.5;
      this.textUpgrade.y = 8 + 64;
      this.textUpgrade.interactive = true;
      this.textUpgrade.click = () => {
        this.building.upgrade();
        this.setBuilding(this.building);
      };
      this.addChild(this.textUpgrade);

    } else {

      this.background = new PIXI.Graphics();
      this.background.drawRect();
      this.background.beginFill(0xCCCCCC);
  		this.background.drawRect(-80, 10, 160, 46);
      this.background.drawPolygon([new PIXI.Point(0, 0), new PIXI.Point(5, 10), new PIXI.Point(-5, 10)]);
      this.background.endFill();
      this.addChild(this.background);

      this.textDestroy = new PIXI.Text("Destroy");
      this.textDestroy.anchor.x = 0.5;
      this.textDestroy.y = 8;
      this.textDestroy.interactive = true;
      this.textDestroy.click = () => {
        this.building.downgrade();
        if(this.building.level > 0) {
          this.setBuilding(this.building);
        } else {
          this.setBuilding(null);
        }
      };
      this.addChild(this.textDestroy);

    }

    this.visible = false;
  }

  setBuilding(building) {
    this.building = building;
    this.visible = false;

    if(this.building !== null) {

      if(Structure.LEVELING_ENABLED) {
        this.textLevel.text = "Level "+this.building.level;
      }

      this.x = (this.building.x * this.world.scale.x) + this.world.x;
      this.y = (this.building.y * this.world.scale.y) + this.world.y;
      this.visible = true;
    }
  }
}
