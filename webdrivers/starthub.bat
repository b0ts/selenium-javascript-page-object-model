REM start a hub with the params defined in hub.json
REM Once started use a browser to nav to http://192.168.0.144:4444/grid/console to see hub info
REM To start without the json from the command line use:
REM java -jar selenium-server-standalone-3.8.1.jar -role hub
REM 
REM To start the hub with parms in hub.json defaults from 
REM https://github.com/SeleniumHQ/selenium/blob/master/java/server/src/org/openqa/grid/common/defaults/DefaultHub.json
REM The mac doesn't do .bat files so to run it from the command line - copy paste the following to the cmd line
REM java -jar selenium-server-standalone-3.8.1.jar -role hub -hubConfig hub.json
REM todo - create a command line group that autostarts the hub and node on this machine
REM
