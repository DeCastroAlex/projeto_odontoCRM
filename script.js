document.addEventListener("DOMContentLoaded", function () {
  // Declarar pacientes uma única vez, carregando do localStorage ou iniciando vazio
  let pacientes = JSON.parse(localStorage.getItem("pacientes")) || [];

  const form = document.getElementById("form-paciente");
  const listaPacientes = document.getElementById("lista-pacientes");

  if (!form) {
    console.error("Formulário não encontrado!");
    return;
  }

  // Salva a lista de pacientes no localStorage
  function salvarPacientes() {
    localStorage.setItem("pacientes", JSON.stringify(pacientes));
  }

  // Renderiza os pacientes na tela
  function renderizarPacientes() {
    listaPacientes.innerHTML = "";

    pacientes.forEach((paciente, index) => {
      const card = document.createElement("div");
      card.classList.add("card-paciente");

      // Adiciona classe de cor conforme o status
      const statusClass =
        paciente.status === "Aguardando"
          ? "status-aguardando"
          : paciente.status === "Em atendimento"
          ? "status-em-atendimento"
          : "status-finalizado";
      card.classList.add(statusClass);

      const info = document.createElement("div");
      info.classList.add("card-info");
      info.innerHTML = `
        <p><strong>Nome:</strong> ${paciente.nome}</p>
        <p><strong>Telefone:</strong> ${paciente.telefone}</p>
        <p><strong>Procedimento:</strong> ${paciente.procedimento}</p>
        <p><strong>Data:</strong> ${paciente.data}</p>
        <p><strong>Status:</strong> ${paciente.status}</p>
      `;

      const botoes = document.createElement("div");
      botoes.classList.add("card-botoes");

      const btnStatus = document.createElement("button");
      btnStatus.textContent = "Mudar Status";
      btnStatus.classList.add("btn-status");
      btnStatus.onclick = () => mudarStatus(index);

      const btnExcluir = document.createElement("button");
      btnExcluir.textContent = "Excluir";
      btnExcluir.classList.add("btn-excluir");
      btnExcluir.onclick = () => excluirPaciente(index);

      botoes.appendChild(btnStatus);
      botoes.appendChild(btnExcluir);

      card.appendChild(info);
      card.appendChild(botoes);
      listaPacientes.appendChild(card);
    });
  }

  // Alterna o status do paciente
  function mudarStatus(index) {
    const statusAtual = pacientes[index].status;
    if (statusAtual === "Aguardando") {
      pacientes[index].status = "Em atendimento";
    } else if (statusAtual === "Em atendimento") {
      pacientes[index].status = "Finalizado";
    } else {
      pacientes[index].status = "Aguardando";
    }
    salvarPacientes();
    renderizarPacientes();
  }

  // Exclui um paciente da lista
  function excluirPaciente(index) {
    if (confirm("Deseja excluir este paciente?")) {
      pacientes.splice(index, 1);
      salvarPacientes();
      renderizarPacientes();
    }
  }

  // Captura o envio do formulário
  form.addEventListener("submit", (e) => {
    e.preventDefault();

    const nome = document.getElementById("nome").value.trim();
    const telefone = document.getElementById("telefone").value.trim();
    const procedimento = document.getElementById("procedimento").value.trim();
    const data = document.getElementById("data").value;

    if (!nome || !telefone || !procedimento || !data) {
      alert("Preencha todos os campos!");
      return;
    }

    const novoPaciente = {
      nome,
      telefone,
      procedimento,
      data,
      status: "Aguardando",
    };

    pacientes.push(novoPaciente);
    salvarPacientes();
    renderizarPacientes();

    form.reset();
  });

  // Renderiza os pacientes ao carregar a página
  renderizarPacientes();
});
