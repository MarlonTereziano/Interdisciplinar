<?php

echo explode(" ",snmp2_get("localhost","public","1.3.6.1.2.1.11.2.0"))[1];

?>
