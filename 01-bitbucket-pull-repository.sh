set password "password"

cd /var/www/irs.oneberrysystem.com/web
spawn git pull "http://tir.coxlee@52.76.133.252:7990/scm/irs/web.git" dev-main
expect "Password for"
send "$password\n"
interact
