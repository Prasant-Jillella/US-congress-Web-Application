
//legislature part starts


var app=angular.module("app",['angularUtils.directives.dirPagination','ngStorage']);
app.controller("ctrl",["$scope","$http","$localStorage",function($scope,$http,$localStorage){

    $http.get("http://prasantapp-env.us-west-2.elasticbeanstalk.com?method=legs").then(function(response){
        $scope.y=response.data.results;
        $scope.arr = [];
        $.each(response.data.results,function(i){
            if($scope.arr.indexOf(response.data.results[i].state_name) == -1){
                $scope.arr.push(response.data.results[i].state_name);
            }					
        });
        $scope.arr.sort();
    });


    $http.get("http://prasantapp-env.us-west-2.elasticbeanstalk.com?method=legsse").
    success(function(data)
            {
        $scope.se=data.results;

    });



    $http.get("http://prasantapp-env.us-west-2.elasticbeanstalk.com?method=legsho").
    success(function(data)
            {
        $scope.ho=data.results;

    });

    $scope.legfunction=function(vals)
    {
        $scope.lid=vals;
        var y=0;
        $scope.unt=new Date().getTime();
        $scope.start=new Date($scope.lid.term_start).getTime();
        $scope.end=new Date($scope.lid.term_end).getTime();
        $scope.term=Math.round((($scope.unt-$scope.start)/($scope.end-$scope.start))*100);				


        $http.get("http://prasantapp-env.us-west-2.elasticbeanstalk.com?method=legbill&id="+$scope.lid.bioguide_id).
        success(function(data)
                {
            $scope.legbill=data.results;

        });
        $http.get("http://prasantapp-env.us-west-2.elasticbeanstalk.com?method=legscommittee&id="+$scope.lid.bioguide_id).
        success(function(data)
                {
            $scope.legcomm=data.results;

        });

        $scope.zl=$localStorage.favourit;
        $scope.lstar1 = angular.element(document.querySelector('#lst'));
        $.each($scope.zl,function(i)
               {
            if($scope.zl[i].bioguide_id==vals.bioguide_id)
            {
                y=1;
                $scope.lstar1.addClass("cl");
                $scope.lstar1.removeClass("fa-star-o");
                $scope.lstar1.addClass("fa-star");
            }
        });
        if(y==0)
        {
            $scope.lstar1.removeClass("cl");
            $scope.lstar1.removeClass("fa-star");
            $scope.lstar1.addClass("fa-star-o");
        }
    }


    //legislature ends 

    //bill starts

    $http.get("http://prasantapp-env.us-west-2.elasticbeanstalk.com?method=billactive").
    success(function(data)
            {
        $scope.ba=data.results;


    });


    $http.get("http://prasantapp-env.us-west-2.elasticbeanstalk.com?method=billnew").
    success(function(data)
            {
        $scope.bn=data.results;


    });

    $scope.billfunction=function(vals)
    {
        $scope.bid=vals;
        var y1=0;
        $scope.z2=$localStorage.favourit;
        $scope.bstar1 = angular.element(document.querySelector('#bst'));
        $.each($scope.z2,function(i)
               {
            if($scope.z2[i].bill_id==vals.bill_id)
            {
                y1=1;
                $scope.bstar1.removeClass("fa-star-o");
                $scope.bstar1.addClass("cl");
                $scope.bstar1.addClass("fa-star");

            }
        });
        if(y1==0)
        {
            $scope.bstar1.removeClass("cl");
            $scope.bstar1.removeClass("fa-star");
            $scope.bstar1.addClass("fa-star-o");

        }
        /*
				$scope.bstar.removeClass("cl");
				$scope.bstar.removeClass("fa-star");
				$scope.bstar.addClass("fa-star-o");
				*/

    }



    //bill ends

    //committee starts   ctrlcommith

    $http.get("http://prasantapp-env.us-west-2.elasticbeanstalk.com?method=ctrlcommith").
    success(function(data)
            {
        $scope.ch=data.results;

    });
    $http.get("http://prasantapp-env.us-west-2.elasticbeanstalk.com?method=ctrlcommits").
    success(function(data)
            {
        $scope.chs=data.results;

    });

    $http.get("http://prasantapp-env.us-west-2.elasticbeanstalk.com?method=ctrlcommitt").
    success(function(data)
            {
        $scope.cht=data.results;

    });
    //favourits function


    $scope.deldata = function(x)
    {
        alert(x.first_name);
    }


    $scope.legfav = function(v,vals)
    {
        vals.lbc=v;
        var favvals = vals;
        var l=0;
        var b=0;
        $scope.item=[];
        if($localStorage.favourit)
        {
            $scope.item=$localStorage.favourit;
            $.each($scope.item,function(i)
                   {
                if(favvals.lbc=='l')
                {
                    if(favvals.bioguide_id==$scope.item[i].bioguide_id)
                    {
                        l=1;
                        b=i;
                        $scope.lstar = angular.element(document.querySelector('#lst'));
                        $scope.lstar.removeClass("cl");
                        $scope.lstar.removeClass("fa-star");
                        $scope.lstar.addClass("fa-star-o");

                    }
                }
                if(favvals.lbc=='b')
                {
                    if(favvals.bill_id==$scope.item[i].bill_id)
                    {
                        l=1;
                        b=i;
                        $scope.bstar = angular.element(document.querySelector('#bst'));
                        $scope.bstar.removeClass("cl");
                        $scope.bstar.removeClass("fa-star");
                        $scope.bstar.addClass("fa-star-o");

                    }
                }
                if(favvals.lbc=='c')
                {
                    if(favvals.committee_id==$scope.item[i].committee_id)
                    {
                        l=1;
                        b=i;
                        $scope.bstar = angular.element(document.querySelector('#cstar'+favvals.committee_id));

                    }
                }
            });
            if(l==1)
            {
                $scope.item.splice(b,1);
                $scope.bstar.removeClass("cl");
                $scope.bstar.removeClass("fa-star");
                $scope.bstar.addClass("fa-star-o");
            }
            else
            {
                $scope.item.push(favvals);
                if(v=='l')
                {
                    $scope.lstar = angular.element(document.querySelector('#lst'));
                    $scope.lstar.addClass("cl");
                    $scope.lstar.removeClass("fa-star-o");
                    $scope.lstar.addClass("fa-star");
                }
                else if(v=='b')
                {
                    $scope.bstar = angular.element(document.querySelector('#bst'));
                    $scope.bstar.addClass("cl");
                    $scope.bstar.removeClass("fa-star-o");
                    $scope.bstar.addClass("fa-star");
                }
                else if(v=='c')
                {
                    $scope.bstar = angular.element(document.querySelector('#cstar'+favvals.committee_id));
                    $scope.bstar.addClass("cl");
                    $scope.bstar.removeClass("fa-star-o");
                    $scope.bstar.addClass("fa-star");
                }
            }
        }
        else
        {
            $scope.item.push(favvals);
        }
        $localStorage.favourit = $scope.item;
        console.log($localStorage.favourit[0].first_name);
    }

    $scope.difav=function()
    {
        $scope.fv = $localStorage.favourit;

        var favdata = $localStorage.favourit;

        $.each(favdata, function(i){
            if(favdata[i].lbc == 'c'){
                $scope.star = angular.element(document.querySelector('#cstar'+favdata[i].committee_id));
                $scope.star.removeClass("fa-star-o");
                $scope.star.addClass("fa-star");
                $scope.star.addClass("cl");
            }
        });
        //end
    }

    $scope.delval=function(v,va)
    {
        var b=0;
        $scope.t=$localStorage.favourit;
        $.each($scope.t,function(i){
            if($scope.t[i].lbc=='l')
            {
                if($scope.t[i].bioguide_id==va.bioguide_id)
                {
                    b=i;
                    $scope.bstar = angular.element(document.querySelector('#lst'));
                    $scope.bstar.removeClass("cl");
                    $scope.bstar.removeClass("fa-star");
                    $scope.bstar.addClass("fa-star-o");
                }
            }
            if($scope.t[i].lbc=='b')
            {
                if($scope.t[i].bill_id==va.bill_id)
                {
                    b=i;
                    $scope.bstar = angular.element(document.querySelector('#bst'));
                    $scope.bstar.removeClass("cl");
                    $scope.bstar.removeClass("fa-star");
                    $scope.bstar.addClass("fa-star-o");
                }
            }
            if($scope.t[i].lbc=='c')
            {
                if($scope.t[i].committee_id==va.committee_id)
                {
                    b=i;
                    $scope.bstar = angular.element(document.querySelector('#cstar'+$scope.t[i].committee_id));
                    $scope.bstar.removeClass("cl");
                    $scope.bstar.removeClass("fa-star");
                    $scope.bstar.addClass("fa-star-o");
                }
            }
        });
        $scope.t.splice(b,1);
        $localStorage.favourit = $scope.t;

    }

    $scope.leffav=function(leg)
    {
        $scope.lidf=leg;
        $scope.untf=new Date().getTime();
        $scope.startf=new Date($scope.lidf.term_start).getTime();
        $scope.endf=new Date($scope.lidf.term_end).getTime();
        $scope.termf=Math.round((($scope.untf-$scope.startf)/($scope.endf-$scope.startf))*100);				


        $http.get("http://prasantapp-env.us-west-2.elasticbeanstalk.com?method=legbill&id="+$scope.lidf.bioguide_id).
        success(function(data)
                {
            $scope.legbillf=data.results;

        });
        $http.get("http://prasantapp-env.us-west-2.elasticbeanstalk.com?method=legscommittee&id="+$scope.lidf.bioguide_id).
        success(function(data)
                {
            $scope.legcommf=data.results;

        });

    }

    $scope.billfav=function(vab)
    {

        $scope.bidf=vab;
    }




}]);

//committee ends







/*function leftbar()
{
	var leftnavStr = document.getElementById("leftnav1").innerHTML;
	var text="<div id=\"sidebar-leftnav\" class=\"col-xs-2\" style=\"position:fixed; margin-left:-250px; margin-top:50px;\"><ul class=\"sidebar-nav\" ><li style=\"margin-top:15px;\"><a id=\"legislator1\" href=\"#\" onclick=\"visiblefun(this)\"  name=\"Legislatures\" ><i class=\"fa fa-user\" aria-hidden=\"true\"></i><span class=\"hidden-xs\"> Legislatures</span></a></li><li><a id=\"bills1\" href=\"#\" name=\"Bills\" onclick=\"visiblefun(this)\"><i class=\"fa fa-file-o\" aria-hidden=\"true\"></i><span class=\"hidden-xs\">  Bills</span></a></li><li><a id=\"committees1\" href=\"#\" name=\"Committiees\" onclick=\"visiblefun(this)\" ><i class=\"fa fa-sign-in\" aria-hidden=\"true\"></i><span class=\"hidden-xs\">  Committees</span></a></li><li><a id=\"favourits1\" href=\"#\" name=\"Favourites\" onclick=\"visiblefun(this)\"><i class=\"fa fa-star-o\" aria-hidden=\"true\"></i><span class=\"hidden-xs\">  Favourites</span></a></li></ul></div>";

	if(leftnavStr.trim() != "")
	{
		document.getElementById("leftnav1").innerHTML="";
	}
	else
		document.getElementById("leftnav1").innerHTML=text;
}*/


function visiblefun(v)
{
    if(v.id=="legislator1")
    {
        document.getElementById("legislators").style.visibility="visible";

        document.getElementById("bills").style.visibility="hidden";
        document.getElementById("committees").style.visibility="hidden";
        document.getElementById("favourits").style.visibility="hidden";
    }
    else
        if(v.id=="bills1")
        {
            document.getElementById("legislators").style.visibility="hidden";

            document.getElementById("bills").style.visibility="visible";

            document.getElementById("committees").style.visibility="hidden";
            document.getElementById("favourits").style.visibility="hidden";
        }
    else
        if(v.id=="committees1")
        {
            document.getElementById("legislators").style.visibility="hidden";
            document.getElementById("bills").style.visibility="hidden";

            document.getElementById("committees").style.visibility="visible";

            document.getElementById("favourits").style.visibility="hidden";	
        }
    else
        if(v.id=="favourits1")
        {
            document.getElementById("legislators").style.visibility="hidden";
            document.getElementById("bills").style.visibility="hidden";
            document.getElementById("committees").style.visibility="hidden";
            document.getElementById("favourits").style.visibility="visible";
        }
}