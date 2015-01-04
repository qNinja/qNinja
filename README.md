# qNinja

Queue Manager for Siebel through QMon for Novell engineers. Aimed to assist Technical Support Engineers with queue management.

## Installation

### Development
1. Install Node.js from http://nodejs.org/download/
2. Run the following commands:

```
git clone https://github.com/qNinja/qNinja.git
git checkout develop
npm install
sudo npm install -g grunt-cli
bower install
grunt
```

### Production
Create port forwarding rules from port 80 to port 3000, can be done in iptables.
```
git clone https://github.com/qNinja/qNinja.git

git checkout master
npm install
sudo npm install -g grunt-cli
bower install
grunt build
node server.js
```
[Forever](https://github.com/foreverjs/forever) is recommended in place of executing directly in node, if possible.


##Versioning
[Semantic Versioning](http://semver.org/) is used. All versions are 
```
<major>.<minor>.<patch>.
```