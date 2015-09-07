#Network1
Getting started. Using a variety of tools including:

* React
* Browserify
* Sass
* Gulp

##Getting Started
* Clone the repo: `git clone https://github.com/davydka/network1`
* Enter your repo's directory: `cd network1`

```
npm install
gulp
```
##Building as a new Repo
First steps are to checkout the boilerplate and link it to your own git repo.

* Clone the repo: `git clone https://github.com/davydka/network1.git folder-name`
* Enter your repo's directory: `cd folder-name`
* Remove this init from the git remote: `git remote rm origin`
* If needed, create your new github repo from the command line: `curl -u 'USER' https://api.github.com/user/repos -d '{"name":"REPO"}'`
	* replace USER with your username and REPO with your repository/application name
* Add your remote: `git remote add origin https://github.com/USER/REPO.git`
	* again, replace USER with your username and REPO with your repository/application name
* Push to your new remote repo: `git push origin master`

