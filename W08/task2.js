function main()
{
    var width = 500;
    var height = 500;

    var scene = new THREE.Scene();

    var fov = 45;
    var aspect = width / height;
    var near = 1;
    var far = 1000;
    
	var camera_left = new THREE.PerspectiveCamera( fov, aspect, near, far );
    camera_left.position.set( 0, 0, 5 );
    scene.add( camera_left );

    var camera_right = new THREE.PerspectiveCamera( fov, aspect, near, far);
    camera_right.position.set( 5, 0, 5);
    scene.add( camera_right );

    var light = new THREE.PointLight();
    light.position.set( 5, 5, 5 );
    scene.add( light );

    var renderer = new THREE.WebGLRenderer();
	var screen_width = window.innerWidth;
    var screen_height = window.innerHeight;
    renderer.setSize( screen_width, screen_height);
    document.body.appendChild( renderer.domElement );
	renderer.autoClear = false;

    var geometry = new THREE.TorusKnotGeometry( 1, 0.3, 100, 20 );
    
	var material_left = new THREE.ShaderMaterial({
    vertexColors: THREE.VertexColors,
    vertexShader: document.getElementById('gouraudPhong.vert').text,
    fragmentShader: document.getElementById('gouraudPhong.frag').text,
    uniforms: {
    light_position: { type: 'v3', value: light.position }
    }
    });
	
	var material_right = new THREE.ShaderMaterial({
    vertexColors: THREE.VertexColors,
    vertexShader: document.getElementById('PhongPhong.vert').text,
    fragmentShader: document.getElementById('PhongPhong.frag').text,
    uniforms: {
    light_position: { type: 'v3', value: light.position }
    }
    });

    var torus_knot_left = new THREE.Mesh( geometry, material_left );
	var torus_knot_right = new THREE.Mesh( geometry, material_right );
	torus_knot_left.position.set(0,0,0);
	torus_knot_right.position.set(5,0,0);
	scene.add( torus_knot_left );
    scene.add( torus_knot_right );
    
	loop();

    function loop()
    {
	
        requestAnimationFrame( loop );
        torus_knot_left.rotation.x += 0.01;
        torus_knot_left.rotation.y += 0.01;
	
	    torus_knot_right.rotation.x += 0.01;
        torus_knot_right.rotation.y += 0.01;
	
	    renderer.setViewport(0.1*screen_width, 0.2*screen_height, 0.8*width, 0.5*screen_height);
        renderer.render( scene, camera_left);

	    renderer.setViewport( 0.6*screen_width, 0.2*screen_height, 0.8*width, 0.5*screen_height);
        renderer.render( scene, camera_right);
    }
}
