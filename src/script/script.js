document.addEventListener('DOMContentLoaded', () => {

alert('Script.js Funcionando!');
  // Compatibilidade da propriedade filter (blur)
  if (!CSS.supports('backdrop-filter', 'blur(2.5px)')) {
    document
      .querySelector('.modal-content')
      .classList.add('no-backdrop-support');
    document.querySelector('.swal-modal').classList.add('no-backdrop-support');
  }

  // Funções do Bootstrap 5
  const shareModal = new bootstrap.Modal(
    modal,
    (options = {
      backdrop: true,
      focus: true,
      keyboard: true,
    })
  );
  shareModal.show();

  var tooltipTriggerList = [].slice.call(
    document.querySelectorAll('[data-bs-toggle="tooltip"]')
  );
  // Depurar a lista de tooltips do Bootstrap 5
  // console.log(tooltipTriggerList);
  var tooltipList = tooltipTriggerList.map(function (tooltipTriggerEl) {
    return new bootstrap.Tooltip(tooltipTriggerEl);
  });

  // Funções da página

  // Modal
  const btnCompartilhar = document.querySelector('#compartilhar');
  let tooltipCompartilhar = new bootstrap.Tooltip(btnCompartilhar);

  // Recriar o tooltip de compartilhar
  function reabilitarTooltipCompartilhar() {
    if (tooltipCompartilhar)
      tooltipCompartilhar = new bootstrap.Tooltip(btnCompartilhar);
  }

  btnCompartilhar.addEventListener('click', () => {
    shareModal.toggle();
    tooltipCompartilhar.dispose();
  });

  const closeBtn = document.querySelector('.btn-close');

  // [MODIFICAR] Aqui você coloca seus dados a serem compartilhados:
  const dev = {
    // Nome
    nome: 'Roberto Nóbrega Jr.',
    // Especialidade
    area: 'Desenvolvedor Front-end',
  };
  // Aqui você muda seus links:
  const links = {
    // Link do seu PIX:
    pix: 'https://tinyurl.com/qrcode-pix-roberto',
    // Link do seu Perfil no Github:
    github: 'https://github.com/devrenj',
    // Link do seu E-mail:
    email: 'mailto:devrenjbr@gmail.com',
    // Link do seu Perfil no Linkedin:
    linkedin: 'https://www.linkedin.com/in/devrenj',
    // Link do seu Perfil no Instagram:
    instagram: 'https://www.instagram.com/devrenjbr',
    // Link do seu perfil profissional:
    compartilhar: 'https://renj.dev.br',
  };

  // Captar todos os botões de navegação e adicionar o evento de clique
  const botoesNav = document.querySelectorAll('.nav-btn');
  botoesNav.forEach((elemento) => {
    elemento.addEventListener('click', () => {
      // Depurar elemento do evento de clique
      // console.log(elemento.id);
      const plataforma = elemento.getAttribute('data-platform');
      if (plataforma) {
        abrirPagina(plataforma, links[plataforma], '_blank');
      } else if (elemento.id === 'compartilhar') {
        return;
      } else {
        alertar(
          `Link para ${plataforma} não encontrado!\nVerifique o arquivo "script.js"`,
          'Ok',
          'error'
        );
        console.log(
          `Link para ${plataforma} não encontrado!\nVerifique o arquivo "script.js"`
        );
      }
    });
  });

  // Captar todos os botões do modal e adicionar o evento de clique
  const botoesModal = document.querySelectorAll('.modal-btn');
  botoesModal.forEach((elemento) => {
    elemento.addEventListener('click', () => {
      compartilhar(elemento.id);
    });
  });

  // [MODIFICAR] Função para compartilhar
  let timer = 0;
  function compartilhar(plataforma) {
    let perfilUrl = links.compartilhar; // URL a ser compartilhada
    let textoMensagem = `${dev.nome || 'Dev'}\n${
      dev.area || 'Desenvolvedor'
    }\n\n`;
    let compartilharUrl;
    let textoParaCopiar;

    // Escolher o link a ser compartilhado
    switch (plataforma) {
      case 'whatsapp':
        compartilharUrl = `https://api.whatsapp.com/send?text=${encodeURIComponent(
          textoMensagem
        )}${encodeURIComponent(perfilUrl)}`;
        break;

      case 'facebook':
        compartilharUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
          perfilUrl
        )}`;
        break;

      case 'telegram':
        compartilharUrl = `https://t.me/share/url?url=${encodeURIComponent(
          perfilUrl
        )}&text=${encodeURIComponent(textoMensagem)}`;
        break;

      // Antigo Twitter
      case 'x':
        compartilharUrl = `https://twitter.com/intent/tweet?url=${encodeURIComponent(
          perfilUrl
        )}&text=${encodeURIComponent(textoMensagem)}`;
        break;

      case 'linkedin':
        compartilharUrl = `https://www.linkedin.com/shareArticle?mini=true&url=${encodeURIComponent(
          perfilUrl
        )}&title=${encodeURIComponent(textoMensagem)}`;
        break;

      case 'copiar':
        textoParaCopiar = `${textoMensagem}${perfilUrl}`;
        copiarTexto(textoParaCopiar);
        return;

      default:
        console.error(
          'Erro ao carregar o link. Verifique a função em src/script/script.js'
        );
        alertar('Erro ao compartilhar', 'Ok', 'error');
        return;
    }

    // Verificação se o link para compartilhar existe antes de abrir o modal
    if (compartilharUrl) {
      shareModal.toggle();
      abrirPagina(plataforma, compartilharUrl, '_blank');
    }

    function copiarTexto(textoParaCopiar) {
      if (navigator.clipboard) {
        navigator.clipboard
          .writeText(textoParaCopiar)
          .then(() => {
            shareModal.toggle();
            alertar('Texto copiado!', false, 'success');
          })
          .catch((err) => {
            alertar('Erro ao copiar...', 'Ok', 'error');
            console.error('Erro ao copiar: ', err);
          });
      } else {
        alert('Seu navegador não suporta a API Clipboard.');
      }
    }
  }

  // Função de abrir página
  function abrirPagina(plataforma, url, target) {
    clearTimeout(timer);
    alertar(
      `Abrindo ${
        plataforma.charAt(0).toUpperCase() +
        plataforma.slice(1, plataforma.length)
      }`,
      false,
      'success'
    );
    timer = setTimeout(() => {
      window.open(url, target);
    }, 1500);
  }

  // Quando o usuário clicar no 'X', feche o modal
  closeBtn.addEventListener('click', () => {
    shareModal.toggle();
    reabilitarTooltipCompartilhar();
  })
  modal.addEventListener('click', () => {
    shareModal.toggle();
    reabilitarTooltipCompartilhar();
  })

  // Funções do Sweet Alert - Cria alertas dependendo do evento disparado
  // texto: mostra uma mensagem, precisa ser uma "string"
  // msgBotao: define o texto do botão do alerta, precisa ter "string" || true || false
  // icone: define o icone do alerta, precisa ser "warning" || "error" || "success" || "info"
  // duracaoAlerta: define o tempo do alerta, configure com Segundos * Milissegundos
  const duracaoAlerta = 1.5 * 1000;
  function alertar(texto = 'Olá, Mundo!', msgBotao = false, icone = 'success') {
    // Se os parâmetros não estiverem preenchidos, usará estes valores acima como padrão
    swal(texto.toUpperCase(), {
      buttons: {
        text: msgBotao,
      },
      icon: icone,
      timer: msgBotao ? null : duracaoAlerta,
    });
  }

  // Funções de Depuração
  // document.onclick = (e) => {
  //   e.preventDefault()
  //   alert(e.target)
  //   // e.target.style.display = "none";
  // }

  // // Botão de teste
  // const teste = document.querySelector('#teste');
  // teste.onclick = () => {
  // // let vezes = 0;
  //   console.log('Teste pressionado', vezes);
  // // vezes++;
  //   alertar('Hello World!', 'Ok', 'success');
  // }
});