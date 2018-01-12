REM start a node with the params defined in node.json
REM Once started use a browser to nav to http://192.168.0.144:4444/grid/console to see hub info
REM To start without the json from the command line use:
REM java -jar selenium-server-standalone-3.8.1.jar -role node  -hub http://192.168.0.144:4444/grid/register

REM 
REM To start the node with parms in node.json modified from 
REM https://github.com/SeleniumHQ/selenium/blob/master/java/server/src/org/openqa/grid/common/defaults/DefaultNodeWebDriver.json
REM The mac doesn't do .bat files so to run it from the command line - copy paste the following to the cmd line
REM java -jar selenium-server-standalone-3.8.1.jar -role node -nodeConfig node_mac.json -hub http://192.168.0.144:4444/grid/register
REM todo - create a command line group that autostarts the hub and node on this machine
REM
