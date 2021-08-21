<?php

// $result = snmp2_get("localhost","public","1.3.6.1.2.1.6.10.0");
// $result2 = explode(" ",$result);
// echo $result2[1];

echo explode(" ",snmp2_get("localhost","public","1.3.6.1.2.1.6.11.0"))[1];

?>
