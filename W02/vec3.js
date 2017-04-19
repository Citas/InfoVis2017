// Constructor
vec3 = function(x,y,z)
{	
    this.x = parseInt(x);
    this.y = parseInt(y);
    this.z = parseInt(z);
}

//min
vec3.prototype.min = function()
{
	if (this.x <= this.y)
	{
		if (this.x <= this.z)
		{return this.x}
	    else 
		{return this.z}	
	}
	else
	{
		if (this.y <= this.z)
		{return this.y}
	    else
		{return this.z}	
	}
}

//mid
vec3.prototype.mid = function()
{
	if (this.x <= this.y)
	{
		if (this.x >= this.z)
		{return this.x}
	    else
	    {
		if (this.y <= this.z)
		{return this.y}
	    else
		{return this.z}	
	    }	
	}
	else 
	{
		if (this.y >= this.z)
		{return this.y}
	    else 
		{ 
		if (this.x >=this.z)
		{return this.z}
	    else 
        {return this.x}			
	    }	
	}
}


//max
vec3.prototype.max = function()
{
	if (this.x >= this.y)
	{
		if (this.z >= this.x)
		{return this.z}
	    else 
		{return this.x}	
	}
	else
	{
		if (this.y >= this.z)
		{return this.y}
	    else
		{return this.z}	
	}
}


// Add method
vec3.prototype.add = function(v)
{
    this.x += v.x;
    this.y += v.y;
    this.z += v.z;
    return this;
}
// Sum method
vec3.prototype.sum = function()
{
    return this.x + this.y + this.z;
}
