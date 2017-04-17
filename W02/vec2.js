// Constructor
vec2 = function(x,y)
{
    this.x = x;
    this.y = y;
}

//calculate the area of triangle
function AreaOfTriangle(a,b,c)
{   
    var P,Q;
    P=a.x*(b.y-c.y)+b.x*(c.y-a.y)+c.x*(a.y-b.y);
	if (P>=0)
	{
		Q=P;
	}
	else
	{
		Q=-P;
	}
	area = (1/2)*Q;
	return area;
}



