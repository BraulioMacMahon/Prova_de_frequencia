
// Lista de matrículas e nomes
const studentNames = [
    { matricula: "0000", name: "Braulio Mac-Mahon" },
    { matricula: "1234", name: "Maria Oliveira" },
    { matricula: "1111", name: "Carlos Souza" },
    { matricula: "2222", name: "Ana Santos" }
];

let students = [];
let counter = 1; // Contador para o ID dos estudantes

// Preencher automaticamente o nome
function autoFillName() {
    const matriculaId = document.getElementById("matricula").value;
    const nameInput = document.getElementById("name");
    const student = studentNames.find(s => s.matricula === matriculaId);

    if (student) {
        nameInput.value = student.name;
    } else {
        nameInput.value = "Sem registro";
    }
}

// Atualizar o nome automaticamente ao inserir a matrícula
document.getElementById("matricula").addEventListener("input", autoFillName);


// Função para atribuir notas
function assignGrades() {
    const name = document.getElementById("name").value;
    const matricula = document.getElementById("matricula").value;
    const nota1 = parseFloat(document.getElementById("nota1").value);
    const nota2 = parseFloat(document.getElementById("nota2").value);
    const nota3 = parseFloat(document.getElementById("nota3").value);


    if (!studentNames.find(s => s.matricula === matricula)) {
        alert("Matricula não registrada");
        return
    }

    if(isNaN(nota1) || isNaN(nota2) || isNaN(nota3)){
        alert("Insira as notas corretamente");
        return
    }
    
    if(nota1<0 || nota2<0 || nota3<0 || nota1 >20 || nota2>20 || nota3>20){
        alert("Notas fora do intervalo academico");
        return
    }

    if(nota1 <= 20 && nota2 <= 20 && nota3 <= 20){
        const media = (nota1 + nota2 + nota3) / 3;
        let status = media >= 10 ? 'Aprovado' : media >= 5 ? 'Recurso' : 'Reprovado';

      
        students.push({
            id: counter++,
            name,
            matricula,
            nota1,
            nota2,
            nota3,
            media: media.toFixed(2),
            status
    });

        alert(`Notas de ${name} atribuídas com sucesso!`);
        clearForm();
    } else {
        alert("Dados de inconsistência de dados");
        return
    }
}

// Função para limpar o formulário
function clearForm() {
    document.getElementById("name").value = "";
    document.getElementById("matricula").value = "";
    document.getElementById("nota1").value = "";
    document.getElementById("nota2").value = "";
    document.getElementById("nota3").value = "";
}

// Função para exibir o popup com as notas dos estudantes
function viewGrades() {
    const popup = document.getElementById("popup");
    const tableBody = document.getElementById("data-table").querySelector("tbody");
    
    // Limpa as linhas existentes na tabela
    tableBody.innerHTML = "";

    // Adiciona os dados dos estudantes à tabela
    students.forEach(student => {
        const row = document.createElement("tr");
        row.innerHTML = `
            <td>${student.id}</td>
            <td>${student.name}</td>
            <td>${student.nota1}</td>
            <td>${student.nota2}</td>
            <td>${student.nota3}</td>
            <td>${student.media}</td>
            <td>${student.status}</td>
        `;
        tableBody.appendChild(row);
    });

    // Exibe o popup
    popup.style.display = "flex";
}

// Função para fechar o popup
function closePopup() {
    document.getElementById("popup").style.display = "none";
}

// Atualizar a hora do sistema
function updateSystemTime() {
    const timeElement = document.getElementById("systemTime");
    const now = new Date();
    const timeString = now.toLocaleTimeString("pt-PT", { hour: "2-digit", minute: "2-digit", second: "2-digit" });
    timeElement.innerHTML = `<strong>Hora do Sistema:</strong> ${timeString}`;
}

// Alterar os lados
function toggleSides(){
    const container = document.querySelector(".container");
    const color = document.querySelector(".left-side");

    container.classList.toggle("swapped");
    color.classList.toggle("left-side-swapp")

    
}

// Atualizar a hora a cada segundo
setInterval(updateSystemTime, 1000);

// Executar uma vez ao carregar a página
updateSystemTime();


