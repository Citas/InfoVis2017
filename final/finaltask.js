function main()
{
    var volume = new KVS.LobsterData();
    var screen = new KVS.THREEScreen();

    screen.init( volume, {
        width: window.innerWidth * 0.8,
        height: window.innerHeight,
        targetDom: document.getElementById('display'),
        enableAutoResize: false
    });

    var bounds = Bounds( volume );
    screen.scene.add( bounds );
	var surfaces;
    var slicesurfaces;
	// add control UI
	var shaderModel=3;
    var GUI = dat.gui.GUI;
    var gui = new GUI();
    var guiControls = new function(){
	this.shadingmodel = 'original';
	this.iso_value = 128;
	this.slice= 'noslice';
	this.color = "#fa0000";
    };
	
    gui.add(guiControls, 'shadingmodel',['original','lambertian','phong','blinnphong','cooktorrance']);	
    gui.add(guiControls,'slice',['noslice','sliceplane']);
	gui.addColor(guiControls, 'color');
	
     
    document.getElementById('iso').addEventListener('mousemove', function() {
                var iso_value = +document.getElementById('iso').value;
                document.getElementById('label').innerHTML = "ISO: " + iso_value;
    });
	
	document.getElementById('Z-axis').addEventListener('mousemove', function() {
                var z_value = +document.getElementById('Z-axis').value;
                document.getElementById('label2').innerHTML = "Z-axis: " + z_value;
            });	
			
	document.getElementById('reload').addEventListener('click', function() {
    	    window.location.reload()
            });		

	document.getElementById('clear-Z-axis').addEventListener('click', function() {
    	    screen.scene.remove(slicesurfaces);		
			});
			
    document.getElementById('change-isovalue-button').addEventListener('click', function() {		
			screen.scene.remove( surfaces );
            var iso_value = +document.getElementById('iso').value;
            var isovalue = iso_value;       
	screen.scene.remove(surfaces);
	if(guiControls.shadingmodel=='lambertian')
	    shaderModel=0;
	else if(guiControls.shadingmodel=='phong')
	    shaderModel=1;
	else if(guiControls.shadingmodel=='blinnphong')
	    shaderModel=2;
	else if(guiControls.shadingmodel=='original')
	    shaderModel=3;
	else if(guiControls.shadingmodel=='cooktorrance')
		shaderModel=4;
	if(shaderModel==0)
    surfaces = Isosurfaces0( volume, isovalue );
	else if(shaderModel==1)
    surfaces = Isosurfaces1( volume, isovalue );
    else if(shaderModel==2)
    surfaces = Isosurfaces2( volume, isovalue );
    else if(shaderModel==3)
    surfaces = Isosurfaces3( volume, isovalue );
    else if(shaderModel==4)
    surfaces = Isosurfaces4( volume, isovalue );
    screen.scene.add( surfaces );    
		           
    if(guiControls.slice=='sliceplane')
			{	
			document.getElementById("label2").style.display = 'block';
		    document.getElementById("Z-axis").style.display = 'block';
			document.getElementById("change-Z-axis").style.display = 'block';
			document.getElementById("clear-Z-axis").style.display = 'block';
			document.getElementById("label").style.display = 'none';
			document.getElementById("iso").style.display = 'none';
			document.getElementById("change-isovalue-button").style.display = 'none';
	        
		    var smin = 0;
            var smax = volume.resolution.z - 2;	
	    	var value = +document.getElementById('Z-axis').value;
            var z_axis = Math.round(KVS.Mix( smin, smax, value ));
		    var point = new THREE.Vector3(60,60,z_axis);
		    var normal = new THREE.Vector3(0,0,1);
	        screen.scene.remove(surfaces);
            var slicesurfaces = SlicePlane( volume, point, normal );
            screen.scene.add( slicesurfaces );	
            ////////////////
			document.getElementById('clear-Z-axis').addEventListener('click', function() {
    	    screen.scene.remove(slicesurfaces);
            });	
            ////////////////			
			}			
	});
 
 document.getElementById('change-Z-axis').addEventListener('click', function() {
	 
	        screen.scene.remove(slicesurfaces);
			var smin = 0;
            var smax = volume.resolution.z - 2;	
	    	var value = +document.getElementById('Z-axis').value;
            var z_axis = Math.round(KVS.Mix( smin, smax, value ));
	    	var point = new THREE.Vector3(60,60,z_axis);
		    var normal = new THREE.Vector3(0,0,1);
			var slicesurfaces = SlicePlane( volume, point, normal );
			
			
			if(guiControls.slice=='sliceplane')
			{
			
            screen.scene.add( slicesurfaces );
            ////////////////////
			document.getElementById('clear-Z-axis').addEventListener('click', function() {
    	    screen.scene.remove(slicesurfaces);
            });
	        ///////////////////
			
			}
	        
			
			
			
			
			else if(guiControls.slice=='noslice')
			{
			document.getElementById("label2").style.display = 'none';
		    document.getElementById("Z-axis").style.display = 'none';
			document.getElementById("change-Z-axis").style.display = 'none';
			//document.getElementById("clear-Z-axis").style.display = 'none';
			document.getElementById("label").style.display = 'block';
			document.getElementById("iso").style.display = 'block';
			document.getElementById("change-isovalue-button").style.display = 'block';

            var iso_value = +document.getElementById('iso').value;
            var isovalue = iso_value;       
	        
			if(guiControls.shadingmodel=='lambertian')
	            shaderModel=0;
	        else if(guiControls.shadingmodel=='phong')
	            shaderModel=1;
	        else if(guiControls.shadingmodel=='blinnphong')
	            shaderModel=2;
	        else if(guiControls.shadingmodel=='original')
	            shaderModel=3;
	        if(shaderModel==0)
            surfaces = Isosurfaces0( volume, isovalue );
	        else if(shaderModel==1)
            surfaces = Isosurfaces1( volume, isovalue );
            else if(shaderModel==2)
            surfaces = Isosurfaces2( volume, isovalue );
            else if(shaderModel==3)
            surfaces = Isosurfaces3( volume, isovalue );
			
			/*var smin = 0;
            var smax = volume.resolution.z - 2;	
	    	var value = +document.getElementById('Z-axis').value;
            var z_axis = Math.round(KVS.Mix( smin, smax, value ));
	    	var point = new THREE.Vector3(60,60,z_axis);
	    	var normal = new THREE.Vector3(0,0,1);

	        screen.scene.remove(surfaces);
            var slicesurfaces = SlicePlane( volume, point, normal );*/
			screen.scene.remove( slicesurfaces );
            screen.scene.add( surfaces );    	
			}
			});

	// isosurface.js
	function Isosurfaces0( volume, isovalue )
{

    var light = new THREE.PointLight();
    light.position.set( 5, 5, 5 );

    var geometry = new THREE.Geometry();
   // var material = new THREE.MeshLambertMaterial();

   var material = new THREE.ShaderMaterial({
	vertexColors: THREE.VertexColors,
	
	vertexShader: document.getElementById('gouraud.vert').text,
	fragmentShader: document.getElementById('gouraud.frag').text,
	
	uniforms: {
	    light_position: { type: 'v3', value: light.position }
	}
    });
  

    var smin = volume.min_value;
    var smax = volume.max_value;
    isovalue = KVS.Clamp( isovalue, smin, smax );

    var lut = new KVS.MarchingCubesTable();
    var cell_index = 0;
    var counter = 0;
 
    for ( var z = 0; z < volume.resolution.z - 1; z++ )
    {
        for ( var y = 0; y < volume.resolution.y - 1; y++ )
        {
            for ( var x = 0; x < volume.resolution.x - 1; x++ )
            {
                var indices = cell_node_indices( cell_index++ );
                var index = table_index( indices );
                if ( index == 0 ) { continue; }
                if ( index == 255 ) { continue; }

                for ( var j = 0; lut.edgeID[index][j] != -1; j += 3 )
                {
                    var eid0 = lut.edgeID[index][j];
                    var eid1 = lut.edgeID[index][j+2];
                    var eid2 = lut.edgeID[index][j+1];

                    var vid0 = lut.vertexID[eid0][0];
                    var vid1 = lut.vertexID[eid0][1];
                    var vid2 = lut.vertexID[eid1][0];
                    var vid3 = lut.vertexID[eid1][1];
                    var vid4 = lut.vertexID[eid2][0];
                    var vid5 = lut.vertexID[eid2][1];

                    var v0 = new THREE.Vector3( x + vid0[0], y + vid0[1], z + vid0[2] );
                    var v1 = new THREE.Vector3( x + vid1[0], y + vid1[1], z + vid1[2] );
                    var v2 = new THREE.Vector3( x + vid2[0], y + vid2[1], z + vid2[2] );
                    var v3 = new THREE.Vector3( x + vid3[0], y + vid3[1], z + vid3[2] );
                    var v4 = new THREE.Vector3( x + vid4[0], y + vid4[1], z + vid4[2] );
                    var v5 = new THREE.Vector3( x + vid5[0], y + vid5[1], z + vid5[2] );

                    var v01 = interpolated_vertex( v0, v1, isovalue );
                    var v23 = interpolated_vertex( v2, v3, isovalue );
                    var v45 = interpolated_vertex( v4, v5, isovalue );

                    geometry.vertices.push( v01 );
                    geometry.vertices.push( v23 );
                    geometry.vertices.push( v45 );

                    var id0 = counter++;
                    var id1 = counter++;
                    var id2 = counter++;
                    geometry.faces.push( new THREE.Face3( id0, id1, id2 ) );

                }
            }
            cell_index++;
        }
        cell_index += volume.resolution.x;
    }


    geometry.computeVertexNormals();
    material.vertexColors = THREE.VertexColors;
		
    var scalar = isovalue;
    var cmap = [];

    for ( var i = 0; i < 256 ; i++ )
    {	
        var S = i/255.0;    
		var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(guiControls.color);
		var R = parseInt(result[1], 16);
        var G = parseInt(result[2], 16);
        var B = parseInt(result[3], 16);
        var color = new THREE.Color( R, G, B );		
		cmap.push( [ S, '0x' + ((1 << 24) + (R << 16) + (G << 8) + B).toString(16).slice(1) ] );
    }
    var nfaces=geometry.faces.length;
    for ( var i = 0; i <nfaces; i++ )
    {
	    var C0 = new THREE.Color().setHex( cmap[scalar][1] );
        var C1 = new THREE.Color().setHex( cmap[scalar][1] );
        var C2 = new THREE.Color().setHex( cmap[scalar][1] );
	    geometry.faces[i].vertexColors.push( C0 );
	    geometry.faces[i].vertexColors.push( C1 );
	    geometry.faces[i].vertexColors.push( C2 );
    }
	

    return new THREE.Mesh( geometry, material );

    function cell_node_indices( cell_index )
    {
        var lines = volume.resolution.x;
        var slices = volume.resolution.x * volume.resolution.y;

        var id0 = cell_index;
        var id1 = id0 + 1;
        var id2 = id1 + lines;
        var id3 = id0 + lines;
        var id4 = id0 + slices;
        var id5 = id1 + slices;
        var id6 = id2 + slices;
        var id7 = id3 + slices;
   //material.color = new THREE.Color( "red" );
   



        return [ id0, id1, id2, id3, id4, id5, id6, id7 ];
    }

    function table_index( indices )
    {
        var s0 = volume.values[ indices[0] ][0];
        var s1 = volume.values[ indices[1] ][0];
        var s2 = volume.values[ indices[2] ][0];
        var s3 = volume.values[ indices[3] ][0];
        var s4 = volume.values[ indices[4] ][0];
        var s5 = volume.values[ indices[5] ][0];
        var s6 = volume.values[ indices[6] ][0];
        var s7 = volume.values[ indices[7] ][0];

        var index = 0;
        if ( s0 > isovalue ) { index |=   1; }
        if ( s1 > isovalue ) { index |=   2; }
        if ( s2 > isovalue ) { index |=   4; }
        if ( s3 > isovalue ) { index |=   8; }
        if ( s4 > isovalue ) { index |=  16; }
        if ( s5 > isovalue ) { index |=  32; }
        if ( s6 > isovalue ) { index |=  64; }
        if ( s7 > isovalue ) { index |= 128; }

        return index;
    }

    function interpolated_vertex( v0, v1, s )
    {

	var lines = volume.resolution.x;
	var slices= volume.resolution.x * volume.resolution.y;
	var S0 = volume.values[v0.x+lines*v0.y+slices*v0.z][0];
	var S1 = volume.values[v1.x+lines*v1.y+slices*v1.z][0];
	var t=0;
	
	if(S0<S1){
	    
	    t=(s-S0)/(S1-S0);
	    var x = t*(v1.x-v0.x)+v0.x;
	    var y = t*(v1.y-v0.y)+v0.y;
	    var z = t*(v1.z-v0.z)+v0.z;
	    
	}else if(S0==S1){
	    
	    var x = (v1.x+v0.x)/2;
	    var y = (v1.y+v0.y)/2;
	    var z = (v1.z+v0.z)/2;
	    
	}else{
	    
	    t=(s-S1)/(S0-S1);
	    var x = t*(v0.x-v1.x)+v1.x;
	    var y = t*(v0.y-v1.y)+v1.y;
	    var z = t*(v0.z-v1.z)+v1.z;
	    
	}
        return new THREE.Vector3(x,y,z);


     //   return new THREE.Vector3().addVectors( v0, v1 ).divideScalar( 2 );
    }
}
	
	function Isosurfaces1( volume, isovalue )
{

    var light = new THREE.PointLight();
    light.position.set( 5, 5, 5 );

    var geometry = new THREE.Geometry();
   // var material = new THREE.MeshLambertMaterial();

   var material = new THREE.ShaderMaterial({
	vertexColors: THREE.VertexColors,
	
	vertexShader: document.getElementById('phong.vert').text,
	fragmentShader: document.getElementById('phong.frag').text,
		
	uniforms: {
	    light_position: { type: 'v3', value: light.position }
	}
    });
  

    var smin = volume.min_value;
    var smax = volume.max_value;
    isovalue = KVS.Clamp( isovalue, smin, smax );

    var lut = new KVS.MarchingCubesTable();
    var cell_index = 0;
    var counter = 0;
 
    for ( var z = 0; z < volume.resolution.z - 1; z++ )
    {
        for ( var y = 0; y < volume.resolution.y - 1; y++ )
        {
            for ( var x = 0; x < volume.resolution.x - 1; x++ )
            {
                var indices = cell_node_indices( cell_index++ );
                var index = table_index( indices );
                if ( index == 0 ) { continue; }
                if ( index == 255 ) { continue; }

                for ( var j = 0; lut.edgeID[index][j] != -1; j += 3 )
                {
                    var eid0 = lut.edgeID[index][j];
                    var eid1 = lut.edgeID[index][j+2];
                    var eid2 = lut.edgeID[index][j+1];

                    var vid0 = lut.vertexID[eid0][0];
                    var vid1 = lut.vertexID[eid0][1];
                    var vid2 = lut.vertexID[eid1][0];
                    var vid3 = lut.vertexID[eid1][1];
                    var vid4 = lut.vertexID[eid2][0];
                    var vid5 = lut.vertexID[eid2][1];

                    var v0 = new THREE.Vector3( x + vid0[0], y + vid0[1], z + vid0[2] );
                    var v1 = new THREE.Vector3( x + vid1[0], y + vid1[1], z + vid1[2] );
                    var v2 = new THREE.Vector3( x + vid2[0], y + vid2[1], z + vid2[2] );
                    var v3 = new THREE.Vector3( x + vid3[0], y + vid3[1], z + vid3[2] );
                    var v4 = new THREE.Vector3( x + vid4[0], y + vid4[1], z + vid4[2] );
                    var v5 = new THREE.Vector3( x + vid5[0], y + vid5[1], z + vid5[2] );

                    var v01 = interpolated_vertex( v0, v1, isovalue );
                    var v23 = interpolated_vertex( v2, v3, isovalue );
                    var v45 = interpolated_vertex( v4, v5, isovalue );

                    geometry.vertices.push( v01 );
                    geometry.vertices.push( v23 );
                    geometry.vertices.push( v45 );

                    var id0 = counter++;
                    var id1 = counter++;
                    var id2 = counter++;
                    geometry.faces.push( new THREE.Face3( id0, id1, id2 ) );

                }
            }
            cell_index++;
        }
        cell_index += volume.resolution.x;
    }


    geometry.computeVertexNormals();
    material.vertexColors = THREE.VertexColors;

   var scalar = isovalue;
    var cmap = [];

    for ( var i = 0; i < 256 ; i++ )
    {	
        var S = i/255.0;    
		var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(guiControls.color);
		var R = parseInt(result[1], 16);
        var G = parseInt(result[2], 16);
        var B = parseInt(result[3], 16);
        var color = new THREE.Color( R, G, B );		
		cmap.push( [ S, '0x' + ((1 << 24) + (R << 16) + (G << 8) + B).toString(16).slice(1) ] );
    }
    var nfaces=geometry.faces.length;
    for ( var i = 0; i <nfaces; i++ )
    {
	    var C0 = new THREE.Color().setHex( cmap[scalar][1] );
        var C1 = new THREE.Color().setHex( cmap[scalar][1] );
        var C2 = new THREE.Color().setHex( cmap[scalar][1] );
	    geometry.faces[i].vertexColors.push( C0 );
	    geometry.faces[i].vertexColors.push( C1 );
	    geometry.faces[i].vertexColors.push( C2 );
    }

    return new THREE.Mesh( geometry, material );

    function cell_node_indices( cell_index )
    {
        var lines = volume.resolution.x;
        var slices = volume.resolution.x * volume.resolution.y;

        var id0 = cell_index;
        var id1 = id0 + 1;
        var id2 = id1 + lines;
        var id3 = id0 + lines;
        var id4 = id0 + slices;
        var id5 = id1 + slices;
        var id6 = id2 + slices;
        var id7 = id3 + slices;
   //material.color = new THREE.Color( "red" );
   



        return [ id0, id1, id2, id3, id4, id5, id6, id7 ];
    }

    function table_index( indices )
    {
        var s0 = volume.values[ indices[0] ][0];
        var s1 = volume.values[ indices[1] ][0];
        var s2 = volume.values[ indices[2] ][0];
        var s3 = volume.values[ indices[3] ][0];
        var s4 = volume.values[ indices[4] ][0];
        var s5 = volume.values[ indices[5] ][0];
        var s6 = volume.values[ indices[6] ][0];
        var s7 = volume.values[ indices[7] ][0];

        var index = 0;
        if ( s0 > isovalue ) { index |=   1; }
        if ( s1 > isovalue ) { index |=   2; }
        if ( s2 > isovalue ) { index |=   4; }
        if ( s3 > isovalue ) { index |=   8; }
        if ( s4 > isovalue ) { index |=  16; }
        if ( s5 > isovalue ) { index |=  32; }
        if ( s6 > isovalue ) { index |=  64; }
        if ( s7 > isovalue ) { index |= 128; }

        return index;
    }

    function interpolated_vertex( v0, v1, s )
    {

	var lines = volume.resolution.x;
	var slices= volume.resolution.x * volume.resolution.y;
	var S0 = volume.values[v0.x+lines*v0.y+slices*v0.z][0];
	var S1 = volume.values[v1.x+lines*v1.y+slices*v1.z][0];
	var t=0;
	
	if(S0<S1){
	    
	    t=(s-S0)/(S1-S0);
	    var x = t*(v1.x-v0.x)+v0.x;
	    var y = t*(v1.y-v0.y)+v0.y;
	    var z = t*(v1.z-v0.z)+v0.z;
	    
	}else if(S0==S1){
	    
	    var x = (v1.x+v0.x)/2;
	    var y = (v1.y+v0.y)/2;
	    var z = (v1.z+v0.z)/2;
	    
	}else{
	    
	    t=(s-S1)/(S0-S1);
	    var x = t*(v0.x-v1.x)+v1.x;
	    var y = t*(v0.y-v1.y)+v1.y;
	    var z = t*(v0.z-v1.z)+v1.z;
	    
	}
        return new THREE.Vector3(x,y,z);


     //   return new THREE.Vector3().addVectors( v0, v1 ).divideScalar( 2 );
    }
}
	function Isosurfaces2( volume, isovalue )
{

    var light = new THREE.PointLight();
    light.position.set( 5, 5, 5 );

    var geometry = new THREE.Geometry();
   // var material = new THREE.MeshLambertMaterial();

   var material = new THREE.ShaderMaterial({
	vertexColors: THREE.VertexColors,
	
	vertexShader: document.getElementById('gouraudBlinn-Phong.vert').text,
	fragmentShader: document.getElementById('gouraudBlinn-Phong.frag').text,
		
	uniforms: {
	    light_position: { type: 'v3', value: light.position }
	}
    });
  

    var smin = volume.min_value;
    var smax = volume.max_value;
    isovalue = KVS.Clamp( isovalue, smin, smax );

    var lut = new KVS.MarchingCubesTable();
    var cell_index = 0;
    var counter = 0;
 
    for ( var z = 0; z < volume.resolution.z - 1; z++ )
    {
        for ( var y = 0; y < volume.resolution.y - 1; y++ )
        {
            for ( var x = 0; x < volume.resolution.x - 1; x++ )
            {
                var indices = cell_node_indices( cell_index++ );
                var index = table_index( indices );
                if ( index == 0 ) { continue; }
                if ( index == 255 ) { continue; }

                for ( var j = 0; lut.edgeID[index][j] != -1; j += 3 )
                {
                    var eid0 = lut.edgeID[index][j];
                    var eid1 = lut.edgeID[index][j+2];
                    var eid2 = lut.edgeID[index][j+1];

                    var vid0 = lut.vertexID[eid0][0];
                    var vid1 = lut.vertexID[eid0][1];
                    var vid2 = lut.vertexID[eid1][0];
                    var vid3 = lut.vertexID[eid1][1];
                    var vid4 = lut.vertexID[eid2][0];
                    var vid5 = lut.vertexID[eid2][1];

                    var v0 = new THREE.Vector3( x + vid0[0], y + vid0[1], z + vid0[2] );
                    var v1 = new THREE.Vector3( x + vid1[0], y + vid1[1], z + vid1[2] );
                    var v2 = new THREE.Vector3( x + vid2[0], y + vid2[1], z + vid2[2] );
                    var v3 = new THREE.Vector3( x + vid3[0], y + vid3[1], z + vid3[2] );
                    var v4 = new THREE.Vector3( x + vid4[0], y + vid4[1], z + vid4[2] );
                    var v5 = new THREE.Vector3( x + vid5[0], y + vid5[1], z + vid5[2] );

                    var v01 = interpolated_vertex( v0, v1, isovalue );
                    var v23 = interpolated_vertex( v2, v3, isovalue );
                    var v45 = interpolated_vertex( v4, v5, isovalue );

                    geometry.vertices.push( v01 );
                    geometry.vertices.push( v23 );
                    geometry.vertices.push( v45 );

                    var id0 = counter++;
                    var id1 = counter++;
                    var id2 = counter++;
                    geometry.faces.push( new THREE.Face3( id0, id1, id2 ) );

                }
            }
            cell_index++;
        }
        cell_index += volume.resolution.x;
    }


    geometry.computeVertexNormals();
    material.vertexColors = THREE.VertexColors;

    var scalar = isovalue;
    var cmap = [];

    for ( var i = 0; i < 256 ; i++ )
    {	
        var S = i/255.0;    
		var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(guiControls.color);
		var R = parseInt(result[1], 16);
        var G = parseInt(result[2], 16);
        var B = parseInt(result[3], 16);
        var color = new THREE.Color( R, G, B );		
		cmap.push( [ S, '0x' + ((1 << 24) + (R << 16) + (G << 8) + B).toString(16).slice(1) ] );
    }
    var nfaces=geometry.faces.length;
    for ( var i = 0; i <nfaces; i++ )
    {
	    var C0 = new THREE.Color().setHex( cmap[scalar][1] );
        var C1 = new THREE.Color().setHex( cmap[scalar][1] );
        var C2 = new THREE.Color().setHex( cmap[scalar][1] );
	    geometry.faces[i].vertexColors.push( C0 );
	    geometry.faces[i].vertexColors.push( C1 );
	    geometry.faces[i].vertexColors.push( C2 );
    }

    return new THREE.Mesh( geometry, material );

    function cell_node_indices( cell_index )
    {
        var lines = volume.resolution.x;
        var slices = volume.resolution.x * volume.resolution.y;

        var id0 = cell_index;
        var id1 = id0 + 1;
        var id2 = id1 + lines;
        var id3 = id0 + lines;
        var id4 = id0 + slices;
        var id5 = id1 + slices;
        var id6 = id2 + slices;
        var id7 = id3 + slices;
   //material.color = new THREE.Color( "red" );
   



        return [ id0, id1, id2, id3, id4, id5, id6, id7 ];
    }

    function table_index( indices )
    {
        var s0 = volume.values[ indices[0] ][0];
        var s1 = volume.values[ indices[1] ][0];
        var s2 = volume.values[ indices[2] ][0];
        var s3 = volume.values[ indices[3] ][0];
        var s4 = volume.values[ indices[4] ][0];
        var s5 = volume.values[ indices[5] ][0];
        var s6 = volume.values[ indices[6] ][0];
        var s7 = volume.values[ indices[7] ][0];

        var index = 0;
        if ( s0 > isovalue ) { index |=   1; }
        if ( s1 > isovalue ) { index |=   2; }
        if ( s2 > isovalue ) { index |=   4; }
        if ( s3 > isovalue ) { index |=   8; }
        if ( s4 > isovalue ) { index |=  16; }
        if ( s5 > isovalue ) { index |=  32; }
        if ( s6 > isovalue ) { index |=  64; }
        if ( s7 > isovalue ) { index |= 128; }

        return index;
    }

    function interpolated_vertex( v0, v1, s )
    {

	var lines = volume.resolution.x;
	var slices= volume.resolution.x * volume.resolution.y;
	var S0 = volume.values[v0.x+lines*v0.y+slices*v0.z][0];
	var S1 = volume.values[v1.x+lines*v1.y+slices*v1.z][0];
	var t=0;
	
	if(S0<S1){
	    
	    t=(s-S0)/(S1-S0);
	    var x = t*(v1.x-v0.x)+v0.x;
	    var y = t*(v1.y-v0.y)+v0.y;
	    var z = t*(v1.z-v0.z)+v0.z;
	    
	}else if(S0==S1){
	    
	    var x = (v1.x+v0.x)/2;
	    var y = (v1.y+v0.y)/2;
	    var z = (v1.z+v0.z)/2;
	    
	}else{
	    
	    t=(s-S1)/(S0-S1);
	    var x = t*(v0.x-v1.x)+v1.x;
	    var y = t*(v0.y-v1.y)+v1.y;
	    var z = t*(v0.z-v1.z)+v1.z;
	    
	}
        return new THREE.Vector3(x,y,z);


     //   return new THREE.Vector3().addVectors( v0, v1 ).divideScalar( 2 );
    }
}

	function Isosurfaces3( volume, isovalue )
{
    var geometry = new THREE.Geometry();
    var material = new THREE.MeshLambertMaterial();

    var smin = volume.min_value;
    var smax = volume.max_value;
    isovalue = KVS.Clamp( isovalue, smin, smax );

    var lut = new KVS.MarchingCubesTable();
    var cell_index = 0;
    var counter = 0;
    for ( var z = 0; z < volume.resolution.z - 1; z++ )
    {
        for ( var y = 0; y < volume.resolution.y - 1; y++ )
        {
            for ( var x = 0; x < volume.resolution.x - 1; x++ )
            {
                var indices = cell_node_indices( cell_index++ );
                var index = table_index( indices );
                if ( index == 0 ) { continue; }
                if ( index == 255 ) { continue; }

                for ( var j = 0; lut.edgeID[index][j] != -1; j += 3 )
                {
                    var eid0 = lut.edgeID[index][j];
                    var eid1 = lut.edgeID[index][j+2];
                    var eid2 = lut.edgeID[index][j+1];

                    var vid0 = lut.vertexID[eid0][0];
                    var vid1 = lut.vertexID[eid0][1];
                    var vid2 = lut.vertexID[eid1][0];
                    var vid3 = lut.vertexID[eid1][1];
                    var vid4 = lut.vertexID[eid2][0];
                    var vid5 = lut.vertexID[eid2][1];

                    var v0 = new THREE.Vector3( x + vid0[0], y + vid0[1], z + vid0[2] );
                    var v1 = new THREE.Vector3( x + vid1[0], y + vid1[1], z + vid1[2] );
                    var v2 = new THREE.Vector3( x + vid2[0], y + vid2[1], z + vid2[2] );
                    var v3 = new THREE.Vector3( x + vid3[0], y + vid3[1], z + vid3[2] );
                    var v4 = new THREE.Vector3( x + vid4[0], y + vid4[1], z + vid4[2] );
                    var v5 = new THREE.Vector3( x + vid5[0], y + vid5[1], z + vid5[2] );

                    var v01 = interpolated_vertex( v0, v1, isovalue );
                    var v23 = interpolated_vertex( v2, v3, isovalue );
                    var v45 = interpolated_vertex( v4, v5, isovalue );

                    geometry.vertices.push( v01 );
                    geometry.vertices.push( v23 );
                    geometry.vertices.push( v45 );

                    var id0 = counter++;
                    var id1 = counter++;
                    var id2 = counter++;
                    geometry.faces.push( new THREE.Face3( id0, id1, id2 ) );
                }
            }
            cell_index++;
        }
        cell_index += volume.resolution.x;
    }

    geometry.computeVertexNormals();

    material.color = new THREE.Color( "white" );

    return new THREE.Mesh( geometry, material );


    function cell_node_indices( cell_index )
    {
        var lines = volume.resolution.x;
        var slices = volume.resolution.x * volume.resolution.y;

        var id0 = cell_index;
        var id1 = id0 + 1;
        var id2 = id1 + lines;
        var id3 = id0 + lines;
        var id4 = id0 + slices;
        var id5 = id1 + slices;
        var id6 = id2 + slices;
        var id7 = id3 + slices;

        return [ id0, id1, id2, id3, id4, id5, id6, id7 ];
    }

    function table_index( indices )
    {
        var s0 = volume.values[ indices[0] ][0];
        var s1 = volume.values[ indices[1] ][0];
        var s2 = volume.values[ indices[2] ][0];
        var s3 = volume.values[ indices[3] ][0];
        var s4 = volume.values[ indices[4] ][0];
        var s5 = volume.values[ indices[5] ][0];
        var s6 = volume.values[ indices[6] ][0];
        var s7 = volume.values[ indices[7] ][0];

        var index = 0;
        if ( s0 > isovalue ) { index |=   1; }
        if ( s1 > isovalue ) { index |=   2; }
        if ( s2 > isovalue ) { index |=   4; }
        if ( s3 > isovalue ) { index |=   8; }
        if ( s4 > isovalue ) { index |=  16; }
        if ( s5 > isovalue ) { index |=  32; }
        if ( s6 > isovalue ) { index |=  64; }
        if ( s7 > isovalue ) { index |= 128; }

        return index;
    }

    function interpolated_vertex( v0, v1, s )
    {
        return new THREE.Vector3().addVectors( v0, v1 ).divideScalar( 2 );
    }
}

function Isosurfaces4( volume, isovalue )
{

    var light = new THREE.PointLight();
    light.position.set( 5, 5, 5 );

    var geometry = new THREE.Geometry();
   // var material = new THREE.MeshLambertMaterial();

   var material = new THREE.ShaderMaterial({
	vertexColors: THREE.VertexColors,
	
	vertexShader: document.getElementById('CookTorrance.vert').text,
	fragmentShader: document.getElementById('CookTorrance.frag').text,
		
	uniforms: {
	    light_position: { type: 'v3', value: light.position }
	}
    });
  

    var smin = volume.min_value;
    var smax = volume.max_value;
    isovalue = KVS.Clamp( isovalue, smin, smax );

    var lut = new KVS.MarchingCubesTable();
    var cell_index = 0;
    var counter = 0;
 
    for ( var z = 0; z < volume.resolution.z - 1; z++ )
    {
        for ( var y = 0; y < volume.resolution.y - 1; y++ )
        {
            for ( var x = 0; x < volume.resolution.x - 1; x++ )
            {
                var indices = cell_node_indices( cell_index++ );
                var index = table_index( indices );
                if ( index == 0 ) { continue; }
                if ( index == 255 ) { continue; }

                for ( var j = 0; lut.edgeID[index][j] != -1; j += 3 )
                {
                    var eid0 = lut.edgeID[index][j];
                    var eid1 = lut.edgeID[index][j+2];
                    var eid2 = lut.edgeID[index][j+1];

                    var vid0 = lut.vertexID[eid0][0];
                    var vid1 = lut.vertexID[eid0][1];
                    var vid2 = lut.vertexID[eid1][0];
                    var vid3 = lut.vertexID[eid1][1];
                    var vid4 = lut.vertexID[eid2][0];
                    var vid5 = lut.vertexID[eid2][1];

                    var v0 = new THREE.Vector3( x + vid0[0], y + vid0[1], z + vid0[2] );
                    var v1 = new THREE.Vector3( x + vid1[0], y + vid1[1], z + vid1[2] );
                    var v2 = new THREE.Vector3( x + vid2[0], y + vid2[1], z + vid2[2] );
                    var v3 = new THREE.Vector3( x + vid3[0], y + vid3[1], z + vid3[2] );
                    var v4 = new THREE.Vector3( x + vid4[0], y + vid4[1], z + vid4[2] );
                    var v5 = new THREE.Vector3( x + vid5[0], y + vid5[1], z + vid5[2] );

                    var v01 = interpolated_vertex( v0, v1, isovalue );
                    var v23 = interpolated_vertex( v2, v3, isovalue );
                    var v45 = interpolated_vertex( v4, v5, isovalue );

                    geometry.vertices.push( v01 );
                    geometry.vertices.push( v23 );
                    geometry.vertices.push( v45 );

                    var id0 = counter++;
                    var id1 = counter++;
                    var id2 = counter++;
                    geometry.faces.push( new THREE.Face3( id0, id1, id2 ) );

                }
            }
            cell_index++;
        }
        cell_index += volume.resolution.x;
    }


    geometry.computeVertexNormals();
    material.vertexColors = THREE.VertexColors;

    var scalar = isovalue;
    var cmap = [];

    for ( var i = 0; i < 256 ; i++ )
    {	
        var S = i/255.0;    
		var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(guiControls.color);
		var R = parseInt(result[1], 16);
        var G = parseInt(result[2], 16);
        var B = parseInt(result[3], 16);
        var color = new THREE.Color( R, G, B );		
		cmap.push( [ S, '0x' + ((1 << 24) + (R << 16) + (G << 8) + B).toString(16).slice(1) ] );
    }
    var nfaces=geometry.faces.length;
    for ( var i = 0; i <nfaces; i++ )
    {
	    var C0 = new THREE.Color().setHex( cmap[scalar][1] );
        var C1 = new THREE.Color().setHex( cmap[scalar][1] );
        var C2 = new THREE.Color().setHex( cmap[scalar][1] );
	    geometry.faces[i].vertexColors.push( C0 );
	    geometry.faces[i].vertexColors.push( C1 );
	    geometry.faces[i].vertexColors.push( C2 );
    }

    return new THREE.Mesh( geometry, material );

    function cell_node_indices( cell_index )
    {
        var lines = volume.resolution.x;
        var slices = volume.resolution.x * volume.resolution.y;

        var id0 = cell_index;
        var id1 = id0 + 1;
        var id2 = id1 + lines;
        var id3 = id0 + lines;
        var id4 = id0 + slices;
        var id5 = id1 + slices;
        var id6 = id2 + slices;
        var id7 = id3 + slices;
   //material.color = new THREE.Color( "red" );
   



        return [ id0, id1, id2, id3, id4, id5, id6, id7 ];
    }

    function table_index( indices )
    {
        var s0 = volume.values[ indices[0] ][0];
        var s1 = volume.values[ indices[1] ][0];
        var s2 = volume.values[ indices[2] ][0];
        var s3 = volume.values[ indices[3] ][0];
        var s4 = volume.values[ indices[4] ][0];
        var s5 = volume.values[ indices[5] ][0];
        var s6 = volume.values[ indices[6] ][0];
        var s7 = volume.values[ indices[7] ][0];

        var index = 0;
        if ( s0 > isovalue ) { index |=   1; }
        if ( s1 > isovalue ) { index |=   2; }
        if ( s2 > isovalue ) { index |=   4; }
        if ( s3 > isovalue ) { index |=   8; }
        if ( s4 > isovalue ) { index |=  16; }
        if ( s5 > isovalue ) { index |=  32; }
        if ( s6 > isovalue ) { index |=  64; }
        if ( s7 > isovalue ) { index |= 128; }

        return index;
    }

    function interpolated_vertex( v0, v1, s )
    {

	var lines = volume.resolution.x;
	var slices= volume.resolution.x * volume.resolution.y;
	var S0 = volume.values[v0.x+lines*v0.y+slices*v0.z][0];
	var S1 = volume.values[v1.x+lines*v1.y+slices*v1.z][0];
	var t=0;
	
	if(S0<S1){
	    
	    t=(s-S0)/(S1-S0);
	    var x = t*(v1.x-v0.x)+v0.x;
	    var y = t*(v1.y-v0.y)+v0.y;
	    var z = t*(v1.z-v0.z)+v0.z;
	    
	}else if(S0==S1){
	    
	    var x = (v1.x+v0.x)/2;
	    var y = (v1.y+v0.y)/2;
	    var z = (v1.z+v0.z)/2;
	    
	}else{
	    
	    t=(s-S1)/(S0-S1);
	    var x = t*(v0.x-v1.x)+v1.x;
	    var y = t*(v0.y-v1.y)+v1.y;
	    var z = t*(v0.z-v1.z)+v1.z;
	    
	}
        return new THREE.Vector3(x,y,z);


     //   return new THREE.Vector3().addVectors( v0, v1 ).divideScalar( 2 );
    }
}
	
	
    document.addEventListener( 'mousemove', function() {
        screen.light.position.copy( screen.camera.position );
    });

    window.addEventListener('resize', function() {
    screen.resize([ window.innerWidth * 0.8, window.innerHeight ]);
    });

    screen.loop();
}
