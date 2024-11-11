const fs = require('fs');
const path = require('path');

const usersDataPath = path.join('data', 'users.json');
const outputReportPath = path.join('reports', 'user_report.csv');

// Função para gerar o CSV
const generateCSV = (data) => {
  const headers = "ID, Name, Email\n";
  const rows = data.map(user => `${user.id},${user.name},${user.email}`).join('\n');
  return headers + rows;
}

// Função para ler os dados e gerar o relatório
const generateReport = () => {
  fs.readFile(usersDataPath, 'utf-8', (err, data) => {
    if (err) throw err;
    const users = JSON.parse(data);
    const csvContent = generateCSV(users);

    fs.writeFile(outputReportPath, csvContent, (err) => {
      if (err) throw err;
      console.log('Relatório gerado com sucesso em:', outputReportPath);
    })
  })
}

generateReport();