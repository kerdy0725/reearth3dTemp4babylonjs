reearth.ui.show(`
    <script src="https://cdnjs.cloudflare.com/ajax/libs/dat-gui/0.6.2/dat.gui.min.js"></script>
    <script src="https://assets.babylonjs.com/generated/Assets.js"></script>
    <script src="https://cdn.babylonjs.com/recast.js"></script>
    <script src="https://cdn.babylonjs.com/ammo.js"></script>
    <script src="https://cdn.babylonjs.com/havok/HavokPhysics_umd.js"></script>
    <script src="https://cdn.babylonjs.com/cannon.js"></script>
    <script src="https://cdn.babylonjs.com/Oimo.js"></script>
    <script src="https://cdn.babylonjs.com/earcut.min.js"></script>
    <script src="https://cdn.babylonjs.com/babylon.js"></script>
    <script src="https://cdn.babylonjs.com/materialsLibrary/babylonjs.materials.min.js"></script>
    <script src="https://cdn.babylonjs.com/proceduralTexturesLibrary/babylonjs.proceduralTextures.min.js"></script>
    <script src="https://cdn.babylonjs.com/postProcessesLibrary/babylonjs.postProcess.min.js"></script>
    <script src="https://cdn.babylonjs.com/loaders/babylonjs.loaders.js"></script>
    <script src="https://cdn.babylonjs.com/serializers/babylonjs.serializers.min.js"></script>
    <script src="https://cdn.babylonjs.com/gui/babylon.gui.min.js"></script>
    <script src="https://cdn.babylonjs.com/inspector/babylon.inspector.bundle.js"></script>
    <style>
        body {
          margin: 0;
        }

        #renderCanvas {
            width: 100%;
            height: 100%;
        }
        #canvasZone {
          font-size: 8pt;
          width: 99%;
          height: 100%;
          color: white;
          border: 1px dotted gray;
          padding: 0px 0;
        }
    </style>

    <div id="canvasZone">気温/降水量 実績&予測(Weather data by Open-Meteo.com)
        <canvas id="renderCanvas"></canvas>
    </div>

    <script>
        var canvas = document.getElementById("renderCanvas");
        var startRenderLoop = function (engine, canvas) {
            engine.runRenderLoop(function () {
                if (sceneToRender && sceneToRender.activeCamera) {
                    sceneToRender.render();
                }
            });
        }
        var lng = 137.3833;
        var lat = 34.7667;
        var gtype = "pressure";

        var engine = null;
        var scene = null;
        var sceneToRender = null;
        var createDefaultEngine = function() { return new BABYLON.Engine(canvas, true, { preserveDrawingBuffer: true, stencil: true,  disableWebGL2Support: false}); };

        var createScene = function () {
          var scene = new BABYLON.Scene(engine);
          const camera = new BABYLON.ArcRotateCamera("camera", 0, 0, 0, new BABYLON.Vector3(0.2, 1.5, 0));
          camera.setPosition(new BABYLON.Vector3(0, 2, -3.0));
          camera.attachControl(canvas, true);
          const light = new BABYLON.HemisphericLight("light", new BABYLON.Vector3(1, 1, 0));

          scene.clearColor = new BABYLON.Color4(0,0,0,0);
          return scene;
        }

        function claerGraph() {
          for(i=0; i<12; i++){
            const myMesh = scene.getMeshByName("grp"&i);
            if (myMesh) {
              myMesh.dispose();
            }
            const myPlae = scene.getMeshByName("smallPlane"&i);
            if (myPlae) {
              myPlae.dispose();
            }
          }
        }
        
        function buildRain(){
          const kikan=10;

          (async () => {
            const response = await fetch('https://api.open-meteo.com/v1/forecast?latitude='+lat+'&longitude='+lng+'&hourly=precipitation_probability&timezone=Asia%2FTokyo&forecast_days=1&forecast_hours=3&&past_hours=9');
            const rain_data =  await response.json();
            var data=[];

            const new1Rec = {d1:rain_data["hourly"]["precipitation_probability"][0],d3:0.3,d4:0.3,d5:1.0};
            const new2Rec = {d1:rain_data["hourly"]["precipitation_probability"][1],d3:0.3,d4:0.3,d5:1.0};
            const new3Rec = {d1:rain_data["hourly"]["precipitation_probability"][2],d3:0.3,d4:0.3,d5:1.0};
            const new4Rec = {d1:rain_data["hourly"]["precipitation_probability"][3],d3:0.3,d4:0.3,d5:1.0};
            const new5Rec = {d1:rain_data["hourly"]["precipitation_probability"][4],d3:0.3,d4:0.3,d5:1.0};
            const new6Rec = {d1:rain_data["hourly"]["precipitation_probability"][5],d3:0.3,d4:0.3,d5:1.0};
            const new7Rec = {d1:rain_data["hourly"]["precipitation_probability"][6],d3:0.3,d4:0.3,d5:1.0};
            const new8Rec = {d1:rain_data["hourly"]["precipitation_probability"][7],d3:0.3,d4:0.3,d5:1.0};
            const new9Rec = {d1:rain_data["hourly"]["precipitation_probability"][8],d3:0.3,d4:0.3,d5:1.0};
            const new10Rec = {d1:rain_data["hourly"]["precipitation_probability"][9],d3:0.3,d4:0.3,d5:1.0};
            const new11Rec = {d1:rain_data["hourly"]["precipitation_probability"][10],d3:0.8,d4:0.8,d5:1.0};
            const new12Rec = {d1:rain_data["hourly"]["precipitation_probability"][11],d3:0.8,d4:0.8,d5:1.0};
        
            data.push(new1Rec);
            data.push(new2Rec);
            data.push(new3Rec);
            data.push(new4Rec);
            data.push(new5Rec);
            data.push(new6Rec);
            data.push(new7Rec);
            data.push(new8Rec);
            data.push(new9Rec);
            data.push(new10Rec);
            data.push(new11Rec);
            data.push(new12Rec);

            graph = buildGraph(data,kikan)
          })()
        }

        function buildTemp(){
          const kikan=10;

          (async () => {
            const response = await fetch('https://api.open-meteo.com/v1/forecast?latitude='+lat+'&longitude='+lng+'&hourly=temperature_2m&timezone=Asia%2FTokyo&forecast_days=1&forecast_hours=3&&past_hours=9');
            const rain_data =  await response.json();
            var data=[];

            const new1Rec = {d1:rain_data["hourly"]["temperature_2m"][0],d3:0.7,d4:0.2,d5:0.7};
            const new2Rec = {d1:rain_data["hourly"]["temperature_2m"][1],d3:0.7,d4:0.2,d5:0.7};
            const new3Rec = {d1:rain_data["hourly"]["temperature_2m"][2],d3:0.7,d4:0.2,d5:0.7};
            const new4Rec = {d1:rain_data["hourly"]["temperature_2m"][3],d3:0.7,d4:0.2,d5:0.7};
            const new5Rec = {d1:rain_data["hourly"]["temperature_2m"][4],d3:0.7,d4:0.2,d5:0.7};
            const new6Rec = {d1:rain_data["hourly"]["temperature_2m"][5],d3:0.7,d4:0.2,d5:0.7};
            const new7Rec = {d1:rain_data["hourly"]["temperature_2m"][6],d3:0.7,d4:0.2,d5:0.7};
            const new8Rec = {d1:rain_data["hourly"]["temperature_2m"][7],d3:0.7,d4:0.2,d5:0.7};
            const new9Rec = {d1:rain_data["hourly"]["temperature_2m"][8],d3:0.7,d4:0.2,d5:0.7};
            const new10Rec = {d1:rain_data["hourly"]["temperature_2m"][9],d3:0.7,d4:0.2,d5:0.7};
            const new11Rec = {d1:rain_data["hourly"]["temperature_2m"][10],d3:0.9,d4:0.7,d5:0.9};
            const new12Rec = {d1:rain_data["hourly"]["temperature_2m"][11],d3:0.9,d4:0.7,d5:0.9};
        
            data.push(new1Rec);
            data.push(new2Rec);
            data.push(new3Rec);
            data.push(new4Rec);
            data.push(new5Rec);
            data.push(new6Rec);
            data.push(new7Rec);
            data.push(new8Rec);
            data.push(new9Rec);
            data.push(new10Rec);
            data.push(new11Rec);
            data.push(new12Rec);
            graph = buildGraph(data,kikan)
          })()
        }


        async function buildGraph(data,kikan)
        {
          const grndMat = new BABYLON.StandardMaterial("boxMat");
          grndMat.diffuseColor = new BABYLON.Color3(0.0,0.8,0.5)
          const grndBox = BABYLON.MeshBuilder.CreateBox("ground",{height: 0.1, width: 5, depth: 0.5});
          grndBox.material = grndMat;
          grndBox.position.z=0.2;
          grndBox.position.x=0.3;
          grndBox.position.y=0.5;

          const font_type = "Arial";
          const size = 0.6;
          const dynamicTexture = new BABYLON.DynamicTexture("DynamicTexture", {width:90, height:30});
          const ctx = dynamicTexture.getContext();
          ctx.font = "1px " + font_type;
          const textWidth = ctx.measureText("Type A").width;
          const ratio = textWidth/size;
          const font_size = Math.floor(90 / (ratio * 1));
          const font = font_size + "px " + font_type;

          for(i=0;i<kikan+2; i++){
            var height=data[i]['d1'];

            if(height==0){
              height=0.1;
            }

            height = height / 20;
            buildSmallPlate(i,Number(data[i]['d1']).toFixed(1),font,(i*0.4)-2,0.7 + height,0.2,"#000000","#88FFFF");
            const box = await buildBox(i,height,data[i]['d3'],data[i]['d4'],data[i]['d5']);
          }
        }

        const sleep = ms => new Promise(resolve => setTimeout(resolve, ms))

        async function buildBox(i,height,r,g,b) {
          const boxMat = new BABYLON.StandardMaterial("boxMat");
          boxMat.diffuseColor = new BABYLON.Color3(r,g,b)
          const box = BABYLON.MeshBuilder.CreateBox("grp"&i,{height: height, width: 0.3, depth: 0.3});
          box.material = boxMat;
          box.position.z = 0.2;
          box.position.x = (i*0.4)-2;
          box.position.y = 0.5 + height /2;

          await sleep(300);
          return(box);
        }

        function buildSmallPlate(i,text,font,posX,posY,posZ,fontColor,plateColor){
          const dynamicTexture = new BABYLON.DynamicTexture("DynamicTexture", {width:60, height:30});
          dynamicTexture.drawText(text, null, null, font, fontColor, plateColor, true);
          const mat = new BABYLON.StandardMaterial("mat");
          mat.diffuseTexture = dynamicTexture;
          const plane = BABYLON.MeshBuilder.CreatePlane("smallPlane"&i, {width:0.3, height:0.3});
          plane.material = mat;
          plane.position.x=posX;
          plane.position.z=posZ;
          plane.position.y=posY;
        }

        addEventListener("message", e => {
          if (e.data.type === 'widget') {
            console.log(e.data.property.default.graphtype);
            gtype = e.data.property.default.graphtype;
          }
          if (e.source !== parent) return;
          if (e.data.type === 'mousedata') {
            lng = e.data.payload.lng;
            lat = e.data.payload.lat;
            claerGraph();
            if(gtype=="rain") {
                buildRain();
            }else if(gtype=="temp") {
                buildTemp();
            }else {
                buildRain();
            }
          }
        })

        window.initFunction = async function() {
            var asyncEngineCreation = async function() {
                try {
                    return createDefaultEngine();
                } catch(e) {
                    console.log("the available createEngine function failed. Creating the default engine instead");
                    return createDefaultEngine();
                }
            }

            window.engine = await asyncEngineCreation();
            if (!engine) throw "engine should not be null.";
            startRenderLoop(engine, canvas);
            window.scene = createScene();
        };

        initFunction().then(() => {
            sceneToRender = scene 
        });
        window.addEventListener("resize", function () {
            engine.resize();
        });
    </script>
`,
{ width: 500, height: 300 });

reearth.on('click',(mousedata) => {
  reearth.ui.postMessage({ 
    type: "mousedata",
    payload: mousedata
  }, "*");
});


reearth.on('update',() => {
  reearth.ui.postMessage({ 
    type: "widget",
    property: reearth.widget.property
  }, "*");
});

/*
reearth.on("update", send);
send();

function send() {
  reearth.ui.postMessage({
    property: reearth.widget.property
  })
}
*/