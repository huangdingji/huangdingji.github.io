__require = function e(t, n, r) {
  function s(o, u) {
    if (!n[o]) {
      if (!t[o]) {
        var b = o.split("/");
        b = b[b.length - 1];
        if (!t[b]) {
          var a = "function" == typeof __require && __require;
          if (!u && a) return a(b, !0);
          if (i) return i(b, !0);
          throw new Error("Cannot find module '" + o + "'");
        }
      }
      var f = n[o] = {
        exports: {}
      };
      t[o][0].call(f.exports, function(e) {
        var n = t[o][1][e];
        return s(n || e);
      }, f, f.exports, e, t, n, r);
    }
    return n[o].exports;
  }
  var i = "function" == typeof __require && __require;
  for (var o = 0; o < r.length; o++) s(r[o]);
  return s;
}({
  Camp: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "e5603xjyHVJYJYP1yABhj4h", "Camp");
    "use strict";
    cc.Class({
      extends: cc.Component,
      properties: {
        _ControlNode: null,
        ControlNode: {
          get: function get() {
            return this._ControlNode;
          },
          set: function set(val) {
            this._ControlNode = val;
          },
          type: cc.Node
        },
        _NumLabel: null,
        NumLabel: {
          get: function get() {
            return this._NumLabel;
          },
          set: function set(val) {
            this._NumLabel = val;
          },
          type: cc.Label
        },
        _MaxSolider: 20,
        MaxSoilder: {
          get: function get() {
            return this._MaxSolider;
          },
          set: function set(val) {
            this._MaxSolider = val;
          }
        },
        _ReduceInterval: .2,
        ReduceInterval: {
          get: function get() {
            return this._ReduceInterval;
          },
          set: function set(val) {
            this._ReduceInterval = val;
          }
        },
        _ReduceTime: 0,
        ReduceTime: {
          get: function get() {
            return this._ReduceTime;
          },
          set: function set(val) {
            this._ReduceTime = val;
          }
        },
        _CurSoliderNum: 0,
        CurSoilderNum: {
          get: function get() {
            return this._CurSoliderNum;
          },
          set: function set(val) {
            this._CurSoliderNum = val;
            this.updateSoiderNum();
          }
        },
        _Type: 1,
        Type: {
          get: function get() {
            return this._Type;
          },
          set: function set(val) {
            this._Type = val;
          }
        },
        _ProduceInterval: .2,
        ProduceInterval: {
          get: function get() {
            return this._ProduceInterval;
          },
          set: function set(val) {
            this._ProduceInterval = val;
          }
        },
        _ProduceTime: 0,
        ProduceTime: {
          get: function get() {
            return this._ProduceTime;
          },
          set: function set(val) {
            this._ProduceTime = val;
          }
        },
        _Category: 1,
        Category: {
          get: function get() {
            return this._Category;
          },
          set: function set(val) {
            this._Category = val;
          }
        }
      },
      onLoad: function onLoad() {
        this.NumLabel = this.node.getChildByName("label").getComponent("cc.Label");
        this.ControlNode = cc.find("Canvas/ControlNode");
      },
      start: function start() {},
      update: function update(dt) {
        if (this.CurSoilderNum > this.MaxSoilder) {
          if (this.ReduceTime > this.ReduceInterval) {
            this.ReduceTime = 0;
            this.changeSoliderNum(-1);
          }
          this.ReduceTime = this.ReduceTime + dt;
        }
        if (1 == this.Category && this.CurSoilderNum < this.MaxSoilder) {
          if (this.ProduceTime > this.ProduceInterval) {
            this.ProduceTime = 0;
            this.changeSoliderNum(1);
          }
          this.ProduceTime = this.ProduceTime + dt;
        }
      },
      changeSoliderNum: function changeSoliderNum(num) {
        this.CurSoilderNum = Math.max(0, this.CurSoilderNum + num);
        this.updateSoiderNum();
      },
      updateSoiderNum: function updateSoiderNum() {
        this.NumLabel.string = this.CurSoilderNum + "/" + this.MaxSoilder;
      }
    });
    cc._RF.pop();
  }, {} ],
  MyControl: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "d17e4E++uNPXaclWde2lhGy", "MyControl");
    "use strict";
    cc.Class({
      extends: cc.Component,
      properties: {
        MyBase: {
          type: cc.Sprite,
          default: null
        },
        MyCampList: {
          default: [],
          type: [ cc.Sprite ]
        },
        OtherBase: {
          type: cc.Sprite,
          default: null
        },
        OtherCampList: {
          default: [],
          type: [ cc.Sprite ]
        },
        BuildingList: {
          default: [],
          type: [ cc.Node ]
        },
        TowerList: {
          default: [],
          type: [ cc.Sprite ]
        },
        Soilder: {
          type: cc.Prefab,
          default: null
        },
        SoidlerLayout: {
          type: cc.Prefab,
          default: null
        },
        _FirstClickNode: {
          default: null,
          type: cc.Node
        },
        _SecondClickNode: {
          default: null,
          type: cc.Node
        },
        _TowerTargetList: {
          default: [],
          type: [ cc.Node ]
        },
        _SoilderPool: {
          default: null,
          type: cc.NodePool
        },
        _SoilderLayoutPool: {
          default: null,
          type: cc.NodePool
        },
        WinLostLabel: {
          default: null,
          type: cc.Label
        }
      },
      onLoad: function onLoad() {
        this.WinLostLabel.node.active = false;
        cc.director.getCollisionManager().enabled = true;
        cc.director.getCollisionManager().enabledDebugDraw = true;
        var tmpScript = void 0;
        tmpScript = this.MyBase.getComponent("Camp");
        tmpScript.Type = 1;
        tmpScript.Category = 1;
        tmpScript.MaxSoilder = 50;
        for (var index = 0; index < this.MyCampList.length; index++) {
          var element = this.MyCampList[index];
          tmpScript = element.getComponent("Camp");
          tmpScript.Type = 1;
          tmpScript.Category = 2;
          this.BuildingList.push(element);
        }
        var otherTmpScript = void 0;
        otherTmpScript = this.OtherBase.getComponent("Camp");
        otherTmpScript.Category = 1;
        otherTmpScript.Type = 2;
        otherTmpScript.MaxSoilder = 50;
        for (var _index = 0; _index < this.OtherCampList.length; _index++) {
          var _element = this.OtherCampList[_index];
          otherTmpScript = _element.getComponent("Camp");
          otherTmpScript.Type = 2;
          otherTmpScript.Category = 2;
          this.BuildingList.push(_element);
        }
        var towerTmpScript = void 0;
        for (var _index2 = 0; _index2 < this.TowerList.length; _index2++) {
          var _element2 = this.TowerList[_index2];
          towerTmpScript = _element2.getComponent("Camp");
          towerTmpScript.Type = 3;
          towerTmpScript.Category = 3;
          this.BuildingList.push(_element2);
        }
        this._SoilderPool = new cc.NodePool();
        for (var i = 0; i < 25; ++i) {
          var tmpSoilder = cc.instantiate(this.Soilder);
          this._SoilderPool.put(tmpSoilder);
        }
        this._SoilderLayoutPool = new cc.NodePool();
        for (var _i = 0; _i < 5; ++_i) {
          var tmpSoilderLayout = cc.instantiate(this.SoidlerLayout);
          this._SoilderLayoutPool.put(tmpSoilderLayout);
        }
      },
      start: function start() {
        this.node.on(cc.Node.EventType.TOUCH_END, function(touch, event) {
          var bTouch = false;
          if (this.MyBase.node.getBoundingBoxToWorld().contains(touch.getLocation())) {
            this.setTouchState(this.MyBase);
            bTouch = true;
          }
          if (this.OtherBase.node.getBoundingBoxToWorld().contains(touch.getLocation())) {
            this.setTouchState(this.OtherBase);
            bTouch = true;
          }
          for (var index = 0; index < this.MyCampList.length; index++) {
            var element = this.MyCampList[index];
            if (element.node.getBoundingBoxToWorld().contains(touch.getLocation())) {
              this.setTouchState(element);
              bTouch = true;
              break;
            }
          }
          for (var _index3 = 0; _index3 < this.OtherCampList.length; _index3++) {
            var _element3 = this.OtherCampList[_index3];
            if (_element3.node.getBoundingBoxToWorld().contains(touch.getLocation())) {
              this.setTouchState(_element3);
              bTouch = true;
              break;
            }
          }
          for (var _index4 = 0; _index4 < this.TowerList.length; _index4++) {
            var _element4 = this.TowerList[_index4];
            if (_element4.node.getBoundingBoxToWorld().contains(touch.getLocation())) {
              this.setTouchState(_element4);
              bTouch = true;
              break;
            }
          }
          false === bTouch && this.setTouchState(null);
        }, this);
      },
      update: function update(dt) {
        this.AILogic();
      },
      onDisable: function onDisable() {
        cc.director.getCollisionManager().enabled = false;
        cc.director.getCollisionManager.enabledDebugDraw = false;
        this.node.off(cc.Node.EventType.TOUCH_END);
      },
      onSoilderCollisionEnter: function onSoilderCollisionEnter(camp, soilder) {
        var campScript = camp.getComponent("Camp");
        var soilderScript = soilder.getComponent("Soilder");
        if (campScript.Type === soilderScript.Type) campScript.changeSoliderNum(1); else if (3 === campScript.Type) {
          campScript.changeSoliderNum(1);
          campScript.Type = soilderScript.Type;
        } else {
          campScript.changeSoliderNum(-1);
          0 === campScript.CurSoilderNum && (campScript.Type = soilderScript.Type);
        }
        this.removeSoilder(soilder.node);
        this.CheckWinLost();
      },
      setTouchState: function setTouchState(touchNode) {
        if (null === touchNode) {
          this._FirstClickNode = null;
          this._SecondClickNode = null;
        } else if (null === this._FirstClickNode) {
          var campScript = touchNode.getComponent("Camp");
          1 === campScript.Type && (this._FirstClickNode = touchNode);
        } else if (this._FirstClickNode !== touchNode) {
          this._SecondClickNode = touchNode;
          this.doLogic(this._FirstClickNode, this._SecondClickNode);
          this._FirstClickNode = null;
          this._SecondClickNode = null;
        }
      },
      doLogic: function doLogic(fromNode, toNode) {
        var fromNodeScript = fromNode.getComponent("Camp");
        var halfNum = Math.ceil(fromNodeScript.CurSoilderNum / 2);
        fromNodeScript.changeSoliderNum(-halfNum);
        var theSoilderLayout = this.createSoilderLayout();
        var theSoilderLayoutScript = theSoilderLayout.getComponent("SoilderLayout");
        theSoilderLayoutScript.FromNode = fromNode;
        theSoilderLayoutScript.ToNode = toNode;
        theSoilderLayoutScript.Type = fromNodeScript.Type;
        theSoilderLayout.parent = this.node;
        theSoilderLayoutScript.init();
        theSoilderLayout.active = true;
        for (var i = 0; i < halfNum; i++) {
          var theSoilder = this.createSoilder();
          var theSoilderScript = theSoilder.getComponent("Soilder");
          theSoilderScript.Type = fromNodeScript.Type;
          theSoilderScript.FromNode = fromNode;
          theSoilderScript.ToNode = toNode;
          theSoilder.parent = theSoilderLayout;
          theSoilder.active = true;
        }
      },
      createSoilderLayout: function createSoilderLayout() {
        var tmpSoilderLayout = null;
        tmpSoilderLayout = this._SoilderLayoutPool.size() > 0 ? this._SoilderLayoutPool.get() : cc.instantiate(this.SoidlerLayout);
        return tmpSoilderLayout;
      },
      removeSoilderLayout: function removeSoilderLayout(theSoilderLayout) {
        theSoilderLayout.active = false;
        this._SoilderLayoutPool.put(theSoilderLayout);
      },
      createSoilder: function createSoilder() {
        var tmpSoilder = null;
        tmpSoilder = this._SoilderPool.size() > 0 ? this._SoilderPool.get() : cc.instantiate(this.Soilder);
        return tmpSoilder;
      },
      removeSoilder: function removeSoilder(theSoilder) {
        var bWillRmoveSoilderLayout = false;
        var theSoilderParent = null;
        if (theSoilder.parent && 1 === theSoilder.parent.childrenCount) {
          bWillRmoveSoilderLayout = true;
          theSoilderParent = theSoilder.parent;
        }
        this.removeTowerTarget(theSoilder);
        this._SoilderPool.put(theSoilder);
        bWillRmoveSoilderLayout && this.removeSoilderLayout(theSoilderParent);
      },
      addTowerTarget: function addTowerTarget(target) {
        this._TowerTargetList.push(target);
      },
      removeTowerTarget: function removeTowerTarget(target) {
        for (var index = 0; index < this._TowerTargetList.length; index++) {
          var element = this._TowerTargetList[index];
          element === target && this._TowerTargetList.splice(index, 1);
        }
      },
      getTowerTargetLength: function getTowerTargetLength() {
        return this._TowerTargetList.length;
      },
      attackTarget: function attackTarget() {
        for (var index = this._TowerTargetList.length - 1; index >= 0; index--) {
          var _element5 = this._TowerTargetList[index];
          var soilderScript = _element5.getComponent("Soilder");
          var towerScirpt = this.TowerList[0].node.getComponent("Camp");
          soilderScript.Type === towerScirpt.Type && this.removeTowerTarget(_element5);
        }
        var element = this._TowerTargetList[0];
        element && this.removeSoilder(element);
      },
      AILogic: function AILogic() {
        var otherBaseCampScirpt = this.OtherBase.getComponent("Camp");
        if (otherBaseCampScirpt.CurSoilderNum / otherBaseCampScirpt.MaxSoilder > .4) {
          var nearestBuilding = this.AIFindNearestSelfBuilding(this.OtherBase);
          nearestBuilding && this.doLogic(this.OtherBase, nearestBuilding);
        }
        for (var index = 0; index < this.BuildingList.length; index++) {
          var element = this.BuildingList[index];
          var buildScript = element.getComponent("Camp");
          if (2 === buildScript.Type && buildScript.CurSoilderNum / buildScript.MaxSoilder > .5 && Math.random() >= .4) {
            var nearestOtherBuilding = this.AIFindNearestOtherBuilding(element);
            nearestOtherBuilding && this.doLogic(element, nearestOtherBuilding);
          }
        }
      },
      AIFindNearestSelfBuilding: function AIFindNearestSelfBuilding(fromNode) {
        var minLen = 2e3;
        var nearestBuilding = null;
        for (var index = 0; index < this.BuildingList.length; index++) {
          var element = this.BuildingList[index];
          if (fromNode !== element) {
            var fromCampScript = fromNode.getComponent("Camp");
            var eleCampScript = element.getComponent("Camp");
            if ((fromCampScript.Type === eleCampScript.Type || 3 === eleCampScript.Type) && eleCampScript.CurSoilderNum < eleCampScript.MaxSoilder) {
              var dis = fromNode.node.position.sub(element.node.position).mag();
              if (dis < minLen) {
                minLen = dis;
                nearestBuilding = element;
              }
            }
          }
        }
        return nearestBuilding;
      },
      AIFindNearestOtherBuilding: function AIFindNearestOtherBuilding(fromNode) {
        var minLen = 2e3;
        var nearestBuilding = null;
        for (var index = 0; index < this.BuildingList.length; index++) {
          var element = this.BuildingList[index];
          if (fromNode !== element) {
            var fromCampScript = fromNode.getComponent("Camp");
            var eleCampScript = element.getComponent("Camp");
            if (fromCampScript.Type !== eleCampScript.Type) {
              var dis = fromNode.node.position.sub(element.node.position).mag();
              if (dis < minLen) {
                minLen = dis;
                nearestBuilding = element;
              }
            }
          }
        }
        return nearestBuilding;
      },
      CheckWinLost: function CheckWinLost() {
        var buildingType = 1;
        var bAllType = true;
        for (var index = 0; index < this.BuildingList.length; index++) {
          var element = this.BuildingList[index];
          var eleCampScript = element.getComponent("Camp");
          if (0 === index) buildingType = eleCampScript.Type; else if (eleCampScript.Type !== buildingType) {
            bAllType = false;
            break;
          }
        }
        bAllType && this.DoWinLostLogic(1 === buildingType);
      },
      DoWinLostLogic: function DoWinLostLogic(result) {
        this.WinLostLabel.string = result ? "\u4f60\u8d62\u4e86" : "AI\u8d62\u4e86";
        this.WinLostLabel.node.active = true;
      }
    });
    cc._RF.pop();
  }, {} ],
  SoilderLayout: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "923adX8koNKEZmqcpQgmutY", "SoilderLayout");
    "use strict";
    cc.Class({
      extends: cc.Component,
      properties: {
        _ControlNode: null,
        ControlNode: {
          get: function get() {
            return this._ControlNode;
          },
          set: function set(val) {
            this._ControlNode = val;
          },
          type: cc.Node
        },
        _FromNode: null,
        FromNode: {
          get: function get() {
            return this._FromNode;
          },
          set: function set(val) {
            this._FromNode = val;
          },
          type: cc.Node
        },
        _ToNode: null,
        ToNode: {
          get: function get() {
            return this._ToNode;
          },
          set: function set(val) {
            this._ToNode = val;
          },
          type: cc.Node
        },
        _Speed: 0,
        Speed: {
          get: function get() {
            return this._Speed;
          },
          set: function set(val) {
            this._Speed = val;
          }
        },
        _Type: 1,
        Type: {
          get: function get() {
            return this._Type;
          },
          set: function set(val) {
            this._Type = val;
          }
        }
      },
      onLoad: function onLoad() {
        this.ControlNode = cc.find("Canvas/ControlNode");
        this.controlScript = this.ControlNode.getComponent("MyControl");
      },
      start: function start() {},
      init: function init() {
        this.node.setPosition(this.FromNode.node.position);
        var posSub = this.ToNode.node.position.sub(this.node.position);
        var angle = Math.atan2(posSub.x, posSub.y);
        angle = angle / Math.PI * 180;
        this.node.rotation = angle;
      },
      update: function update(dt) {
        var oldPos = this.node.position;
        if (this.ToNode) {
          var direction = this.ToNode.node.position.sub(oldPos).normalize();
          var newPos = oldPos.add(direction.mul(this.Speed * dt));
          this.node.setPosition(newPos);
        }
      }
    });
    cc._RF.pop();
  }, {} ],
  Soilder: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "7ed132LZxxC95rAtxDd4+P7", "Soilder");
    "use strict";
    cc.Class({
      extends: cc.Component,
      properties: {
        _ControlNode: null,
        ControlNode: {
          get: function get() {
            return this._ControlNode;
          },
          set: function set(val) {
            this._ControlNode = val;
          },
          type: cc.Node
        },
        _FromNode: null,
        FromNode: {
          get: function get() {
            return this._FromNode;
          },
          set: function set(val) {
            this._FromNode = val;
          },
          type: cc.Node
        },
        _ToNode: null,
        ToNode: {
          get: function get() {
            return this._ToNode;
          },
          set: function set(val) {
            this._ToNode = val;
          },
          type: cc.Node
        },
        _Speed: 100,
        Speed: {
          get: function get() {
            return this._Speed;
          },
          set: function set(val) {
            this._Speed = val;
          }
        },
        _Type: 1,
        Type: {
          get: function get() {
            return this._Type;
          },
          set: function set(val) {
            this._Type = val;
          }
        }
      },
      onLoad: function onLoad() {
        this.ControlNode = cc.find("Canvas/ControlNode");
        this.controlScript = this.ControlNode.getComponent("MyControl");
      },
      start: function start() {},
      update: function update(dt) {},
      onCollisionEnter: function onCollisionEnter(other, self) {
        0 === other.tag && other.node === this.ToNode.node && this.controlScript.onSoilderCollisionEnter(other, self);
      }
    });
    cc._RF.pop();
  }, {} ],
  Tower: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "d1b45xCnNNNoKitT1po2YEi", "Tower");
    "use strict";
    var _cc$Class;
    function _defineProperty(obj, key, value) {
      key in obj ? Object.defineProperty(obj, key, {
        value: value,
        enumerable: true,
        configurable: true,
        writable: true
      }) : obj[key] = value;
      return obj;
    }
    cc.Class((_cc$Class = {
      extends: cc.Component,
      properties: {
        _ControlNode: null,
        ControlNode: {
          get: function get() {
            return this._ControlNode;
          },
          set: function set(val) {
            this._ControlNode = val;
          }
        },
        _AttackInterval: 1,
        AttackInterval: {
          get: function get() {
            return this._AttackInterval;
          },
          set: function set(val) {
            this._AttackInterval = val;
          },
          visible: false
        },
        _AttackTime: 0,
        AttackTime: {
          get: function get() {
            return this._AttackTime;
          },
          set: function set(val) {
            this._AttackTime = val;
          },
          visible: false
        },
        _TargetList: {
          default: [],
          type: [ cc.Node ]
        }
      },
      onLoad: function onLoad() {
        this.ControlNode = cc.find("Canvas/ControlNode");
        this.controlScript = this.ControlNode.getComponent("MyControl");
        this.AttackInterval = .2;
      },
      start: function start() {},
      onCollisionEnter: function onCollisionEnter(other, self) {
        if (1 === self.tag) {
          var campScript = self.node.getComponent("Camp");
          var soilderScript = other.node.getComponent("Soilder");
          soilderScript.Type !== campScript.Type && this.controlScript.addTowerTarget(other.node);
        }
      },
      onCollisionExit: function onCollisionExit(other, self) {
        1 === self.tag && this.controlScript.removeTowerTarget(other);
      }
    }, _defineProperty(_cc$Class, "start", function start() {}), _defineProperty(_cc$Class, "update", function update(dt) {
      if (this.controlScript.getTowerTargetLength() > 0) {
        if (this.AttackTime > this.AttackInterval) {
          console.log("tower attack", this.AttackTime);
          this.controlScript.attackTarget();
          this.AttackTime = 0;
        }
        this.AttackTime = this.AttackTime + dt;
      }
    }), _cc$Class));
    cc._RF.pop();
  }, {} ]
}, {}, [ "Camp", "MyControl", "Soilder", "SoilderLayout", "Tower" ]);