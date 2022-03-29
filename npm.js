
async function npm(packageJSON) {
  
  let packages = {};
  
  getPackages(packageJSON, packages);
  
  return packages;
  
}

async function getPackages(packageNames, packageObj) {
  
  packageNames.forEach(packageName => {
  
    const package = await getPackage(packageName);
    packages[packageName] = package;
    
    getPackages(package.dependencies, packageObj);
    
  });
  
}

async function getPackage(package, version) {
  
  let resp = await axios.get(cors + 'https://registry.npmjs.org/' + name);
  
  if (version === 'latest') return resp['dist-tags'].latest;
  
  return resp.versions[version];
  
}

const cors = 'https://scepter-cors2.herokuapp.com/';

