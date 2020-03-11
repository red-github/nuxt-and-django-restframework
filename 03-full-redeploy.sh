

cd "api"
echo "================================================================";
echo "====================BUILDING ONEBERRY RMS WEB===================";
docker-compose -f docker-compose.yml -p backend_employees up -d --build
echo "=============================FINISHED===========================";



cd "../employees"
echo "================================================================";
echo "====================BUILDING ONEBERRY RMS WEB===================";
docker-compose -f docker-compose.yml -p irs_web up -d --build
echo "=============================FINISHED===========================";


