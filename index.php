<?php
header('Access-Control-Allow-Origin: *');
if($_GET["method"]=='legs')
{
    $stri="http://104.198.0.197:8080/legislators?apikey=82be6b89ccb84ec68b3a90e00bc5ed52&per_page=all";
    echo file_get_contents($stri,false);
}
else
    if($_GET["method"]=='legsho')
    {
        $stri="http://104.198.0.197:8080/legislators?chamber=house&apikey=08903a8d41774814810ded56e0212eb8&per_page=all";
        echo file_get_contents($stri,false);
    }
else
    if($_GET["method"]=='legsse')
    {
        $stri="http://104.198.0.197:8080/legislators?chamber=senate&apikey=08903a8d41774814810ded56e0212eb8&per_page=all";
        echo file_get_contents($stri,false);
    }
else
    if($_GET["method"]=='billactive')
    {
        $stri="http://104.198.0.197:8080/bills?apikey=08903a8d41774814810ded56e0212eb8&per_page=50&history.active=true";
        echo file_get_contents($stri,false);
    }
else
    if($_GET["method"]=='billnew')
    {
        $stri="http://104.198.0.197:8080/bills?apikey=08903a8d41774814810ded56e0212eb8&per_page=50&history.active=false";
        echo file_get_contents($stri,false);
    }
else
    if($_GET["method"]=='ctrlcommith')
    {
        $stri="http://104.198.0.197:8080/committees?apikey=08903a8d41774814810ded56e0212eb8&per_page=all&chamber=house";
        echo file_get_contents($stri,false);
    }
else
    if($_GET["method"]=='ctrlcommits')
    {
        $stri="http://104.198.0.197:8080/committees?apikey=08903a8d41774814810ded56e0212eb8&per_page=all&chamber=senate";
        echo file_get_contents($stri,false);
    }
else
    if($_GET["method"]=='ctrlcommitt')
    {
        $stri="http://104.198.0.197:8080/committees?apikey=08903a8d41774814810ded56e0212eb8&per_page=all&chamber=joint";
        echo file_get_contents($stri,false);
    }
else
    if($_GET["method"]=='legbill')
    {
        $stri="http://104.198.0.197:8080/bills?apikey=08903a8d41774814810ded56e0212eb8&per_page=50&sponsor_id=".$_GET["id"];
        echo file_get_contents($stri,false);
    }
else
    if($_GET["method"]=='legscommittee')
    {
        $stri="http://104.198.0.197:8080/committees?apikey=08903a8d41774814810ded56e0212eb8&per_page=50&member_ids=".$_GET["id"];
        echo file_get_contents($stri,false);
    }

?>